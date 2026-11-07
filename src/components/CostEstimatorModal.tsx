import React, { useState } from 'react';
import { calculateEstimate, formatCurrency, generateWhatsAppUrl, EstimationParams } from '../utils/estimator';
import { X, Calculator, ArrowRight, MessageSquare, Clock, ShieldCheck, Ruler } from 'lucide-react';

interface CostEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsAppPhone: string;
  onApplyToForm: (service: string, area: string, budget: string) => void;
}

export const CostEstimatorModal: React.FC<CostEstimatorModalProps> = ({
  isOpen,
  onClose,
  whatsAppPhone,
  onApplyToForm,
}) => {
  const [projectType, setProjectType] = useState<EstimationParams['projectType']>('residential-construction');
  const [areaSqFt, setAreaSqFt] = useState<number>(3500);
  const [finishGrade, setFinishGrade] = useState<EstimationParams['finishGrade']>('luxury');

  if (!isOpen) return null;

  const estimate = calculateEstimate({
    projectType,
    areaSqFt,
    finishGrade,
  });

  const projectTypeLabels: Record<EstimationParams['projectType'], string> = {
    'residential-construction': 'Residential Construction',
    'commercial-construction': 'Commercial Construction',
    'luxury-interiors': 'Luxury Interior Architecture',
    'turnkey-villa': 'Turnkey Luxury Villa (Complete)',
    'renovation': 'Renovation & Structural Retrofitting',
  };

  const handleSendToWhatsApp = () => {
    const textMsg = `Hello DAS, I calculated an architectural estimate on your portfolio:
Project: ${projectTypeLabels[projectType]}
Area: ${areaSqFt} sq.ft (${finishGrade.toUpperCase()} Finish)
Estimated Range: ${formatCurrency(estimate.estimatedTotalMin)} – ${formatCurrency(estimate.estimatedTotalMax)}
Estimated Timeline: ${estimate.estimatedTimelineMonths.min}–${estimate.estimatedTimelineMonths.max} Months
I would like to discuss this with your design team.`;

    const cleanPhone = whatsAppPhone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTransferToConsultation = () => {
    const serviceName = projectTypeLabels[projectType];
    const budgetStr = `${formatCurrency(estimate.estimatedTotalMin)} - ${formatCurrency(estimate.estimatedTotalMax)}`;
    onApplyToForm(serviceName, areaSqFt.toString(), budgetStr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#262626] border border-white/20 max-w-3xl w-full p-4 sm:p-6 lg:p-8 text-stone-100 relative shadow-2xl my-4 sm:my-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white border border-white/15 bg-stone-900"
          aria-label="Close estimator modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-stone-400 mb-2 uppercase">
          <Calculator className="w-3.5 h-3.5 text-stone-300" />
          <span>ESTIMATION MATRIX // SWISS BUDGET CALCULATOR</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase font-display mb-2">
          Turnkey Project Cost & Timeline Estimator
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm mb-6 leading-relaxed">
          Formulated upon 18+ years of empirical construction data, certified material bills of quantities, and international finishing standards.
        </p>

        {/* Form Inputs Grid */}
        <div className="space-y-6 border-t border-b border-white/10 py-6 mb-6">
          {/* Project Type */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-stone-300 block">
              1. Select Project Classification
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(projectTypeLabels) as EstimationParams['projectType'][]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setProjectType(key)}
                  className={`px-3 py-2 text-xs text-left font-mono border transition-colors flex items-center justify-between ${
                    projectType === key
                      ? 'bg-[#E9E0D7] text-stone-900 border-[#E9E0D7] font-bold'
                      : 'border-white/15 text-stone-300 bg-stone-900/60 hover:border-white/40'
                  }`}
                >
                  <span className="truncate">{projectTypeLabels[key]}</span>
                  {projectType === key && <span className="font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Area Input & Quick Sliders */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-stone-300">
              <span className="uppercase">2. Built-Up Area (Square Feet)</span>
              <span className="text-white font-bold text-sm">{areaSqFt.toLocaleString()} SQ.FT</span>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="500"
                max="20000"
                step="250"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full accent-[#E9E0D7] h-1.5 bg-stone-800 cursor-pointer"
              />
              <input
                type="number"
                min="200"
                max="100000"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Math.max(100, Number(e.target.value)))}
                className="w-28 bg-stone-950 border border-white/20 px-2 py-1 text-xs text-white font-mono text-right"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              {[1500, 3000, 5000, 8500, 15000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAreaSqFt(preset)}
                  className="px-2 py-1 text-[10px] font-mono border border-white/10 text-stone-400 hover:text-white hover:border-white/30"
                >
                  {preset.toLocaleString()} sf
                </button>
              ))}
            </div>
          </div>

          {/* Finish Grade */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-stone-300 block">
              3. Architectural Specification Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'premium', label: 'Premium Standard', desc: 'Engineered hardwood, certified RCC, Grohe' },
                { id: 'luxury', label: 'Luxury Architectural', desc: 'Italian marble, custom joinery, Reynaers' },
                { id: 'ultra-luxury', label: 'Ultra-Luxury Bespoke', desc: 'Rare onyx, bespoke brass, Miele, smart home' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setFinishGrade(tier.id as EstimationParams['finishGrade'])}
                  className={`p-3 text-left border transition-colors flex flex-col justify-between ${
                    finishGrade === tier.id
                      ? 'bg-stone-900 border-[#E9E0D7] text-white'
                      : 'border-white/15 text-stone-400 bg-stone-950/40 hover:border-white/30'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase font-mono block text-stone-100">
                      {tier.label}
                    </span>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      {tier.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Results Display Card */}
        <div className="bg-stone-950 border border-white/15 p-5 sm:p-6 mb-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                PROJECTED INVESTMENT RANGE:
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mt-1">
                {formatCurrency(estimate.estimatedTotalMin)} — {formatCurrency(estimate.estimatedTotalMax)}
              </div>
            </div>

            <div className="sm:text-right font-mono text-xs">
              <span className="text-stone-400 block uppercase">Average Sq.Ft Rate:</span>
              <span className="text-emerald-400 font-bold text-sm">~{formatCurrency(estimate.baseCostPerSqFt)} / sq.ft</span>
            </div>
          </div>

          {/* Timeline and Quality Assurance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-stone-300">
              <Clock className="w-4 h-4 text-stone-400 shrink-0" />
              <span>
                Estimated Turnaround: <strong className="text-white">{estimate.estimatedTimelineMonths.min} to {estimate.estimatedTimelineMonths.max} Months</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Includes 50-Yr Structural Warranty & Full QA</span>
            </div>
          </div>

          {/* Itemized Breakdown Bar */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
              ESTIMATED CAPITAL ALLOCATION BREAKDOWN:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-stone-900 border border-white/5">
                <span className="text-stone-400 block">Structural/Civil (45%):</span>
                <span className="text-white font-bold">{formatCurrency(estimate.breakdown.structuralOrCivil)}</span>
              </div>
              <div className="p-2 bg-stone-900 border border-white/5">
                <span className="text-stone-400 block">Finishes/Joinery (30%):</span>
                <span className="text-white font-bold">{formatCurrency(estimate.breakdown.finishesAndJoinery)}</span>
              </div>
              <div className="p-2 bg-stone-900 border border-white/5">
                <span className="text-stone-400 block">MEP & Electrical (15%):</span>
                <span className="text-white font-bold">{formatCurrency(estimate.breakdown.mepAndElectrical)}</span>
              </div>
              <div className="p-2 bg-stone-900 border border-white/5">
                <span className="text-stone-400 block">Design & Mgmt (10%):</span>
                <span className="text-white font-bold">{formatCurrency(estimate.breakdown.designAndManagement)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-stone-500">
            *Final BOQ issued following physical site topography & municipal analysis.
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSendToWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Estimate</span>
            </button>
            <button
              onClick={handleTransferToConsultation}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest bg-[#E9E0D7] text-stone-900 font-bold hover:bg-white transition-colors"
            >
              <span>Transfer to Enquiry Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
