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

export async function runAccessibilityAudit(tokens: DesignTokens): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We send a simplified version of tokens to avoid hitting token limits if necessary, 
    // but usually DesignTokens JSON is small enough.
    const tokensStr = JSON.stringify(tokens, null, 2);

    const prompt = `
      Analyze the following Design System Tokens for WCAG 2.1 AA Accessibility compliance.
      
      Focus on:
      1. **Color Contrast**: Check if 'text' colors have sufficient contrast against 'background' and 'surface'. Check if 'primary' color is accessible on white/surface.
      2. **Typography**: Check if base font sizes and line heights are readable.
      3. **Semantic Integrity**: Are the status colors (error, success) distinguishable for color-blind users (based on hex values)?

      Provide the report in Markdown format. Use emojis for Pass/Fail/Warn.
      
      Tokens:
      ${tokensStr}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Failed to generate audit report.";

  } catch (error) {
    console.error("Gemini Audit Error:", error);
    return "Error running accessibility audit. Please check your API key.";
  }
}