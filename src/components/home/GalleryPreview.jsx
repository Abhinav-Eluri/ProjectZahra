import React from 'react';
import CircularGallery from '../../blocks/Components/CircularGallery/CircularGallery';

function GalleryPreview() {
    return (
        <section className="w-screen h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full">
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
            </div>
        </section>
    );
}

export default GalleryPreview;
