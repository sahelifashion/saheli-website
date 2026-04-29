"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { siteContent } from "@/data/content";
import FadeIn from "@/components/animations/FadeIn";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  imageUrl: string;
  images: string[];
};

export default function CollectionClient({ initialProducts }: { initialProducts: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract unique categories
  const categories = ["ALL", ...Array.from(new Set(initialProducts.map(p => p.category)))];

  // Filter & Sort
  let displayedProducts = [...initialProducts];
  
  if (selectedCategory !== "ALL") {
    displayedProducts = displayedProducts.filter(p => p.category === selectedCategory);
  }

  if (sortBy === "price-asc") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  // Popup handlers
  const openPopup = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const allImages = selectedProduct 
    ? [selectedProduct.imageUrl, ...selectedProduct.images] 
    : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Whatsapp message text
  const getWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${product.name} (${product.category}) priced at $${product.price}.`);
    return `${siteContent.global.socialLinks.whatsapp}?text=${message}`;
  };

  return (
    <div className="w-full">
      {/* Filters & Sort Controls */}
      <FadeIn direction="down" className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-medium tracking-widest transition-colors border ${
                selectedCategory === cat 
                  ? "bg-brand-maroon text-brand-cream border-brand-maroon" 
                  : "bg-transparent text-brand-maroon border-brand-maroon hover:bg-brand-maroon/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-brand-maroon/30 bg-transparent text-brand-maroon text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-brand-maroon"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </FadeIn>

      {/* Product Grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product, index) => (
            <FadeIn key={product.id} direction="up" delay={index * 0.05} className="group cursor-pointer" onClick={() => openPopup(product)}>
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-[#EAE3DB]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-maroon/0 group-hover:bg-brand-maroon/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="bg-white/90 backdrop-blur-sm text-brand-maroon text-xs font-semibold tracking-widest px-6 py-2 rounded-full shadow-sm">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] block mb-1">
                  {product.category}
                </span>
                <h3 className="font-serif text-lg text-brand-maroon mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm font-medium">${product.price}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {/* Product Popup Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-brand-cream w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Image Carousel */}
              <div className="w-full md:w-1/2 relative bg-white aspect-square md:aspect-auto h-[400px] md:h-[600px] border-r border-[#EAE3DB]">
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-maroon shadow-sm hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-maroon shadow-sm hover:bg-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-brand-maroon' : 'bg-white/50 border border-brand-maroon/20'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative">
                <button 
                  onClick={closePopup}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-maroon transition-colors bg-white rounded-full border border-[#EAE3DB] shadow-sm"
                >
                  <X size={20} />
                </button>

                <div className="mt-8 md:mt-0 flex-grow">
                  <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold block mb-3">
                    {selectedProduct.category}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-maroon mb-4">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-2xl text-gray-800 mb-8 font-medium">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                  
                  {selectedProduct.description && (
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {selectedProduct.description}
                      </p>
                    </div>
                  )}
                </div>

                <a 
                  href={getWhatsAppLink(selectedProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-full font-medium tracking-widest text-sm hover:bg-[#128C7E] hover:shadow-lg transition-all duration-300"
                >
                  <MessageCircle size={20} />
                  INQUIRE ON WHATSAPP
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
