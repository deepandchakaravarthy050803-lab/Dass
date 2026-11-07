import React from 'react';
import { COMPANY_INFO } from '../data/portfolioData';
import { ArrowDownRight, Compass, ShieldCheck, Ruler, ArrowRight, Calculator } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator, onOpenConsultation }) => {
  return (
    <section className="relative bg-[#303030] text-stone-100 overflow-hidden border-b border-white/10">
      {/* Architectural Swiss grid lines background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full max-w-7xl mx-auto border-x border-white/10 grid grid-cols-2 md:grid-cols-4">
          <div className="border-r border-white/10 hidden md:block"></div>
          <div className="border-r border-white/10"></div>
          <div className="border-r border-white/10 hidden md:block"></div>
          <div></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Top Architectural Metadata Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-8 sm:mb-10 text-[10px] sm:text-[11px] font-mono tracking-widest text-stone-400 uppercase gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <span className="w-1.5 h-1.5 bg-amber-400/80"></span>
              PORTFOLIO EDITION 2025/2026
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-stone-400">REF: DAS-ARC-INT-08</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span>COORDINATES: 12.9716° N, 77.5946° E</span>
            <span className="hidden sm:inline text-stone-600">/</span>
            <span className="text-stone-300 hidden sm:inline">SWISS GRID ARCHITECTURE</span>
          </div>
        </div>

        {/* Headline & Tagline Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-300">
              <Compass className="w-3.5 h-3.5 text-stone-400" />
              <span>DAS Architecture, Interior Design & Turnkey Construction</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase font-display leading-[1.05]">
              {COMPANY_INFO.tagline.split('.')[0]}.<br />
              <span className="text-[#E9E0D7] font-light">{COMPANY_INFO.tagline.split('.')[1]}</span>
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-4 text-stone-300 text-sm leading-relaxed border-l-0 lg:border-l border-white/15 lg:pl-6">
            <p>
              Complete turnkey builder executing real residential construction, foundation earthwork, structural slab demolition, and high-end finished interiors.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="#real-works"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-widest bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold transition-colors shadow-lg"
              >
                <span>View Real Works (14 Videos & Photos)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-widest text-stone-200 border border-white/20 hover:border-white transition-colors bg-stone-800/80"
              >
                <Calculator className="w-3.5 h-3.5 text-stone-400" />
                <span>Estimate Budget</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Architectural Render Presentation with Swiss Grid Framing */}
        <div className="relative border border-white/15 bg-stone-900 p-2 sm:p-4 mb-16 shadow-2xl">
          {/* Corner crosshairs */}
          <span className="absolute -top-2 -left-2 text-stone-400 font-mono text-xs">+</span>
          <span className="absolute -top-2 -right-2 text-stone-400 font-mono text-xs">+</span>
          <span className="absolute -bottom-2 -left-2 text-stone-400 font-mono text-xs">+</span>
          <span className="absolute -bottom-2 -right-2 text-stone-400 font-mono text-xs">+</span>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-950">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=90"
              alt="DAS Flagship Project 01 - Cantilevered Luxury Residential Villa"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 hover:scale-102 transition-transform duration-700 ease-out"
            />

            {/* Architectural overlay card */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-auto max-w-md bg-[#303030]/95 sm:bg-[#303030]/90 backdrop-blur-md p-3 sm:p-5 border border-white/20 text-stone-100">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 sm:pb-2 mb-1.5 sm:mb-2 font-mono text-[9px] sm:text-[10px] text-stone-400 tracking-wider">
                <span>FLAGSHIP COMMISSION 2025</span>
                <span>PROJECT NO. 01</span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold tracking-tight text-white uppercase font-display">
                The Hillside Cantilevered Villa
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-stone-300 mt-1 mb-2 sm:mb-3">
                <span>8,400 Sq.Ft</span>
                <span className="text-stone-500">·</span>
                <span>Concrete & Travertine</span>
                <span className="text-stone-500">·</span>
                <span>Bengaluru</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/10">
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-400">TURNKEY EXECUTION</span>
                <a
                  href="#featured-projects"
                  className="text-[11px] sm:text-xs uppercase font-medium text-[#E9E0D7] hover:underline flex items-center gap-1"
                >
                  Inspect Specs
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Pillars & Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-b border-white/10 py-8">
          {COMPANY_INFO.metrics.map((metric, idx) => (
            <div key={metric.label} className="space-y-1 relative pr-4">
              <span className="block text-[11px] font-mono text-stone-400">0{idx + 1} / METRIC</span>
              <div className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
                {metric.value}
              </div>
              <p className="text-xs uppercase tracking-wider text-stone-300">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Discipline Anchors */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-stone-400" />
            <span>ISO 9001:2015 CERTIFIED CONSTRUCTION & SAFETY STANDARDS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-white transition-colors flex items-center gap-1">
              <span>9 SPECIALIZED DISCIPLINES</span>
              <ArrowDownRight className="w-3 h-3" />
            </a>
            <button
              onClick={onOpenConsultation}
              className="text-[#E9E0D7] hover:text-white transition-colors underline underline-offset-4"
            >
              SCHEDULE PRIVATE AUDIT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
