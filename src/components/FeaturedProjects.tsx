import React from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowUpRight, Maximize2, MapPin, Calendar, Ruler, MessageSquare } from 'lucide-react';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onInquireProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
  onInquireProject,
}) => {
  return (
    <section id="featured-projects" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">04. SELECTED WORKS</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">FEATURED PROJECTS</span>
          </div>
          <span className="font-mono text-xs text-stone-400">MONOGRAPH INDEX 01 – 06</span>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase font-display">
            Curated Landmark Commissions
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            A chronological survey of bespoke residential villas, penthouse interiors, and commercial complexes engineered to the highest architectural standards.
          </p>
        </div>

        {/* Numbered Projects List with Alternating Editorial Swiss Grid */}
        <div className="space-y-20 lg:space-y-28">
          {FEATURED_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={project.id}
                className="border-t border-white/15 pt-8 lg:pt-12 relative"
              >
                {/* Project Number Index Marker */}
                <div className="flex items-center justify-between font-mono text-xs text-stone-400 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-stone-100 font-bold tracking-widest text-sm">
                      PROJECT {project.number}
                    </span>
                    <span className="text-stone-600">—</span>
                    <span className="uppercase text-stone-300">{project.subCategory}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 border border-white/40"></span>
                    <span>ARCHITECTURAL REGISTRY</span>
                  </div>
                </div>

                {/* Alternating Composition Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Image Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative border border-white/15 bg-stone-900 p-2 sm:p-3 shadow-xl group">
                      <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover filter contrast-105 group-hover:scale-103 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />

                        {/* Interactive Quick Inspect Button */}
                        <button
                          onClick={() => onSelectProject(project)}
                          className="absolute bottom-3 right-3 p-2.5 bg-[#303030]/90 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-stone-900 transition-colors flex items-center gap-1.5 text-xs font-mono"
                          title="Open Full Architectural Overview"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">FULL SPECS</span>
                        </button>
                      </div>

                      {/* Small Caption Bar */}
                      <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-mono text-stone-400">
                        <span>PLATE REF: DAS-PRJ-{project.number}</span>
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata and Prose Column */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-widest text-[#E9E0D7] font-mono">
                        {project.category}
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase font-display leading-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Metadata Specs Bar (Area, Year, Location) */}
                    <div className="grid grid-cols-3 gap-2 border-y border-white/10 py-4 font-mono text-xs">
                      <div>
                        <div className="text-stone-500 uppercase flex items-center gap-1">
                          <Ruler className="w-3 h-3" />
                          <span>Area</span>
                        </div>
                        <div className="text-stone-100 font-bold mt-0.5">
                          {project.areaSqFt.toLocaleString()} sq.ft
                        </div>
                      </div>

                      <div>
                        <div className="text-stone-500 uppercase flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Year</span>
                        </div>
                        <div className="text-stone-100 font-bold mt-0.5">
                          {project.year}
                        </div>
                      </div>

                      <div>
                        <div className="text-stone-500 uppercase flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>Location</span>
                        </div>
                        <div className="text-stone-100 font-bold mt-0.5 truncate">
                          {project.location.split(',')[0]}
                        </div>
                      </div>
                    </div>

                    <p className="text-stone-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architectural Feature Bullets */}
                    <ul className="space-y-1.5 pt-2">
                      {project.features.slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-stone-400">
                          <span className="text-[#E9E0D7] font-bold">·</span>
                          <span className="text-stone-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Triggers */}
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest bg-[#E9E0D7] text-stone-900 font-semibold hover:bg-white transition-colors"
                      >
                        <span>Case Study & Blueprint</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onInquireProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest text-stone-200 border border-white/20 hover:border-white transition-colors bg-stone-800/60"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                        <span>Inquire About Project</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
