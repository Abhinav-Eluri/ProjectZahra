import React, { useState, useEffect } from 'react';
import CircularGallery from '../../blocks/Components/CircularGallery/CircularGallery';
import { fetchImages } from '@/utils/galleryUtils';

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
        <section className="w-full h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden relative">
            <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-10" 
                style={{ backgroundImage: 'url("/images/SecondBackground.jpeg")' }}
            ></div>
            <div className="w-full h-full relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Loading gallery...</p>
                    </div>
                ) : (
                    <CircularGallery 
                        items={images.length > 0 ? images : undefined} 
                        bend={3} 
                        textColor="#ffffff" 
                        borderRadius={0.05} 
                    />
                )}
            </div>
        </section>
    );
}

export default GalleryPreview;
