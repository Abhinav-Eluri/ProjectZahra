'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useAuth();
    const redirectPath = searchParams.get('redirect');

    // Redirect if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirectPath || '/');
        }
    }, [isAuthenticated, router, redirectPath]);
    const handleLogin = async () => {
        try {
            await login(email, password);
            // Redirect to the specified path if available, otherwise go to home
            router.push(redirectPath || '/');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    Login to access your account and creative space.
                </p>
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-green-600 hover:underline">
                        Register
                    </Link>
                </p>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <Link href="/admin/login" className="text-blue-600 hover:underline">
                        Admin Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
