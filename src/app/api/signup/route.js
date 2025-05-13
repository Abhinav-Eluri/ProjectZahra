// src/app/api/signup/route.js
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const { email, password, name, isAdmin = false } = await req.json();

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
            return new Response(
                JSON.stringify({ success: false, error: 'User with this email already exists' }),
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name: name || '',
                password: hashedPassword,
                isAdmin,
            },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return new Response(
            JSON.stringify({ success: true, user: userWithoutPassword }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'An error occurred during signup' }),
            { status: 500 }
        );
    }
}
