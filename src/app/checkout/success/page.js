'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');

    if (!sessionId || !orderId) {
      setError('Invalid checkout session');
      setIsLoading(false);
      return;
    }

    async function verifyPayment() {
      try {
        // Call API to verify payment and update order status
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            sessionId,
            orderId
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment');
        }

        setOrderDetails(data.order);

        // Clear the cart after successful payment
        dispatch(clearCart());
      } catch (error) {
        console.error('Payment verification error:', error);
        setError('An error occurred while verifying your payment. Please contact support.');
      } finally {
        setIsLoading(false);
      }
    }

    verifyPayment();
  }, [searchParams, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
          <div className="flex justify-center">
            <Link 
              href="/cart" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {orderDetails && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Order Details
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Order ID:</span> {orderDetails.id}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Date:</span> {new Date(orderDetails.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Total:</span> €{orderDetails.total.toFixed(2)}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Status:</span> {orderDetails.status}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <Link 
              href="/gallery" 
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/orders" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
