import React, { useState } from 'react';
import { FAQS, COMPANY_INFO } from '../data/portfolioData';
import { Plus, Minus, MessageSquare, Phone, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  onOpenWhatsApp: (prompt?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenWhatsApp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(FAQS.map((faq) => faq.category)))];

  const filteredFaqs = activeCategory === 'All' 
    ? FAQS 
    : FAQS.filter((faq) => faq.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">09. CLIENT GUIDANCE</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <span className="font-mono text-xs text-stone-400">HELP & TRANSPARENCY</span>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
            Clear Answers for Your Building Journey
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Building or renovating a dream home should be transparent, exciting, and completely stress-free. Here is everything you need to know about partnering with DAS.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-[#E9E0D7] text-stone-900 font-bold'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid: FAQ Accordion + Friendly Help Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* FAQ Accordion List */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.id}
                  className={`border transition-colors ${
                    isOpen ? 'border-white/40 bg-stone-900' : 'border-white/15 bg-stone-900/60 hover:border-white/25'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[11px] uppercase text-[#E9E0D7] tracking-wider block">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white uppercase font-display">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="p-1.5 border border-white/20 text-stone-300 shrink-0 mt-1">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 text-stone-300 text-sm leading-relaxed space-y-3">
                      <p>{faq.answer}</p>
                      <div className="pt-2 flex items-center gap-3 font-mono text-xs text-stone-400">
                        <span>Have more specific questions?</span>
                        <button
                          onClick={() => onOpenWhatsApp(`Hello DAS, I have a question regarding: "${faq.question}"`)}
                          className="text-[#E9E0D7] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-400" />
                          <span>Ask on WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Friendly Customer Support / Direct Architect Advice Card */}
          <div className="lg:col-span-4 border border-white/15 bg-stone-900 p-6 sm:p-8 space-y-6 sticky top-24 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 border border-white/20 bg-stone-950 flex items-center justify-center text-amber-300">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-stone-400 block tracking-widest">
                  FRIENDLY SUPPORT
                </span>
                <h4 className="text-base font-bold uppercase text-white font-display">
                  Talk to a Principal Architect
                </h4>
              </div>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Every site has unique setbacks, soil conditions, and Vaastu requirements. Speak with our lead project architect for free initial guidance without any obligation.
            </p>

            <div className="p-3.5 bg-stone-950 border border-white/10 space-y-2 font-mono text-xs">
              <div className="text-stone-400">WHAT WE CAN DISCUSS:</div>
              <ul className="text-stone-300 space-y-1">
                <li>• Free site visit & elevation review</li>
                <li>• Vaastu & spatial orientation</li>
                <li>• Rough cost estimate for your plot</li>
                <li>• Turnkey construction timeline</li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => onOpenWhatsApp("Hello DAS Architecture & Construction, I would like to consult with an architect about my upcoming project.")}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.contacts.phone.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs uppercase tracking-widest border border-white/20 text-stone-200 hover:text-white hover:border-white transition-colors"
              >
                <Phone className="w-4 h-4 text-stone-400" />
                <span>Call {COMPANY_INFO.contacts.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
