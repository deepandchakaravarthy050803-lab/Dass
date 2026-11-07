import React from 'react';
import { COMPANY_INFO } from '../data/portfolioData';
import { 
  Building2, 
  Hammer, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AboutProps {
  onOpenConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenConsultation }) => {
  return (
    <section id="about" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">03. PRACTICE MONOGRAPH</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">ABOUT DAS</span>
          </div>
          <span className="font-mono text-xs text-stone-400">EST. 2008 · 240+ DELIVERED COMMISSIONS</span>
        </div>

        {/* Crisp Header: Minimal Text, Strong Identity */}
        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
            Direct Civil Engineering & Mastercraft Interiors
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            DAS is a complete turnkey builder. We don't just draft drawings—we operate our own JCB earthmoving equipment, fabricate structural steel rebar cages on site, execute controlled demolition, and finish interiors with Italian marble and custom illuminated joinery.
          </p>
        </div>

        {/* 4 Core Work Domains (Visual Cards with Real Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {/* 1. Foundation & Civil */}
          <div className="border border-white/15 bg-stone-900 p-4 sm:p-5 flex flex-col justify-between group hover:border-white/40 transition-colors">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-stone-950 mb-4 border border-white/10">
                <img
                  src="/public/assets/aistudio/WhatsApp_Image_2026-11-07_at_11.48.17_AM_d8d18d5c.jpeg"
                  alt="DAS Foundation Plinth Beams"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold uppercase text-white font-display">
                  Civil & Foundation
                </h3>
              </div>
              <ul className="text-xs text-stone-300 space-y-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>JCB Excavation & Trenching</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Fe550D Column Rebar Cages</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Plinth Beam M25 Concreting</span>
                </li>
              </ul>
            </div>
            <a
              href="#real-works"
              className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-[#E9E0D7] hover:underline flex items-center justify-between"
            >
              <span>View Site Photos</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* 2. Demolition & Retrofitting */}
          <div className="border border-white/15 bg-stone-900 p-4 sm:p-5 flex flex-col justify-between group hover:border-white/40 transition-colors">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-stone-950 mb-4 border border-white/10">
                <img
                  src="/public/assets/aistudio/WhatsApp_Image_2026-11-07_at_11.48.12_AM_ad344f8b.jpeg"
                  alt="DAS Structure Demolition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Hammer className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold uppercase text-white font-display">
                  Demolition & Repair
                </h3>
              </div>
              <ul className="text-xs text-stone-300 space-y-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Jackhammer Roof Dismantling</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Ceiling Concrete Chipping</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Safe Debris Clearing</span>
                </li>
              </ul>
            </div>
            <a
              href="#real-works"
              className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-[#E9E0D7] hover:underline flex items-center justify-between"
            >
              <span>View Demolition Videos</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* 3. Luxury Finished Interiors */}
          <div className="border border-white/15 bg-stone-900 p-4 sm:p-5 flex flex-col justify-between group hover:border-white/40 transition-colors">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-stone-950 mb-4 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
                  alt="DAS Finished Marble Interiors"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h3 className="text-sm font-bold uppercase text-white font-display">
                  Luxury Interiors
                </h3>
              </div>
              <ul className="text-xs text-stone-300 space-y-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Mirror Marble Floor Tiles</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Backlit Glass Display Vitrine</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Recessed LED Spotlights</span>
                </li>
              </ul>
            </div>
            <a
              href="#real-works"
              className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-[#E9E0D7] hover:underline flex items-center justify-between"
            >
              <span>View Finished Home Video</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* 4. Commercial Aluminum Cabins */}
          <div className="border border-white/15 bg-stone-900 p-4 sm:p-5 flex flex-col justify-between group hover:border-white/40 transition-colors">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-stone-950 mb-4 border border-white/10">
                <img
                  src="/public/assets/aistudio/WhatsApp_Image_2026-11-07_at_11.48.13_AM_be2d41a7.jpeg"
                  alt="DAS Commercial Aluminum Cabins"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase text-white font-display">
                  Office Cabins & Partitions
                </h3>
              </div>
              <ul className="text-xs text-stone-300 space-y-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Powder-Coated Aluminum</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Frosted Privacy Safety Glass</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Acoustic Room Soundproofing</span>
                </li>
              </ul>
            </div>
            <a
              href="#real-works"
              className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-[#E9E0D7] hover:underline flex items-center justify-between"
            >
              <span>View Cabin Photos</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Simple Guarantees Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-stone-900 border border-white/10 font-mono text-xs">
          <div>
            <div className="text-stone-500 uppercase">Single Contractor</div>
            <div className="text-white font-bold mt-0.5">End-to-End Responsibility</div>
          </div>
          <div>
            <div className="text-stone-500 uppercase">Fixed Pricing</div>
            <div className="text-white font-bold mt-0.5">Guaranteed BOQ Rates</div>
          </div>
          <div>
            <div className="text-stone-500 uppercase">Structural Safety</div>
            <div className="text-emerald-400 font-bold mt-0.5">50-Year Civil Warranty</div>
          </div>
          <div>
            <div className="text-stone-500 uppercase">Site Visits</div>
            <div className="text-white font-bold mt-0.5">Free Plot Inspection</div>
          </div>
        </div>
      </div>
    </section>
  );
};
