import OpenAI from "openai";

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate a response to customer queries using OpenAI
 */
export async function generateAIResponse(message: string): Promise<string> {
  try {
    // System prompt to guide the AI to respond like a Walmart customer service representative
    const systemPrompt = `
    You are a Walmart customer support assistant. Respond in a helpful, friendly and professional manner.
    Keep responses brief and to the point, focusing on Walmart-specific information.
    If you don't know the answer to a Walmart-specific question, kindly explain that you
    would need to check with a supervisor or suggest the customer visit Walmart.com or
    contact their local store for the most accurate information.
    
    Walmart's support channels:
    - Visit Walmart.com for most services
    - Local store customer service desks for in-person help
    - Walmart app for mobile services
    - 1-800-WALMART for phone support
    
    Walmart customers often ask about:
    - Order tracking and history
    - Returns and refunds
    - Product availability
    - Store locations and hours
    - Walmart+ membership
    - Pickup and delivery services
    - Product warranties
    `;

    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I'm having trouble processing your request. How else can I help you?";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return "I apologize, but I'm currently experiencing technical difficulties. Please try again later or contact Walmart customer service directly at 1-800-WALMART.";
  }
}