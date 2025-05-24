'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ImageUploadPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [imageName, setImageName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageType, setImageType] = useState('photo'); // New state for image type
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect non-admin users to the login page
  if (!loading && (!user || !isAdmin)) {
    router.push('/admin/login');
    return null;
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Generate a unique file ID (you might want to use a more sophisticated method)
    const uniqueId = `file_${Date.now()}`;
    setFileId(uniqueId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!imageName) {
      setError('Please enter an image name');
      return;
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('file_id', fileId);
      formData.append('imageName', imageName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('imageType', imageType);

      // Upload the file and create the image record in the database
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setSuccess('Image uploaded successfully!');

      // Reset form
      setFile(null);
      setFileId('');
      setImageName('');
      setDescription('');
      setPrice('');
      setImageType('photo');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Upload Image</h1>
            <div className="space-x-4">
              <Link href="/admin/dashboard" className="text-indigo-600 hover:text-indigo-800">
                Dashboard
              </Link>
              <Link href="/admin/dashboard/images/manage" className="text-indigo-600 hover:text-indigo-800">
                Manage Images
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border-4 border-dashed border-gray-200 p-4 min-h-96">
              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Image File
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <label htmlFor="imageName" className="block text-sm font-medium text-gray-700">
                    Image Name
                  </label>
                  <input
                    type="text"
                    id="imageName"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter image name"
                    disabled={isUploading}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    disabled={isUploading}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="imageType" className="block text-sm font-medium text-gray-700">
                    Image Type
                  </label>
                  <select
                    id="imageType"
                    value={imageType}
                    onChange={(e) => setImageType(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    disabled={isUploading}
                  >
                    <option value="photo">Photo</option>
                    <option value="painting">Painting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter description"
                    rows="4"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
