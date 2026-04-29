import { siteContent } from "@/data/content";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const { contact } = siteContent;

  return (
    <div className="w-full bg-brand-cream min-h-screen pt-16 pb-24 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            REACH OUT
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon mb-8">
            {contact.heading}
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-10"></div>
          <p className="text-gray-600 max-w-lg mx-auto">
            We would love to hear from you. Whether you have a question about our collections, need assistance with an order, or just want to share your thoughts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[#EAE3DB] text-center flex flex-col items-center group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors">
              <MapPin size={24} />
            </div>
            <h3 className="font-serif text-xl text-brand-maroon mb-3">Visit Us</h3>
            <p className="text-gray-600">{contact.address}</p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#EAE3DB] text-center flex flex-col items-center group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors">
              <Mail size={24} />
            </div>
            <h3 className="font-serif text-xl text-brand-maroon mb-3">Email Us</h3>
            <a href={`mailto:${contact.email}`} className="text-brand-gold hover:text-brand-maroon transition-colors">{contact.email}</a>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#EAE3DB] text-center flex flex-col items-center group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors">
              <Phone size={24} />
            </div>
            <h3 className="font-serif text-xl text-brand-maroon mb-3">Call Us</h3>
            <a href={`tel:${contact.phone}`} className="text-brand-gold hover:text-brand-maroon transition-colors">{contact.phone}</a>
          </div>
        </div>

        <div className="mt-20 bg-white p-10 rounded-2xl border border-[#EAE3DB] shadow-sm max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-maroon mb-8 text-center">Send an Enquiry</h2>
          <form action="https://formspree.io/f/mlgaqzwz" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input type="text" id="name" name="name" required className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-brand-gold" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-brand-gold" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-brand-gold"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-maroon text-white py-4 rounded-md font-medium tracking-widest text-sm hover:bg-brand-maroon/90 transition-colors">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
