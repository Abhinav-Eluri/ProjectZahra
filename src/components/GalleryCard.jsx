// components/GalleryCard.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from "next/image";

function GalleryCard({ image, quantity = 0, onAddToCart, onRemoveFromCart }) {
    const [imageLoading, setImageLoading] = useState(true);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef(null);

    console.log("Image:", image);

    const handleRightClick = (e) => {
        e.preventDefault();
    };

    const closeModal = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMaximized(false);
            setIsClosing(false);
        }, 200); // Match this with the animation duration
    }, []);

    const toggleMaximize = () => {
        if (isMaximized) {
            closeModal();
        } else {
            setIsMaximized(true);
        }
    };

    // Handle click outside to close modal
    const handleClickOutside = useCallback((e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    }, [closeModal]);

    // Handle escape key to close modal
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    }, [closeModal]);

    // Prevent body scrolling when modal is open and add event listeners
    useEffect(() => {
        if (isMaximized) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMaximized, handleClickOutside, handleKeyDown]);

    return (
        <>
            <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="relative">
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <Image
                        src={image.src}
                        alt={image.alt}
                        className={`w-full h-64 object-cover transition-transform duration-500 hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'} cursor-pointer`}
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                        onContextMenu={handleRightClick}
                        onClick={toggleMaximize}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-4 right-4">
                            <button 
                                onClick={toggleMaximize}
                                className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200"
                                aria-label="Maximize image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-800 dark:text-white font-semibold text-lg mr-4">
                            {image.price ? `$${image.price.toFixed(2)}` : 'Free'}
                        </span>
                        {quantity === 0 ? (
                            <button
                                onClick={() => onAddToCart(image)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <button
                                onClick={() => onRemoveFromCart(image.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                Remove from Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Maximized Image Modal */}
            {isMaximized && (
                <div className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                    <div 
                        ref={modalRef}
                        className={`relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl`}
                    >
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button 
                                onClick={closeModal}
                                className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 shadow-md"
                                aria-label="Close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="h-full overflow-auto">
                            <Image
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full h-auto object-contain"
                                onContextMenu={handleRightClick}
                            />
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{image.alt}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Press ESC or click outside to close</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default GalleryCard;
