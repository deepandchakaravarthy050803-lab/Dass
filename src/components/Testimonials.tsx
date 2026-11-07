import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Star, Quote, Building, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">09. ENDORSEMENTS</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">CLIENT TESTIMONIALS</span>
          </div>
          <span className="font-mono text-xs text-stone-400">VERIFIED COMMISSION REFERENCES</span>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
            Words from Our Patrons
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            The truest measure of our architectural and engineering discipline is the enduring trust of the families and institutions for whom we build.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="border border-white/15 bg-stone-900 p-6 sm:p-8 flex flex-col justify-between group hover:border-white/40 transition-colors shadow-lg relative"
            >
              <div>
                {/* Rating and Quote Icon */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-300" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-500" />
                </div>

                {/* Project Reference Badge */}
                <div className="mb-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">
                    PROJECT REFERENCE:
                  </span>
                  <div className="text-xs font-mono font-semibold text-[#E9E0D7]">
                    {t.projectName}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
                    <MapPin className="w-3 h-3 text-stone-500" />
                    <span>{t.location}</span>
                  </div>
                </div>

                {/* Testimonial Body */}
                <blockquote className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Client Info Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-10 h-10 object-cover border border-white/20 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white uppercase font-display truncate">
                    {t.clientName}
                  </div>
                  <div className="text-xs text-stone-400 truncate">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
