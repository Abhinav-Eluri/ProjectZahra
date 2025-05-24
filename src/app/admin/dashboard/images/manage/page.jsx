'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

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
    priority: 0,
    imageType: 'photo' // Default to 'photo'
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchImages();
    }
  }, [user, isAdmin]);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/images');
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching images:', err);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked :
          type === 'number' ? parseFloat(value) :
              value
    });
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/images', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingImage.id, ...formData }),
      });
      if (!response.ok) throw new Error('Failed to update image');
      fetchImages();
      setEditingImage(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating image:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete image');
      fetchImages();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting image:', err);
    }
  };

  const handleCancelEdit = () => setEditingImage(null);

  const handleReorder = async (newOrder) => {
    try {
      setImages(newOrder);
      const updatedImages = newOrder.map((img, i) => ({ ...img, priority: i }));
      const results = await Promise.all(updatedImages.map(image =>
          fetch('/api/admin/images', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: image.id, priority: image.priority }),
          })
      ));
      if (results.some(r => !r.ok)) throw new Error();
    } catch (err) {
      setError('Failed to update image order. Please try again.');
      fetchImages();
    }
  };

  if (loading || !user || !isAdmin) {
    return <div className="flex min-h-screen items-center justify-center"><p>Loading...</p></div>;
  }

  return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Manage Images</h1>
            <Link href="/admin/dashboard" className="text-indigo-600 hover:text-indigo-800">Back to Dashboard</Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}

          {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading images...</p>
              </div>
          ) : (
              <>
                {editingImage && (
                    <div className="mb-8 p-6 bg-white rounded shadow">
                      <h2 className="text-xl font-semibold mb-4">Edit Image</h2>
                      <form onSubmit={handleUpdateImage}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input name="file_id" value={formData.file_id} onChange={handleInputChange} required className="w-full p-2 border rounded" placeholder="File ID" />
                          <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="w-full p-2 border rounded" placeholder="Price" />
                          <input type="number" name="priority" value={formData.priority} onChange={handleInputChange} className="w-full p-2 border rounded" placeholder="Priority" />
                          <label className="flex items-center">
                            <input type="checkbox" name="visible" checked={formData.visible} onChange={handleInputChange} className="mr-2" />
                            Visible
                          </label>
                          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="md:col-span-2 w-full p-2 border rounded" placeholder="Description" />
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Update</button>
                          <button type="button" onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
                        </div>
                      </form>
                    </div>
                )}

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Image List</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Each row shows image, file ID, description, price, visibility status, and actions. Drag the icon on the right to reorder. Changes will be saved automatically.
                </p>

                <div className="overflow-x-auto bg-white rounded shadow">
                  {images.length === 0 ? (
                      <p className="text-center py-8">No images found.</p>
                  ) : (
                      <div className="min-w-full">
                        <div className="px-6 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
                          <div className="text-xs font-medium text-gray-500 uppercase">Image List</div>
                        </div>

                        <Reorder.Group axis="y" values={images} onReorder={handleReorder} className="divide-y divide-gray-200">
                          <AnimatePresence>
                            {images.map((image) => (
                                <Reorder.Item
                                    key={image.id}
                                    value={image}
                                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-move"
                                    whileDrag={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                  {/* Image (smaller) */}
                                  <div className="relative h-16 w-16 flex-shrink-0">
                                    <Image  src={image.filePath} alt={image.description || 'Gallery image'} fill style={{ objectFit: 'cover' }} className="rounded" />
                                  </div>

                                  {/* File ID */}
                                  <div className="w-24 flex-shrink-0">
                                    <p className="font-medium text-sm">ID: {image.file_id}</p>
                                  </div>

                                  {/* Description */}
                                  <div className="flex-grow min-w-0">
                                    <p className="text-sm text-gray-600 truncate">{image.description || 'No description'}</p>
                                  </div>

                                  {/* Price */}
                                  <div className="w-20 flex-shrink-0 text-right">
                                    <p className="text-sm font-medium">${image.price.toFixed(2)}</p>
                                  </div>

                                  {/* Visibility with eye icon */}
                                  <div className="w-20 flex-shrink-0">
                                    <span className={`px-2 py-1 inline-flex items-center text-xs font-semibold rounded-full ${image.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                      </svg>
                                      {image.visible ? 'Visible' : 'Hidden'}
                                    </span>
                                  </div>

                                  {/* Edit and Delete buttons */}
                                  <div className="flex gap-2 flex-shrink-0">
                                    <button onClick={() => handleEdit(image)} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">Edit</button>
                                    <button onClick={() => handleDelete(image.id)} className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Delete</button>
                                  </div>

                                  {/* Drag handle */}
                                  <div title="Drag to reorder" className="w-6 h-6 flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                                  </div>
                                </Reorder.Item>
                            ))}
                          </AnimatePresence>
                        </Reorder.Group>
                      </div>
                  )}
                </div>
              </>
          )}
        </main>
      </div>
  );
}
