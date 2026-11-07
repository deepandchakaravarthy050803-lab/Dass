export type ProjectCategory = 
  | 'All' 
  | 'Architecture' 
  | 'Interior Design' 
  | 'Residential Construction' 
  | 'Commercial Construction' 
  | 'Turnkey Solutions';

export interface Project {
  id: string;
  number: string; // e.g. "01", "02"
  title: string;
  category: string;
  subCategory: string;
  location: string;
  areaSqFt: number;
  year: number;
  description: string;
  fullOverview?: string;
  features: string[];
  imageUrl: string;
  galleryImages?: string[];
  client?: string;
  scope?: string;
  completionStatus?: 'Completed' | 'In Progress' | 'Handover Phase';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'Construction' | 'Interior Design' | 'Planning & Visualization';
  description: string;
  highlights: string[];
  deliverables: string[];
  imageUrl: string;
  typicalDuration: string;
}

export interface InteriorGalleryItem {
  id: string;
  title: string;
  category: 'Living Rooms' | 'Bedrooms' | 'Modular Kitchens' | 'Bathrooms' | 'False Ceilings' | 'Dining Rooms' | 'Offices' | 'Custom Furniture' | 'Renovation' | 'Commercial';
  area: string;
  style: string;
  materials: string;
  imageUrl: string;
  featured?: boolean;
}

export interface ConstructionGalleryItem {
  id: string;
  title: string;
  category: 'Residential Buildings' | 'Luxury Villas' | 'Contemporary Elevations' | 'Commercial Buildings' | 'Structural & Site Progress' | 'Completed Projects' | 'Infrastructure';
  location: string;
  stage: string;
  structuralDetails: string;
  imageUrl: string;
  videoUrl?: string;
  isRealSiteAsset?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  milestones: string[];
  durationWeeks: string;
}

export interface WhyChoosePillar {
  number: string;
  title: string;
  summary: string;
  description: string;
  metrics: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  projectName: string;
  location: string;
  quote: string;
  rating: number;
  year: number;
  scope: string;
  avatarUrl: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  estimatedArea: string;
  budgetRange: string;
  timeline: string;
  message: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Consultation' | 'Pricing & BOQ' | 'Construction' | 'Customization';
}

export interface RealWorkItem {
  id: string;
  title: string;
  workType: 'interiors' | 'foundation' | 'demolition' | 'commercial' | 'ceilings' | 'renovation';
  categoryLabel: string;
  stageLabel: string;
  mediaType: 'video' | 'image';
  mediaUrl: string;
  thumbnailUrl?: string;
  workDone: string[];
  location?: string;
  highlight: string;
}
