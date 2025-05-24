'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import Image from "next/image";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }

    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [user, cartItems, router]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the checkout API route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cartItems,
          userId: user.id // Pass the user ID to the server
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      console.error('Checkout error:', error);
      setError('An error occurred during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Checkout
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="flex items-center">
                  <Image
                      fill
                    src={item.src} 
                    alt={item.alt} 
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {item.alt}
                    </h3>
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  ${item.price ? item.price.toFixed(2) : '0.00'}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-800 dark:text-white">Total:</span>
              <span className="text-gray-800 dark:text-white">${cartItems.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center">
          <Link 
            href="/cart" 
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Cart
          </Link>
          <button 
            className={`${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white px-6 py-3 rounded-md flex items-center`}
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
