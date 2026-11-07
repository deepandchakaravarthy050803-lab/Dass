import React, { useState } from 'react';
import { SERVICES } from '../data/portfolioData';
import { ServiceItem } from '../types';
import { ArrowUpRight, Check, Clock, ChevronRight, X } from 'lucide-react';

interface ServicesProps {
  onSelectServiceForEnquiry: (serviceTitle: string) => void;
  onOpenWhatsAppForService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ 
  onSelectServiceForEnquiry,
  onOpenWhatsAppForService 
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Construction' | 'Interior Design' | 'Planning & Visualization'>('All');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = activeFilter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeFilter);

  return (
    <section id="services" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">03. EXPERTISE & DISCIPLINES</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">OUR SERVICES</span>
          </div>
          <span className="font-mono text-xs text-stone-400">9 SPECIALIZED DOMAINS</span>
        </div>

        {/* Section Title & Interactive Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Comprehensive Architectural & Turnkey Solutions
            </h2>
            <p className="text-stone-400 text-sm">
              From raw topography assessment and municipal drawings to high-tensile civil engineering and hand-finished Italian interiors.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-900 border border-white/15">
            {(['All', 'Construction', 'Interior Design', 'Planning & Visualization'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#E9E0D7] text-stone-900 font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Services Swiss Grid Layout (3x3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#303030] p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#383838] transition-colors relative"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5 font-mono text-xs text-stone-400">
                  <span>SERVICE {service.number}</span>
                  <span className="text-stone-300 uppercase">{service.category}</span>
                </div>

                {/* Service Image with Subtle Aspect Framing */}
                <div className="aspect-[16/10] overflow-hidden bg-stone-950 mb-6 border border-white/10">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight uppercase font-display mb-3 group-hover:text-[#E9E0D7] transition-colors">
                  {service.title}
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Highlight Points */}
                <ul className="space-y-2 mb-6 border-t border-white/10 pt-4">
                  {service.highlights.slice(0, 2).map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-white flex items-center gap-1 group/btn"
                >
                  <span>Detailed Scope</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectServiceForEnquiry(service.title)}
                  className="p-2 border border-white/20 text-stone-300 hover:text-stone-900 hover:bg-[#E9E0D7] transition-colors"
                  title={`Inquire for ${service.title}`}
                  aria-label={`Inquire for ${service.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#2b2b2b] border border-white/20 max-w-2xl w-full p-6 sm:p-8 text-stone-100 relative shadow-2xl animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white border border-white/15"
              aria-label="Close service modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="font-mono text-xs text-stone-400 mb-2">
              SERVICE SPECIFICATION // {selectedService.number}
            </div>

            <h3 className="text-2xl font-bold text-white uppercase font-display mb-4">
              {selectedService.title}
            </h3>

            <div className="aspect-[21/9] overflow-hidden mb-6 border border-white/10">
              <img
                src={selectedService.imageUrl}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 border-t border-b border-white/10 py-4">
              <div>
                <h4 className="text-xs font-mono uppercase text-stone-400 mb-2">
                  Key Technical Capabilities
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-200">
                  {selectedService.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E9E0D7] font-bold">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-stone-400 mb-2">
                  Standard Deliverables
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-200">
                  {selectedService.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E9E0D7] font-bold">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Typical Duration: {selectedService.typicalDuration}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onOpenWhatsAppForService(title);
                  }}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-stone-900 bg-[#E9E0D7] hover:bg-white font-medium transition-colors"
                >
                  WhatsApp Consultation
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceForEnquiry(title);
                  }}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-stone-200 border border-white/20 hover:border-white transition-colors"
                >
                  Book Official Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
