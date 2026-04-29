"use client";

import { siteContent } from "@/data/content";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { contact } = siteContent;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <div className="bg-white p-8 rounded-xl border border-[#EAE3DB] text-center flex flex-col items-center group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <h3 className="font-serif text-xl text-brand-maroon mb-3">Instagram</h3>
            <a href={siteContent.global.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-maroon transition-colors">@sahelifashionjewellery</a>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#EAE3DB] text-center flex flex-col items-center group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-serif text-xl text-brand-maroon mb-3">WhatsApp</h3>
            <a href={siteContent.global.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-maroon transition-colors">Chat with us</a>
          </div>
        </div>

        <div className="mt-20 bg-white p-10 rounded-2xl border border-[#EAE3DB] shadow-sm max-w-3xl mx-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2 className="font-serif text-3xl text-brand-maroon mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-8">Your message has been sent successfully. We will get back to you soon.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-brand-maroon text-white px-8 py-3 rounded-md font-medium tracking-widest text-sm hover:bg-brand-maroon/90 transition-colors"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-3xl text-brand-maroon mb-8 text-center">Send an Enquiry</h2>
              <form action="https://formspree.io/f/mlgaqzwz" onSubmit={handleSubmit} className="space-y-6">
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
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-maroon text-white py-4 rounded-md font-medium tracking-widest text-sm hover:bg-brand-maroon/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
