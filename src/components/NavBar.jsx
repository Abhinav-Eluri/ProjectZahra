'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Gallery', href: '/gallery' },
    ];

    const isActive = (href) => pathname === href;

    return (
        <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition">
                    🎨 Artify
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-8 text-lg">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`hover:text-blue-600 transition ${
                                isActive(item.href) ? 'font-semibold underline underline-offset-4' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {!user ? (
                        <>
                            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                            <Link href="/register" className="text-green-600 hover:underline">Register</Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="text-red-600 hover:underline"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(true)} aria-label="Open menu">
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl backdrop-blur-xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xl font-bold">Menu</span>
                    <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col p-6 space-y-4 text-lg">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`hover:text-blue-600 transition ${
                                isActive(item.href) ? 'font-semibold underline' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {!user ? (
                        <>
                            <Link href="/login" onClick={() => setIsOpen(false)} className="text-blue-600 hover:underline">
                                Login
                            </Link>
                            <Link href="/register" onClick={() => setIsOpen(false)} className="text-green-600 hover:underline">
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="text-red-600 hover:underline text-left"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
}

export default NavBar;
