import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { generateWhatsAppUrl, validateEmail, validatePhone } from '../utils/estimator';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Settings, 
  X,
  Compass
} from 'lucide-react';

interface ContactProps {
  prefilledService?: string;
  customWhatsAppPhone: string;
  onUpdateWhatsAppPhone: (newPhone: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ 
  prefilledService = '', 
  customWhatsAppPhone,
  onUpdateWhatsAppPhone
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: prefilledService || 'Residential Construction',
    estimatedArea: '3500',
    budgetRange: 'Luxury Standard ($250k - $500k)',
    timeline: 'Within 3 Months',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isPhoneSettingsOpen, setIsPhoneSettingsOpen] = useState(false);
  const [tempPhone, setTempPhone] = useState(customWhatsAppPhone);

  // Sync if prefilledService changes
  React.useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, serviceType: prefilledService }));
    }
  }, [prefilledService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      errors.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      errors.phone = 'Valid contact phone number is required';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief outline of your architectural requirements';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);
  };

  const handleLaunchWhatsApp = () => {
    const url = generateWhatsAppUrl(customWhatsAppPhone, {
      name: formData.fullName,
      service: formData.serviceType,
      areaSqFt: formData.estimatedArea,
      message: formData.message || `Inquiry regarding ${formData.serviceType} for ${formData.estimatedArea} sq.ft.`,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="relative bg-[#303030] text-stone-100 border-b border-white/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400">10. COMMENCE ENGAGEMENT</span>
            <span className="text-stone-600">/</span>
            <span className="font-mono text-xs uppercase text-stone-300">CONTACT & ENQUIRY</span>
          </div>
          <button
            onClick={() => setIsPhoneSettingsOpen(true)}
            className="flex items-center gap-1.5 font-mono text-xs text-stone-400 hover:text-white transition-colors"
            title="Configure WhatsApp Contact Number"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>EDIT WHATSAPP: {customWhatsAppPhone}</span>
          </button>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
            Initiate Your Architectural Commission
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Our Principal Architects and Turnkey Directors are ready to review your blueprints, examine your topography, and formulate an itemized feasibility proposal.
          </p>
        </div>

        {/* Two-Column Swiss Layout: Contact Info & Map vs. Working Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Coordinates, Direct Channels & Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Brand Logo & Studio Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border border-white/30 flex items-center justify-center bg-stone-900">
                  <span className="font-mono text-base tracking-widest font-bold text-white">DAS</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-widest uppercase text-white font-mono">
                    {COMPANY_INFO.name}
                  </h3>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">
                    Studio of Architecture & Construction
                  </p>
                </div>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed">
                Operating internationally with flagship studios and field construction operations. We welcome private walkthroughs by prior appointment.
              </p>
            </div>

            {/* Direct Contact Channels List */}
            <div className="space-y-4 border-t border-b border-white/10 py-6 text-sm">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-stone-400 mt-1 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-stone-400 block">
                    DIRECT VOICE LINE:
                  </span>
                  <a
                    href={`tel:${COMPANY_INFO.contacts.phone.replace(/\s+/g, '')}`}
                    className="text-white hover:text-[#E9E0D7] font-medium transition-colors"
                  >
                    {COMPANY_INFO.contacts.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-stone-400 block">
                    WHATSAPP DIRECT ENQUIRY:
                  </span>
                  <button
                    onClick={handleLaunchWhatsApp}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>{customWhatsAppPhone}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-stone-400 mt-1 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-stone-400 block">
                    EDITORIAL & PROJECT BLUEPRINTS:
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.contacts.email}`}
                    className="text-white hover:text-[#E9E0D7] transition-colors block"
                  >
                    {COMPANY_INFO.contacts.email}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.contacts.secondaryEmail}`}
                    className="text-stone-400 hover:text-white text-xs transition-colors block"
                  >
                    {COMPANY_INFO.contacts.secondaryEmail}
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-400 mt-1 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-stone-400 block">
                    STUDIO & PAVILION:
                  </span>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    {COMPANY_INFO.contacts.address}
                  </p>
                </div>
              </div>

              {/* Studio Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-stone-400 mt-1 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-stone-400 block">
                    CONSULTATION HOURS:
                  </span>
                  <p className="text-stone-300 text-xs">
                    {COMPANY_INFO.contacts.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-stone-400 block">
                DIGITAL REPOSITORIES & MONOGRAPHS:
              </span>
              <div className="flex items-center gap-4 text-stone-300">
                <a
                  href={COMPANY_INFO.contacts.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 hover:border-white hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.contacts.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 hover:border-white hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.contacts.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 hover:border-white hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Google Maps Location Embed & Route Card */}
            <div className="border border-white/15 bg-stone-900 p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>STUDIO COORDINATES</span>
                </span>
                <span>12.9716° N, 77.5946° E</span>
              </div>

              {/* Styled Map Canvas / Preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950 border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                  alt="DAS Studio Map Coordinates"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#303030]/60 flex items-center justify-center p-4">
                  <div className="bg-[#262626]/90 border border-white/30 p-3 text-center max-w-xs backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mx-auto block mb-1"></span>
                    <div className="text-xs font-bold text-white uppercase font-mono">
                      DAS Central Pavilion
                    </div>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      44 Architectural Axis, Central Design District
                    </p>
                    <a
                      href="https://maps.google.com/?q=12.9716,77.5946"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#E9E0D7] hover:underline mt-2 font-mono"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Architectural Consultation Enquiry Form */}
          <div className="lg:col-span-7 border border-white/15 bg-stone-900 p-6 sm:p-10 shadow-2xl">
            <div className="border-b border-white/10 pb-4 mb-8">
              <span className="text-xs font-mono tracking-widest uppercase text-stone-400 block mb-1">
                PROJECT ENQUIRY DISPATCH
              </span>
              <h3 className="text-2xl font-bold text-white uppercase font-display">
                Request a Feasibility Study
              </h3>
            </div>

            {formSubmitted ? (
              <div className="py-12 space-y-6 text-center">
                <div className="w-14 h-14 border border-white/30 flex items-center justify-center mx-auto text-emerald-400 bg-stone-950">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-white uppercase font-display">
                    Commission Request Received
                  </h4>
                  <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your project outline has been assigned to our Principal Architect. We will contact you within 24 business hours.
                  </p>
                </div>

                <div className="p-4 bg-stone-950 border border-white/10 max-w-md mx-auto text-left font-mono text-xs text-stone-300 space-y-1">
                  <div>SERVICE: <span className="text-white">{formData.serviceType}</span></div>
                  <div>AREA: <span className="text-white">{formData.estimatedArea} Sq.Ft</span></div>
                  <div>DISPATCH TICKET: <span className="text-[#E9E0D7]">DAS-REQ-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handleLaunchWhatsApp}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp Now</span>
                  </button>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-3 text-xs uppercase tracking-widest text-stone-300 border border-white/20 hover:border-white transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300 flex items-center justify-between">
                      <span>Full Name *</span>
                      {formErrors.fullName && <span className="text-amber-400 text-[10px] lowercase">{formErrors.fullName}</span>}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Julian Vance"
                      className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300 flex items-center justify-between">
                      <span>Email Address *</span>
                      {formErrors.email && <span className="text-amber-400 text-[10px] lowercase">{formErrors.email}</span>}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300 flex items-center justify-between">
                      <span>Phone Number *</span>
                      {formErrors.phone && <span className="text-amber-400 text-[10px] lowercase">{formErrors.phone}</span>}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 80981 54005"
                      className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Service Type Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300">
                      Primary Discipline *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Residential Construction">Residential Construction</option>
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Luxury Interior Design">Luxury Interior Design</option>
                      <option value="Residential Interior Design">Residential Interior Design</option>
                      <option value="Commercial Interior Design">Commercial Interior Design</option>
                      <option value="Architectural Planning">Architectural Planning</option>
                      <option value="3D Elevation & Visualization">3D Elevation & Visualization</option>
                      <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                      <option value="Turnkey Construction Solutions">Turnkey Construction Solutions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Estimated Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300">
                      Estimated Sq.Ft
                    </label>
                    <input
                      type="number"
                      value={formData.estimatedArea}
                      onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                      placeholder="e.g. 4000"
                      className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300">
                      Budget Grade
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Premium Standard ($100k - $250k)">Premium Standard ($100k - $250k)</option>
                      <option value="Luxury Standard ($250k - $500k)">Luxury Standard ($250k - $500k)</option>
                      <option value="Ultra-Luxury Bespoke ($500k+)">Ultra-Luxury Bespoke ($500k+)</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300">
                      Target Start
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                      <option value="Within 3 Months">Within 3 Months</option>
                      <option value="6+ Months (Planning Phase)">6+ Months (Planning Phase)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-stone-300 flex items-center justify-between">
                    <span>Project Brief & Location Details *</span>
                    {formErrors.message && <span className="text-amber-400 text-[10px] lowercase">{formErrors.message}</span>}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your site location, family/corporate requirements, aesthetic inspirations, or specific architectural aspirations..."
                    className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-white transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Form Buttons: Standard Submit + WhatsApp Direct Launch */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest bg-[#E9E0D7] text-stone-900 font-bold hover:bg-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Architectural Brief</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLaunchWhatsApp}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Connect</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Editable WhatsApp Phone Settings Modal */}
      {isPhoneSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#262626] border border-white/20 max-w-md w-full p-6 text-stone-100 relative shadow-2xl">
            <button
              onClick={() => setIsPhoneSettingsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white border border-white/10"
              aria-label="Close settings modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="font-mono text-xs text-stone-400 mb-2">
              STUDIO INTEGRATION SETTINGS
            </div>
            <h4 className="text-xl font-bold text-white uppercase font-display mb-3">
              Configure WhatsApp Number
            </h4>
            <p className="text-xs text-stone-300 mb-5 leading-relaxed">
              Enter your international country code and mobile number (e.g. +91 80981 54005). All website WhatsApp buttons and inquiry forms will automatically link directly to this phone.
            </p>

            <div className="space-y-3 mb-6">
              <label className="text-xs font-mono uppercase text-stone-300 block">
                Target WhatsApp Phone:
              </label>
              <input
                type="text"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                placeholder="+91 80981 54005"
                className="w-full bg-stone-950 border border-white/20 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsPhoneSettingsOpen(false)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-stone-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdateWhatsAppPhone(tempPhone);
                  setIsPhoneSettingsOpen(false);
                }}
                className="px-5 py-2 text-xs uppercase tracking-wider bg-[#E9E0D7] text-stone-900 font-bold hover:bg-white"
              >
                Save Phone Number
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
