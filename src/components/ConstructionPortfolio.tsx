import React, { useState } from 'react';
import { CONSTRUCTION_GALLERY } from '../data/portfolioData';
import { ConstructionGalleryItem } from '../types';
import { Play, Maximize2, Shield, Hammer, MapPin, HardHat } from 'lucide-react';

interface ConstructionPortfolioProps {
  onOpenLightbox: (item: { title: string; category: string; imageUrl: string; description: string; videoUrl?: string }) => void;
}

export const ConstructionPortfolio: React.FC<ConstructionPortfolioProps> = ({ onOpenLightbox }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Completed Projects',
    'Structural & Site Progress',
    'Luxury Villas',
    'Contemporary Elevations',
    'Commercial Buildings',
  ];

  const filteredItems = activeCategory === 'All'
    ? CONSTRUCTION_GALLERY
    : CONSTRUCTION_GALLERY.filter(item => {
        if (activeCategory === 'Completed Projects') {
          return item.stage.toLowerCase().includes('completed') || item.stage.toLowerCase().includes('handed over') || item.stage.toLowerCase().includes('commissioned');
        }
        return item.category === activeCategory;
      });

  return (
    <section id="construction-portfolio" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">06. CIVIL & STRUCTURAL MASTERY</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">CONSTRUCTION PORTFOLIO</span>
          </div>
          <span className="font-mono text-xs text-stone-400">REAL SITE EXECUTION & RENDERS</span>
        </div>

        {/* Title and Engineering Description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300/90 uppercase tracking-widest">
              <HardHat className="w-4 h-4" />
              <span>Heavy Civil Engineering & High-Precision Execution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Villas, Elevations & On-Site Structural Progress
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Showcasing ground-up structural construction, seismic foundation footings, precision earthwork leveling, controlled retrofitting, and completed architectural landmarks.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-900 border border-white/15">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#E9E0D7] text-stone-900 font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Construction Grid (2 columns on md, 3 on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-white/15 bg-stone-900 p-3 sm:p-4 flex flex-col justify-between group hover:border-white/40 transition-colors shadow-xl"
            >
              <div>
                {/* Image / Video Thumbnail Box */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-stone-950 mb-4 cursor-pointer border border-white/10"
                  onClick={() => onOpenLightbox({
                    title: item.title,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    description: `Location: ${item.location} · Stage: ${item.stage} · Structural: ${item.structuralDetails}`,
                    videoUrl: item.videoUrl,
                  })}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-104 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Real Site Asset Badge */}
                  {item.isRealSiteAsset && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-amber-500/90 text-stone-950 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                      <Hammer className="w-3 h-3" />
                      <span>LIVE SITE EXECUTION</span>
                    </div>
                  )}

                  {/* Video Indicator */}
                  {item.videoUrl && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-black/80 text-white font-mono text-[10px] tracking-wider uppercase flex items-center gap-1 border border-white/20">
                      <Play className="w-3 h-3 fill-white" />
                      <span>SITE VIDEO</span>
                    </div>
                  )}

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 bg-[#303030]/90 border border-white/30 text-white font-mono text-xs flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5" />
                      {item.videoUrl ? 'WATCH SITE VIDEO' : 'INSPECT STRUCTURE'}
                    </span>
                  </div>
                </div>

                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                  <span className="flex items-center gap-1 text-stone-300 truncate">
                    <MapPin className="w-3 h-3 text-stone-500 shrink-0" />
                    <span>{item.location}</span>
                  </span>
                  <span className="text-amber-300/80 shrink-0 uppercase text-[10px]">
                    {item.stage}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white uppercase font-display tracking-tight mb-2 group-hover:text-[#E9E0D7] transition-colors">
                  {item.title}
                </h3>

                <p className="text-stone-300 text-xs leading-relaxed line-clamp-3 mb-4">
                  {item.structuralDetails}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-400 uppercase">
                  {item.category}
                </span>
                <button
                  onClick={() => onOpenLightbox({
                    title: item.title,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    description: `Location: ${item.location} · Stage: ${item.stage} · Structural: ${item.structuralDetails}`,
                    videoUrl: item.videoUrl,
                  })}
                  className="text-xs font-mono uppercase text-stone-300 hover:text-white flex items-center gap-1"
                >
                  <span>{item.videoUrl ? 'Play Reel' : 'Examine'}</span>
                  <span className="text-[#E9E0D7] font-bold">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
