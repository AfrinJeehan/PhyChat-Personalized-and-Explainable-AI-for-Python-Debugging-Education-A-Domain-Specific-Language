import os
import random
from typing import Optional
from app.models.schemas import ChatResponse

class AIService:
    """
    AI Service - CodeT5+ & XAI Integration
    
    This is where your fine-tuned CodeT5+ model will live.
    Currently using MOCK logic for development.
    """
    
    def __init__(self):
        self.use_mock = os.getenv("USE_MOCK_AI", "true").lower() == "true"
        self.model = None
        
        if not self.use_mock:
            # TODO: Load your fine-tuned CodeT5+ model here
            # self.model = load_model("./models/codet5_finetuned")
            pass
    
    def get_tutor_response(
        self, 
        message: str, 
        code_snippet: Optional[str] = None,
        conversation_history: list = None
    ) -> ChatResponse:
        """
        Generate AI tutor response with XAI explanation
        
        Args:
            message: User's question or request
            code_snippet: Python code to analyze
            conversation_history: Previous messages for context
            
        Returns:
            ChatResponse with reply, explanation, and metadata
        """
        
        if self.use_mock:
            return self._mock_response(message, code_snippet)
        else:
            # TODO: Implement real CodeT5+ inference
            # return self._codet5_inference(message, code_snippet)
            pass
    
    def _mock_response(self, message: str, code: Optional[str]) -> ChatResponse:
        """Mock AI responses for development"""
        
        # Detect error type from code
        error_patterns = {
            "IndexError": ["range", "list", "index", "["],
            "NameError": ["print(i)", "variable", "scope"],
            "SyntaxError": ["if", ":", "def", "indent"],
            "TypeError": ["str", "int", "+", "type"],
            "AttributeError": [".", "attribute", "method"]
        }
        
        detected_error = "LogicError"
        if code:
            code_lower = code.lower()
            for error_type, keywords in error_patterns.items():
                if any(keyword in code_lower for keyword in keywords):
                    detected_error = error_type
                    break
        
        # Generate appropriate response
        responses = {
            "IndexError": {
                "reply": "I can see you have an **index error** in your code. This happens when you try to access a list position that doesn't exist.",
                "explanation": "The loop is trying to access `numbers[3]`, but your list only has 3 items (indices 0, 1, 2). Your loop should use `range(len(numbers))` instead of `range(4)`.",
                "learning_objective": "Learn to match loop ranges with list lengths",
                "code_suggestion": "for i in range(len(numbers)):\n    print(numbers[i])"
            },
            "NameError": {
                "reply": "You're trying to use a variable **outside its scope**. Variables defined inside loops only exist within that loop.",
                "explanation": "The variable `i` is created inside the for-loop and is destroyed when the loop ends. If you need it outside, save it to a variable before the loop ends.",
                "learning_objective": "Understand variable scope and lifecycle",
                "code_suggestion": "last_value = 0\nfor i in range(5):\n    last_value = i\n    print(i)\nprint(last_value)"
            },
            "SyntaxError": {
                "reply": "There's a **syntax error** in your code. Python requires a colon `:` after `if`, `for`, `while`, and `def` statements.",
                "explanation": "Line 2 is missing a colon. Python uses colons to indicate the start of an indented block.",
                "learning_objective": "Master Python's syntax rules for control structures",
                "code_suggestion": "if x > 5:\n    print('Greater')"
            },
            "TypeError": {
                "reply": "You have a **type mismatch** error. You can't directly add a string and a number in Python.",
                "explanation": "The variable `age` is a string ('25'), but you're trying to add a number (5) to it. Use `int(age)` to convert it first.",
                "learning_objective": "Learn type conversion and when to use it",
                "code_suggestion": "age = int('25')\nfuture_age = age + years_ahead"
            },
            "LogicError": {
                "reply": "Let's think through the **logic** of your code. What should happen in each step?",
                "explanation": "I noticed the counter isn't changing. For a loop to end, the condition must eventually become false. Your `counter = counter + 0` keeps it the same forever.",
                "learning_objective": "Understand loop termination conditions",
                "code_suggestion": "counter = counter + 1  # Increment by 1 instead of 0"
            }
        }
        
        response_data = responses.get(detected_error, responses["LogicError"])
        
        return ChatResponse(
            reply=response_data["reply"],
            explanation=response_data["explanation"],
            confidence_score=round(random.uniform(0.82, 0.95), 2),
            code_suggestion=response_data.get("code_suggestion"),
            error_type=detected_error,
            learning_objective=response_data["learning_objective"]
        )
    
    def get_xai_explanation(self, code: str, prediction: str) -> dict:
        """
        Generate XAI (SHAP/LIME) explanation
        
        Args:
            code: The code snippet analyzed
            prediction: What the model predicted
            
        Returns:
            Dictionary with highlighted lines and feature importance
        """
        
        if self.use_mock:
            return self._mock_xai_explanation(code)
        else:
            # TODO: Implement SHAP analysis
            # return self._shap_analysis(code, prediction)
            pass
    
    def _mock_xai_explanation(self, code: str) -> dict:
        """Mock XAI explanation for development"""
        lines = code.split('\n')
        
        # Simulate highlighting problematic lines
        highlighted = []
        for i, line in enumerate(lines, 1):
            if any(keyword in line.lower() for keyword in ['range', 'for', 'if', '[']):
                highlighted.append(i)
        
        return {
            "highlighted_lines": highlighted[:3],  # Top 3 most important
            "feature_importance": {
                "loop_range": 0.85,
                "list_access": 0.72,
                "variable_usage": 0.45
            },
            "explanation_text": "The error is most influenced by the loop range and list access pattern."
        }

# Singleton instance
ai_service = AIService()
