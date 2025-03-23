import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import ChatInput from '../components/ChatInput';
import { useChat } from '../hooks/useChat';
import { useToast } from '@/hooks/use-toast';

const Support: React.FC = () => {
  const { toast } = useToast();
  const { 
    messages, 
    loading, 
    sendMessage, 
    handleCategorySelect,
    activeCategory
  } = useChat();

  const handleClose = () => {
    toast({
      title: "Chat Closed",
      description: "Thank you for using Walmart Support",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onClose={handleClose} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onCategorySelect={handleCategorySelect}
          activeCategory={activeCategory}
        />
        
        <main className="flex-1 flex flex-col bg-white">
          <ChatContainer messages={messages} />
          <ChatInput 
            onSendMessage={sendMessage} 
            disabled={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default Support;
