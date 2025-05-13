import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

// This is a development-only endpoint for creating a test admin user
// It should be removed or secured in production
export async function POST(req) {
  try {
    // Check if we're in development mode
    if (process.env.NODE_ENV === 'production') {
      return new Response(
        JSON.stringify({ success: false, error: 'This endpoint is not available in production' }),
        { status: 403 }
      );
    }

    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // If user exists but is not admin, update to make them admin
      if (!existingUser.isAdmin) {
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { isAdmin: true },
        });

        const { password: _, ...userWithoutPassword } = updatedUser;

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Existing user updated to admin',
            user: userWithoutPassword 
          }),
          { status: 200 }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User with this email already exists and is already an admin' 
        }),
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || '',
        password: hashedPassword,
        isAdmin: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin user created successfully',
        user: userWithoutPassword 
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Create test admin error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An error occurred while creating admin user',
        details: error.message || 'No error details available'
      }),
      { status: 500 }
    );
  }
}
