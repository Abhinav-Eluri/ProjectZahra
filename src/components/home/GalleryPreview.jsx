import React, { useState, useEffect } from 'react';
import CircularGallery from '../../blocks/Components/CircularGallery/CircularGallery';
import { fetchImages } from '@/utils/galleryUtils';
import Link from 'next/link';

function GalleryPreview() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            setLoading(true);
            try {
                const filesData = await fetchImages();
                // Transform the data to match the format expected by CircularGallery
                const galleryItems = filesData.map(file => ({
                    image: file.src,
                    text: file.alt
                }));
                setImages(galleryItems);
            } catch (error) {
                console.error("Failed to fetch images for gallery preview:", error);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    return (
        <section className="w-full h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative">
            {/* Background elements */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-10 transform scale-105" 
                style={{ backgroundImage: 'url("/images/SecondBackground.jpeg")' }}
            ></div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-500 to-transparent opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500 to-transparent opacity-10 blur-3xl"></div>

            {/* Content */}
            <div className="w-full h-full relative z-10 flex flex-col items-center">
                <div className="text-center mb-8 mt-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                            Featured Gallery
                        </span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto px-4">
                        Explore a selection of powerful visual narratives that capture the essence of Afghan culture and stories
                    </p>
                </div>

                <div className="w-full h-full relative flex-1 flex items-center justify-center">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-xl text-gray-300">Loading gallery...</p>
                        </div>
                    ) : (
                        <>
                            <CircularGallery 
                                items={images.length > 0 ? images : undefined} 
                                bend={3} 
                                textColor="#ffffff" 
                                borderRadius={0.05} 
                            />
                            <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                                <Link 
                                    href="/gallery" 
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
                                >
                                    View Full Gallery
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default GalleryPreview;
