"use client";

import { useState, useEffect } from "react";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { Trash2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  imageUrl: string;
  images: string; // JSON string
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("NECKLACES");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Main image
  const [images, setImages] = useState<string[]>([]); // Additional images
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = (url: string) => {
    if (!imageUrl) {
      setImageUrl(url); // Set as main if empty
    }
    setImages(prev => [...prev, url]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (newImages.length > 0 && imageUrl === images[index]) {
      setImageUrl(newImages[0]);
    } else if (newImages.length === 0) {
      setImageUrl("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) return alert("Name and Main Image are required");
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          category, 
          description, 
          price: parseFloat(price) || 0, 
          imageUrl, 
          images 
        }),
      });
      if (res.ok) {
        setName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
        setImages([]);
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to create product", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <div className="flex gap-8">
      {/* Form */}
      <div className="w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
        <h2 className="text-xl font-bold mb-6 text-brand-maroon">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g. Royal Gold Necklace"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="NECKLACES">Necklaces</option>
              <option value="EARRINGS">Earrings</option>
              <option value="BANGLES">Bangles</option>
              <option value="RINGS">Rings</option>
              <option value="BRACELETS">Bracelets</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="e.g. 199.99"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Brief description..."
                rows={3}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {images.map((img, idx) => (
                <div key={idx} className={`relative w-16 h-16 rounded overflow-hidden border-2 ${img === imageUrl ? 'border-brand-maroon' : 'border-gray-200'}`}>
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-0.5 right-0.5 bg-white rounded-full p-0.5 shadow">
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                  {img === imageUrl && <span className="absolute bottom-0 left-0 w-full bg-brand-maroon text-white text-[10px] text-center">Main</span>}
                </div>
              ))}
            </div>
            <CloudinaryUpload onUploadSuccess={handleAddImage} />
            <p className="text-xs text-gray-500 mt-1">Upload one or more images. The first image uploaded will be the main thumbnail.</p>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting || images.length === 0}
            className="w-full bg-brand-maroon text-white py-2 rounded-md hover:bg-brand-maroon/90 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="w-2/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-brand-maroon">All Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="border border-gray-200 rounded-lg overflow-hidden relative group">
                <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h4 className="font-medium text-sm truncate">{p.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">{p.category}</p>
                    <p className="text-xs font-bold text-brand-maroon">${p.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {products.length === 0 && <p className="text-gray-500 col-span-full">No products found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
