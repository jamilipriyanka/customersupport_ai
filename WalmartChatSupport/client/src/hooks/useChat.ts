import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';
import { welcomeMessage } from '../lib/supportData';
import { faqs } from '../lib/faqData';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: uuidv4(),
        content: welcomeMessage,
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
  }, []);

  const addMessage = useCallback((content: string | React.ReactNode, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    setLoading(true);
    
    try {
      // Check for specific keywords to provide real-time responses
      const lowerContent = content.toLowerCase();
      
      // Handle store locator questions
      if (lowerContent.includes('find store') || lowerContent.includes('walmart store') || 
          lowerContent.includes('near me') || lowerContent.includes('store location') || 
          lowerContent.includes('zip code') || lowerContent.includes('closest store')) {
        
        // If the message includes a ZIP code, respond with store information
        const zipCodeMatch = content.match(/\b\d{5}\b/);
        if (zipCodeMatch) {
          const zipCode = zipCodeMatch[0];
          const response = `Walmart stores near ${zipCode}:\n
• Supercenter #1234: 123 Retail Ave (2.3 miles) - Open 24 hours
• Neighborhood Market #5678: 456 Market St (4.1 miles) - Open 6am-11pm
• Supercenter #9101: 789 Commerce Blvd (5.7 miles) - Open 24 hours
• Sam's Club #1122: 321 Wholesale Dr (6.2 miles) - Open 10am-8pm

Would you like store details like pharmacy hours, services available, or directions to a specific location?`;
          addMessage(response, 'assistant');
        } else {
          addMessage('##COMPONENT:StoreLocator##', 'assistant');
        }
      } 
      
      // Handle return policy questions
      else if (lowerContent.includes('return policy') || lowerContent.includes('can i return') || 
               lowerContent.includes('how to return') || lowerContent.includes('return period') ||
               lowerContent.includes('refund policy')) {
        
        // If asking about specific items
        if (lowerContent.includes('electronics') || lowerContent.includes('tv') || 
            lowerContent.includes('computer') || lowerContent.includes('phone')) {
          
          const response = `Electronics return policy:\n
• 30-day return period for most electronics
• Items must be in original packaging with all accessories
• Receipt or order number required for verification
• Some items like cell phones have different policies (14 days)
• Opened software cannot be returned
• Walmart Protection Plan available for extended coverage
• Defective items can be exchanged for identical items

Would you like information about returning a specific electronic item?`;
          addMessage(response, 'assistant');
        } else {
          addMessage('##COMPONENT:ReturnPolicy##', 'assistant');
        }
      }
      
      // Handle order questions
      else if (lowerContent.includes('order') || lowerContent.includes('track') || 
               lowerContent.includes('shipping') || lowerContent.includes('delivery') ||
               lowerContent.includes('purchase')) {
        
        // If they included an order number, give specific info
        const orderMatch = content.match(/\bWM[-\s]?\d{8}\b/) || content.match(/\border\s*#?\s*(\d{6,10})\b/i);
        if (orderMatch) {
          const orderNum = orderMatch[0];
          const response = `Order status for ${orderNum}:\n
• Order placed: March 21, 2025
• Payment: Processed
• Shipping status: In transit
• Estimated delivery: March 25, 2025
• Shipping method: Standard (3-5 business days)
• Items: 3 products
• Delivery address: Default address on file

Would you like to see the specific items in your order or make changes to this order?`;
          addMessage(response, 'assistant');
        } else {
          addMessage('##COMPONENT:OrdersSupport##', 'assistant');
        }
      }
      
      // Handle general support with real-time answers
      else if (lowerContent.includes('help') || lowerContent.includes('support') || 
               lowerContent.includes('walmart+') || lowerContent.includes('walmart plus') ||
               lowerContent.includes('pickup') || lowerContent.includes('pharmacy') ||
               lowerContent.includes('gift card') || lowerContent.includes('credit card')) {
        
        addMessage('##COMPONENT:GeneralSupport##', 'assistant');
      }
      
      // Send message to API for all other questions
      else {
        try {
          // First try to generate a suitable bulleted response without using OpenAI
          let response = '';
          
          if (lowerContent.includes('price') || lowerContent.includes('cost') || lowerContent.includes('how much')) {
            response = `Walmart pricing information:\n
• Walmart offers everyday low prices on thousands of items
• Price match guarantee available for identical items
• Special discounts available through the Walmart app
• Clearance items marked with yellow tags in-store
• Rollback prices feature temporary price reductions
• Online prices may differ from in-store pricing
• Walmart+ members get fuel discounts at participating stations

Would you like to know about pricing for a specific item or category?`;
          } 
          else if (lowerContent.includes('hours') || lowerContent.includes('open') || lowerContent.includes('close')) {
            response = `Walmart store hours:\n
• Most Supercenters are open 6am-11pm daily
• Some locations are open 24 hours
• Pharmacy hours typically 9am-9pm weekdays, shorter on weekends
• Vision center hours typically 9am-8pm weekdays, shorter on weekends
• Auto care center hours typically 8am-8pm daily
• Holiday hours may vary by location
• Store hours can be checked on Walmart.com or the Walmart app

Would you like me to help you find the hours for a specific store?`;
          }
          else if (lowerContent.includes('cancel')) {
            response = `Order cancellation information:\n
• Orders can be cancelled before they ship
• Log in to your Walmart account to cancel online
• Select "Cancel" next to the order in your account
• Call 1-800-WALMART if you can't cancel online
• Some orders process quickly and cannot be cancelled
• Pickup orders can be cancelled until they're picked up
• If your order shipped, you'll need to return it instead

Would you like help cancelling a specific order?`;
          }
          else {
            // Default response for other questions
            response = `Walmart customer support:\n
• I can help with orders, returns, store info, and policies
• Ask about product availability or specifications
• Get details about Walmart+ membership benefits
• Learn about pickup and delivery options
• Find information about financial services
• Explore gift cards and registry options
• Discover career opportunities at Walmart

What specific information can I help you with today?`;
          }
          
          addMessage(response, 'assistant');
        } catch (error) {
          console.error('Error generating fallback response:', error);
          addMessage('Sorry, I encountered an error processing your request. Please try one of our support options or ask a different question.', 'assistant');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('Sorry, I encountered an error processing your request. Please try again later.', 'assistant');
    } finally {
      setLoading(false);
    }
  }, [addMessage]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    
    let content: string = '';
    
    // For components, we'll use a special identifier that will be replaced in the Message component
    switch (categoryId) {
      case 'orders':
        content = '##COMPONENT:OrdersSupport##';
        break;
      case 'store':
        content = '##COMPONENT:StoreLocator##';
        break;
      case 'return_policy':
        content = '##COMPONENT:ReturnPolicy##';
        break;
      case 'general':
        content = '##COMPONENT:GeneralSupport##';
        break;
      case 'faqs':
        content = '##COMPONENT:FAQList##';
        break;
      case 'human':
        content = "I'll connect you with a human agent right away. Please hold while I transfer your chat to the next available representative.";
        break;
      default:
        content = "How can I help you today?";
        break;
    }
    
    addMessage(content, 'assistant');
  }, [addMessage]);

  const handleFAQSelect = useCallback((faqId: string) => {
    const faq = faqs.find(f => f.id === faqId);
    if (faq) {
      addMessage(faq.answer, 'assistant');
    }
  }, [addMessage]);

  const handleServiceSelect = useCallback((serviceId: string) => {
    // Provide detailed responses for each service
    let response = '';
    
    switch(serviceId) {
      case 'walmart-plus':
        response = `Walmart+ membership benefits:\n
• Free delivery on orders $35+ (restrictions apply)
• Free shipping with no minimum purchase required
• Scan & Go for contact-free shopping in-store
• Member prices on fuel at participating stations
• Early access to special promotions and events
• Video streaming with Paramount+ Essential included
• Mobile app access for easy shopping
• $12.95/month or $98/year membership options`;
        break;
        
      case 'pickup-delivery':
        response = `Pickup and delivery options:\n
• Free curbside pickup available at most locations
• Same-day delivery available in select areas
• No fees for Walmart+ members on orders $35+
• Standard delivery: 2-day shipping on eligible items
• Express delivery available within 2 hours (additional fee)
• Grocery delivery available 7 days a week
• Mobile app ordering with convenient timeslots`;
        break;
        
      case 'pharmacy':
        response = `Pharmacy services:\n
• $4 generics for 30-day supply, $10 for 90-day
• Prescription transfers available from other pharmacies
• Drive-thru service at select locations
• Flu shots and other immunizations available
• Pet medications at competitive prices
• Mobile app for prescription management
• Auto-refill program for maintenance medications
• Prescription delivery available in select areas`;
        break;
        
      case 'financial':
        response = `Financial services:\n
• Money transfers through MoneyGram
• Bill payment services
• Check cashing available
• Walmart MoneyCard prepaid debit card
• Tax preparation services (seasonal)
• Walmart Pay mobile payment option
• Gift card purchases and reloads
• No-fee banking options available`;
        break;
        
      case 'gift-cards':
        response = `Gift card and registry information:\n
• Physical and digital gift cards available
• Gift cards never expire and have no fees
• Baby registry with universal registry options
• Wedding registry available online and in-store
• Gift card balance checking online or in-store
• Gift cards available for multiple retailers
• Corporate gift card programs available
• Reload options for existing gift cards`;
        break;
        
      case 'credit-card':
        response = `Walmart credit card benefits:\n
• 5% cash back on Walmart.com purchases
• 2% cash back on Walmart stores purchases
• 2% cash back on Walmart fuel stations
• 1% cash back everywhere else Mastercard is accepted
• No annual fee
• Special financing offers available
• Mobile app management of your card
• Fraud protection and zero liability`;
        break;
        
      case 'price-match':
        response = `Price match policy details:\n
• Walmart.com matches select online retailers
• Must be identical item (same size, model, etc.)
• Item must be in stock at the competitor
• Limited to one item per customer per day
• Marketplace sellers not eligible for price matching
• Manager approval may be required
• Select online retailers only
• Some restrictions apply during sales events`;
        break;
        
      case 'careers':
        response = `Career opportunities at Walmart:\n
• Store positions across multiple departments
• Supply chain and distribution center roles
• Corporate positions at headquarters
• Digital and e-commerce opportunities
• Benefits include healthcare options
• Education assistance programs available
• Competitive pay with regular increases
• Career advancement opportunities`;
        break;
        
      case 'corporate':
        response = `Corporate information:\n
• Founded in 1962 by Sam Walton
• Headquarters in Bentonville, Arkansas
• Over 10,500 stores worldwide
• Operates in 24 countries internationally
• More than 2.3 million associates globally
• Sustainability initiatives to reduce waste
• Community giving programs in local areas
• Committed to renewable energy goals`;
        break;
        
      case 'store-locator':
        response = '##COMPONENT:StoreLocator##';
        break;
        
      case 'return-policy':
        response = '##COMPONENT:ReturnPolicy##';
        break;
        
      case 'orders-returns':
        response = '##COMPONENT:OrdersSupport##';
        break;
        
      default:
        response = `Information about ${serviceId.replace(/-/g, ' ')}:\n
• Please let me know what specific details you need
• I can provide information on services, policies, or features
• For immediate assistance, you can also call 1-800-WALMART
• Or visit your local store for personalized help`;
    }
    
    addMessage(response, 'assistant');
  }, [addMessage]);
  
  // Setup event listeners for component events
  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const event = e as CustomEvent;
      handleServiceSelect(event.detail.id);
    };
    
    const handleSelectFAQ = (e: Event) => {
      const event = e as CustomEvent;
      handleFAQSelect(event.detail.id);
    };
    
    const handleOrderOption = (e: Event) => {
      const event = e as CustomEvent;
      addMessage(event.detail.response, 'assistant');
    };
    
    const handleStoreLocatorResult = (e: Event) => {
      const event = e as CustomEvent;
      addMessage(event.detail.response, 'assistant');
    };
    
    const handleReturnPolicyResponse = (e: Event) => {
      const event = e as CustomEvent;
      addMessage(event.detail.response, 'assistant');
    };
    
    const handleGeneralSupportResponse = (e: Event) => {
      const event = e as CustomEvent;
      addMessage(event.detail.response, 'assistant');
    };
    
    window.addEventListener('selectService', handleSelectService);
    window.addEventListener('selectFAQ', handleSelectFAQ);
    window.addEventListener('orderOptionSelected', handleOrderOption);
    window.addEventListener('storeLocatorResult', handleStoreLocatorResult);
    window.addEventListener('returnPolicyResponse', handleReturnPolicyResponse);
    window.addEventListener('generalSupportResponse', handleGeneralSupportResponse);
    
    return () => {
      window.removeEventListener('selectService', handleSelectService);
      window.removeEventListener('selectFAQ', handleSelectFAQ);
      window.removeEventListener('orderOptionSelected', handleOrderOption);
      window.removeEventListener('storeLocatorResult', handleStoreLocatorResult);
      window.removeEventListener('returnPolicyResponse', handleReturnPolicyResponse);
      window.removeEventListener('generalSupportResponse', handleGeneralSupportResponse);
    };
  }, [handleServiceSelect, handleFAQSelect, addMessage]);

  return {
    messages,
    loading,
    sendMessage,
    handleCategorySelect,
    handleFAQSelect,
    handleServiceSelect,
    activeCategory
  };
};
