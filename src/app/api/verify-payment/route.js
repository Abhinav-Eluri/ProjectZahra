import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Get the session ID and order ID from the request body
    const { sessionId, orderId } = await req.json();

    // Ensure we have a session ID and order ID
    if (!sessionId || !orderId) {
      return NextResponse.json(
        { error: 'Missing session ID or order ID' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if the session exists and is valid
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session ID' },
        { status: 400 }
      );
    }

    // Find the order in the database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    // Check if the order exists
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update the order status based on the payment status
    let newStatus;
    if (session.payment_status === 'paid') {
      newStatus = 'paid';
    } else if (session.payment_status === 'unpaid') {
      newStatus = 'pending';
    } else {
      newStatus = 'failed';
    }

    // Update the order in the database
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      include: { items: true },
    });

    console.log(`Order ${orderId} status updated to ${newStatus}`);

    // Return the updated order
    return NextResponse.json({ 
      success: true,
      order: updatedOrder
    });
  } catch (error) {
    console.error('Payment verification error:', error);

    // Provide more specific error messages based on the error type
    if (error.type && error.type.startsWith('Stripe')) {
      // Handle Stripe-specific errors
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        { error: 'An error occurred while verifying the payment. Please try again.' },
        { status: 500 }
      );
    }
  }
}