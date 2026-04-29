import { siteContent } from "@/data/content";

export default function AboutPage() {
  const { about, home: { founder } } = siteContent;

  return (
    <div className="w-full bg-brand-cream min-h-screen pt-16 pb-24 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-brand-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
          OUR STORY
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon mb-8">
          {about.heading}
        </h1>
        <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-10"></div>
        <p className="text-gray-700 text-lg leading-relaxed mb-16">
          {about.content}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
          <div className="bg-white p-8 rounded-2xl border border-[#EAE3DB] shadow-sm">
            <h3 className="font-serif text-2xl text-brand-maroon mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">{about.vision}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-[#EAE3DB] shadow-sm">
            <h3 className="font-serif text-2xl text-brand-maroon mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">{about.mission}</p>
          </div>
        </div>

        <div className="bg-white p-12 rounded-2xl border border-[#EAE3DB] shadow-sm flex flex-col md:flex-row items-center text-left gap-12">
          <div className="w-full md:w-1/3">
             <img 
               src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
               alt={founder.name}
               className="w-full aspect-square object-cover rounded-full border-4 border-brand-cream shadow-md"
             />
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="font-serif text-3xl text-brand-maroon mb-2">{founder.name}</h3>
            <p className="text-brand-gold tracking-widest text-sm uppercase mb-6">{founder.sectionTag}</p>
            <p className="text-gray-600 leading-relaxed italic">
              "{founder.description}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
