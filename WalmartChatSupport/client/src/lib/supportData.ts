import { Category, SupportService } from '../types';

export const categories: Category[] = [
  {
    id: 'orders',
    name: 'Orders & Returns',
    icon: 'box-open'
  },
  {
    id: 'store',
    name: 'Find Nearby Store',
    icon: 'map-marker-alt'
  },
  {
    id: 'return_policy',
    name: 'Return Policy',
    icon: 'exchange-alt'
  },
  {
    id: 'general',
    name: 'General Support',
    icon: 'info-circle'
  },
  {
    id: 'faqs',
    name: 'FAQs',
    icon: 'question-circle'
  },
  {
    id: 'human',
    name: 'Connect to Human Agent',
    icon: 'user-circle'
  }
];

export const generalSupportServices: SupportService[] = [
  {
    id: 'walmart-plus',
    name: 'Walmart+ membership benefits and enrollment',
    url: '#walmart-plus'
  },
  {
    id: 'pickup-delivery',
    name: 'Pickup and delivery options',
    url: '#pickup-delivery'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy services',
    url: '#pharmacy'
  },
  {
    id: 'financial',
    name: 'Financial services (Money Center, Walmart Pay)',
    url: '#financial'
  },
  {
    id: 'gift-cards',
    name: 'Gift cards and registries',
    url: '#gift-cards'
  },
  {
    id: 'credit-card',
    name: 'Walmart credit card',
    url: '#credit-card'
  },
  {
    id: 'price-matching',
    name: 'Price matching policies',
    url: '#price-matching'
  },
  {
    id: 'careers',
    name: 'Career opportunities',
    url: '#careers'
  },
  {
    id: 'corporate',
    name: 'Corporate information',
    url: '#corporate'
  }
];

export const welcomeMessage = 
  "Hello! Welcome to Walmart Customer Support. I'm here to help you with finding product information, checking order status, store locations and hours, return policies, and general questions about Walmart services. How can I assist you today?";
