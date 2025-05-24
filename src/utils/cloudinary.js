import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary
 * @param {Buffer} buffer - The image buffer
 * @param {string} filename - Original filename (used for generating public_id)
 * @param {Object} options - Additional upload options
 * @returns {Promise<Object>} - Cloudinary upload response
 */
export async function uploadImageToCloudinary(buffer, filename, options = {}) {
  return new Promise((resolve, reject) => {
    // Generate a folder structure based on date to organize uploads
    const date = new Date();
    const folder = `uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
    
    // Create a unique public_id based on the filename and timestamp
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9]/g, '_');
    const public_id = `${folder}/${sanitizedFilename}_${timestamp}`;
    
    // Set up the upload stream
    const uploadOptions = {
      public_id,
      resource_type: 'image',
      ...options
    };
    
    // Upload the buffer to Cloudinary
    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
}

/**
 * Deletes an image from Cloudinary
 * @param {string} publicId - The public_id of the image to delete
 * @returns {Promise<Object>} - Cloudinary deletion response
 */
export async function deleteImageFromCloudinary(publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Extracts the public_id from a Cloudinary URL
 * @param {string} url - The Cloudinary URL
 * @returns {string|null} - The public_id or null if not found
 */
export function getPublicIdFromUrl(url) {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }
  
  // Extract the public_id from the URL
  // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/uploads/2023/5/image_name_1234567890.jpg
  const regex = /\/v\d+\/(.+)\.\w+$/;
  const match = url.match(regex);
  
  return match ? match[1] : null;
}