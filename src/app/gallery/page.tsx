import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import FadeIn from "@/components/animations/FadeIn";

export const dynamic = 'force-dynamic';

async function fetchGallery() {
  return await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function GalleryPage() {
  const images = await fetchGallery();

  return (
    <div className="min-h-screen bg-brand-cream pt-12 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-5xl text-brand-maroon mb-4 text-center">Our Gallery</h1>
        <div className="w-24 h-[1px] bg-brand-gold mx-auto mb-16"></div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No gallery images available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {images.map((img, i) => {
              let spanClass = "col-span-1 row-span-1";
              if (i % 6 === 0) spanClass = "md:col-span-2 md:row-span-2";
              else if (i % 5 === 2) spanClass = "md:col-span-2 md:row-span-1";
              else if (i % 4 === 3) spanClass = "md:row-span-2";

              return (
                <FadeIn 
                  key={img.id} 
                  direction="up" 
                  delay={(i % 4) * 0.1}
                  className={`relative group overflow-hidden rounded-2xl border border-[#EAE3DB] ${spanClass}`}
                >
                  <img 
                    src={img.imageUrl} 
                    alt="Gallery image" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
