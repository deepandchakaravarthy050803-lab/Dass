/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { FeaturedProjects } from './components/FeaturedProjects';
import { InteriorPortfolio } from './components/InteriorPortfolio';
import { ConstructionPortfolio } from './components/ConstructionPortfolio';
import { Process } from './components/Process';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { RealWorksShowcase } from './components/RealWorksShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { MediaLightboxModal } from './components/MediaLightboxModal';
import { CostEstimatorModal } from './components/CostEstimatorModal';
import { COMPANY_INFO } from './data/portfolioData';
import { Project, RealWorkItem } from './types';
import { MessageSquare, Phone, Calculator, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    videoUrl?: string;
  } | null>(null);

  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('');
  
  // Customizable WhatsApp contact number, stored in localStorage
  const [customWhatsAppPhone, setCustomWhatsAppPhone] = useState<string>(() => {
    const saved = localStorage.getItem('das_whatsapp_phone');
    if (saved && !saved.includes('98400')) {
      return saved;
    }
    return COMPANY_INFO.contacts.whatsapp;
  });

  const handleUpdateWhatsApp = (newPhone: string) => {
    setCustomWhatsAppPhone(newPhone);
    localStorage.setItem('das_whatsapp_phone', newPhone);
  };

  const handleOpenWhatsApp = (message?: string) => {
    let cleanPhone = customWhatsAppPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    const defaultText = message || 'Hello DAS Architecture & Construction, I would like to schedule an architectural consultation.';
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectServiceForEnquiry = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsAppForService = (serviceTitle: string) => {
    handleOpenWhatsApp(`Hello DAS, I am interested in inquiring about your "${serviceTitle}" service.`);
  };

  const handleInquireProject = (project: Project) => {
    handleOpenWhatsApp(`Hello DAS, I would like to inquire about Project ${project.number} – "${project.title}" (${project.areaSqFt} sq.ft, ${project.location}).`);
  };

  const handleInquireWork = (item: RealWorkItem) => {
    handleOpenWhatsApp(`Hello DAS, I saw your site work: "${item.title}" (${workTypeLabels[item.workType] || item.categoryLabel}). I would like to inquire about similar execution for my site.`);
  };

  const workTypeLabels: Record<string, string> = {
    ceilings: 'False Ceiling & POP Works',
    interiors: 'Finished Interiors & Kitchens',
    foundation: 'Civil Foundation',
    demolition: 'Demolition & Retrofit',
    commercial: 'Commercial Partitions & Corporate',
    renovation: 'Turnkey Renovation & Remodeling',
  };

  const handleApplyEstimateToForm = (service: string, area: string, budget: string) => {
    setPrefilledService(service);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#E9E0D7] text-stone-900 flex flex-col items-center">
      {/* Outer Architectural Beige Canvas Framing Wrapper */}
      <div className="w-full max-w-[1560px] mx-auto p-0 sm:p-3 md:p-6 lg:p-8">
        {/* Architectural Presentation Board Header Label on Beige Frame */}
        <div className="hidden sm:flex items-center justify-between pb-3 px-2 font-mono text-[11px] text-stone-600 uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-800">DAS // STUDIO PORTFOLIO EDITION</span>
            <span>·</span>
            <span>MONOGRAPH REF: 2025/2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span>INTERNATIONAL ARCHITECTURAL PRACTICE</span>
            <span>·</span>
            <span className="text-stone-800">SWISS GRID MATRIX</span>
          </div>
        </div>

        {/* Main Dark Charcoal (#303030) Presentation Monograph Box */}
        <div className="w-full bg-[#303030] text-stone-100 shadow-2xl border border-stone-800/40 relative">
          {/* Navigation Bar */}
          <Navbar
            onOpenEstimator={() => setIsEstimatorOpen(true)}
            onOpenWhatsApp={() => handleOpenWhatsApp()}
          />

          <main>
            {/* 1. Hero Section */}
            <Hero
              onOpenEstimator={() => setIsEstimatorOpen(true)}
              onOpenConsultation={() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Real Works & On-Site Execution Showcase (Photos & Videos) */}
            <RealWorksShowcase
              onOpenMedia={(item) => setSelectedMedia(item)}
              onInquireWork={handleInquireWork}
            />

            {/* 3. About Us */}
            <About
              onOpenConsultation={() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3. Our Services (9 Services) */}
            <Services
              onSelectServiceForEnquiry={handleSelectServiceForEnquiry}
              onOpenWhatsAppForService={handleOpenWhatsAppForService}
            />

            {/* 4. Featured Projects (01 to 06) */}
            <FeaturedProjects
              onSelectProject={(project) => setSelectedProject(project)}
              onInquireProject={handleInquireProject}
            />

            {/* 5. Interior Design Portfolio (8 Categories & Magazine Grid) */}
            <InteriorPortfolio
              onOpenLightbox={(item) => setSelectedMedia(item)}
            />

            {/* 6. Construction Portfolio (Elevations, Villas, Real Site Work & Videos) */}
            <ConstructionPortfolio
              onOpenLightbox={(item) => setSelectedMedia(item)}
            />

            {/* 7. Our Process (01 to 06 Minimalist Workflow) */}
            <Process
              onStartProject={() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 8. Why Choose Us (6 Pillars) */}
            <WhyChooseUs />

            {/* 9. Client Testimonials */}
            <Testimonials />

            {/* 10. Frequently Asked Questions (Client Guidance) */}
            <FaqSection
              onOpenWhatsApp={(prompt) => handleOpenWhatsApp(prompt)}
            />

            {/* 11. Contact Us (with working enquiry form & WhatsApp) */}
            <Contact
              prefilledService={prefilledService}
              customWhatsAppPhone={customWhatsAppPhone}
              onUpdateWhatsAppPhone={handleUpdateWhatsApp}
            />
          </main>

          {/* Footer */}
          <Footer
            onOpenWhatsApp={() => handleOpenWhatsApp()}
          />
        </div>

        {/* Outer Frame Bottom Marker */}
        <div className="hidden sm:flex items-center justify-between pt-3 px-2 font-mono text-[11px] text-stone-600 uppercase tracking-widest">
          <span>PLATE END // DAS ARCHITECTURAL PRESENTATION</span>
          <span>BANGALORE · DUBAI · LONDON</span>
        </div>
      </div>

      {/* Floating Quick Action Bar */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2">
        <button
          onClick={() => setIsEstimatorOpen(true)}
          className="p-3 bg-[#303030] text-[#E9E0D7] border border-white/20 shadow-xl hover:border-white hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
          title="Turnkey Cost Estimator"
          aria-label="Turnkey Cost Estimator"
        >
          <Calculator className="w-4 h-4" />
          <span className="hidden md:inline uppercase">Estimator</span>
        </button>

        <button
          onClick={() => handleOpenWhatsApp()}
          className="p-3 bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 transition-all flex items-center gap-2 text-xs font-mono"
          title="WhatsApp Consultation"
          aria-label="WhatsApp Consultation"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden md:inline uppercase">WhatsApp</span>
        </button>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireProject}
      />

      {/* Media Lightbox Modal (Images & Real Site Execution Videos) */}
      <MediaLightboxModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onInquire={(title) => handleOpenWhatsApp(`Hello DAS, I am inquiring about your on-site work: "${title}".`)}
      />

      {/* Turnkey Budget & Area Estimator Modal */}
      <CostEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        whatsAppPhone={customWhatsAppPhone}
        onApplyToForm={handleApplyEstimateToForm}
      />
    </div>
  );
}
