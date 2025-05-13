'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ManageImagesPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    file_id: '',
    description: '',
    price: 0,
    visible: true,
    priority: 0
  });

  // Redirect non-admin users to the login page
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, loading, router]);

  // Fetch images when component mounts
  useEffect(() => {
    if (user && isAdmin) {
      fetchImages();
    }
  }, [user, isAdmin]);

  // Fetch all images from the API
  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/images');
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      file_id: image.file_id,
      description: image.description || '',
      price: image.price,
      visible: image.visible,
      priority: image.priority
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : 
              value
    });
  };

  // Handle form submission for updating an image
  const handleUpdateImage = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/images', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingImage.id,
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update image');
      }

      // Refresh the images list
      fetchImages();
      
      // Reset the editing state
      setEditingImage(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating image:', err);
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/images?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Refresh the images list
      fetchImages();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting image:', err);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingImage(null);
  };

  // Show loading state while checking authentication
  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manage Images</h1>
            <Link href="/admin/dashboard" className="text-indigo-600 hover:text-indigo-800">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading images...</p>
          </div>
        ) : (
          <div>
            {editingImage && (
              <div className="mb-8 p-6 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Edit Image</h2>
                <form onSubmit={handleUpdateImage}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        File ID
                      </label>
                      <input
                        type="text"
                        name="file_id"
                        value={formData.file_id}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <input
                        type="number"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="visible"
                        checked={formData.visible}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Visible
                      </label>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Update Image
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.length === 0 ? (
                <p className="col-span-full text-center py-8">No images found.</p>
              ) : (
                images.map((image) => (
                  <div key={image.id} className="bg-white rounded shadow overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={image.filePath}
                        alt={image.description || 'Gallery image'}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-medium">ID: {image.file_id}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {image.description || 'No description'}
                      </p>
                      <p className="mt-1">Price: ${image.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        Priority: {image.priority} | 
                        {image.visible ? ' Visible' : ' Hidden'}
                      </p>
                      
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => handleEdit(image)}
                          className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}