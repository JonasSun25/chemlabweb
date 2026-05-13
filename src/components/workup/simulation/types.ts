
export enum ExperimentState {
  SETUP = 'SETUP',         // Initial state, solvent only
  ADDING_SOLUTE = 'ADDING_SOLUTE', // Dissolving mixture
  ADDING_LIQUID = 'ADDING_LIQUID', // Pouring reagent
  ADD_REAGENT = 'ADD_REAGENT', // Reagent added, ready to mix
  MIXING = 'MIXING',       // Shaking
  SETTLING = 'SETTLING',   // Separating
  SEPARATED = 'SEPARATED', // Layers distinct
  DRAINING = 'DRAINING',   // Removing layer
  POURING = 'POURING',     // Pouring out top layer
  RETURNING = 'RETURNING', // Pouring back into funnel
  FINISHED = 'FINISHED'    // Step complete
}

export enum MoleculeType {
  ACID = 'ACID',       // Benzoic Acid
  BASE = 'BASE',       // p-Chloroaniline
  NEUTRAL = 'NEUTRAL'  // Diphenyl
}

export interface Solvent {
  name: string;
  density: number; // g/mL. >1 sinks, <1 floats
  color: string;
  formula: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  type: MoleculeType;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// DCM Removed. Only lighter solvents remain.
export const SOLVENTS: Solvent[] = [
  { name: 'Diethyl Ether', density: 0.71, color: '#fde047', formula: 'Et2O' },       // Lighter
  { name: 'Ethyl Acetate', density: 0.90, color: '#fde047', formula: 'EtOAc' },      // Lighter
];

export enum AqueousReagent {
  WATER = 'Water',
  HCL = '5% HCl',
  NAOH = '10% NaOH'
}

export interface CollectedFraction {
    id: string;
    label: string;
    color: string;
    contents: string[];
    volume: number; // 0-100 scale for visual
    moleculeType: MoleculeType;
    isTemp?: boolean; // If true, this is a holding flask to be returned
}

export interface SimulationLabels {
    funnel: string | null;
    flask: string | null;
}
