import Link from "next/link";
import { siteContent } from "@/data/content";

export default function Footer() {
  const { brandName, logoText, navLinks } = siteContent.global;
  const { email, phone, address } = siteContent.contact;

  return (
    <footer className="bg-brand-dark text-brand-cream py-16 px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-sans text-2xl font-bold tracking-widest mb-4">{logoText}</h3>
          <p className="text-sm text-brand-cream/70 max-w-sm">
            {siteContent.about.content.substring(0, 120)}...
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
          <ul className="space-y-3 text-sm text-brand-cream/80">
            <li>{address}</li>
            <li>{email}</li>
            <li>{phone}</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-cream/10 text-center text-sm text-brand-cream/50">
        <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
