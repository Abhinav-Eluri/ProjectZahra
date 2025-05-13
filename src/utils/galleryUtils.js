// Fallback mock data in case API fails
const mockImages = [
    {
        id: 'img1',
        src: 'https://via.placeholder.com/400x300?text=Image+1',
        alt: 'Gallery Image 1',
    },
    {
        id: 'img2',
        src: 'https://via.placeholder.com/400x300?text=Image+2',
        alt: 'Gallery Image 2',
    },
    {
        id: 'img3',
        src: 'https://via.placeholder.com/400x300?text=Image+3',
        alt: 'Gallery Image 3',
    },
];

export const fetchImages = async () => {
    try {
        // Fetch images from the API
        const response = await fetch('/api/images');

        if (!response.ok) {
            throw new Error('Failed to fetch images from API');
        }

        const data = await response.json();

        // If we have images from the API, transform them to the expected format
        if (data.images && data.images.length > 0) {
            return data.images.filter(img => img.visible).map(img => ({
                id: img.id,
                src: img.filePath || `https://via.placeholder.com/400x300?text=${img.file_id}`,
                alt: img.description || 'Gallery Image',
                price: img.price
            }));
        }

        // Fallback to mock data if no images are returned
        return mockImages;
    } catch (error) {
        console.error("Failed to fetch images:", error);
        // Fallback to mock data in case of error
        return mockImages;
    }
};
