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
    <nav className="w-full bg-brand-maroon border-b border-white/10 py-3 xl:py-4 px-8 xl:px-12 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center justify-center space-y-0.5" onClick={closeMobileMenu}>
          <img src="/logo.jpg" alt={brandName} className="h-16 md:h-22 xl:h-26 2xl:h-28 w-auto object-contain transition-all duration-300" />
        </Link>
 
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-base xl:text-lg 2xl:text-xl tracking-wider uppercase font-medium transition-colors relative pb-2
                  ${isActive ? 'text-brand-gold' : 'text-brand-cream/80 hover:text-brand-cream'}
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
          className="md:hidden text-brand-cream focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-maroon border-b border-white/10 shadow-lg py-4 px-8 flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={closeMobileMenu}
                className={`text-base tracking-wider uppercase font-medium transition-colors block py-2
                  ${isActive ? 'text-brand-gold font-bold' : 'text-brand-cream/80 hover:text-brand-cream'}
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
