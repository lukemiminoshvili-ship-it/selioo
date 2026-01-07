import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRODUCTS, DELIVERY_INFO, SHOP_NAME } from "../constants";

// შენი Gemini API Key
const apiKey = "AIzaSyDBtzV5lz1C2GfZwkhyc-pU5rodW3au6CE";
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_INSTRUCTION = `
შენ ხარ ${SHOP_NAME}-ის ოფიციალური ასისტენტი. 
მაღაზია მდებარეობს საქართველოში.

კატალოგი:
${PRODUCTS.map(p => `- ${p.name} (${p.model}): ${p.price}. მონაცემები: ${JSON.stringify(p.specs)}`).join('\n')}

პოლიტიკა:
- მიწოდება: ${DELIVERY_INFO.time} მთელ საქართველოში.
- გადახდა: TBC, BOG, Stripe.
- დაბრუნება: 14 დღე.

ინსტრუქცია:
- იყავი თავაზიანი და ტექნოლოგიებში გარკვეული.
- უპასუხე ქართულად (თუ ინგლისურად არ მოგმართეს).
- თუ გკითხავენ X98Q-ზე, აუხსენი რომ ეს არის საუკეთესო TV Box 140 ლარად.
`;

export const getChatResponse = async (userMessage: string, history: any[]) => {
  try {
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