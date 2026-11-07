import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Calculator, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator, onOpenWhatsApp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Real Works', href: '#real-works' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#featured-projects' },
    { label: 'Interiors', href: '#interior-portfolio' },
    { label: 'Construction', href: '#construction-portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#303030]/95 backdrop-blur-md border-b border-white/10 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 border border-white/30 flex items-center justify-center bg-stone-900 group-hover:border-white transition-colors">
              <span className="font-mono text-sm tracking-widest font-bold text-white">DAS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest uppercase text-white font-mono">
                DAS
              </span>
              <span className="text-[10px] tracking-wider text-stone-400 uppercase -mt-0.5">
                Architecture & Construction
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.contacts.phone.replace(/\s+/g, '')}`}
              className="text-xs text-stone-300 hover:text-white font-mono flex items-center gap-1.5 px-2 py-1"
            >
              <span className="text-[#E9E0D7]">Call:</span>
              <span>{COMPANY_INFO.contacts.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider text-stone-200 border border-white/20 hover:border-white hover:text-white transition-colors bg-stone-800/60"
            >
              <Calculator className="w-3.5 h-3.5 text-stone-400" />
              <span>Cost Calculator</span>
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider text-stone-900 bg-[#E9E0D7] hover:bg-white font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenWhatsApp}
              className="p-2 border border-white/20 text-stone-200 hover:text-white"
              aria-label="WhatsApp Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/20 text-stone-200 hover:text-white focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#262626] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-stone-300 hover:text-white py-1 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
              </a>
            ))}
          </nav>
          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider text-stone-200 border border-white/20 bg-stone-800"
            >
              <Calculator className="w-4 h-4 text-stone-400" />
              <span>Budget & Area Estimator</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider text-stone-900 bg-[#E9E0D7] font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Inquiry</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
