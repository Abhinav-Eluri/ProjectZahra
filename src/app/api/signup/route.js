// src/app/api/register/route.js
import { account } from '@/lib/appwrite';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const response = await account.create('unique()', email, password);

        return new Response(JSON.stringify({ success: true, user: response }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
        });
    }
}
