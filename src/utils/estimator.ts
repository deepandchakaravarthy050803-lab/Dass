/**
 * Pure logic utilities for DAS Architecture & Construction
 * Includes budget estimating, WhatsApp message URL generation, and project filtering
 */

export interface EstimationParams {
  projectType: 'residential-construction' | 'commercial-construction' | 'luxury-interiors' | 'turnkey-villa' | 'renovation';
  areaSqFt: number;
  finishGrade: 'premium' | 'luxury' | 'ultra-luxury';
}

export interface EstimationResult {
  baseCostPerSqFt: number;
  estimatedTotalMin: number;
  estimatedTotalMax: number;
  estimatedTimelineMonths: { min: number; max: number };
  breakdown: {
    structuralOrCivil: number;
    finishesAndJoinery: number;
    mepAndElectrical: number;
    designAndManagement: number;
  };
}

// Rates per sq.ft in USD/equiv standard units (scalable)
const RATE_MATRIX: Record<EstimationParams['projectType'], Record<EstimationParams['finishGrade'], { min: number; max: number }>> = {
  'residential-construction': {
    premium: { min: 65, max: 85 },
    luxury: { min: 90, max: 130 },
    'ultra-luxury': { min: 140, max: 220 },
  },
  'commercial-construction': {
    premium: { min: 55, max: 75 },
    luxury: { min: 80, max: 115 },
    'ultra-luxury': { min: 120, max: 180 },
  },
  'luxury-interiors': {
    premium: { min: 45, max: 65 },
    luxury: { min: 75, max: 120 },
    'ultra-luxury': { min: 130, max: 210 },
  },
  'turnkey-villa': {
    premium: { min: 110, max: 150 },
    luxury: { min: 165, max: 240 },
    'ultra-luxury': { min: 250, max: 390 },
  },
  'renovation': {
    premium: { min: 40, max: 60 },
    luxury: { min: 70, max: 105 },
    'ultra-luxury': { min: 115, max: 175 },
  },
};

export function calculateEstimate(params: EstimationParams): EstimationResult {
  const safeArea = Math.max(100, Math.min(params.areaSqFt || 1000, 100000));
  const rates = RATE_MATRIX[params.projectType]?.[params.finishGrade] || RATE_MATRIX['residential-construction']['luxury'];

  const estimatedTotalMin = Math.round(safeArea * rates.min);
  const estimatedTotalMax = Math.round(safeArea * rates.max);
  const avgCostPerSqFt = Math.round((rates.min + rates.max) / 2);

  // Timeline estimate based on square footage and project type
  let baseMonths = 4;
  if (params.projectType.includes('construction') || params.projectType === 'turnkey-villa') {
    baseMonths = Math.max(6, Math.round(safeArea / 600));
  } else {
    baseMonths = Math.max(2, Math.round(safeArea / 1200));
  }

  return {
    baseCostPerSqFt: avgCostPerSqFt,
    estimatedTotalMin,
    estimatedTotalMax,
    estimatedTimelineMonths: {
      min: Math.max(2, baseMonths - 2),
      max: baseMonths + 3,
    },
    breakdown: {
      structuralOrCivil: Math.round(estimatedTotalMin * 0.45),
      finishesAndJoinery: Math.round(estimatedTotalMin * 0.30),
      mepAndElectrical: Math.round(estimatedTotalMin * 0.15),
      designAndManagement: Math.round(estimatedTotalMin * 0.10),
    },
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppUrl(phoneNumber: string, details: {
  name?: string;
  service?: string;
  areaSqFt?: number | string;
  message?: string;
  projectNumber?: string;
}): string {
  // Strip non-digit characters
  let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  let text = `Hello DAS Architecture & Construction,\n`;
  if (details.name) {
    text += `My name is ${details.name.trim()}.\n`;
  }
  if (details.projectNumber) {
    text += `I would like to inquire regarding Featured Project ${details.projectNumber}.\n`;
  }
  if (details.service) {
    text += `Interested Service: ${details.service}.\n`;
  }
  if (details.areaSqFt) {
    text += `Approximate Area: ${details.areaSqFt} sq.ft.\n`;
  }
  if (details.message) {
    text += `Project Brief: ${details.message.trim()}\n`;
  } else {
    text += `I would like to book an architectural consultation.\n`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}
