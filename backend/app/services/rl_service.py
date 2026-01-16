import random
from typing import List
from app.models.schemas import RecommendationResponse
from app.lib.supabase import supabase_client

class RLService:
    """
    Reinforcement Learning Service - Personalized Recommendations
    
    This is where your RL Agent will live for adaptive learning.
    Currently using MOCK logic based on simple heuristics.
    """
    
    def __init__(self):
        self.challenges_cache = None
    
    def generate_recommendation(self, user_id: str) -> RecommendationResponse:
        """
        Generate personalized challenge recommendation using RL
        
        Args:
            user_id: Student ID
            
        Returns:
            RecommendationResponse with next recommended challenge
        """
        
        # Get student progress from database
        try:
            progress = supabase_client.get_student_progress(user_id)
            completed_ids = [p['challenge_id'] for p in progress if p.get('status') == 'completed']
            in_progress_ids = [p['challenge_id'] for p in progress if p.get('status') == 'in_progress']
        except:
            completed_ids = []
            in_progress_ids = []
        
        # Get all challenges
        all_challenges = self._get_challenges()
        
        # Filter out completed challenges
        available_challenges = [
            c for c in all_challenges 
            if c['id'] not in completed_ids
        ]
        
        if not available_challenges:
            # All challenges completed!
            return self._congratulations_response()
        
        # RL Logic: Pick based on difficulty progression
        recommended = self._select_by_difficulty(available_challenges, completed_ids)
        
        return RecommendationResponse(
            challenge_id=recommended['id'],
            title=recommended['title'],
            description=recommended['description'],
            difficulty=recommended['difficulty'],
            reason=self._generate_reason(recommended, len(completed_ids)),
            confidence=round(random.uniform(0.78, 0.92), 2)
        )
    
    def _get_challenges(self) -> List[dict]:
        """Get all challenges (with caching)"""
        if self.challenges_cache:
            return self.challenges_cache
        
        try:
            challenges = supabase_client.get_all_challenges()
            self.challenges_cache = challenges
            return challenges
        except:
            # Fallback mock challenges
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
    
    def _select_by_difficulty(self, challenges: List[dict], completed_count: int) -> dict:
        """
        RL Heuristic: Progress from Easy → Medium → Hard
        
        Real RL would use:
        - Q-learning or Policy Gradient
        - Reward = (student_success - time_spent) * difficulty_weight
        - State = (skill_level, error_types_mastered, attempt_history)
        """
        
        # Difficulty progression logic
        if completed_count < 2:
            # Start with Easy
            easy_challenges = [c for c in challenges if c['difficulty'] == 'Easy']
            if easy_challenges:
                return random.choice(easy_challenges)
        
        elif completed_count < 4:
            # Move to Medium after 2 Easy completions
            medium_challenges = [c for c in challenges if c['difficulty'] == 'Medium']
            if medium_challenges:
                return random.choice(medium_challenges)
        
        # Advanced: Mix Medium and Hard
        advanced = [c for c in challenges if c['difficulty'] in ['Medium', 'Hard']]
        if advanced:
            return random.choice(advanced)
        
        # Fallback: Any available challenge
        return random.choice(challenges)
    
    def _generate_reason(self, challenge: dict, completed_count: int) -> str:
        """Generate human-readable reason for recommendation"""
        
        reasons = {
            "Easy": [
                "This is a great starting point to build your debugging foundation.",
                "Master this basic concept before moving to harder challenges.",
                "Perfect for practicing fundamental debugging skills."
            ],
            "Medium": [
                f"You've completed {completed_count} challenges! Ready for the next level.",
                "This challenge will deepen your understanding of Python errors.",
                "Great job progressing! This will strengthen your problem-solving skills."
            ],
            "Hard": [
                f"Impressive progress with {completed_count} challenges! Time for a challenge.",
                "You're ready for advanced debugging scenarios.",
                "This will test everything you've learned so far."
            ]
        }
        
        difficulty = challenge.get('difficulty', 'Medium')
        options = reasons.get(difficulty, reasons['Medium'])
        return random.choice(options)
    
    def _congratulations_response(self) -> RecommendationResponse:
        """Special response when all challenges are completed"""
        return RecommendationResponse(
            challenge_id="completed",
            title="🎉 All Challenges Completed!",
            description="Congratulations! You've mastered all available debugging challenges.",
            difficulty="Expert",
            reason="You've shown excellent debugging skills. Consider helping other students or exploring advanced topics!",
            confidence=1.0
        )
    
    def update_rl_model(self, user_id: str, challenge_id: str, success: bool, time_spent: int):
        """
        Update RL model based on student performance
        
        Args:
            user_id: Student ID
            challenge_id: Completed challenge ID
            success: Whether student succeeded
            time_spent: Time in seconds
            
        TODO: Implement actual RL training loop
        Currently just updates database
        """
        
        status = "completed" if success else "in_progress"
        supabase_client.update_progress(user_id, challenge_id, status)

# Singleton instance
rl_service = RLService()
