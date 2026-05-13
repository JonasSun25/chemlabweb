import { GoogleGenAI } from "@google/genai";
import { SimulationState } from '../types';

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askLabAssistant = async (
  query: string, 
  currentState: SimulationState,
  solventPolarity: number
): Promise<string> => {
  const ai = getAI();
  if (!ai) return "Error: API Key missing. Please check configuration.";

  const context = `
    You are an expert Chemistry Professor teaching Column Chromatography.
    
    Current Simulation State:
    - Phase: ${currentState}
    - Solvent Polarity: ${solventPolarity < 0.3 ? 'Low (Non-polar)' : solventPolarity < 0.7 ? 'Medium' : 'High (Polar)'}
    - Stationary Phase: Silica Gel (Highly Polar)
    
    Concept: 
    - Compound A is Non-polar (yellow). It travels fast because it likes the solvent.
    - Compound B is Polar (blue). It travels slow because it adsorbs to the Silica.
    - "Like dissolves like".
    
    User Query: "${query}"
    
    Provide a concise, encouraging, and scientifically accurate answer (max 3 sentences). Focus on the interaction between the stationary phase, mobile phase, and the compounds.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: context,
    });
    return response.text || "I'm analyzing the column...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the lab network right now.";
  }
};