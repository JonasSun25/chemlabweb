
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.error("API_KEY is missing via process.env.GEMINI_API_KEY");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const askChemistryTutor = async (
  question: string, 
  contextState: string,
  currentSolvent: string,
  currentReagent: string
): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "Error: API Key missing.";

  const systemInstruction = `
    You are a professional and engaging Chemistry Professor in a Virtual Lab.
    You are teaching students about Liquid-Liquid Extraction.
    
    Current Experiment Context:
    - State: ${contextState}
    - Organic Solvent: ${currentSolvent}
    - Aqueous Reagent: ${currentReagent}
    
    Specific Case Study (Separation of 3 components):
    1. **p-Chloroaniline (Basic)**: 
       - Structure: Benzene ring with -NH2 and -Cl.
       - Reaction with HCl: -NH2 becomes -NH3+ (Ammonium ion).
       - Result: Becomes polar/ionic and moves to the Aqueous Acidic layer.
       
    2. **Benzoic Acid (Acidic)**: 
       - Structure: Benzene ring with -COOH.
       - Reaction with NaOH: -COOH becomes -COO- (Carboxylate ion).
       - Result: Becomes polar/ionic and moves to the Aqueous Basic layer.
       
    3. **Diphenyl (Neutral)**: 
       - Structure: Two benzene rings connected.
       - Reaction: None.
       - Result: Remains non-polar and stays in the Organic layer.
    
    Rules:
    1. Answer concisely in English.
    2. If asked about the structures, explain how the charge (ion creation) affects solubility. "Like dissolves like" -> Charged ions love water; Neutral organics love organic solvent.
    3. Use analogies (e.g., solubility is like "choosing a preferred room").
    4. Keep responses under 100 words unless explaining deep theory.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "I spaced out for a second, could you repeat that?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Network error, please try again.";
  }
};
