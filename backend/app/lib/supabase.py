import os
# from supabase import create_client, Client  # Commented out - install separately if needed
from dotenv import load_dotenv

load_dotenv()

class SupabaseClient:
    """
    Python Supabase client for backend operations
    
    NOTE: This is a mock implementation for development.
    To use real Supabase, install: pip install supabase
    (Requires Visual Studio Build Tools on Windows)
    """
    
    def __init__(self):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")
        
        if not url or not key:
            print("WARNING: Supabase credentials not found. Using mock database.")
            self.client = None
        else:
            try:
                # Uncomment when supabase package is installed:
                # self.client = create_client(url, key)
                self.client = None  # Mock for now
            except:
                print("WARNING: Supabase package not installed. Using mock database.")
                self.client = None
    
    def get_student(self, student_id: str):
        """Get student by ID"""
        # Mock implementation
        return {
            "id": "mock-id",
            "student_id": student_id,
            "name": "Mock Student",
            "skill_level": "intermediate"
        }
    
    def get_student_progress(self, student_id: str):
        """Get all progress records for a student"""
        # Mock implementation
        return []
    
    def get_conversation_history(self, conversation_id: str, limit: int = 10):
        """Get recent messages from a conversation"""
        # Mock implementation
        return []
    
    def save_message(self, conversation_id: str, role: str, content: str, code_snippet: str = None):
        """Save a message to the database"""
        # Mock implementation - just print for debugging
        print(f"Mock save: {role} message to conversation {conversation_id}")
        return {"id": "mock-message-id"}
    
    def get_all_challenges(self):
        """Get all available challenges"""
        # Mock implementation
        return [
            {
                "id": "1",
                "title": "Loop Variable Scope Error",
                "description": "Fix the scope issue with the loop counter variable",
                "difficulty": "Easy",
                "error_type": "NameError"
            },
            {
                "id": "2",
                "title": "List Index Out of Range",
                "description": "Debug the array indexing issue",
                "difficulty": "Easy",
                "error_type": "IndexError"
            },
            {
                "id": "3",
                "title": "Function Return Value",
                "description": "Fix the missing return statement",
                "difficulty": "Medium",
                "error_type": "TypeError"
            },
            {
                "id": "4",
                "title": "Syntax Error in Conditional",
                "description": "Find and fix the syntax error",
                "difficulty": "Easy",
                "error_type": "SyntaxError"
            },
            {
                "id": "5",
                "title": "Type Mismatch in Operation",
                "description": "Fix the type incompatibility issue",
                "difficulty": "Medium",
                "error_type": "TypeError"
            },
            {
                "id": "6",
                "title": "Infinite Loop Logic",
                "description": "Fix the loop that never terminates",
                "difficulty": "Hard",
                "error_type": "LogicError"
            }
        ]
    
    def update_progress(self, student_id: str, challenge_id: str, status: str):
        """Update student progress on a challenge"""
        # Mock implementation
        print(f"Mock update: Student {student_id} - Challenge {challenge_id} - Status {status}")
        return {"id": "mock-progress-id"}

# Singleton instance
supabase_client = SupabaseClient()
