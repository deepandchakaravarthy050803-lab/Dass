import React, { useState, useEffect } from 'react';
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
  ArrowUpRight,
  Plus,
  X,
  Upload,
  Trash2,
  Check,
  RefreshCw,
  Eye
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

// Preset intelligent title and spec templates for automatic photo labeling
interface AutoTemplate {
  categoryLabel: string;
  workType: 'ceilings' | 'interiors' | 'commercial' | 'foundation' | 'demolition' | 'renovation';
  stageLabel: string;
  defaultTitle: string;
  highlight: string;
  defaultWorkDone: string[];
}

const CATEGORY_TEMPLATES: Record<string, AutoTemplate> = {
  'false-ceiling': {
    categoryLabel: 'False Ceiling & POP Works',
    workType: 'ceilings',
    stageLabel: 'Completed & Ambient Cove LED Active',
    defaultTitle: 'Architectural Gypsum False Ceiling with Concealed Cove LED',
    highlight: 'Multi-tiered gypsum ceiling with integrated warm ambient cove lighting and recessed downlights.',
    defaultWorkDone: [
      'Galvanized Iron (GI) Heavy Framework',
      'High-Grade Gypsum Plaster Boarding',
      'Concealed 3000K Indirect Cove LED Channel',
      'Joint Tape Bonding & Level 5 Putty Skimming'
    ]
  },
  'modular-kitchen': {
    categoryLabel: 'Modular Kitchens',
    workType: 'interiors',
    stageLabel: 'Completed Handover & Quartz Testing',
    defaultTitle: 'Modern Ergonomic Modular Kitchen with Quartz Counter',
    highlight: 'Turnkey culinary kitchen with soft-close tandem drawers, waterproof marine carcass, and granite/quartz tops.',
    defaultWorkDone: [
      'Waterproof Marine-Grade Carcass Joinery',
      'High-Gloss Acrylic Soft-Close Tandem Boxes',
      'Seamless Quartz / Granite Countertop Fitting',
      'Chimney Extraction Venting & Plumbing Integration'
    ]
  },
  'living-room': {
    categoryLabel: 'Finished Interiors & Living',
    workType: 'interiors',
    stageLabel: 'Final Flooring, Lighting & Paint',
    defaultTitle: 'Contemporary Living Room TV Console & Display Vitrine',
    highlight: 'Bespoke living hall entertainment unit with integrated ambient LEDs and large-format flooring.',
    defaultWorkDone: [
      'Dual-Tone Floating Base Console Drawers',
      'Illuminated Open Display Cubbies with Warm LEDs',
      'Large Format Italian Polished Tile Flooring',
      'Concealed Wiring Channels & Texture Accent Wall'
    ]
  },
  'office-corporate': {
    categoryLabel: 'Commercial & Corporate Fitout',
    workType: 'commercial',
    stageLabel: 'Completed & Operational',
    defaultTitle: 'Executive Office Cabin with High-Gloss Wall Paneling',
    highlight: 'Turnkey corporate workspace balancing acoustic privacy, ergonomic desking, and prestige finishes.',
    defaultWorkDone: [
      'Custom L-Shaped Executive Workstation',
      'High-Gloss Marble Pattern Laminate Paneling',
      'Concealed Cable Management & Data Conduits',
      'Integrated Modular LED Troffers & Acoustic Ceilings'
    ]
  },
  'reception-lobby': {
    categoryLabel: 'Commercial & Corporate Fitout',
    workType: 'commercial',
    stageLabel: 'Completed & Handed Over',
    defaultTitle: 'Corporate Lobby & Marble Clad Reception Desk',
    highlight: 'Prestigious front-desk reception counter with stone tile cladding and vertical fluted accents.',
    defaultWorkDone: [
      'Italian Tile / Marble Front Counter Cladding',
      'Vertical Wood-Fluted Accent Wall Paneling',
      'Recessed Horizontal Mosaic Tile Band',
      'Concealed Staff Workstations & Floral Styling'
    ]
  },
  'civil-foundation': {
    categoryLabel: 'Civil & Foundation Works',
    workType: 'foundation',
    stageLabel: 'Substructure Concreting & Curing',
    defaultTitle: 'Reinforced Column Rebar Cages & Foundation Footing',
    highlight: 'Earthquake-resistant civil foundation engineered to exact structural blueprints and soil specs.',
    defaultWorkDone: [
      'High-Tensile Fe550D TMT Column Rebar Cages',
      'Laser-Marked Grid Setting & Excavator Trenching',
      'M25/M30 Ready-Mix Concrete Footing Pour',
      'Continuous Water Ponding Curing & Quality Testing'
    ]
  },
  'demolition-repair': {
    categoryLabel: 'Structural Demolition & Remodeling',
    workType: 'demolition',
    stageLabel: 'Controlled Dismantling & Retrofit',
    defaultTitle: 'Controlled Structural Demolition & Slab Rehabilitation',
    highlight: 'Surgical pneumatic dismantling and rebar reinforcement of distressed building elements.',
    defaultWorkDone: [
      'Heavy Pneumatic Breaker & Jackhammer Operation',
      'Exposing Weakened Rebar for Anti-Rust Priming',
      'Perimeter Safety Shoring & Dust Mitigation',
      'Debris Clearance & Site Preparation for New RCC'
    ]
  },
  'before-after': {
    categoryLabel: 'Turnkey Renovation & Remodeling',
    workType: 'renovation',
    stageLabel: 'Before vs After Complete Handover',
    defaultTitle: 'Complete Space Transformation (Before & After)',
    highlight: 'High-impact full metamorphosis converting aged dilapidated spaces into modern luxury environments.',
    defaultWorkDone: [
      'Full Stripping of Dated Fixtures & Clutter',
      'Acoustic Architectural Wall Paneling',
      'Concealed Stage / Ambient Lighting Overhaul',
      'Modern High-Traffic Flooring & Final Handover'
    ]
  }
};

export const RealWorksShowcase: React.FC<RealWorksShowcaseProps> = ({
  onOpenMedia,
  onInquireWork,
}) => {
  // Load any user-added custom items from localStorage
  const [customWorks, setCustomWorks] = useState<RealWorkItem[]>(() => {
    try {
      const saved = localStorage.getItem('das_custom_real_works');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading custom works', e);
    }
    return [];
  });

  // Combine initial real works with custom works
  const allWorks = [...customWorks, ...REAL_WORKS_DATA];

  const [activeTab, setActiveTab] = useState<
    'all' | 'ceilings' | 'interiors' | 'commercial' | 'foundation' | 'demolition' | 'renovation'
  >('all');

  const filteredWorks = activeTab === 'all'
    ? allWorks
    : allWorks.filter((w) => w.workType === activeTab);

  // Tabs with live counts
  const tabs = [
    { key: 'all', label: 'All Works', count: allWorks.length, icon: Layers },
    { key: 'ceilings', label: 'False Ceiling & POP', count: allWorks.filter(w => w.workType === 'ceilings').length, icon: Sparkles },
    { key: 'interiors', label: 'Interiors & Kitchens', count: allWorks.filter(w => w.workType === 'interiors').length, icon: Sparkles },
    { key: 'commercial', label: 'Commercial & Offices', count: allWorks.filter(w => w.workType === 'commercial').length, icon: Building2 },
    { key: 'foundation', label: 'Civil & Foundation', count: allWorks.filter(w => w.workType === 'foundation').length, icon: Building2 },
    { key: 'demolition', label: 'Demolition & Retrofit', count: allWorks.filter(w => w.workType === 'demolition').length, icon: Hammer },
    { key: 'renovation', label: 'Before & After', count: allWorks.filter(w => w.workType === 'renovation').length, icon: ArrowUpRight },
  ];

  // Modal State for Adding New Photos
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('false-ceiling');
  const [photoTitle, setPhotoTitle] = useState<string>(CATEGORY_TEMPLATES['false-ceiling'].defaultTitle);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoLocation, setPhotoLocation] = useState<string>('Completed Site, Bengaluru');
  const [photoHighlight, setPhotoHighlight] = useState<string>(CATEGORY_TEMPLATES['false-ceiling'].highlight);
  const [workSteps, setWorkSteps] = useState<string[]>(CATEGORY_TEMPLATES['false-ceiling'].defaultWorkDone);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // When template changes, automatically update the title and specs!
  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplateKey(templateKey);
    const tmpl = CATEGORY_TEMPLATES[templateKey];
    if (tmpl) {
      setPhotoTitle(tmpl.defaultTitle);
      setPhotoHighlight(tmpl.highlight);
      setWorkSteps(tmpl.defaultWorkDone);
    }
  };

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPhotoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Save New Photo
  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim() || !photoTitle.trim()) return;

    const tmpl = CATEGORY_TEMPLATES[selectedTemplateKey];
    const newItem: RealWorkItem = {
      id: `custom-work-${Date.now()}`,
      title: photoTitle.trim(),
      workType: tmpl.workType,
      categoryLabel: tmpl.categoryLabel,
      stageLabel: tmpl.stageLabel,
      mediaType: 'image',
      mediaUrl: photoUrl.trim(),
      workDone: workSteps.filter(s => s.trim().length > 0),
      location: photoLocation.trim() || 'Client Site',
      highlight: photoHighlight.trim() || tmpl.highlight,
    };

    const updated = [newItem, ...customWorks];
    setCustomWorks(updated);
    try {
      localStorage.setItem('das_custom_real_works', JSON.stringify(updated));
    } catch (err) {
      console.error('LocalStorage write failed', err);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsAddModalOpen(false);
      setPhotoUrl('');
    }, 1200);
  };

  const handleDeleteCustomItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customWorks.filter(w => w.id !== id);
    setCustomWorks(updated);
    localStorage.setItem('das_custom_real_works', JSON.stringify(updated));
  };

  const videoCount = allWorks.filter(w => w.mediaType === 'video').length;
  const photoCount = allWorks.filter(w => w.mediaType === 'image').length;

  return (
    <section id="real-works" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-10 gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">02. ACTUAL ON-SITE EXECUTION</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-amber-300 font-semibold">OUR COMPLETED & ONGOING WORKS</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-stone-400">
              {allWorks.length} SITE WORKS · {photoCount} PHOTOS & {videoCount} VIDEOS
            </span>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 bg-[#E9E0D7] text-stone-900 hover:bg-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Photo</span>
            </button>
          </div>
        </div>

        {/* Section Title & Visual Highlights */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Real Site Work Portfolio
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl">
              Authentic on-site photographs and video documentation: from POP false ceiling coves, modern modular kitchens, and corporate boardrooms to deep JCB excavation, foundation rebar, and church sanctuary transformations.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs shrink-0 flex-wrap">
            <div className="px-3 py-2 bg-stone-900 border border-white/15 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{photoCount} SITE PHOTOGRAPHS</span>
            </div>
            <div className="px-3 py-2 bg-stone-900 border border-white/15 flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>{videoCount} SITE VIDEOS</span>
            </div>
          </div>
        </div>

        {/* Quick Work Category Shortcuts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div 
            onClick={() => setActiveTab('ceilings')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'ceilings' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-300 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              1. False Ceiling & POP
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              Curved 4-point star coves, geometric tiered trays, halo rings, gold medallions & corridor troughs.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('interiors')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'interiors' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Layers className="w-5 h-5 text-emerald-400 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              2. Modular Kitchens & Living
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              Quartz & granite modular kitchens, high-gloss acrylics, TV consoles & backlit vitrines.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('commercial')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'commercial' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Building2 className="w-5 h-5 text-blue-400 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              3. Offices & Commercial
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              Marble front-desks, executive director cabins, corporate boardrooms & acoustic partitions.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('foundation')}
            className={`p-4 border cursor-pointer transition-all ${
              activeTab === 'foundation' ? 'border-[#E9E0D7] bg-stone-800' : 'border-white/10 bg-stone-900/80 hover:border-white/30'
            }`}
          >
            <Hammer className="w-5 h-5 text-rose-400 mb-2" />
            <h3 className="font-bold text-white uppercase text-xs sm:text-sm font-display">
              4. Civil & Foundation
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              JCB trench excavation, steel column cages, plinth beams, and solid block masonry.
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
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#E9E0D7] text-stone-900 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 ${isActive ? 'bg-stone-900 text-white' : 'bg-stone-800 text-stone-300'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Works Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredWorks.map((work) => {
            const isVideo = work.mediaType === 'video';
            const isCustom = work.id.startsWith('custom-work-');

            return (
              <div
                key={work.id}
                className="border border-white/15 bg-stone-900 flex flex-col justify-between group hover:border-white/40 transition-all shadow-xl relative"
              >
                {/* Delete button for user custom uploads */}
                {isCustom && (
                  <button
                    onClick={(e) => handleDeleteCustomItem(work.id, e)}
                    className="absolute top-2 right-2 z-20 p-1.5 bg-rose-600/90 hover:bg-rose-500 text-white transition-colors"
                    title="Remove custom photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

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
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-stone-950/90 border border-white/10 text-[10px] font-mono text-[#E9E0D7] max-w-[85%] truncate">
                      {work.stageLabel}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                      <span className="uppercase text-[#E9E0D7] font-semibold">{work.categoryLabel}</span>
                      {work.location && <span className="truncate max-w-[50%] text-right">{work.location}</span>}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white uppercase font-display leading-snug">
                      {work.title}
                    </h3>

                    {/* Specific Works Done */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block tracking-wider">
                        WORK EXECUTED ON SITE:
                      </span>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {work.workDone.slice(0, 4).map((step, sIdx) => (
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
              We handle total demolition, foundation excavation, RCC columns, false ceilings, modular kitchens, and turnkey completion.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-3 text-xs uppercase tracking-widest bg-stone-800 text-white border border-white/20 hover:border-white transition-colors font-mono flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Photo</span>
            </button>
            <a
              href="#contact"
              className="px-5 py-3 text-xs uppercase tracking-widest bg-[#E9E0D7] text-stone-900 font-bold hover:bg-white transition-colors"
            >
              Get Free Site Visit
            </a>
          </div>
        </div>
      </div>

      {/* AUTOMATIC PHOTO & TITLE ADDITION MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#303030] text-stone-100 border border-white/20 shadow-2xl p-6 sm:p-8 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-amber-300 uppercase tracking-widest block">
                  DAS PHOTO MANAGER · AUTOMATIC TITLE GENERATOR
                </span>
                <h3 className="text-xl font-bold uppercase font-display text-white">
                  Add Photo with Auto-Matched Title
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white border border-white/10 hover:border-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-5">
              {/* 1. Category Selection (Auto-generates title!) */}
              <div>
                <label className="block text-xs font-mono uppercase text-stone-300 mb-2 font-semibold">
                  1. Choose Work Category (Auto-Generates Title & Specs):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(CATEGORY_TEMPLATES).map(([key, tmpl]) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => handleTemplateChange(key)}
                      className={`p-2.5 text-left border text-xs font-mono transition-all ${
                        selectedTemplateKey === key
                          ? 'border-[#E9E0D7] bg-[#E9E0D7] text-stone-900 font-bold shadow-md'
                          : 'border-white/15 bg-stone-900/80 text-stone-300 hover:border-white/40'
                      }`}
                    >
                      <div className="truncate">{tmpl.categoryLabel.split('&')[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Photo Input (File Upload or URL) */}
              <div>
                <label className="block text-xs font-mono uppercase text-stone-300 mb-2 font-semibold">
                  2. Select Photo (Upload Local File or Enter Path):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="border border-dashed border-white/30 hover:border-amber-300 p-4 flex flex-col items-center justify-center cursor-pointer bg-stone-900/60 transition-colors">
                    <Upload className="w-6 h-6 text-amber-300 mb-1.5" />
                    <span className="text-xs font-mono uppercase text-stone-200 font-bold">
                      Upload from Device
                    </span>
                    <span className="text-[10px] text-stone-400 mt-0.5">JPG, PNG, WebP</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex flex-col justify-center">
                    <span className="text-[11px] font-mono text-stone-400 mb-1">
                      Or Paste Image URL / Workspace Path:
                    </span>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="/assets/aistudio/... or https://..."
                      className="w-full bg-stone-900 border border-white/20 p-2 text-xs font-mono text-white placeholder-stone-500 focus:outline-none focus:border-amber-300"
                    />
                  </div>
                </div>

                {/* Photo Preview if loaded */}
                {photoUrl && (
                  <div className="mt-3 relative aspect-[16/8] bg-black overflow-hidden border border-white/20">
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 text-emerald-400 text-[10px] font-mono">
                      IMAGE READY
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Auto-Generated Title (Editable) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono uppercase text-stone-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>3. Auto-Generated Architectural Title:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleTemplateChange(selectedTemplateKey)}
                    className="text-[10px] font-mono text-stone-400 hover:text-white flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset to Template</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full bg-stone-900 border border-white/25 p-2.5 text-sm font-display font-bold text-white focus:outline-none focus:border-[#E9E0D7]"
                  required
                />
              </div>

              {/* 4. Location & Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                    Project Location:
                  </label>
                  <input
                    type="text"
                    value={photoLocation}
                    onChange={(e) => setPhotoLocation(e.target.value)}
                    className="w-full bg-stone-900 border border-white/20 p-2 text-xs font-mono text-white focus:outline-none focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                    Engineering Highlight:
                  </label>
                  <input
                    type="text"
                    value={photoHighlight}
                    onChange={(e) => setPhotoHighlight(e.target.value)}
                    className="w-full bg-stone-900 border border-white/20 p-2 text-xs font-mono text-white focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-white border border-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!photoUrl || !photoTitle || saveSuccess}
                  className={`px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                    saveSuccess
                      ? 'bg-emerald-600 text-white'
                      : !photoUrl || !photoTitle
                      ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-white/10'
                      : 'bg-[#E9E0D7] text-stone-900 hover:bg-white shadow-xl'
                  }`}
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Live Portfolio!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Live Portfolio</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
