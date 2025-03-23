import React from 'react';
import { Message as MessageType } from '../types';
import OrdersSupport from './OrdersSupport';
import StoreLocator from './StoreLocator';
import ReturnPolicy from './ReturnPolicy';
import GeneralSupport from './GeneralSupport';
import FAQList from './FAQList';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Helper function to render component based on identifier
  const renderComponent = (content: string) => {
    if (content.startsWith('##COMPONENT:')) {
      const componentName = content.replace('##COMPONENT:', '').replace('##', '');
      
      switch (componentName) {
        case 'OrdersSupport':
          return <OrdersSupport />;
        case 'StoreLocator':
          return <StoreLocator />;
        case 'ReturnPolicy':
          return <ReturnPolicy />;
        case 'GeneralSupport':
          return <GeneralSupport onSelectService={(id) => {
            // We need to access these functions from the parent
            const event = new CustomEvent('selectService', { detail: { id } });
            window.dispatchEvent(event);
          }} />;
        case 'FAQList':
          return <FAQList onSelectFAQ={(id) => {
            // We need to access these functions from the parent
            const event = new CustomEvent('selectFAQ', { detail: { id } });
            window.dispatchEvent(event);
          }} />;
        default:
          return <p>{content}</p>;
      }
    }
    
    // Convert regular responses to bullet points if they aren't already
    if (content.includes('\n')) {
      const lines = content.split('\n').filter(line => line.trim() !== '');
      return (
        <div className="space-y-2">
          {lines.map((line, index) => {
            // If line already has bullet point formatting, keep it as is
            if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
              return <p key={index}>{line}</p>;
            }
            // If it's a heading-like line (no punctuation at the end), make it bold
            else if (!line.trim().match(/[.,:;?!]$/)) {
              return <p key={index} className="font-medium">{line}</p>;
            }
            // Otherwise format as a bullet point
            else {
              return <p key={index}>• {line}</p>;
            }
          })}
        </div>
      );
    }
    
    // This helps with FAQs that are now strings but should be formatted with line breaks and bullet points
    if (content.includes('•')) {
      return (
        <div className="whitespace-pre-line">
          {content}
        </div>
      );
    }
    
    return <p>{content}</p>;
  };
  
  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-3xl bg-gray-100 rounded-lg p-4">
          {typeof message.content === 'string' ? (
            renderComponent(message.content)
          ) : (
            message.content
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex mb-4">
      <div className="w-8 h-8 rounded-full bg-[#0071dc] flex items-center justify-center mr-3 flex-shrink-0">
        <i className="fas fa-comment text-white text-sm"></i>
      </div>
      <div className="max-w-3xl">
        <div className="font-semibold text-[#0071dc]">Walmart Assistant</div>
        <div className="bg-[#e6f2ff] rounded-lg p-4 mt-1">
          {typeof message.content === 'string' ? (
            renderComponent(message.content)
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
