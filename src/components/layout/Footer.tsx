import Link from "next/link";
import { siteContent } from "@/data/content";

export default function Footer() {
  const { brandName, logoText, navLinks } = siteContent.global;
  const { email, phone, address } = siteContent.contact;

  return (
    <footer className="bg-brand-maroon text-brand-cream py-16 px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <img src="/logo.jpg" alt={brandName} className="h-24 md:h-32 w-auto object-contain mb-6" />
          <p className="text-sm text-brand-cream/80 max-w-sm leading-relaxed">
            {siteContent.about.content}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-xl text-brand-gold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm tracking-wider uppercase text-brand-cream/80 hover:text-brand-gold transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-xl text-brand-gold mb-6">Contact Us</h4>
          <ul className="space-y-3 text-sm text-brand-cream/80 mb-6">
            <li className="whitespace-pre-line">{address}</li>
            <li>{email}</li>
            <li>{phone}</li>
          </ul>
          <div className="flex gap-4">
            <a href={siteContent.global.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href={siteContent.global.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
            </a>
            {siteContent.global.socialLinks.facebook && (
              <a href={siteContent.global.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-cream/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
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
