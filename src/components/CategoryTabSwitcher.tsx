"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  subCategory: string | null;
  price: number;
  imageUrl: string;
};

type CategoryTabSwitcherProps = {
  productsByCategory: Record<string, Product[]>;
  categories: string[];
};

export default function CategoryTabSwitcher({ productsByCategory, categories }: CategoryTabSwitcherProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const activeProducts = productsByCategory[activeCategory] || [];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
              activeCategory === category
                ? "bg-brand-maroon text-brand-cream shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-brand-maroon hover:text-brand-maroon"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="min-h-[400px]">
        {activeProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white/50 rounded-xl border border-dashed border-gray-300">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeProducts.map((product, idx) => (
              <FadeIn key={product.id} direction="up" delay={idx * 0.1} className="group">
                <Link href="/collections">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-[#EAE3DB] bg-white">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-maroon/0 group-hover:bg-brand-maroon/10 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <span className="bg-white/90 backdrop-blur-sm text-brand-maroon text-xs font-semibold tracking-widest px-6 py-2 rounded-full shadow-sm">
                        QUICK VIEW
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] block mb-1">
                      {product.category}{product.subCategory ? ` • ${product.subCategory}` : ''}
                    </span>
                    <h3 className="font-serif text-lg text-brand-maroon mb-1 group-hover:text-brand-gold transition-colors truncate px-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">₹{product.price}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-16 text-center">
        <Link 
          href="/collections"
          className="inline-flex items-center border border-brand-maroon text-brand-maroon rounded-full px-8 py-4 text-sm font-medium tracking-widest hover:bg-brand-maroon hover:text-brand-cream transition-colors"
        >
          VIEW ALL {activeCategory.toUpperCase()}
          <ArrowRight className="ml-4 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
