import { siteContent } from "@/data/content";
import PageHeader from "@/components/layout/PageHeader";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { about, home: { founder } } = siteContent;

  return (
    <div className="w-full bg-brand-cream min-h-screen flex flex-col">
      <PageHeader 
        title="Our Story" 
        tagline="KNOW ABOUT SAHELI" 
        bgImage="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-6xl mx-auto px-8 py-24">
        {/* Main About Content */}
        <FadeIn direction="up" className="text-center max-w-4xl mx-auto mb-24">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon mb-8">
            {about.heading}
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-10"></div>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            {about.content}
          </p>
        </FadeIn>

        {/* Vision Section (Text Left, Image Right) */}
        <section className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <FadeIn direction="right" className="w-full md:w-1/2">
            <h3 className="font-serif text-3xl md:text-4xl text-brand-maroon mb-6">Our Vision</h3>
            <div className="w-12 h-[2px] bg-brand-gold mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed">{about.vision}</p>
          </FadeIn>
          <FadeIn direction="left" className="w-full md:w-1/2">
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#EAE3DB]">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Our Vision" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </section>

        {/* Mission Section (Image Left, Text Right) */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-16 mb-24">
          <FadeIn direction="left" className="w-full md:w-1/2">
            <h3 className="font-serif text-3xl md:text-4xl text-brand-maroon mb-6">Our Mission</h3>
            <div className="w-12 h-[2px] bg-brand-gold mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed">{about.mission}</p>
          </FadeIn>
          <FadeIn direction="right" className="w-full md:w-1/2">
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#EAE3DB]">
              <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Our Mission" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </section>

        {/* Founder Section */}
        <FadeIn direction="up" className="bg-white p-12 rounded-[2rem] border border-[#EAE3DB] shadow-md flex flex-col md:flex-row items-center text-left gap-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-cream rounded-br-full -z-10"></div>
          
          <div className="w-full md:w-1/3 flex justify-center">
             <img 
               src="/founder.jpg" 
               alt={founder.name}
               className="w-48 h-48 md:w-full md:aspect-square object-cover rounded-full border-4 border-brand-cream shadow-xl"
             />
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-brand-gold tracking-widest text-sm font-semibold uppercase mb-2">{founder.sectionTag}</p>
            <h3 className="font-serif text-4xl text-brand-maroon mb-6">{founder.name}</h3>
            <p className="text-gray-600 text-lg leading-relaxed italic mb-8">
              "{founder.description}"
            </p>
            <Link 
              href="/collections"
              className="inline-flex items-center text-brand-maroon font-medium uppercase tracking-widest text-sm border-b border-brand-maroon pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              EXPLORE HER DESIGNS
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
