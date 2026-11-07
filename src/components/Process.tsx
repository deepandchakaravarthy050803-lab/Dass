import React from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Check, Clock, ArrowRight } from 'lucide-react';

interface ProcessProps {
  onStartProject: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onStartProject }) => {
  return (
    <section id="process" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">07. DELIVERY METHODOLOGY</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">OUR PROCESS</span>
          </div>
          <span className="font-mono text-xs text-stone-400">01 – 06 WORKFLOW MATRIX</span>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
            A Disciplined Six-Stage Architecture & Build Lifecycle
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Eliminating guesswork with milestone-based governance, weekly digital site tracking, and rigorous quality audits at each transition.
          </p>
        </div>

        {/* Minimalist Numbered Steps Grid (6 steps, 2 cols on md, 3 cols on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-[#303030] p-6 sm:p-8 flex flex-col justify-between hover:bg-[#363636] transition-colors relative group"
            >
              <div>
                {/* Header Number & Duration */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white group-hover:text-[#E9E0D7] transition-colors">
                    {step.number}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{step.durationWeeks}</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono uppercase text-stone-400 mb-1">
                  STAGE {step.number}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-display mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-[#E9E0D7] italic font-mono mb-4">
                  "{step.tagline}"
                </p>

                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Milestones Checklist */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                  STAGE MILESTONES:
                </span>
                {step.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-2 text-xs text-stone-300">
                    <Check className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="mt-12 p-6 sm:p-8 bg-stone-900 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-300/80">
              READY TO COMMENCE STAGE 01?
            </span>
            <h4 className="text-xl font-bold text-white uppercase font-display">
              Book a Confidential Site & Architectural Consultation
            </h4>
          </div>
          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest bg-[#E9E0D7] text-stone-900 font-semibold hover:bg-white transition-colors shrink-0"
          >
            <span>Initiate Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
