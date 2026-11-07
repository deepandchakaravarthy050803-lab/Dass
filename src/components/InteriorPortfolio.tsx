import React, { useState } from 'react';
import { INTERIOR_GALLERY } from '../data/portfolioData';
import { InteriorGalleryItem } from '../types';
import { Maximize2, Sparkles, Filter } from 'lucide-react';

interface InteriorPortfolioProps {
  onOpenLightbox: (item: { title: string; category: string; imageUrl: string; description: string }) => void;
}

export const InteriorPortfolio: React.FC<InteriorPortfolioProps> = ({ onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'False Ceilings',
    'Living Rooms',
    'Bedrooms',
    'Modular Kitchens',
    'Offices',
    'Bathrooms',
    'Dining Rooms',
    'Custom Furniture',
    'Renovation',
  ];

  const filteredItems = selectedCategory === 'All'
    ? INTERIOR_GALLERY
    : INTERIOR_GALLERY.filter(item => item.category === selectedCategory);

  return (
    <section id="interior-portfolio" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">05. SPATIAL CURATION</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">INTERIOR DESIGN PORTFOLIO</span>
          </div>
          <span className="font-mono text-xs text-stone-400">9 SPATIAL CATEGORIES · {INTERIOR_GALLERY.length} PROJECTS</span>
        </div>

        {/* Title & Filter Controls */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display">
                Interior Architecture & Millwork
              </h2>
              <p className="text-stone-300 text-sm">
                Asymmetrical architectural layouts exploring tactility, acoustic serenity, and bespoke Italian craftsmanship across living sanctuaries, culinary zones, and executive suites.
              </p>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-xs font-mono text-stone-500 flex items-center gap-1 mr-2 uppercase">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-[#E9E0D7] text-stone-900 border-[#E9E0D7] font-semibold'
                    : 'text-stone-300 border-white/15 bg-stone-900/40 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Architectural Magazine-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredItems.map((item, index) => {
            // Asymmetrical magazine layout spans
            const isWide = index === 0 || index === 3 || item.featured;
            const colSpanClass = isWide 
              ? 'lg:col-span-8' 
              : 'lg:col-span-4';

            return (
              <div
                key={item.id}
                className={`${colSpanClass} border border-white/15 bg-stone-900 p-2 sm:p-3 flex flex-col justify-between group hover:border-white/40 transition-colors shadow-lg`}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-950 mb-4 cursor-pointer"
                  onClick={() => onOpenLightbox({
                    title: item.title,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    description: `Style: ${item.style} · Materials: ${item.materials} · Scale: ${item.area}`,
                  })}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-104 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Top-Right Category Tag */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-[#303030]/85 backdrop-blur-sm border border-white/20 text-[10px] font-mono uppercase text-stone-300">
                    {item.category}
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 bg-[#303030]/90 border border-white/30 text-white font-mono text-xs flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5" />
                      VIEW HIGH RESOLUTION
                    </span>
                  </div>
                </div>

                {/* Information Footer */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <span className="truncate">{item.style}</span>
                    <span className="text-stone-300 font-bold shrink-0">{item.area}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white uppercase font-display tracking-tight group-hover:text-[#E9E0D7] transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-[11px] text-stone-400 font-mono border-t border-white/10 pt-2 flex items-center justify-between">
                    <span className="truncate">SPEC: {item.materials}</span>
                    <button
                      onClick={() => onOpenLightbox({
                        title: item.title,
                        category: item.category,
                        imageUrl: item.imageUrl,
                        description: `Style: ${item.style} · Materials: ${item.materials} · Scale: ${item.area}`,
                      })}
                      className="text-stone-300 hover:text-white uppercase tracking-wider shrink-0 ml-2"
                    >
                      Enlarge +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
