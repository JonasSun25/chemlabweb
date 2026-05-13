import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

let aiClient: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const generateExplanation = async (
  prompt: string, 
  context?: string
): Promise<string> => {
  if (!aiClient) {
    return "API Key not configured. Please check your environment variables.";
  }

  try {
    const fullPrompt = context 
      ? `Context: ${context}\n\nStudent Question: ${prompt}` 
      : prompt;

    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return response.text || "I couldn't generate an explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while thinking about chemistry.";
  }
};
