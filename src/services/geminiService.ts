import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const suggestPolarity = async (compoundName: string): Promise<number | null> => {
    // Helper to get a rough polarity guess for a user-typed name
    const modelId = "gemini-2.5-flash";
    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: `Estimate the relative polarity of "${compoundName}" on a scale of 1 (Non-polar, like Hexane) to 10 (Very Polar, like Water/Acids) for silica TLC. Return ONLY a JSON object: {"polarity": number}.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        polarity: { type: Type.NUMBER }
                    }
                }
            }
        });
        
        const json = JSON.parse(response.text || "{}");
        return json.polarity || null;
    } catch (e) {
        return null;
    }
}