import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="w-full bg-brand-cream min-h-screen pt-16 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            OUR COLLECTIONS
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon">
            Discover Your Perfect Match
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products available at the moment. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="w-full aspect-[4/5] bg-white rounded-lg overflow-hidden border border-[#EAE3DB] mb-4 relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-maroon/0 group-hover:bg-brand-maroon/10 transition-colors duration-300"></div>
                </div>
                <h3 className="font-serif text-lg text-brand-maroon mb-1 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                <p className="text-xs text-gray-500 tracking-wider uppercase">{product.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
