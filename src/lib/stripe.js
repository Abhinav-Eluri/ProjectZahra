import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export default stripe;