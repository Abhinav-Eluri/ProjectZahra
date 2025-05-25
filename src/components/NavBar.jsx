"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, User, ShoppingBag, LogOut, Search } from 'lucide-react';
import {useAuth} from "@/context/AuthContext";
import {useTheme} from "@/context/ThemeContext";
import {useSelector} from "react-redux";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout, loading: authLoading } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Artists', href: '/artists' },
        { label: 'Exhibitions', href: '/exhibitions' },
        { label: 'About', href: '/about' },
    ];


    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg border-b border-zinc-200/20 dark:border-zinc-700/20'
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="/" className="group flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                                    <span className="text-white font-bold text-lg">A</span>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    AFGUNSEEN
                                </span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map(({ label, href }) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="relative px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200 group"
                                >
                                    {label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {/* Search */}
                            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200">
                                <Search size={20} />
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {/* Cart */}
                            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200">
                                <ShoppingBag size={20} />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>

                            {/* User Menu */}
                            {!user ? (
                                <div className="flex items-center space-x-3">
                                    <a href="/login" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200">
                                        Login
                                    </a>
                                    <a href="/register" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium">
                                        Sign Up
                                    </a>
                                </div>
                            ) : (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">
                                                {user.email?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <ChevronDown size={16} className={`text-gray-600 dark:text-gray-300 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl py-2 z-50 border border-gray-200 dark:border-zinc-700">
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {user.email?.split('@')[0]}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <a
                                                href="/profile"
                                                className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <User size={16} />
                                                <span>Profile Settings</span>
                                            </a>
                                            <a
                                                href="/orders"
                                                className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <ShoppingBag size={16} />
                                                <span>My Orders</span>
                                            </a>
                                            <div className="border-t border-gray-200 dark:border-zinc-700 mt-2 pt-2">
                                                <button
                                                    onClick={() => { logout(); setDropdownOpen(false); }}
                                                    className="flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors duration-200"
                                                >
                                                    <LogOut size={16} />
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center space-x-3">
                            <button className="relative p-2 text-gray-600 dark:text-gray-300">
                                <ShoppingBag size={20} />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 rounded-lg"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Slide-out Menu */}
            <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-zinc-900 shadow-2xl transform transition-transform duration-300 ease-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } lg:hidden`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Menu
                    </span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col p-6 space-y-1">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-colors duration-200 font-medium"
                        >
                            {label}
                        </a>
                    ))}

                    <div className="border-t border-gray-200 dark:border-zinc-700 my-4"></div>

                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors duration-200"
                    >
                        <span>Theme</span>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {!user ? (
                        <div className="space-y-3 pt-4">
                            <a href="/login" className="block text-center px-4 py-3 text-purple-600 border border-purple-600 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200 font-medium">
                                Login
                            </a>
                            <a href="/register" className="block text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
                                Sign Up
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-1 pt-4">
                            <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.email?.split('@')[0]}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                            <a href="/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors duration-200">
                                <User size={16} />
                                <span>Profile Settings</span>
                            </a>
                            <a href="/orders" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-colors duration-200">
                                <ShoppingBag size={16} />
                                <span>My Orders</span>
                            </a>
                            <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full text-left transition-colors duration-200">
                                <LogOut size={16} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Spacer for fixed navbar */}
            <div className="h-20"></div>
        </>
    );
}