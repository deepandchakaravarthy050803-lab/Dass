import React from 'react';
import { WHY_CHOOSE_US } from '../data/portfolioData';
import { ShieldCheck, Award, Zap, Scale, Clock, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const icons = [Users, ShieldCheck, Award, Scale, Clock, Zap];

  return (
    <section id="why-us" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">08. VALUE PROPOSITION</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">WHY CHOOSE DAS</span>
          </div>
          <span className="font-mono text-xs text-stone-400">THE DAS STANDARD</span>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
            Six Guarantees of Architectural Distinction
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Constructing a bespoke residence or corporate headquarters is an enduring legacy investment. We eliminate friction with institutional engineering rigor.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((pillar, idx) => {
            const IconComponent = icons[idx % icons.length];

            return (
              <div
                key={pillar.number}
                className="border border-white/15 bg-stone-900 p-6 sm:p-8 flex flex-col justify-between group hover:border-white/40 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="font-mono text-xs text-stone-400 uppercase">
                      PILLAR {pillar.number}
                    </span>
                    <IconComponent className="w-5 h-5 text-stone-300 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase font-display mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#E9E0D7] font-mono mb-4">
                    {pillar.summary}
                  </p>

                  <p className="text-stone-300 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 font-mono text-xs text-stone-400 flex items-center justify-between">
                  <span>METRIC:</span>
                  <span className="text-white font-bold">{pillar.metrics}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
