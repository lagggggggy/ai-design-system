import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { DesignTokens } from "../types";

const SYSTEM_INSTRUCTION = `
You are a Design System Expert. Generate production-ready design tokens.
Ensure 'primaryHover' is a legible variation of 'primary'.
Ensure typography follows a logical scale.
Return ONLY the JSON object.
`;

export async function generateThemeFromDescription(description: string): Promise<Partial<DesignTokens> | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a design token set for: "${description}".`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING },
            primaryHover: { type: Type.STRING },
            secondary: { type: Type.STRING },
            secondaryHover: { type: Type.STRING },
            background: { type: Type.STRING },
            surface: { type: Type.STRING },
            text: { type: Type.STRING },
            textInverse: { type: Type.STRING },
            border: { type: Type.STRING },
            
            borderRadiusSmall: { type: Type.STRING },
            borderRadiusMedium: { type: Type.STRING },
            borderRadiusLarge: { type: Type.STRING },
            borderWidth: { type: Type.STRING },
            spacingUnit: { type: Type.STRING },
            
            fontFamily: { type: Type.STRING },
            fontSizeSm: { type: Type.STRING },
            fontSizeMd: { type: Type.STRING },
            fontSizeLg: { type: Type.STRING },
            fontWeightNormal: { type: Type.STRING },
            fontWeightBold: { type: Type.STRING },
            
            shadowSm: { type: Type.STRING },
            shadowMd: { type: Type.STRING },
          },
          required: ["primary", "secondary", "background", "text"],
        }
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