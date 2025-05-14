import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe from '@/lib/stripe';

/**
 * Stripe Webhook Handler
 * 
 * This endpoint receives webhook events from Stripe and processes them.
 * 
 * Setup instructions:
 * 1. Get a webhook secret from Stripe Dashboard > Developers > Webhooks > Add endpoint
 * 2. Add your webhook URL: https://your-domain.com/api/webhook
 * 3. Select events to listen for (at minimum: checkout.session.completed, payment_intent.payment_failed)
 * 4. Copy the webhook signing secret and add it to your .env.local file as STRIPE_WEBHOOK_SECRET
 * 
 * For local development:
 * - Use the Stripe CLI to forward events to your local server:
 *   stripe listen --forward-to localhost:3000/api/webhook
 * - The CLI will provide a webhook secret to use during development
 */

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    // Verify the webhook signature using the webhook secret
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        // Extract the userId from the metadata
        const { userId } = session.metadata;

        // Here you would typically:
        // 1. Update your database to mark the order as paid
        // 2. Fulfill the order (e.g., send digital goods, initiate shipping)
        console.log(`Payment succeeded for user ${userId}, session ${session.id}`);

        break;

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object;
        console.log(`Payment failed: ${paymentIntent.id}`);

        // Here you would typically update your database to mark the order as failed
        break;

      // Add more event types as needed

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
