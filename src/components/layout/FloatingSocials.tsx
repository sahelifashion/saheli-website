"use client";

import { siteContent } from "@/data/content";
import { MessageCircle } from "lucide-react";

export default function FloatingSocials() {
  const { socialLinks } = siteContent.global;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a 
        href={socialLinks.instagram} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-maroon shadow-lg border border-gray-100 hover:scale-110 hover:bg-brand-maroon hover:text-white transition-all duration-300"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      </a>
      <a 
        href={socialLinks.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg border border-transparent hover:scale-110 transition-all duration-300"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
