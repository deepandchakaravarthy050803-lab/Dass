import React from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Ruler, Check, MessageSquare, ArrowUpRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#242424] border border-white/20 max-w-4xl w-full p-6 sm:p-8 text-stone-100 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right z-10 p-2 text-stone-400 hover:text-white border border-white/15 bg-stone-900/90"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="clear-both pt-2 pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3 font-mono text-xs text-stone-400 uppercase mb-1">
            <span>PROJECT {project.number}</span>
            <span className="text-stone-600">/</span>
            <span className="text-[#E9E0D7]">{project.category}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white uppercase font-display">
            {project.title}
          </h2>
        </div>

        {/* Main Imagery */}
        <div className="space-y-4 mb-8">
          <div className="aspect-[16/9] w-full overflow-hidden bg-stone-950 border border-white/10">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Secondary Gallery Images if available */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.galleryImages.map((img, i) => (
                <div key={i} className="aspect-[16/10] overflow-hidden bg-stone-950 border border-white/10">
                  <img
                    src={img}
                    alt={`${project.title} detail ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Architectural Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-900 border border-white/10 font-mono text-xs mb-8">
          <div>
            <span className="text-stone-500 uppercase flex items-center gap-1">
              <Ruler className="w-3 h-3" />
              <span>Scale Area</span>
            </span>
            <div className="text-stone-100 font-bold mt-1 text-sm">
              {project.areaSqFt.toLocaleString()} sq.ft
            </div>
          </div>

          <div>
            <span className="text-stone-500 uppercase flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Year</span>
            </span>
            <div className="text-stone-100 font-bold mt-1 text-sm">
              {project.year}
            </div>
          </div>

          <div>
            <span className="text-stone-500 uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Location</span>
            </span>
            <div className="text-stone-100 font-bold mt-1 text-sm truncate">
              {project.location}
            </div>
          </div>

          <div>
            <span className="text-stone-500 uppercase">Status</span>
            <div className="text-emerald-400 font-bold mt-1 text-sm">
              {project.completionStatus || 'Completed'}
            </div>
          </div>
        </div>

        {/* Narrative & Full Architectural Overview */}
        <div className="space-y-6 mb-8 text-stone-300 text-sm leading-relaxed">
          <p className="text-base text-stone-200">
            {project.description}
          </p>
          {project.fullOverview && (
            <p>
              {project.fullOverview}
            </p>
          )}

          {/* Key Architectural Features */}
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-mono uppercase text-stone-400 mb-3 tracking-wider">
              ENGINEERING & SPATIAL HIGHLIGHTS:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {project.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-stone-300">
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client & Scope Metadata */}
          {project.scope && (
            <div className="p-3 bg-stone-950 border border-white/5 font-mono text-xs text-stone-400">
              <span className="text-stone-200">SCOPE OF WORK: </span>
              <span>{project.scope}</span>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <span className="text-xs font-mono text-stone-400">
            REF ID: DAS-MONOGRAPH-{project.number}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onInquire(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest bg-[#E9E0D7] text-stone-900 font-bold hover:bg-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire via WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs uppercase tracking-widest text-stone-300 border border-white/20 hover:border-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
