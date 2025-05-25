// src/app/api/contact/route.js
import { prisma } from '@/lib/prisma';

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        // Validate input
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'Name, email, and message are required' 
                }),
                { status: 400 }
            );
        }

        // Create contact entry
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                message,
            },
        });

        return new Response(
            JSON.stringify({ 
                success: true, 
                message: 'Your message has been sent successfully!',
                contact 
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form submission error:', error);
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'An error occurred while sending your message. Please try again later.' 
            }),
            { status: 500 }
        );
    }
}