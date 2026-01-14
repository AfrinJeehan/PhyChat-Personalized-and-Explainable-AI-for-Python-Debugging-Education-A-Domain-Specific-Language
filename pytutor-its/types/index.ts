export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  codeSnippet?: string;
  explanation?: string;
  hasXAI?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  totalSessions: number;
  completedChallenges: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  buggyCode: string;
  solution?: string;
  hints: string[];
  completed: boolean;
}

export interface RecommendedTask {
  id: string;
  title: string;
  reason: string;
  challenge: Challenge;
  priority: 'high' | 'medium' | 'low';
}
