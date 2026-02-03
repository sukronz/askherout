import { GoogleGenAI } from "@google/genai";

export const getRomanticMessage = async (name: string): Promise<string> => {
  // Fallback quote if API key is missing or fails
  const fallback = `"After all this time?" "Always." - Severus Snape (Harry Potter)`;

  if (!process.env.API_KEY) {
    return fallback;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find a beautiful, short, and highly romantic quote from the movies "Before Sunrise", "Before Sunset", or the "Harry Potter" series. It should be perfect for a Valentine's proposal acceptance. Return ONLY the quote text followed by the source (Movie/Character). Do not use markdown.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Low latency
      }
    });

    return response.text || fallback;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return fallback;
  }
};