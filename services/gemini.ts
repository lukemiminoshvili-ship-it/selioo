
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, DELIVERY_INFO, SHOP_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are the official AI store assistant for ${SHOP_NAME}, a premier electronics and tech shop in Georgia.
Your goal is to help customers browse our catalog and make purchases.

CURRENT CATALOG:
${PRODUCTS.map(p => `- ${p.name} (${p.model}): ${p.price}. Specs: ${JSON.stringify(p.specs)}`).join('\n')}

SHOP POLICIES:
- Delivery: ${DELIVERY_INFO.time} across Georgia.
- Payment Methods: We accept TBC Bank, Bank of Georgia (BOG), and major Credit Cards.
- Return Policy: 14-day hassle-free returns.

INSTRUCTIONS:
- Be professional, polite, and tech-savvy.
- If a user asks about a specific product like the X98Q, provide its technical details (CPU, RAM, OS).
- If they ask about other products, explain that we are currently expanding our catalog and the ${PRODUCTS[0].name} is our featured item.
- Respond in Georgian if the user speaks Georgian, otherwise in English.
`;

export const getChatResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: h.parts })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "ბოდიში, ვერ დავამუშავე მოთხოვნა. კიდევ რით შემიძლია დაგეხმაროთ?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with our connection. Please try again later.";
  }
};
