import { GoogleGenAI, Type } from "@google/genai";
import { DesignTokens } from "../types";

const SYSTEM_INSTRUCTION = `
You are a Design System Expert. Generate production-ready design tokens in W3C format.

CRITICAL REQUIREMENTS:
1.  **Color Scales**: For 'primary', 'secondary', 'neutral', 'error', 'success', 'warning', and 'info', you MUST generate a full scale object with keys: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, and DEFAULT.
    *   DEFAULT should usually alias to the 500 or 600 shade (e.g. "{color.primary.500}").
2.  **Semantic Mapping**: Use W3C aliases (e.g., "{color.neutral.50}") for semantic tokens like 'background', 'surface', 'border'.
3.  **Strict JSON**: Return ONLY valid JSON. No markdown formatting.

Example Structure snippet:
"color": {
  "primary": {
    "50": { "$value": "#...", "$type": "color" },
    ...
    "DEFAULT": { "$value": "{color.primary.500}", "$type": "color" }
  },
  "error": {
     "50": { "$value": "#...", "$type": "color" },
     ...
     "DEFAULT": { "$value": "{color.error.500}", "$type": "color" }
  }
}
`;

export async function generateThemeFromDescription(description: string): Promise<Partial<DesignTokens> | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a complete W3C design token set for: "${description}".`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Partial<DesignTokens>;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}