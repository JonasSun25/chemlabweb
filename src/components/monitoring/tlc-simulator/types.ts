export interface Compound {
  id: string;
  name: string;
  polarity: number; // 1 (Non-polar) to 10 (Very Polar)
  color: string;
}

export interface SimulationResult {
  compoundId: string;
  rf: number;
}

export interface AnalysisResult {
  deltaRf: number;
  status: 'poor' | 'fair' | 'good' | 'excellent';
  message: string;
  worstPair: [string, string]; // Names of the two closest compounds
}

export interface AIAnalysisResponse {
  analysis: string;
  suggestions: string[];
}