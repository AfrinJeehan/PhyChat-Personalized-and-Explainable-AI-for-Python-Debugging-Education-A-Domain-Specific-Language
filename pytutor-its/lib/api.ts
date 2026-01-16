/**
 * API Utilities for PhyChat Backend Communication
 * 
 * This file handles all communication between Next.js frontend
 * and the FastAPI Python backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types matching backend schemas
export interface ChatRequest {
  user_id: string;
  message: string;
  code_snippet?: string;
  conversation_id?: string;
}

export interface ChatResponse {
  reply: string;
  explanation?: string;
  confidence_score: number;
  code_suggestion?: string;
  error_type?: string;
  learning_objective?: string;
}

export interface RecommendationResponse {
  challenge_id: string;
  title: string;
  description: string;
  difficulty: string;
  reason: string;
  confidence: number;
}

export interface XAIResponse {
  highlighted_lines: number[];
  feature_importance: Record<string, number>;
  explanation_text: string;
}

/**
 * Send a chat message to the AI tutor
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Chat API error:', error);
    // Fallback to mock response
    return {
      reply: "I'm having trouble connecting to the AI service. Please try again.",
      confidence_score: 0.0,
    };
  }
}

/**
 * Get personalized recommendation from RL agent
 */
export async function getRecommendation(userId: string): Promise<RecommendationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Recommendation API error:', error);
    // Fallback recommendation
    return {
      challenge_id: '1',
      title: 'Start with Loop Errors',
      description: 'Learn to debug common loop mistakes',
      difficulty: 'Easy',
      reason: 'This is a great starting point for beginners!',
      confidence: 0.85,
    };
  }
}

/**
 * Get XAI explanation for code analysis
 */
export async function getXAIExplanation(
  code: string,
  prediction: string
): Promise<XAIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/xai/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code_snippet: code,
        model_prediction: prediction,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('XAI API error:', error);
    return {
      highlighted_lines: [],
      feature_importance: {},
      explanation_text: 'XAI explanation unavailable',
    };
  }
}

/**
 * Update student progress after completing a challenge
 */
export async function updateProgress(
  userId: string,
  challengeId: string,
  success: boolean,
  timeSpent: number
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        challenge_id: challengeId,
        success,
        time_spent: timeSpent,
      }),
    });

    if (!response.ok) {
      console.warn('Progress update failed:', response.status);
    }
  } catch (error) {
    console.error('Progress update error:', error);
  }
}

/**
 * Check backend health
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}
