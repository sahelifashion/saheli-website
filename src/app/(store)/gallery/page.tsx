import { PrismaClient } from '@prisma/client';
import FadeIn from "@/components/animations/FadeIn";
import PageHeader from "@/components/layout/PageHeader";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

async function fetchGallery() {
  return await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function GalleryPage() {
  const images = await fetchGallery();

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <PageHeader 
        title="Our Gallery" 
        tagline="A GLIMPSE OF ELEGANCE" 
        bgImage="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80"
      />
      <div className="w-full px-8 py-24">
        <div className="max-w-6xl mx-auto">

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
    </div>
  );
}
