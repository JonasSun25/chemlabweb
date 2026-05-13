export enum SimulationState {
  IDLE = 'IDLE',
  PACKING = 'PACKING',
  READY = 'READY',
  LOADING = 'LOADING',
  ELUTING = 'ELUTING',
  SWAPPING = 'SWAPPING', // New state for changing test tubes
  FINISHED = 'FINISHED',
}

export enum CompoundType {
  A = 'A', // Non-polar (Fast)
  B = 'B', // Polar (Slow)
}

export interface Particle {
  id: number;
  type: CompoundType;
  y: number; // Position in percentage (0-100)
  x: number; // Horizontal wobble
  speed: number;
  visible: boolean;
  collected: boolean;
}

export interface Fraction {
  id: number;
  countA: number;
  countB: number;
  total: number;
  volume: number; // Track liquid volume
}

export interface SimulationConfig {
  solventPolarity: number; // 0 (Non-polar) to 1 (Polar)
  flowRate: number;
  stationaryPhasePolarity: number;
}

export interface LabAssistantMessage {
  role: 'user' | 'model';
  text: string;
}