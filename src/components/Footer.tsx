import React from 'react';
import { COMPANY_INFO } from '../data/portfolioData';
import { ArrowUp, Compass, MessageSquare, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#242424] text-stone-200 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top Grid Row: Logo, Statement & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white/30 flex items-center justify-center bg-stone-900">
                <span className="font-mono text-sm tracking-widest font-bold text-white">DAS</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-widest uppercase text-white font-mono block">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[10px] tracking-wider text-stone-400 uppercase">
                  Architecture · Interiors · Turnkey Construction
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              "{COMPANY_INFO.tagline}" — International architectural practice delivering timeless private villas, contemporary corporate envelopes, and mastercrafted luxury interiors.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-stone-400">
              <Compass className="w-3.5 h-3.5 text-stone-400" />
              <span>COORDINATES: 12.9716° N, 77.5946° E</span>
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-stone-400 tracking-wider">
              PORTFOLIO INDEX
            </div>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-mono">
              <li>
                <a href="#real-works" className="text-amber-300 hover:text-white transition-colors flex items-center gap-1 font-semibold">
                  <span>★ Real Works (14 Photos & Videos)</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-stone-300 hover:text-white transition-colors">
                  01. About Practice
                </a>
              </li>
              <li>
                <a href="#services" className="text-stone-300 hover:text-white transition-colors">
                  02. 9 Disciplines & Services
                </a>
              </li>
              <li>
                <a href="#featured-projects" className="text-stone-300 hover:text-white transition-colors">
                  03. Featured Projects (01–06)
                </a>
              </li>
              <li>
                <a href="#interior-portfolio" className="text-stone-300 hover:text-white transition-colors">
                  04. Interior Architecture
                </a>
              </li>
              <li>
                <a href="#construction-portfolio" className="text-stone-300 hover:text-white transition-colors">
                  05. Construction & Site Progress
                </a>
              </li>
              <li>
                <a href="#process" className="text-stone-300 hover:text-white transition-colors">
                  06. Project Lifecycle (01–06)
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-stone-300 hover:text-white transition-colors">
                  07. Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-stone-300 hover:text-white transition-colors">
                  08. Contact & Briefing
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Communications */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase text-stone-400 tracking-wider">
              DIRECT DESPATCH
            </div>
            <div className="space-y-2 text-xs font-mono text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <a href={`tel:${COMPANY_INFO.contacts.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {COMPANY_INFO.contacts.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <a href={`mailto:${COMPANY_INFO.contacts.email}`} className="hover:text-white">
                  {COMPANY_INFO.contacts.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 cursor-pointer" onClick={onOpenWhatsApp}>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Direct Connect</span>
              </div>
            </div>

            <div className="p-3 bg-stone-900 border border-white/10 text-[11px] text-stone-400 font-mono">
              <div className="text-stone-200 font-bold mb-1">VISITING PAVILION:</div>
              <div>{COMPANY_INFO.contacts.address}</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Swiss Grid Marks & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {COMPANY_INFO.fullName}. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">SWISS GRID ARCHITECTURAL MONOGRAPH</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white uppercase transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
