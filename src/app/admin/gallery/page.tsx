"use client";

import { useState, useEffect } from "react";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { Trash2 } from "lucide-react";

type GalleryImage = {
  id: string;
  title: string | null;
  imageUrl: string;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return alert("Image is required");
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, imageUrl }),
      });
      if (res.ok) {
        setTitle("");
        setPrice("");
        setImageUrl("");
        fetchImages();
      }
    } catch (error) {
      console.error("Failed to create gallery image", error);
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
        <h2 className="text-xl font-bold mb-6 text-brand-maroon">Add Gallery Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g. Bridal Collection Shoot"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
            <input 
              type="text" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g. $250.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
            {imageUrl ? (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImageUrl("")} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            ) : (
              <CloudinaryUpload onUploadSuccess={setImageUrl} />
            )}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting || !imageUrl}
            className="w-full bg-brand-maroon text-white py-2 rounded-md hover:bg-brand-maroon/90 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Uploading..." : "Upload to Gallery"}
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
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                  title="Delete image"
                >
                  <Trash2 size={16} />
                </button>
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
