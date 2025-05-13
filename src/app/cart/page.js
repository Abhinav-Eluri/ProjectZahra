'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/store/cartSlice';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total items
  const totalItems = cartItems.length; // Since each item can only be added once with quantity 1

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 dark:text-gray-400 text-xl mb-6">
              Your cart is empty
            </div>
            <Link 
              href="/gallery" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md inline-block"
            >
              Browse Gallery
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </div>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row"
                >
                  <div className="w-full sm:w-1/3">
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        {item.alt}
                      </h3>
                    </div>
                    <div className="flex items-center mt-4">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <Link 
                href="/gallery" 
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
              <Link 
                href={user ? "/checkout" : "/login?redirect=/cart"}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
