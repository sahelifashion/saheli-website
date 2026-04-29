import { PrismaClient } from '@prisma/client';
import FadeIn from "@/components/animations/FadeIn";
import CollectionClient from "@/components/collections/CollectionClient";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

async function fetchProducts() {
  const products = await prisma.product.findMany({
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
    <div className="w-full bg-brand-cream min-h-screen pt-16 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <span className="text-brand-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            OUR COLLECTIONS
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon">
            Discover Your Style
          </h1>
        </FadeIn>

        <CollectionClient initialProducts={products} />
      </div>
    </div>
  );
}
