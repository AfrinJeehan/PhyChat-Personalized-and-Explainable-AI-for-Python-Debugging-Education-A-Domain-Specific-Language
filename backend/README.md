# PhyChat FastAPI Backend

This is the Python backend for PhyChat, handling AI inference (CodeT5+), XAI (SHAP/LIME), and Reinforcement Learning for personalized recommendations.

## 🚀 Quick Start

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Edit `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
USE_MOCK_AI=true
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:3000
```

### 3. Run the Server

```bash
python main.py
```

Or with uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000/api
- **Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```

### Chat with AI Tutor
```http
POST /api/chat
Content-Type: application/json

{
  "user_id": "STU001",
  "message": "Help me debug this code",
  "code_snippet": "for i in range(4):\n    print(numbers[i])",
  "conversation_id": "conv123"
}
```

**Response:**
```json
{
  "reply": "I can see you have an index error...",
  "explanation": "The loop tries to access numbers[3]...",
  "confidence_score": 0.89,
  "code_suggestion": "for i in range(len(numbers)):\n    print(numbers[i])",
  "error_type": "IndexError",
  "learning_objective": "Learn to match loop ranges with list lengths"
}
```

### Get Recommendation
```http
GET /api/recommend/{user_id}
```

**Response:**
```json
{
  "challenge_id": "2",
  "title": "List Index Out of Range",
  "description": "Debug the array indexing issue",
  "difficulty": "Easy",
  "reason": "Perfect for practicing fundamental debugging skills.",
  "confidence": 0.87
}
```

### XAI Explanation
```http
POST /api/xai/explain
Content-Type: application/json

{
  "code_snippet": "for i in range(4):\n    print(numbers[i])",
  "model_prediction": "IndexError detected"
}
```

**Response:**
```json
{
  "highlighted_lines": [1, 2],
  "feature_importance": {
    "loop_range": 0.85,
    "list_access": 0.72
  },
  "explanation_text": "The error is most influenced by the loop range..."
}
```

### Update Progress
```http
POST /api/progress/update
Content-Type: application/json

{
  "user_id": "STU001",
  "challenge_id": "2",
  "success": true,
  "time_spent": 180
}
```

---

## 🧠 Architecture

### Services

#### `ai_service.py`
- **Purpose**: CodeT5+ model inference and XAI analysis
- **Current**: Mock responses for development
- **Future**: Load fine-tuned CodeT5+ model
- **XAI**: SHAP/LIME integration for explainability

#### `rl_service.py`
- **Purpose**: Reinforcement Learning for personalized recommendations
- **Current**: Heuristic-based difficulty progression
- **Future**: Q-learning or Policy Gradient agent
- **Logic**: Easy → Medium → Hard based on completion count

#### `supabase.py`
- **Purpose**: Database operations
- **Features**: Student progress, conversation history, challenges

---

## 🔧 Development

### Mock vs Real AI

The backend uses **mock responses** by default (`USE_MOCK_AI=true`).

To use your fine-tuned CodeT5+ model:

1. Set `USE_MOCK_AI=false` in `.env`
2. Place model in `./models/codet5_finetuned/`
3. Update `ai_service.py`:

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

def __init__(self):
    self.use_mock = os.getenv("USE_MOCK_AI", "true").lower() == "true"
    if not self.use_mock:
        self.tokenizer = AutoTokenizer.from_pretrained("./models/codet5_finetuned")
        self.model = AutoModelForSeq2SeqLM.from_pretrained("./models/codet5_finetuned")
```

### Adding XAI (SHAP/LIME)

1. Install: `pip install shap lime`
2. Update `get_xai_explanation` in `ai_service.py`:

```python
import shap

def get_xai_explanation(self, code, prediction):
    # Create SHAP explainer
    explainer = shap.Explainer(self.model, self.tokenizer)
    shap_values = explainer(code)
    
    # Get top influential tokens
    important_tokens = shap_values.abs.argsort()[-5:]
    
    return {
        "highlighted_lines": self._tokens_to_lines(important_tokens),
        "feature_importance": shap_values.values.tolist(),
        "explanation_text": self._generate_explanation(shap_values)
    }
```

### Training RL Agent

Replace heuristic logic in `rl_service.py`:

```python
import torch
import torch.nn as nn

class RLAgent(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 64)  # State: [skill_level, completed_count, ...]
        self.fc2 = nn.Linear(64, 6)    # Actions: 6 challenges
    
    def forward(self, state):
        x = torch.relu(self.fc1(state))
        return self.fc2(x)
```

---

## 🧪 Testing

### Test with curl:

```bash
# Health check
curl http://localhost:8000/api/health

# Chat
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "TEST001",
    "message": "Help with this error",
    "code_snippet": "for i in range(4):\n    print(numbers[i])"
  }'

# Recommendation
curl http://localhost:8000/api/recommend/TEST001
```

### Test with Python:

```python
import requests

response = requests.post(
    "http://localhost:8000/api/chat",
    json={
        "user_id": "TEST001",
        "message": "Debug this code",
        "code_snippet": "for i in range(4):\n    print(numbers[i])"
    }
)

print(response.json())
```

---

## 📦 Dependencies

- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **pydantic**: Data validation
- **supabase**: Database client
- **transformers**: CodeT5+ model (future)
- **torch**: Deep learning (future)
- **shap**: XAI analysis (future)

---

## 🔐 Security

- CORS configured for `localhost:3000`
- Add authentication middleware for production
- Use environment variables for sensitive data
- Validate all input with Pydantic

---

## 📚 Next Steps

1. ✅ Basic backend structure
2. ✅ Mock AI responses
3. ✅ RL recommendation logic
4. ⬜ Integrate fine-tuned CodeT5+
5. ⬜ Implement SHAP/LIME XAI
6. ⬜ Train RL agent with Q-learning
7. ⬜ Add caching layer (Redis)
8. ⬜ Deploy to cloud (AWS/GCP)

---

## 🐛 Troubleshooting

### Port already in use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill
```

### CORS errors
- Verify `FRONTEND_URL` in `.env`
- Check Next.js is running on port 3000
- Clear browser cache

### Module not found
```bash
pip install -r requirements.txt --force-reinstall
```

---

**Built by Group 03 for PhyChat Research Project**
