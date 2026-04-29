"use client";

import { useState, useEffect } from "react";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { Trash2, Edit2, X } from "lucide-react";

type GalleryImage = {
  id: string;
  title: string | null;
  imageUrl: string;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = (url: string) => {
    if (editingId) {
      setImageUrls([url]); // Only allow 1 image when editing
    } else {
      setImageUrls((prev) => [...prev, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setImageUrls([img.imageUrl]);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setImageUrls([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrls.length === 0) return alert("At least one image is required");
    
    setIsSubmitting(true);
    try {
      if (editingId) {
        // Edit mode
        await fetch(`/api/gallery/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: imageUrls[0] }),
        });
      } else {
        // Create mode (multiple)
        await Promise.all(
          imageUrls.map((url) =>
            fetch("/api/gallery", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title: null, price: null, imageUrl: url }),
            })
          )
        );
      }
      
      cancelEdit();
      fetchImages();
    } catch (error) {
      console.error("Failed to save gallery images", error);
      alert("Failed to save. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      fetchImages();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Form */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-brand-maroon">
            {editingId ? "Edit Image" : "Add Gallery Images"}
          </h2>
          {editingId && (
            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-700">
              <X size={20} />
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {editingId ? "Image *" : "Images *"}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded overflow-hidden border border-gray-200">
                  <img src={url} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-0.5 right-0.5 bg-white rounded-full p-0.5 shadow hover:bg-gray-100">
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            {(!editingId || imageUrls.length === 0) && (
              <CloudinaryUpload onUploadSuccess={handleAddImage} />
            )}
            {!editingId && (
              <p className="text-xs text-gray-500 mt-2">You can select and upload multiple images at once.</p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting || imageUrls.length === 0}
            className="w-full bg-brand-maroon text-white py-2 rounded-md hover:bg-brand-maroon/90 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Saving..." : (editingId ? "Update Image" : `Upload ${imageUrls.length > 0 ? imageUrls.length : ''} to Gallery`)}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-brand-maroon">Gallery Images</h2>
        {loading ? (
          <p>Loading images...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="border border-gray-200 rounded-lg overflow-hidden relative group aspect-square">
                <img src={img.imageUrl} alt={img.title || "Gallery image"} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(img)}
                    className="bg-white/90 p-1.5 rounded-full text-blue-500 shadow-sm hover:bg-blue-50"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="bg-white/90 p-1.5 rounded-full text-red-500 shadow-sm hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {img.title && (
                  <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.title}
                  </div>
                )}
              </div>
            ))}
            {images.length === 0 && <p className="text-gray-500 col-span-full">No images in gallery.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
