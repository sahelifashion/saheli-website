import { PrismaClient } from '@prisma/client';
import FadeIn from "@/components/animations/FadeIn";
import CollectionClient from "@/components/collections/CollectionClient";
import PageHeader from "@/components/layout/PageHeader";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

async function fetchProducts() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: 'desc' }
  });
  
  // Safely parse JSON array from images string
  return products.map(p => {
    let parsedImages: string[] = [];
    try {
      parsedImages = JSON.parse(p.images);
    } catch (e) {
      // fallback to empty array
    }
    return {
      id: p.id,
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      description: p.description,
      price: p.price,
      imageUrl: p.imageUrl,
      images: parsedImages,
    };
  });
}

export default async function CollectionsPage() {
  const products = await fetchProducts();

  return (
    <div className="w-full bg-brand-cream min-h-screen flex flex-col">
      <PageHeader 
        title="Discover Your Style" 
        tagline="OUR COLLECTIONS" 
        bgImage="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <CollectionClient initialProducts={products} />
        </div>
      </div>
    </div>
  );
}
