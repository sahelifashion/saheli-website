"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/data/content";

export default function Navbar() {
  const pathname = usePathname();
  const { navLinks, logoText, brandName } = siteContent.global;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-brand-cream border-b border-[#EAE3DB] py-4 px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center justify-center space-y-0.5" onClick={closeMobileMenu}>
          <div className="text-brand-gold text-2xl">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-1">
               <path d="M12 2C8.13401 2 5 5.13401 5 9C5 12.866 12 22 12 22C12 22 19 12.866 19 9C19 5.13401 15.866 2 12 2Z" />
               <circle cx="12" cy="9" r="3" />
             </svg>
          </div>
          <span className="font-sans text-brand-maroon text-xl font-bold tracking-widest leading-none">{logoText}</span>
          <span className="font-sans text-brand-gold text-[0.6rem] tracking-[0.2em] leading-none uppercase">{brandName.replace(logoText, '').trim()}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm tracking-wider uppercase font-medium transition-colors relative pb-2
                  ${isActive ? 'text-brand-maroon' : 'text-gray-600 hover:text-brand-maroon'}
                `}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-brand-maroon focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-cream border-b border-[#EAE3DB] shadow-lg py-4 px-8 flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={closeMobileMenu}
                className={`text-sm tracking-wider uppercase font-medium transition-colors block py-2
                  ${isActive ? 'text-brand-maroon font-bold' : 'text-gray-600'}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
