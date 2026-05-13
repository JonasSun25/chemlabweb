export type NucleusType = '1H' | '13C';

export interface PeakAnalysis {
  inductive?: string;  // 诱导效应
  resonance?: string;  // 共轭效应
  anisotropy?: string; // 磁各向异性
}

export interface PeakData {
  id: string; // Corresponds to atom ID
  ppm: number;
  multiplicity: 's' | 'd' | 't' | 'q' | 'm' | 'dt' | 'dd'; // Extended types
  integration: number; // For 1H only usually
  assignment: string; // e.g., "Methyl group protons"
  analysis?: PeakAnalysis; // Optional detailed analysis
}

export interface Atom {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'C' | 'H' | 'O' | 'N';
  groupColor: string; // For visual grouping (background circle)
  textColor?: string; // For label text color
}

export interface Bond {
  from: string;
  to: string;
  type: 'single' | 'double';
}

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  atoms: Atom[];
  bonds: Bond[];
  peaks1H: PeakData[];
  peaks13C: PeakData[];
  structureImage?: string; // Optional URL for static structure image
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}