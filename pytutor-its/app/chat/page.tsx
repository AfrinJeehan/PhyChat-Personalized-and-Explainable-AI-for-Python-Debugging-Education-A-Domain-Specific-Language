'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { TopBar } from '@/components/chat/TopBar';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { RecommendationBanner } from '@/components/dashboard/RecommendationBanner';
import { useChatHistory } from '@/hooks/useChatHistory';
import { mockAI } from '@/lib/mock-ai';
import { RecommendedTask } from '@/types';

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedTask, setRecommendedTask] = useState<RecommendedTask | null>({
    id: '1',
    title: 'Try fixing a loop off-by-one error',
    reason: 'Based on your recent progress, this challenge will help you master loop boundaries',
    priority: 'high',
    challenge: {
      id: '1',
      title: 'Off-by-One Loop Error',
      description: 'Fix the loop that should print numbers 1 to 10',
      difficulty: 'easy',
      category: 'Loops',
      buggyCode: 'for i in range(10):\n    print(i)',
      hints: ['range(10) generates 0-9, not 1-10'],
      completed: false
    }
  });

  const {
    conversations,
    currentConversation,
    isLoading: historyLoading,
    createNewConversation,
    addMessage,
    selectConversation,
    deleteConversation
  } = useChatHistory();

  const handleSendMessage = async (content: string, code?: string) => {
    // Add user message
    addMessage({
      content,
      role: 'user',
      codeSnippet: code
    });

    // Get AI response
    setIsLoading(true);
    try {
      const response = await mockAI.getChatResponse(content, code);
      addMessage({
        content: response,
        role: 'assistant'
      });
    } catch (error) {
      addMessage({
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRecommendation = () => {
    if (recommendedTask) {
      const challenge = recommendedTask.challenge;
      handleSendMessage(
        `I'd like to work on: ${challenge.title}`,
        challenge.buggyCode
      );
      setRecommendedTask(null);
    }
  };

  const handleDismissRecommendation = () => {
    setRecommendedTask(null);
  };

  if (historyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onNewChat={createNewConversation}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        isOpen={isSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <RecommendationBanner
          task={recommendedTask}
          onAccept={handleAcceptRecommendation}
          onDismiss={handleDismissRecommendation}
        />

        <div className="flex-1 overflow-hidden">
          <ChatInterface
            messages={currentConversation?.messages || []}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
