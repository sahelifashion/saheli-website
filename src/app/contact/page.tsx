"use client";

import { siteContent } from "@/data/content";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";

export default function ContactPage() {
  const { contact } = siteContent;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const jsonData = Object.fromEntries(data.entries());
    
    try {
      const response = await fetch("https://formspree.io/f/mlgaqzwz", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("Formspree error response:", errorData);
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Form fetch error:", error);
      alert("Oops! There was a problem submitting your form. Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-brand-cream min-h-screen flex flex-col">
      <PageHeader 
        title="Get in Touch" 
        tagline="WE WOULD LOVE TO HEAR FROM YOU" 
        bgImage="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-6xl mx-auto px-8 py-24 w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-maroon mb-6">
            {contact.heading}
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-8"></div>
          <p className="text-gray-600">
            Whether you have a question about our collections, need assistance with an order, or just want to share your thoughts, we are here for you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Cards */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#EAE3DB] flex items-center group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mr-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-maroon mb-1">Email Us</h3>
                <a href={`mailto:${contact.email}`} className="text-sm text-brand-gold hover:text-brand-maroon transition-colors">{contact.email}</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3DB] flex items-center group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mr-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-maroon mb-1">Call Us</h3>
                <a href={`tel:${contact.phone}`} className="text-sm text-brand-gold hover:text-brand-maroon transition-colors">{contact.phone}</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3DB] flex items-center group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mr-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-maroon mb-1">Instagram</h3>
                <a href={siteContent.global.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-gold hover:text-brand-maroon transition-colors">@sahelifashionjewellery</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAE3DB] flex items-center group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mr-6 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors flex-shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-maroon mb-1">WhatsApp</h3>
                <a href={siteContent.global.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-gold hover:text-brand-maroon transition-colors">Chat with us</a>
              </div>
            </div>
          </div>

          {/* Right Side: Form and Map */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#EAE3DB] shadow-sm w-full">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h2 className="font-serif text-3xl text-brand-maroon mb-4">Thank You!</h2>
                  <p className="text-gray-600 mb-8">Your message has been sent successfully. We will get back to you soon.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-brand-maroon text-white px-8 py-3 rounded-full font-medium tracking-widest text-sm hover:bg-brand-maroon/90 transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl text-brand-maroon mb-6">Send an Enquiry</h3>
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
                      className="bg-brand-maroon text-white px-10 py-4 rounded-full font-medium tracking-widest text-sm hover:bg-brand-maroon/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Map */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-[#EAE3DB] shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.8521798365696!2d76.32742917540274!3d10.291799889816172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08044ddb51f0c3%3A0xeb3f179b5c3e7b!2sChalakudy%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
