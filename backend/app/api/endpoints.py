from fastapi import APIRouter, HTTPException, status
from datetime import datetime
from app.models.schemas import (
    ChatRequest, ChatResponse,
    RecommendationRequest, RecommendationResponse,
    XAIRequest, XAIResponse,
    HealthResponse
)
from app.services.ai_service import ai_service
from app.services.rl_service import rl_service
from app.lib.supabase import supabase_client

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="PhyChat Backend is running",
        timestamp=datetime.now()
    )

@router.post("/chat", response_model=ChatResponse)
async def chat_with_tutor(request: ChatRequest):
    """
    Main chat endpoint - connects to CodeT5+ AI service
    
    This is where your Next.js frontend sends debugging questions.
    The AI service analyzes code and provides guided responses.
    """
    try:
        # Get conversation history for context (optional)
        conversation_history = []
        if request.conversation_id:
            try:
                history = supabase_client.get_conversation_history(
                    request.conversation_id, 
                    limit=5
                )
                conversation_history = history
            except:
                pass  # Continue without history if DB fails
        
        # Get AI response
        response = ai_service.get_tutor_response(
            message=request.message,
            code_snippet=request.code_snippet,
            conversation_history=conversation_history
        )
        
        # Save message to database (async, don't wait)
        if request.conversation_id:
            try:
                supabase_client.save_message(
                    conversation_id=request.conversation_id,
                    role="user",
                    content=request.message,
                    code_snippet=request.code_snippet
                )
                supabase_client.save_message(
                    conversation_id=request.conversation_id,
                    role="assistant",
                    content=response.reply,
                    code_snippet=response.code_suggestion
                )
            except:
                pass  # Continue even if save fails
        
        return response
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI service error: {str(e)}"
        )

@router.post("/recommend", response_model=RecommendationResponse)
async def get_recommendation(request: RecommendationRequest):
    """
    RL-based recommendation endpoint
    
    This powers the recommendation banner in your UI.
    Returns the next challenge the student should try based on their progress.
    """
    try:
        recommendation = rl_service.generate_recommendation(request.user_id)
        return recommendation
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"RL service error: {str(e)}"
        )

@router.get("/recommend/{user_id}", response_model=RecommendationResponse)
async def get_recommendation_by_id(user_id: str):
    """Alternative GET endpoint for recommendations (convenience)"""
    return await get_recommendation(RecommendationRequest(user_id=user_id))

@router.post("/xai/explain", response_model=XAIResponse)
async def explain_with_xai(request: XAIRequest):
    """
    XAI (Explainable AI) endpoint
    
    Returns SHAP/LIME analysis showing which parts of the code
    influenced the model's decision.
    """
    try:
        explanation = ai_service.get_xai_explanation(
            code=request.code_snippet,
            prediction=request.model_prediction
        )
        
        return XAIResponse(
            highlighted_lines=explanation["highlighted_lines"],
            feature_importance=explanation["feature_importance"],
            explanation_text=explanation["explanation_text"]
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"XAI service error: {str(e)}"
        )

@router.post("/progress/update")
async def update_progress(
    user_id: str,
    challenge_id: str,
    success: bool,
    time_spent: int
):
    """
    Update student progress and train RL model
    
    Called when a student completes or attempts a challenge.
    """
    try:
        rl_service.update_rl_model(user_id, challenge_id, success, time_spent)
        return {
            "status": "success",
            "message": "Progress updated successfully"
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Progress update error: {str(e)}"
        )
