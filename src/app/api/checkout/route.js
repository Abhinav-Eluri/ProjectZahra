import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { PrismaClient } from '@/generated/prisma';
import { sendOrderConfirmationEmail } from '@/utils/email';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Get the cart items and userId from the request body
    const { cartItems, userId } = await req.json();

    // Ensure we have items to checkout
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Ensure we have a userId
    if (!userId) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Log the cart items for debugging
    console.log('Cart items received:', cartItems);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.price || 0), 0);

    // Create a new order in the database with status "pending"
    const order = await prisma.order.create({
      data: {
        userId: userId,
        total: totalPrice,
        status: 'pending',
      },
    });

    // Create order items separately
    const orderItems = await Promise.all(
      cartItems.map(item => 
        prisma.OrderItem.create({
          data: {
            orderId: order.id,
            itemId: item.id,
            name: item.alt || 'Artwork',
            price: item.price || 0,
            imageUrl: item.src,
            quantity: item.quantity || 1,
          }
        })
      )
    );

    // Fetch the complete order with items
    const completeOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });

    console.log('Order created:', completeOrder);

    // Fetch user email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    // Send order confirmation email
    if (user && user.email) {
      try {
        await sendOrderConfirmationEmail(user.email, completeOrder, completeOrder.items);
        console.log('Order confirmation email sent to:', user.email);
      } catch (emailError) {
        // Log the error but don't fail the checkout process
        console.error('Failed to send order confirmation email:', emailError);
      }
    }

    // Create line items for Stripe
    const lineItems = cartItems.map(item => {
      // Ensure image URL is absolute
      let imageUrl = item.src;

      // If the URL is relative (doesn't start with http:// or https://), make it absolute
      if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }

      // Log the price conversion for debugging
      const unitAmount = item.price && !isNaN(item.price) ? Math.round(item.price * 100) : 1000;
      console.log(`Item ${item.id}: Price $${item.price} converted to ${unitAmount} cents for Stripe`);

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.alt || 'Artwork',
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: unitAmount, // Use the calculated unitAmount
        },
        quantity: item.quantity || 1,
      };
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${completeOrder.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        userId,
        orderId: completeOrder.id,
      },
    });

    // Return the session ID and order ID
    return NextResponse.json({ 
      sessionId: session.id,
      orderId: completeOrder.id
    });
  } catch (error) {
    console.error('Checkout error:', error);

    // Provide more specific error messages based on the error type
    if (error.type === 'StripeInvalidRequestError') {
      // Handle Stripe-specific errors
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    } else if (error.message.includes('URL')) {
      // Handle URL-related errors specifically
      return NextResponse.json(
        { error: 'Invalid image URL. Please ensure all image URLs are valid and accessible.' },
        { status: 400 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        { error: 'An error occurred during checkout. Please try again.' },
        { status: 500 }
      );
    }
  }
}
