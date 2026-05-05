"use client";

import { useState, useEffect } from "react";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { Trash2, Edit2, X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  subCategory: string | null;
  description: string | null;
  price: number;
  imageUrl: string;
  images: string; // JSON string
  inStock: boolean;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Traditionel Jewellery");
  const [subCategory, setSubCategory] = useState("Neck peace");
  const [description, setDescription] = useState("");

  const categorySubCategories: Record<string, string[]> = {
    "Traditionel Jewellery": ["Neck Peace", "Earrings", "Bangle", "Rings", "Hip-chain", "Anklets"],
    "Anti-tarnish": ["Neck Peace", "Kada", "Bracelet", "Rings", "Anklets"],
    "Reception Jewellery (AD-Stone)": ["Neck Peace", "Earrings", "Rings", "Bangle"],
    "Boys Collection": ["Chain", "Bracelet", "Kada", "Rings", "Earrings"]
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    setCategory(newCat);
    if (categorySubCategories[newCat]) {
      setSubCategory(categorySubCategories[newCat][0]);
    } else {
      setSubCategory("");
    }
  };
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Main image
  const [images, setImages] = useState<string[]>([]); // Additional images
  const [inStock, setInStock] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleEdit = (prod: Product) => {
    setEditingId(prod.id);
    setName(prod.name);
    setCategory(prod.category);
    setSubCategory(prod.subCategory || (categorySubCategories[prod.category] ? categorySubCategories[prod.category][0] : ""));
    setDescription(prod.description || "");
    setPrice(prod.price.toString());
    setImageUrl(prod.imageUrl);
    setInStock(prod.inStock ?? true);
    let parsedImages: string[] = [];
    try {
      if (prod.images) {
        parsedImages = JSON.parse(prod.images);
      }
    } catch(e) {}
    
    if (prod.imageUrl && !parsedImages.includes(prod.imageUrl)) {
      parsedImages.unshift(prod.imageUrl);
    }
    
    setImages(parsedImages);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setCategory("Traditionel Jewellery");
    setSubCategory("Neck peace");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setImages([]);
    setInStock(true);
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
      const endpoint = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          category, 
          subCategory,
          description, 
          price: parseFloat(price) || 0, 
          imageUrl, 
          images,
          inStock
        }),
      });
      if (res.ok) {
        cancelEdit();
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to save product", error);
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
    <div className="flex flex-col md:flex-row gap-8">
      {/* Form */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-brand-maroon">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          {editingId && (
            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-700">
              <X size={20} />
            </button>
          )}
        </div>
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
            <div className="flex flex-col md:flex-row gap-4">
              <select 
                value={category}
                onChange={handleCategoryChange}
                className="w-full md:w-1/2 border border-gray-300 rounded-md p-2"
              >
                <option value="Traditionel Jewellery">Traditionel Jewellery</option>
                <option value="Anti-tarnish">Anti-tarnish</option>
                <option value="Reception Jewellery (AD-Stone)">Reception Jewellery (AD-Stone)</option>
                <option value="Boys Collection">Boys Collection</option>
              </select>
              <select 
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full md:w-1/2 border border-gray-300 rounded-md p-2"
              >
                {categorySubCategories[category]?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
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
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="inStock"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 text-brand-maroon focus:ring-brand-maroon border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-700 cursor-pointer">
              Product is in stock
            </label>
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
            disabled={isSubmitting || !imageUrl}
            className="w-full bg-brand-maroon text-white py-2 rounded-md hover:bg-brand-maroon/90 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : (editingId ? "Update Product" : "Save Product")}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                    <p className="text-xs text-gray-500">{p.category}{p.subCategory ? ` • ${p.subCategory}` : ''} {p.inStock === false ? '• Out of Stock' : ''}</p>
                    <p className="text-xs font-bold text-brand-maroon">₹{p.price}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(p)}
                    className="bg-white/90 p-1.5 rounded-full text-blue-500 shadow-sm hover:bg-blue-50"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="bg-white/90 p-1.5 rounded-full text-red-500 shadow-sm hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-gray-500 col-span-full">No products found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
