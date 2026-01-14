'use client';

import { useState, useEffect } from 'react';
import { Conversation, Message } from '@/types';

export function useChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pytutor-conversations');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      const conversations = parsed.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setConversations(conversations);
      if (conversations.length > 0) {
        setCurrentConversation(conversations[0]);
      }
    }
    setIsLoading(false);
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && conversations.length > 0) {
      localStorage.setItem('pytutor-conversations', JSON.stringify(conversations));
    }
  }, [conversations, isLoading]);

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: 'New Debugging Session',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversation(newConv);
    return newConv;
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!currentConversation) {
      const newConv = createNewConversation();
      const newMessage: Message = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      updateConversation(newConv.id, {
        messages: [newMessage],
        updatedAt: new Date()
      });
      return newMessage;
    }

    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    updateConversation(currentConversation.id, {
      messages: [...currentConversation.messages, newMessage],
      updatedAt: new Date(),
      // Update title based on first user message
      ...(currentConversation.messages.length === 0 && message.role === 'user' 
        ? { title: message.content.substring(0, 50) + (message.content.length > 50 ? '...' : '') }
        : {})
    });

    return newMessage;
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, ...updates } : conv
      )
    );
    if (currentConversation?.id === id) {
      setCurrentConversation(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (currentConversation?.id === id) {
      const remaining = conversations.filter(conv => conv.id !== id);
      setCurrentConversation(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const selectConversation = (id: string) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setCurrentConversation(conv);
    }
  };

  return {
    conversations,
    currentConversation,
    isLoading,
    createNewConversation,
    addMessage,
    updateConversation,
    deleteConversation,
    selectConversation
  };
}
