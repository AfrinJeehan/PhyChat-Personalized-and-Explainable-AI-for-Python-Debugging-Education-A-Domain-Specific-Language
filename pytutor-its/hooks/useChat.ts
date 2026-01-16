/**
 * Enhanced Chat Hook with Backend Integration
 * 
 * This hook manages chat state and communicates with the FastAPI backend
 */

import { useState, useCallback } from 'react';
import { Message } from '@/types';
import { sendChatMessage, ChatRequest } from '@/lib/api';

export function useChat(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string, code?: string) => {
      // Add user message immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        code,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Get user ID from localStorage (set during auth)
        const userId = localStorage.getItem('student-id') || 'anonymous';

        // Prepare request
        const request: ChatRequest = {
          user_id: userId,
          message: content,
          code_snippet: code,
          conversation_id: conversationId,
        };

        // Call backend API
        const response = await sendChatMessage(request);

        // Add AI response
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.reply,
          timestamp: new Date(),
          // Add metadata from backend
          explanation: response.explanation,
          codeExample: response.code_suggestion,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        setError('Failed to get response from AI. Please try again.');
        console.error('Chat error:', err);

        // Add error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
