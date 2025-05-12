import { storage } from '@/lib/appwrite';

const BUCKET_ID = "681b40570011a2ddd700";

export const fetchImages = async () => {
    try {
        // 1. List files in the bucket
        const response = await storage.listFiles(BUCKET_ID); // Use listFiles SDK method

        // 2. Map over the files and get preview URLs
        const filesData = response.files.map((file) => {
            // 3. Get the preview URL for each file using getFilePreview
            // This returns a URL object. Use .href to get the string URL.
            const previewUrl = storage.getFileView(
                BUCKET_ID,
                file.$id
                // You can add optional parameters here for width, height, quality etc.
                // e.g., storage.getFilePreview(BUCKET_ID, file.$id, 400) // width=400px
            );

            return {
                id: file.$id,        // Use the file's unique ID
                src: previewUrl,
                alt: file.name || `Appwrite Image ${file.$id}`, // Use file name as alt text, provide fallback
                // You might want other properties from 'file' here too if needed
                // e.g., mimeType: file.mimeType, size: file.sizeOriginal
            };
        });

        return filesData;

    } catch (error) {
        console.error("Failed to fetch images from Appwrite:", error);
        // Optionally: Throw the error to be handled by the caller
        throw error;
    }
};