import { Compound } from './types';

export const MAX_COMPOUNDS = 5;

export const DEFAULT_COMPOUNDS: Compound[] = [
  { id: '1', name: 'Benzophenone', polarity: 3.5, color: '#ef4444' }, // Red
  { id: '2', name: 'Benzyl Alcohol', polarity: 6.0, color: '#3b82f6' }, // Blue
  { id: '3', name: 'Benzoic Acid', polarity: 8.5, color: '#eab308' }, // Yellow
];

export const AVAILABLE_COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#eab308', // Yellow
  '#22c55e', // Green
  '#a855f7', // Purple
  '#f97316', // Orange
  '#ec4899', // Pink
];

// Refined Chromatography Model Constants (Non-linear)
// Model: Rf = 1 / (1 + k')
// k' = (CompoundPolarity ^ 2) / (e^(SolventRatio * SENSITIVITY) * MOBILITY)
export const MODEL_PARAMS = {
  // Sensitivity of solvent strength (Higher = solvent is more powerful)
  SOLVENT_SENSITIVITY: 0.045, 
  // Base mobility factor
  MOBILITY_FACTOR: 1.5,
  // Power of compound polarity (Higher = polar compounds stick much harder)
  POLARITY_POWER: 2,
  
  MIN_RF: 0.01,
  MAX_RF: 0.99
};