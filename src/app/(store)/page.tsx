import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck, HeartHandshake, Star } from "lucide-react";
import { siteContent } from "@/data/content";
import FadeIn from "@/components/animations/FadeIn";
import { PrismaClient } from "@prisma/client";
import CategoryTabSwitcher from "@/components/CategoryTabSwitcher";
import HeroSlider from "@/components/layout/HeroSlider";

const prisma = new PrismaClient();

async function fetchFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { inStock: true },
      orderBy: { createdAt: 'desc' },
      distinct: ['category'],
      take: 4
    });
    
    return products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      price: p.price,
      imageUrl: p.imageUrl,
    }));
  } catch (e) {
    console.error("Failed to fetch featured products", e);
    return [];
  }
}

async function fetchProductsByCategories() {
  const categories = [
    "Traditionel Jewellery",
    "Anti-tarnish",
    "Reception Jewellery (AD-Stone)",
    "Boys Collection"
  ];
  
  const productsByCategory: Record<string, any[]> = {};
  
  try {
    for (const category of categories) {
      const products = await prisma.product.findMany({
        where: { category, inStock: true },
        orderBy: { createdAt: 'desc' },
        take: 4
      });
      productsByCategory[category] = products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        subCategory: p.subCategory,
        price: p.price,
        imageUrl: p.imageUrl,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch products by categories", e);
  }
  
  return { productsByCategory, categories };
}

export default async function Home() {
  const { hero, collections, aboutSaheli, whyChooseUs, testimonials } = siteContent.home;
  const featuredProducts = await fetchFeaturedProducts();
  const { productsByCategory, categories } = await fetchProductsByCategories();

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-8 h-8" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8" />,
    Truck: <Truck className="w-8 h-8" />,
    HeartHandshake: <HeartHandshake className="w-8 h-8" />
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Full-Width Hero Section */}
      <section className="relative w-full h-[calc(100vh-var(--navbar-height))] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Animated Background Slider */}
        <HeroSlider images={hero.images || [
          "/hero-images/01.jpg"
        ]}>
          <FadeIn direction="up" delay={0.2}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-cream font-bold leading-tight mb-8 drop-shadow-lg">
              {hero.heading.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <div className="w-24 h-[2px] bg-brand-gold mx-auto mb-8 shadow-sm"></div>
            <p className="text-brand-cream text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
              {hero.subtext}
            </p>
            <Link 
              href={hero.ctaLink}
              className="inline-flex items-center bg-brand-maroon/90 backdrop-blur-sm border border-brand-maroon text-brand-cream rounded-full px-10 py-4 text-sm font-semibold tracking-widest hover:bg-brand-cream hover:text-brand-maroon hover:border-brand-cream transition-all duration-300"
            >
              {hero.ctaText}
              <ArrowRight className="ml-4 w-4 h-4" />
            </Link>
          </FadeIn>
        </HeroSlider>
      </section>

      {/* 2. Collections Section */}
      <section className="w-full py-24 px-8 bg-brand-cream flex flex-col items-center">
        <FadeIn direction="up" className="text-center mb-16">
          <span className="text-[#856A2B] tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            {collections.sectionTag}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">
            {collections.heading}
          </h2>
        </FadeIn>
        
        <div className="max-w-6xl w-full mx-auto">
          <CategoryTabSwitcher productsByCategory={productsByCategory} categories={categories} />
        </div>
      </section>

      {/* 3. About Saheli Section */}
      <section className="w-full py-24 px-8 bg-[#F0EAE1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <FadeIn direction="right" className="w-full md:w-1/2">
            <div className="relative rounded-t-full rounded-b-2xl overflow-hidden border-8 border-brand-cream shadow-xl">
              <img 
                src={aboutSaheli.image} 
                alt="About Saheli" 
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2} className="w-full md:w-1/2">
            <span className="text-[#856A2B] tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
              {aboutSaheli.sectionTag}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon mb-6 leading-tight">
              {aboutSaheli.heading}
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {aboutSaheli.description}
            </p>
            <Link 
              href={aboutSaheli.ctaLink}
              className="inline-flex items-center bg-brand-maroon text-brand-cream rounded-full px-8 py-3 text-sm font-medium tracking-widest hover:bg-brand-maroon/90 transition-colors"
            >
              {aboutSaheli.ctaText}
              <ArrowRight className="ml-4 w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="w-full py-24 px-8 bg-brand-cream border-y border-[#EAE3DB]">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn direction="up">
            <span className="text-[#856A2B] tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
              {whyChooseUs.sectionTag}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon mb-16">
              {whyChooseUs.heading}
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.features.map((feature, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                <div className="bg-white p-8 rounded-2xl border border-[#EAE3DB] shadow-sm flex flex-col items-center text-center h-full hover:shadow-md transition-shadow group">
                  <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-maroon mb-6 group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors">
                    {iconMap[feature.icon]}
                  </div>
                  <h3 className="font-serif text-xl text-brand-maroon mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Products Section */}
      <section className="w-full py-24 px-8 bg-[#F0EAE1]">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up" className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#856A2B] tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
                NEW ARRIVALS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">
                Featured Products
              </h2>
            </div>
            <Link 
              href="/collections" 
              className="text-brand-maroon font-medium uppercase tracking-widest text-sm border-b border-brand-maroon pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              SHOP ALL
            </Link>
          </FadeIn>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-500 bg-brand-cream rounded-xl border border-[#EAE3DB]">
              No products featured yet. Stay tuned!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, idx) => (
                <FadeIn key={product.id} direction="up" delay={idx * 0.1} className="group">
                  <Link href="/collections">
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-[#EAE3DB]">
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
                      <span className="text-[#856A2B] text-[10px] uppercase tracking-[0.2em] block mb-1">
                        {product.category}{product.subCategory ? ` • ${product.subCategory}` : ''}
                      </span>
                      <h3 className="font-serif text-lg text-brand-maroon mb-1 group-hover:text-brand-gold transition-colors">
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
      </section>

      {/* 6. Testimonials Section (Auto Horizontal Scroll) */}
      <section className="w-full py-24 bg-brand-cream overflow-hidden flex flex-col">
        <FadeIn direction="up" className="text-center px-8 mb-16">
          <span className="text-[#856A2B] tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            {testimonials.sectionTag}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">
            {testimonials.heading}
          </h2>
        </FadeIn>

        {/* Marquee Container */}
        <div className="relative w-full flex overflow-x-hidden">
          <div className="animate-marquee flex gap-8 py-4 px-4 min-w-full whitespace-nowrap">
            {[...testimonials.reviews, ...testimonials.reviews].map((review, idx) => (
              <div 
                key={idx} 
                className="inline-flex flex-col w-[350px] md:w-[400px] whitespace-normal bg-[#F0EAE1] p-8 rounded-2xl border border-[#EAE3DB] shadow-sm flex-shrink-0"
              >
                <div className="flex text-[#856A2B] mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow">"{review.text}"</p>
                <div>
                  <h4 className="font-serif text-lg text-brand-maroon">{review.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
