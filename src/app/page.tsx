import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/data/content";
import FadeIn from "@/components/animations/FadeIn";

export default function Home() {
  const { hero, collections, founder } = siteContent.home;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row h-auto md:h-[600px]">
        {/* Text Content */}
        <div className="w-full md:w-[45%] bg-brand-maroon flex flex-col justify-center px-8 md:px-16 py-16 md:py-0 text-brand-cream relative">
          <FadeIn direction="left" delay={0.2}>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="text-brand-cream">Timeless</span><br />
              <span className="text-brand-gold">Elegance.</span><br />
              <span className="text-brand-cream">Made for You.</span>
            </h1>
            <div className="w-16 h-[1px] bg-brand-gold mb-6"></div>
            <p className="text-brand-cream/80 text-lg md:text-xl max-w-sm mb-12 leading-relaxed">
              {hero.subtext}
            </p>
            <Link 
              href={hero.ctaLink}
              className="inline-flex items-center w-fit border border-brand-cream rounded-full px-8 py-3 text-sm tracking-widest hover:bg-brand-cream hover:text-brand-maroon transition-colors duration-300"
            >
              {hero.ctaText}
              <ArrowRight className="ml-4 w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
        {/* Hero Image */}
        <div className="w-full md:w-[55%] h-[400px] md:h-full relative overflow-hidden">
          <FadeIn direction="none" delay={0.4} className="w-full h-full">
            <img 
              src="https://www.manyavar.com/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dwc60b50cb/Trending%20Designs%20in%20Gold%20for%20Your%20Wedding%20Jewellery%20Ranging%20from%20Mangtika%20to%20Payal_D.jpg" 
              alt="Model wearing jewellery" 
              className="object-cover w-full h-full"
            />
          </FadeIn>
        </div>
      </section>

      {/* Collections Section */}
      <section className="w-full py-24 px-8 bg-brand-cream text-center">
        <FadeIn direction="up">
          <span className="text-brand-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            {collections.sectionTag}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon mb-16">
            {collections.heading}
          </h2>
        </FadeIn>
        
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
          {collections.categories.map((cat, index) => {
            const placeholders = [
              "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
              "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
              "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
              "https://m.media-amazon.com/images/I/718B2IPDNxL._AC_UY1100_.jpg",
              "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            ];
            return (
              <FadeIn key={cat.name} direction="up" delay={0.1 * index} className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[#EAE3DB] p-2 mb-6 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img src={placeholders[index]} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-brand-maroon tracking-widest text-sm font-medium">{cat.name}</span>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn direction="up" delay={0.6}>
          <Link 
            href={collections.ctaLink}
            className="inline-flex items-center bg-brand-maroon text-brand-cream rounded-[4px] px-8 py-4 text-sm tracking-widest hover:bg-brand-maroon/90 transition-colors"
          >
            {collections.ctaText}
            <ArrowRight className="ml-4 w-4 h-4" />
          </Link>
        </FadeIn>
      </section>

      {/* Founder Section */}
      <section className="w-full py-24 px-8 bg-brand-cream relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          {/* Founder Image */}
          <FadeIn direction="right" className="w-full md:w-1/2 flex justify-center relative">
            <div className="w-[80%] max-w-sm border border-brand-gold rounded-[2rem] p-2 relative">
               <img 
                 src="/founder.jpg" 
                 alt={founder.name}
                 className="w-full aspect-[4/5] object-cover rounded-[1.5rem]"
               />
               <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#EAE3DB] rounded-[2rem] -z-10"></div>
            </div>
          </FadeIn>

          {/* Founder Text */}
          <FadeIn direction="left" delay={0.2} className="w-full md:w-1/2">
            <span className="text-brand-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
              {founder.sectionTag}
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-maroon mb-8">
              {founder.name}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-10 max-w-md">
              {founder.description}
            </p>
            <Link 
              href={founder.ctaLink}
              className="inline-flex items-center border border-brand-maroon text-brand-maroon rounded-[4px] px-8 py-3 text-sm tracking-widest hover:bg-brand-maroon hover:text-brand-cream transition-colors"
            >
              {founder.ctaText}
              <ArrowRight className="ml-4 w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
