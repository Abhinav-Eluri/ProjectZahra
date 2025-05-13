import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

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
    const description = formData.get('description');
    const price = formData.get('price');

    // Validate required fields
    if (!file || !file_id || price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure the file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public/uploads/images');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Convert the file to an ArrayBuffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Store the relative path for web access
    const webPath = `/uploads/images/${uniqueFilename}`;

    // Create new image in database
    const image = await prisma.image.create({
      data: {
        file_id,
        filePath: webPath,
        description,
        price: parseFloat(price),
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
    const { id, priority, visible, description, price, file_id } = data;

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 });
    }

    // Update image in database
    const updateData = {};
    if (priority !== undefined) updateData.priority = priority;
    if (visible !== undefined) updateData.visible = visible;
    if (description !== undefined) updateData.description = description;
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

    // Delete the physical file from the filesystem
    if (image.filePath) {
      try {
        // Convert web path to filesystem path
        const filePath = path.join(process.cwd(), 'public', image.filePath);
        await unlink(filePath);
        console.log(`Successfully deleted file: ${filePath}`);
      } catch (fileError) {
        console.error('Error deleting image file:', fileError);
        // Continue with database deletion even if file deletion fails
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
