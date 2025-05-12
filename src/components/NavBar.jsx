'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSelector } from 'react-redux';
import { useTheme } from '@/context/ThemeContext';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const { user, logout, loading: authLoading } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => setMounted(true), []);
    const isActive = (href) => pathname === href;

    if (mounted && authLoading) return null;

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Gallery', href: '/gallery' },
    ];

    return (
        <nav className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white sticky top-0 z-50 shadow-sm transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-extrabold tracking-tight hover:opacity-90">
                    AFGUNSEEN
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 font-medium text-[17px]">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`transition-colors hover:text-sky-500 ${
                                isActive(href) ? 'text-sky-600 font-semibold' : ''
                            }`}
                        >
                            {label}
                        </Link>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                        aria-label="Toggle Theme"
                    >
                        {mounted && (isDarkMode ? <Sun size={20} /> : <Moon size={20} />)}
                    </button>

                    <Link href="/cart" className="relative flex items-center hover:text-sky-500 transition">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M17 17a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 114 0 2 2 0 01-4 0z" />
                        </svg>
                        {mounted && cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-sky-500 text-white rounded-full px-1.5 py-0.5 text-xs shadow-md animate-pulse">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <>
                            <Link href="/login" className="text-sky-600 hover:underline">Login</Link>
                            <Link href="/register" className="text-green-600 hover:underline">Register</Link>
                        </>
                    ) : (
                        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
                    )}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        aria-label="Toggle Theme"
                    >
                        {mounted && (isDarkMode ? <Sun size={20} /> : <Moon size={20} />)}
                    </button>
                    <Link href="/cart" className="relative">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M17 17a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 114 0 2 2 0 01-4 0z" />
                        </svg>
                        {mounted && cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-sky-500 text-white rounded-full px-1.5 py-0.5 text-xs shadow-md">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setIsOpen(true)} aria-label="Open menu">
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-zinc-900 z-[999] shadow-lg transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 flex justify-between items-center border-b border-zinc-300 dark:border-zinc-700">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col p-6 gap-4 text-base">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={`hover:text-sky-500 transition ${
                                isActive(href) ? 'text-sky-600 font-semibold' : ''
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    {!user ? (
                        <>
                            <Link href="/login" onClick={() => setIsOpen(false)} className="text-sky-600 hover:underline">Login</Link>
                            <Link href="/register" onClick={() => setIsOpen(false)} className="text-green-600 hover:underline">Register</Link>
                        </>
                    ) : (
                        <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-500 hover:underline text-left">Logout</button>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
}
