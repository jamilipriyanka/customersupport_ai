import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateAIResponse } from '../services/openai';

// Process customer chat messages and generate responses using OpenAI
export const processChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Check for simple keywords first for faster responses to common questions
    const quickResponse = getQuickResponse(message);
    
    if (quickResponse) {
      return res.status(200).json({ 
        id: uuidv4(),
        response: quickResponse 
      });
    }
    
    // For more complex queries, use OpenAI
    const aiResponse = await generateAIResponse(message);
    
    return res.status(200).json({ 
      id: uuidv4(),
      response: aiResponse 
    });
  } catch (error) {
    console.error('Error processing chat:', error);
    return res.status(500).json({ error: 'Failed to process message' });
  }
};

// Provide quick responses for common questions without calling the API
function getQuickResponse(message: string): string | null {
  const messageLower = message.toLowerCase();
  
  // Simple keyword matching for common questions
  if (messageLower.includes('order') && messageLower.includes('track')) {
    return "To track your order, please provide your order number or the email associated with your account. You can also check your order status by logging into your Walmart account and viewing your order history.";
  }
  
  if (messageLower.includes('return') && messageLower.includes('how')) {
    return "You can return most Walmart items within 90 days of purchase. For in-store purchases, bring the item with your receipt to any Walmart store. For online orders, you can start the return process through your Walmart account or bring the item to a store with your order information.";
  }
  
  if (messageLower.includes('store') && messageLower.includes('hour')) {
    return "Most Walmart stores are open from 6:00 AM to 11:00 PM, 7 days a week. However, hours may vary by location. You can find specific hours for your local store on Walmart.com or the Walmart app using the store finder feature.";
  }
  
  if (messageLower.includes('walmart+') || messageLower.includes('walmart plus')) {
    return "Walmart+ is our membership program that offers benefits like free shipping with no order minimum, free same-day delivery from your store on orders $35+, fuel discounts, and mobile scan & go for in-store shopping. It costs $98/year or $12.95/month. Would you like more information about signing up?";
  }
  
  if (messageLower.includes('price match')) {
    return "Walmart will match Walmart.com prices in our stores. The item must be identical and in stock at the online price when requested. We limit price matches to one per customer per day. Walmart does not match competitor prices, Marketplace seller prices, or special event prices like Black Friday deals.";
  }
  
  if ((messageLower.includes('delivery') && messageLower.length < 15) || 
      (messageLower.includes('how') && messageLower.includes('delivery'))) {
    return "Walmart offers various delivery options including standard delivery (typically next-day or scheduled), express delivery (as quick as 2 hours), and Walmart+ members receive free delivery on orders $35+. You can select your preferred delivery option during checkout.";
  }
  
  if ((messageLower.includes('pickup') && messageLower.length < 15) || 
      (messageLower.includes('how') && messageLower.includes('pickup'))) {
    return "Walmart pickup is easy to use! Shop online, select 'Pickup' at checkout, and choose your store. When your order is ready, you'll receive a notification. Check in on the app when you're on your way, park in the designated area, and a Walmart associate will bring your order to your vehicle.";
  }
  
  // Return null if no quick response is available
  return null;
}
