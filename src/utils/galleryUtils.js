// Helper function to check if a string looks like a file name
const isFileNameLike = (str) => {
    if (!str) return false;

    // Check if the string contains file extensions
    if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(str)) return true;

    // Check if the string contains typical file name patterns (like UUIDs or timestamps)
    if (/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i.test(str)) return true;

    // Check if the string has no spaces (typical for file names)
    if (!/\s/.test(str) && str.length > 10) return true;

    return false;
};

// Fallback mock data in case API fails
const mockImages = [
    {
        id: 'img1',
        src: 'https://via.placeholder.com/400x300?text=Image+1',
        alt: 'Gallery Image 1',
        price: 19.99,
        imageType: 'photo',
    },
    {
        id: 'img2',
        src: 'https://via.placeholder.com/400x300?text=Image+2',
        alt: 'Gallery Image 2',
        price: 29.99,
        imageType: 'painting',
    },
    {
        id: 'img3',
        src: 'https://via.placeholder.com/400x300?text=Image+3',
        alt: 'Gallery Image 3',
        price: 24.99,
        imageType: 'photo',
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
                alt: isFileNameLike(img.description) ? 'Gallery Image' : (img.description || 'Gallery Image'),
                price: img.price,
                imageType: img.imageType || 'photo' // Include imageType with a default value
            }));
        }

        // Return empty array if no images are returned
        return [];
    } catch (error) {
        console.error("Failed to fetch images:", error);
        // Return empty array in case of error
        return [];
    }
};
