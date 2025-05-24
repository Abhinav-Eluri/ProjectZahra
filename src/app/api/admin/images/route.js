import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { uploadImageToCloudinary, deleteImageFromCloudinary, getPublicIdFromUrl } from '@/utils/cloudinary';

// Helper function to check if user is admin
async function isUserAdmin(session) {
  if (!session || !session.user) return false;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { isAdmin: true }
  });

  return user?.isAdmin || false;
}

// POST: Upload a new image
export async function POST(request) {
  try {
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(session);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file');
    const file_id = formData.get('file_id');
    const imageName = formData.get('imageName');
    const description = formData.get('description');
    const price = formData.get('price');
    const imageType = formData.get('imageType') || 'photo'; // Get image type with default

    // Validate required fields
    if (!file || !file_id || !imageName || price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure the file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Convert the file to an ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const cloudinaryResult = await uploadImageToCloudinary(buffer, file.name, {
      folder: 'projectzahra/uploads',
      public_id: `${imageName.replace(/[^a-zA-Z0-9_-]/g, '_')}-${uuidv4()}`,
      resource_type: 'image'
    });

    // Store the Cloudinary URL for web access
    const webPath = cloudinaryResult.secure_url;

    // Create new image in database
    const image = await prisma.image.create({
      data: {
        file_id,
        filePath: webPath,
        description: imageName + (description ? ` - ${description}` : ''), // Include image name in description
        price: parseFloat(price),
        imageType, // Add the image type
        visible: true,
        priority: 0,
        userId: session.user.id
      }
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

// GET: Retrieve all images
export async function GET(request) {
  try {
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(session);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get all images
    const images = await prisma.image.findMany({
      orderBy: { priority: 'asc' },
      select: {
        id: true,
        file_id: true,
        filePath: true,
        description: true,
        price: true,
        visible: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        userId: true
      }
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

// PATCH: Update image properties
export async function PATCH(request) {
  try {
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(session);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Parse request body
    const data = await request.json();
    const { id, priority, visible, description, imageName, price, file_id, imageType } = data;

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 });
    }

    // Update image in database
    const updateData = {};
    if (priority !== undefined) updateData.priority = priority;
    if (visible !== undefined) updateData.visible = visible;
    if (imageType !== undefined) updateData.imageType = imageType; // Add image type update

    // Handle description and imageName
    if (imageName !== undefined && description !== undefined) {
      updateData.description = imageName + (description ? ` - ${description}` : '');
    } else if (imageName !== undefined) {
      // Get the current image to extract the description part if it exists
      const currentImage = await prisma.image.findUnique({
        where: { id },
        select: { description: true }
      });

      const currentDesc = currentImage?.description || '';
      const descPart = currentDesc.includes(' - ') ? currentDesc.split(' - ').slice(1).join(' - ') : '';

      updateData.description = imageName + (descPart ? ` - ${descPart}` : '');
    } else if (description !== undefined) {
      // Get the current image to extract the name part
      const currentImage = await prisma.image.findUnique({
        where: { id },
        select: { description: true }
      });

      const currentDesc = currentImage?.description || '';
      const namePart = currentDesc.includes(' - ') ? currentDesc.split(' - ')[0] : currentDesc;

      updateData.description = namePart + (description ? ` - ${description}` : '');
    }

    if (price !== undefined) updateData.price = parseFloat(price);
    if (file_id !== undefined) updateData.file_id = file_id;

    const image = await prisma.image.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

// DELETE: Remove an image
export async function DELETE(request) {
  try {
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(session);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get the image ID from the URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 });
    }

    // First, get the image record to retrieve the file path
    const image = await prisma.image.findUnique({
      where: { id }
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Delete the image from Cloudinary
    if (image.filePath && image.filePath.includes('cloudinary.com')) {
      try {
        // Extract the public_id from the Cloudinary URL
        const publicId = getPublicIdFromUrl(image.filePath);
        if (publicId) {
          await deleteImageFromCloudinary(publicId);
          console.log(`Successfully deleted image from Cloudinary: ${publicId}`);
        }
      } catch (fileError) {
        console.error('Error deleting image from Cloudinary:', fileError);
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }

    // Delete the image from the database
    await prisma.image.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
