export interface Message {
  id: string;
  content: string | React.ReactNode;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface SupportService {
  id: string;
  name: string;
  url: string;
}
