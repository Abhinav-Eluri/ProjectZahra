'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/context/AuthContext';
import { clearCart } from '@/store/cartSlice';

export default function CheckoutSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    // Clear the cart after successful checkout
    dispatch(clearCart());

    // In a real application, you would verify the session with Stripe
    // and update your database with order information
    setLoading(false);
    setSession({
      id: sessionId,
      status: 'complete',
    });
  }, [sessionId, dispatch, router, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
          <Link 
            href="/cart" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md inline-block"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <svg 
            className="w-20 h-20 text-green-500 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Thank You for Your Order!
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your order has been successfully processed. You will receive a confirmation email shortly.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Order Details
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Order ID: {session?.id}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Status: {session?.status}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/gallery" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
