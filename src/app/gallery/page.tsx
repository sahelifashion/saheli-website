import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="w-full bg-brand-cream min-h-screen pt-16 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            GALLERY
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon">
            Moments of Elegance
          </h1>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No gallery images available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {images.map((img, i) => {
              // Creating a bento grid effect by making some items span more rows/cols
              // E.g., every 5th item is large, 2nd item spans 2 cols, etc.
              let spanClass = "col-span-1 row-span-1";
              if (i % 6 === 0) spanClass = "md:col-span-2 md:row-span-2";
              else if (i % 5 === 2) spanClass = "md:col-span-2 md:row-span-1";
              else if (i % 4 === 3) spanClass = "md:row-span-2";

              return (
                <div key={img.id} className={`relative group overflow-hidden rounded-2xl border border-[#EAE3DB] ${spanClass}`}>
                  <img 
                    src={img.imageUrl} 
                    alt={img.title || "Gallery image"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.title && (
                        <span className="text-brand-gold font-serif text-2xl block mb-1">
                          {img.title}
                        </span>
                      )}
                      {img.price && (
                        <span className="text-white text-sm tracking-wider">
                          {img.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
