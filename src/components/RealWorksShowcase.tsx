import React, { useState } from 'react';
import { REAL_WORKS_DATA } from '../data/portfolioData';
import { RealWorkItem } from '../types';
import { 
  Play, 
  Maximize2, 
  CheckCircle2, 
  MessageSquare, 
  Video, 
  Camera, 
  Hammer, 
  Layers, 
  Sparkles, 
  Building2,
  ArrowUpRight
} from 'lucide-react';

interface RealWorksShowcaseProps {
  onOpenMedia: (item: {
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    videoUrl?: string;
  }) => void;
  onInquireWork: (item: RealWorkItem) => void;
}

export const RealWorksShowcase: React.FC<RealWorksShowcaseProps> = ({
  onOpenMedia,
  onInquireWork,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'interiors' | 'foundation' | 'demolition' | 'commercial'>('all');

  const filteredWorks = activeTab === 'all'
    ? REAL_WORKS_DATA
    : REAL_WORKS_DATA.filter((w) => w.workType === activeTab);

  const tabs = [
    { key: 'all', label: 'All Works', count: REAL_WORKS_DATA.length, icon: Layers },
    { key: 'interiors', label: 'Finished Interiors', count: REAL_WORKS_DATA.filter(w => w.workType === 'interiors').length, icon: Sparkles },
    { key: 'foundation', label: 'Civil & Foundation', count: REAL_WORKS_DATA.filter(w => w.workType === 'foundation').length, icon: Building2 },
    { key: 'demolition', label: 'Demolition & Remodeling', count: REAL_WORKS_DATA.filter(w => w.workType === 'demolition').length, icon: Hammer },
    { key: 'commercial', label: 'Commercial Partitions', count: REAL_WORKS_DATA.filter(w => w.workType === 'commercial').length, icon: Layers },
  ];

  return (
    <section id="real-works" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">02. ACTUAL ON-SITE EXECUTION</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-amber-300 font-semibold">OUR COMPLETED & ONGOING WORKS</span>
          </div>
          <span className="font-mono text-xs text-stone-400">14 SITE VIDEOS & PHOTOGRAPHS</span>
        </div>

        {/* Section Title & Visual Highlights (Minimal text, maximum visual clarity) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Real Site Work Portfolio
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl">
              Authentic on-site footage and photos showcasing exactly what DAS executes: from JCB excavation, rebar column cages, and roof demolition to finished marble interiors, glass showcases, and commercial office cabins.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs shrink-0">
            <div className="px-3 py-2 bg-stone-900 border border-white/15 flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>7 SITE VIDEOS</span>
            </div>
            <div className="px-3 py-2 bg-stone-900 border border-white/15 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>7 REAL PHOTOS</span>
            </div>
          </div>
        </div>

        {/* Quick Work Category Summary Cards (Enna Enna Work Panrom) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div 
            onClick={() => setActiveTab('interiors')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'interiors' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-300 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              1. Luxury Interiors
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              Marble tile flooring, backlit glass showcase, LED recessed lights, kitchen archways.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('foundation')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'foundation' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Building2 className="w-5 h-5 text-blue-400 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              2. Civil & Foundation
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              JCB trench excavation, steel column cages, plinth beams, and solid block masonry.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('demolition')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'demolition' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Hammer className="w-5 h-5 text-rose-400 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              3. Demolition & Repair
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              Jackhammer roof demolition, damaged concrete chipping, rebar replacement, debris disposal.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('commercial')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'commercial' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Layers className="w-5 h-5 text-emerald-400 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              4. Commercial Cabins
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              Powder-coated aluminum partitions, frosted privacy glass, acoustic family rooms.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#E9E0D7] text-stone-900 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-none ${isActive ? 'bg-stone-900 text-white' : 'bg-stone-800 text-stone-300'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 14 Works Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredWorks.map((work) => {
            const isVideo = work.mediaType === 'video';

            return (
              <div
                key={work.id}
                className="border border-white/15 bg-stone-900 flex flex-col justify-between group hover:border-white/40 transition-all shadow-xl"
              >
                <div>
                  {/* Top Media Container */}
                  <div className="relative aspect-[16/10] bg-black overflow-hidden border-b border-white/10">
                    {isVideo ? (
                      <div className="relative w-full h-full">
                        {work.thumbnailUrl ? (
                          <img
                            src={work.thumbnailUrl}
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-stone-950" />
                        )}

                        {/* Video Badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-sm border border-white/20 text-emerald-400 text-[10px] font-mono flex items-center gap-1.5 z-10">
                          <Video className="w-3.5 h-3.5" />
                          <span>SITE VIDEO</span>
                        </div>

                        {/* Play Action Button Overlay */}
                        <button
                          onClick={() => onOpenMedia({
                            title: work.title,
                            category: work.categoryLabel,
                            imageUrl: work.thumbnailUrl || '',
                            videoUrl: work.mediaUrl,
                            description: `${work.highlight} Key works executed: ${work.workDone.join(' · ')}`
                          })}
                          className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/15 transition-colors cursor-pointer"
                          aria-label={`Play video of ${work.title}`}
                        >
                          <div className="w-13 h-13 border-2 border-white/80 bg-[#303030]/85 rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-stone-900 transition-all shadow-2xl">
                            <Play className="w-6 h-6 ml-0.5 fill-current" />
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={work.mediaUrl}
                          alt={work.title}
                          className="w-full h-full object-cover filter contrast-105 group-hover:scale-103 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Photo Badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-sm border border-white/20 text-amber-300 text-[10px] font-mono flex items-center gap-1.5">
                          <Camera className="w-3 h-3" />
                          <span>SITE PHOTO</span>
                        </div>

                        {/* Zoom Button */}
                        <button
                          onClick={() => onOpenMedia({
                            title: work.title,
                            category: work.categoryLabel,
                            imageUrl: work.mediaUrl,
                            description: `${work.highlight} Key works executed: ${work.workDone.join(' · ')}`
                          })}
                          className="absolute bottom-3 right-3 p-2 bg-[#303030]/85 border border-white/20 text-white hover:bg-white hover:text-stone-900 transition-colors"
                          title="View High-Res Photo"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Stage status tag on bottom left */}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-stone-950/90 border border-white/10 text-[10px] font-mono text-[#E9E0D7]">
                      {work.stageLabel}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                      <span className="uppercase text-[#E9E0D7]">{work.categoryLabel}</span>
                      {work.location && <span>{work.location}</span>}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white uppercase font-display leading-snug">
                      {work.title}
                    </h3>

                    {/* Specific Works Done (Bulleted & Highly Visible) */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block tracking-wider">
                        WORK EXECUTED ON SITE:
                      </span>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {work.workDone.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5 text-stone-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0 border-t border-white/10 flex items-center justify-between gap-3 mt-4">
                  <button
                    onClick={() => onOpenMedia({
                      title: work.title,
                      category: work.categoryLabel,
                      imageUrl: work.mediaType === 'image' ? work.mediaUrl : (work.thumbnailUrl || ''),
                      videoUrl: work.mediaType === 'video' ? work.mediaUrl : undefined,
                      description: `${work.highlight} Key works executed: ${work.workDone.join(' · ')}`
                    })}
                    className="text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-white flex items-center gap-1"
                  >
                    <span>{isVideo ? 'Play Video' : 'Full Photo'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onInquireWork(work)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-[11px] font-mono uppercase tracking-wider transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp Enquiry</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Call to Action Bar */}
        <div className="mt-14 p-6 sm:p-8 bg-stone-900 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold uppercase text-white font-display">
              Want Us to Execute Your Plot, House or Office?
            </h4>
            <p className="text-stone-400 text-xs sm:text-sm">
              We handle total demolition, foundation excavation, RCC columns, modular interiors, and turnkey completion.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-5 py-3 text-xs uppercase tracking-widest bg-[#E9E0D7] text-stone-900 font-bold hover:bg-white transition-colors"
            >
              Get Free Site Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
