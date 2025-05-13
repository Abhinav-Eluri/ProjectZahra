import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists and is an admin
    if (!user || !user.isAdmin) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid admin credentials' }),
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid admin credentials' }),
        { status: 401 }
      );
    }

    // User is authenticated and is an admin
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin login successful',
        redirectUrl: '/admin/dashboard' // Redirect to admin dashboard
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An error occurred during admin login' }),
      { status: 500 }
    );
  }
}
