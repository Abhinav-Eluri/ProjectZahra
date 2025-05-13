'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  // Redirect non-admin users to the login page
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, loading, router]);

  // Show loading state while checking authentication
  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border-4 border-dashed border-gray-200 p-4 min-h-96">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Welcome, {user.name || user.email}!</h2>
                <p className="text-gray-600">You are logged in as an administrator.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium text-lg mb-2">User Management</h3>
                  <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    View Users →
                  </button>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium text-lg mb-2">Image Management</h3>
                  <p className="text-gray-600 mb-4">Upload and organize gallery images</p>
                  <div className="flex space-x-4">
                    <Link href="/admin/dashboard/images/upload" className="text-indigo-600 hover:text-indigo-800">
                      Upload Images →
                    </Link>
                    <Link href="/admin/dashboard/images/manage" className="text-indigo-600 hover:text-indigo-800">
                      Manage Images →
                    </Link>
                  </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium text-lg mb-2">Order Management</h3>
                  <p className="text-gray-600 mb-4">View and manage customer orders</p>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    View Orders →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
