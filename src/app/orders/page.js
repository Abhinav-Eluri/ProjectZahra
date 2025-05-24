'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user) {
      router.push('/login?redirect=/orders');
      return;
    }

    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch orders');
        }

        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('An error occurred while fetching your orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [user, router]);

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Loading...</p>
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
              href="/gallery" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              Browse Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 dark:text-gray-400 text-xl mb-6">
              You haven&apost placed any orders yet
            </div>
            <Link 
              href="/gallery" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md inline-block"
            >
              Browse Gallery
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Order #{order.id.substring(0, 8)}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      Items
                    </h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {item.imageUrl && (
                              <Image
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded-md mr-3"
                              />
                            )}
                            <div>
                              <p className="text-gray-800 dark:text-white font-medium">
                                {item.name}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-800 dark:text-white font-medium">
                            €{item.price.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-gray-800 dark:text-white">Total:</span>
                      <span className="text-gray-800 dark:text-white">€{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}