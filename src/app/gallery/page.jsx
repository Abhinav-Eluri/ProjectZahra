'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/store/cartSlice';
import GalleryCard from '@/components/GalleryCard';
import { fetchImages } from '@/utils/galleryUtils';

function Gallery() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const PROJECT_ID = '681b2ee1002bfb4ddae8';
    const REGION = 'fra';
    useEffect(() => {
        const loadImages = async () => {
            setLoading(true); // Ensure loading is true at the start
            try {
                const filesData = await fetchImages();
                setImages(filesData);
            } catch (error) {
                console.error("Failed to fetch images from Appwrite:", error);
                // Optionally: Set an error state here to show an error message in the UI
                // setError("Could not load images. Please try again later.");
            } finally {
                setLoading(false); // Set loading to false whether fetch succeeded or failed
            }
        };

        loadImages();

    }, []); // Empty dependency array ensures this runs only once on mount

    const handleAddToCart = (image) => {
        dispatch(addToCart(image));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const getItemQuantity = (id) => {
        const item = cartItems.find(item => item.id === id);
        return item ? item.quantity : 0;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">


            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Loading gallery...</p>
                </div>
            ) : images.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No images available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {images.map((img) => {
                        const quantity = getItemQuantity(img.id);

                        return (
                            <GalleryCard
                                key={img.id}
                                image={img}
                                quantity={quantity}
                                onAddToCart={handleAddToCart}
                                onRemoveFromCart={handleRemoveFromCart}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Gallery;
