import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRODUCTS, DELIVERY_INFO, SHOP_NAME } from "../constants";

// VITE-ის შემთხვევაში გარემოს ცვლადებს ასე ვკითხულობთ:
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

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
- If a user asks about a specific product like the X98Q, provide its technical details.
- Respond in Georgian if the user speaks Georgian, otherwise in English.
`;

export const getChatResponse = async (userMessage: string, history: any[]) => {
  try {
    // ვიყენებთ სტაბილურ მოდელს: gemini-1.5-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.parts[0].text }],
      })),
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ბოდიში, კავშირის პრობლემაა. სცადეთ ცოტა ხანში.";
  }
};