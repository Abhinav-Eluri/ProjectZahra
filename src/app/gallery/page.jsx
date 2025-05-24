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
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'photos', or 'paintings'
    useEffect(() => {
        const loadImages = async () => {
            setLoading(true); // Ensure loading is true at the start
            try {
                const filesData = await fetchImages();
                setImages(filesData);
            } catch (error) {
                console.error("Failed to fetch images:", error);
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

    // Filter images based on active tab
    const filteredImages = images.filter(img => {
        if (activeTab === 'all') return true;
        if (activeTab === 'photos') return img.imageType === 'photo';
        if (activeTab === 'paintings') return img.imageType === 'painting';
        return true;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
            {/* Tab navigation */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                            activeTab === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setActiveTab('all')}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${
                            activeTab === 'photos'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setActiveTab('photos')}
                    >
                        Photos
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                            activeTab === 'paintings'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setActiveTab('paintings')}
                    >
                        Paintings
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Loading gallery...</p>
                </div>
            ) : images.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No images available</p>
            ) : filteredImages.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No images available in this category</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredImages.map((img) => {
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
