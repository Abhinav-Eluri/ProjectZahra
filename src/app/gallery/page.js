import React from 'react';

const images = [
    {
        src: 'https://picsum.photos/id/1015/600/400',
        alt: 'Mountain Landscape',
    },
    {
        src: 'https://picsum.photos/id/1016/600/400',
        alt: 'Forest Path',
    },
    {
        src: 'https://picsum.photos/id/1018/600/400',
        alt: 'Beach View',
    },
    {
        src: 'https://picsum.photos/id/1025/600/400',
        alt: 'Cute Dog',
    },
    {
        src: 'https://picsum.photos/id/1027/600/400',
        alt: 'City Skyline',
    },
    {
        src: 'https://picsum.photos/id/1035/600/400',
        alt: 'Waterfall',
    },
];

function Page() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                Art Gallery
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-60 object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-2 text-center text-gray-700 dark:text-gray-300">{img.alt}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
