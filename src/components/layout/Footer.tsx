import Link from "next/link";
import { siteContent } from "@/data/content";

export default function Footer() {
  const { brandName, logoText, navLinks } = siteContent.global;
  const { email, phone, address } = siteContent.contact;

  return (
    <footer className="bg-brand-maroon text-brand-cream py-10 xl:py-14 px-8 xl:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
        {/* Brand */}
        <div className="w-full md:w-auto md:max-w-[320px] lg:max-w-sm flex flex-col items-center text-center">
          {/* Logo container wrapper with overflow-hidden to crop vertical padding */}
          <div className="relative w-full h-16 md:h-22 xl:h-26 2xl:h-30 overflow-hidden mb-4 footer-logo-container">
            <img 
              src="/logo.jpg" 
              alt={brandName} 
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[calc(50%+12px)] h-28 md:h-36 xl:h-40 2xl:h-44 w-auto object-contain footer-logo max-w-none" 
            />
          </div>
          <p className="text-sm xl:text-base 2xl:text-lg text-brand-cream/80 leading-relaxed text-center">
            {siteContent.about.content}
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-auto flex flex-col items-center text-center">
          <h4 className="font-serif text-xl xl:text-2xl 2xl:text-3xl text-brand-gold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm xl:text-base 2xl:text-lg tracking-wider uppercase text-brand-cream/80 hover:text-brand-gold transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full md:w-auto md:max-w-xs flex flex-col items-center text-center">
          <h4 className="font-serif text-xl xl:text-2xl 2xl:text-3xl text-brand-gold mb-6">Contact Us</h4>
          <ul className="space-y-3 text-sm xl:text-base 2xl:text-lg text-brand-cream/80 mb-6 flex flex-col items-center">
            <li className="whitespace-pre-line text-center">{address}</li>
            <li className="text-center">{email}</li>
            <li className="text-center">{phone}</li>
          </ul>
          <div className="flex gap-4 justify-center">
            {/* Instagram */}
            {siteContent.global.socialLinks.instagram && (
              <a href={siteContent.global.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            )}

            {/* Facebook */}
            {siteContent.global.socialLinks.facebook && (
              <a href={siteContent.global.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            )}

            {/* YouTube */}
            {siteContent.global.socialLinks.youtube && (
              <a href={siteContent.global.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            )}

            {/* WhatsApp */}
            {siteContent.global.socialLinks.whatsapp && (
              <a href={siteContent.global.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-cream/10 text-center text-sm text-brand-cream/50">
        <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
