'use client';

import { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdDragIndicator, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useSliderData } from '../../hooks/useSliderData';

export default function AdminSlidersPage() {
  const { sliders, loading, refetch, createSlider, updateSlider, deleteSlider, reorderSliders } = useSliderData();
  const [showForm, setShowForm] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    order: 0,
    isActive: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSlider) {
        await updateSlider(editingSlider._id, formData);
        toast.success('Slider updated!');
      } else {
        await createSlider(formData);
        toast.success('Slider created!');
      }
      await refetch();
      
      setShowForm(false);
      setEditingSlider(null);
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (slider) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      description: slider.description || '',
      image: slider.image,
      order: slider.order,
      isActive: slider.isActive
    });
    setShowForm(true);
  };

  // React-based confirmation using react-hot-toast custom UI
  const confirmAction = (message) => new Promise((resolve) => {
    const tid = toast.custom((t) => (
      <div className="max-w-sm w-full bg-white border border-gray-200 shadow-lg rounded-lg p-4">
        <p className="text-sm text-gray-800">{message}</p>
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={() => { toast.dismiss(t.id); resolve(false); }}
            className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => { toast.dismiss(t.id); resolve(true); }}
            className="px-3 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: Infinity, position: 'top-center' });
  });

  const handleDelete = async (id, title) => {
    const ok = await confirmAction(`Delete "${title ?? 'this slide'}"? This action cannot be undone.`);
    if (!ok) return;
    try {
      await deleteSlider(id);
      toast.success('Slider deleted!');
      await refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReorder = async (newOrder) => {
    try {
      await reorderSliders(newOrder);
      toast.success('Sliders reordered!');
      await refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      order: 0,
      isActive: true
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    try {
      setUploading(true);
      const res = await fetch(`/api/admin/uploads?folder=arix/sliders`, {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      setFormData((prev) => ({ ...prev, image: json.url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  // HTML5 Drag & Drop handlers (no external dnd lib)
  const onDragStart = (index) => (e) => {
    setDragIndex(index);
    try { e.dataTransfer.effectAllowed = 'move'; } catch (_) {}
  };

  const onDragOver = (e) => {
    e.preventDefault();
    try { e.dataTransfer.dropEffect = 'move'; } catch (_) {}
  };

  const onDrop = (overIndex) => async (e) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) {
      setDragIndex(null);
      return;
    }
    const items = Array.from(sliders);
    const [moved] = items.splice(dragIndex, 1);
    items.splice(overIndex, 0, moved);
    setDragIndex(null);
    handleReorder(items);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Slider Management</h1>
          <p className="text-gray-600 mt-2">Manage hero slider images for the homepage</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingSlider(null);
            resetForm();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <MdAdd className="w-5 h-5" />
          Add New Slide
        </button>
      </div>

      {/* Sliders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current Slides ({sliders.length})</h2>
        </div>
        
        {sliders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg">No slides found. Create your first slide to get started!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sliders.map((slider, index) => (
              <div
                key={slider._id}
                className="p-6 hover:bg-gray-50 transition-colors"
                draggable
                onDragStart={onDragStart(index)}
                onDragOver={onDragOver}
                onDrop={onDrop(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MdDragIndicator className="w-5 h-5 cursor-move" />
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                    {/* Image Preview */}
                    <div className="col-span-2">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={slider.image} 
                          alt={slider.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="col-span-6">
                      <h3 className="font-semibold text-gray-900">{slider.title}</h3>
                      {slider.description && (
                        <p className="text-sm text-gray-600 mt-1">{slider.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          slider.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {slider.isActive ? <MdVisibility className="w-3 h-3" /> : <MdVisibilityOff className="w-3 h-3" />}
                          {slider.isActive ? 'Active' : 'Inactive'}
                        </span>

                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="col-span-4 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(slider)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Slide"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slider._id, slider.title)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Slide"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingSlider ? 'Edit Slide' : 'Add New Slide'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Optional description for the slide"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slide Image *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-700 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                  {uploading && <span className="text-sm text-gray-500">Uploading…</span>}
                </div>
                {formData.image && (
                  <p className="text-xs text-gray-500 mt-1 truncate">{formData.image}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Use high-quality images (~1200×800 or larger). Dark backgrounds look best.
                </p>
              </div>
              

              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (visible on homepage)
                </label>
              </div>

              {/* Live Preview */}
              {formData.image && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Live Preview</h3>
                  <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-lg p-4 text-white">
                    <div className="text-center">
                      <h4 className="text-lg font-bold mb-2">{formData.title || 'Slide Title'}</h4>
                      {formData.description && (
                        <p className="text-sm text-gray-300 mb-3">{formData.description}</p>
                      )}
                      <div className="w-32 h-32 mx-auto bg-white/10 rounded-lg overflow-hidden">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSlider(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {editingSlider ? 'Update Slide' : 'Create Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
