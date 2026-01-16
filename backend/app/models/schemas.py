from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    user_id: str = Field(..., description="Student ID")
    message: str = Field(..., description="User's message or question")
    code_snippet: Optional[str] = Field(None, description="Python code to debug")
    conversation_id: Optional[str] = Field(None, description="Conversation ID for context")

class ChatResponse(BaseModel):
    """Response model for chat endpoint"""
    reply: str = Field(..., description="AI tutor's response")
    explanation: Optional[str] = Field(None, description="XAI explanation of reasoning")
    confidence_score: float = Field(..., description="Model confidence (0-1)")
    code_suggestion: Optional[str] = Field(None, description="Corrected code if applicable")
    error_type: Optional[str] = Field(None, description="Type of bug detected")
    learning_objective: Optional[str] = Field(None, description="What the student should learn")

class RecommendationRequest(BaseModel):
    """Request model for RL recommendation"""
    user_id: str = Field(..., description="Student ID")

class RecommendationResponse(BaseModel):
    """Response model for RL recommendation"""
    challenge_id: str = Field(..., description="Recommended challenge ID")
    title: str = Field(..., description="Challenge title")
    description: str = Field(..., description="Challenge description")
    difficulty: str = Field(..., description="Easy, Medium, or Hard")
    reason: str = Field(..., description="Why this is recommended (RL logic)")
    confidence: float = Field(..., description="Recommendation confidence (0-1)")

class XAIRequest(BaseModel):
    """Request model for XAI explanation"""
    code_snippet: str = Field(..., description="Code to analyze")
    model_prediction: str = Field(..., description="What the model predicted")

class XAIResponse(BaseModel):
    """Response model for XAI explanation"""
    highlighted_lines: List[int] = Field(..., description="Line numbers that influenced decision")
    feature_importance: dict = Field(..., description="SHAP values for code features")
    explanation_text: str = Field(..., description="Human-readable explanation")

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    message: str
    timestamp: datetime
