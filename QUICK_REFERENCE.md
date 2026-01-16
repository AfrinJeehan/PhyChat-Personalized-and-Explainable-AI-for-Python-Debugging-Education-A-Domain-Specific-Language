# ⚡ PhyChat Quick Reference

## 🚀 Start Commands

### Automated Startup (Easiest)
Just double-click: `START_SERVERS.bat` or `START_SERVERS.ps1`

### Manual Commands (Copy-Paste Ready)
```powershell
# Terminal 1 - Backend (Virtual Environment)
cd "f:\Research Methodology & Scientific Communication\CST\PhyChatImp\PhyChat\backend"; .\venv\Scripts\Activate.ps1; python main.py

# Terminal 2 - Frontend  
cd "f:\Research Methodology & Scientific Communication\CST\PhyChatImp\PhyChat\pytutor-its"; node ./node_modules/next/dist/bin/next dev
```

## 🌐 URLs

| Service | URL |
|---------|-----|
| **Website** | http://localhost:3000 |
| **API** | http://localhost:8000 |
| **API Docs** | http://localhost:8000/docs |
| **Health Check** | http://localhost:8000/api/health |

## 📡 API Endpoints

### Chat
```bash
POST /api/chat
{
  "user_id": "STU001",
  "message": "Help me debug",
  "code_snippet": "for i in range(4):\n    print(numbers[i])"
}
```

### Recommendation
```bash
GET /api/recommend/{user_id}
```

### XAI Explanation
```bash
POST /api/xai/explain
{
  "code_snippet": "your code",
  "model_prediction": "error type"
}
```

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary Color** | #3776AB (Python Blue) |
| **Logo** | Φ (Phi symbol) |
| **Font** | System (Inter, SF Pro, Segoe UI) |
| **Border Radius** | 0.5rem (8px) |

## 🔧 Environment Variables

### Backend (.env)
```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
USE_MOCK_AI=true
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🐛 Quick Fixes

### Kill Ports
```powershell
# Port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Reinstall
```powershell
# Backend (Virtual Environment)
cd backend
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn python-dotenv httpx

# Frontend
cd pytutor-its
Remove-Item -Recurse -Force node_modules,.next -ErrorAction SilentlyContinue
npm install --ignore-scripts --legacy-peer-deps
```

## 📦 Key Files

| File | Purpose |
|------|---------|
| `backend/main.py` | FastAPI entry point |
| `backend/app/api/endpoints.py` | API routes |
| `backend/app/services/ai_service.py` | CodeT5+ mock |
| `backend/app/services/rl_service.py` | RL agent |
| `pytutor-its/lib/api.ts` | Frontend API calls |
| `pytutor-its/hooks/useChat.ts` | Chat with backend |
| `pytutor-its/app/chat/page.tsx` | Main chat page |

## 📊 Mock Data

### Error Types Supported
- IndexError (list/array access)
- NameError (variable scope)
- SyntaxError (missing colons)
- TypeError (type mismatch)
- LogicError (infinite loops)

### Pre-loaded Challenges
1. Loop Variable Scope Error (Easy)
2. List Index Out of Range (Easy)
3. Function Return Value (Medium)
4. Syntax Error in Conditional (Easy)
5. Type Mismatch in Operation (Medium)
6. Infinite Loop Logic (Hard)

## 🎓 For Development

### Add New Challenge
Edit: `backend/app/services/rl_service.py`
```python
{
    "id": "7",
    "title": "Your Challenge",
    "description": "Description",
    "difficulty": "Medium",
    "error_type": "TypeError"
}
```

### Add New Error Pattern
Edit: `backend/app/services/ai_service.py`
```python
responses = {
    "YourError": {
        "reply": "...",
        "explanation": "...",
        "code_suggestion": "..."
    }
}
```

## 🚀 Production Checklist

- [ ] Train CodeT5+ model
- [ ] Install SHAP/LIME (`pip install shap lime`)
- [ ] Connect Supabase database
- [ ] Set USE_MOCK_AI=false
- [ ] Update CORS origins
- [ ] Add authentication
- [ ] Deploy backend (AWS/GCP)
- [ ] Deploy frontend (Vercel)

## 📞 Help

- **API Docs**: http://localhost:8000/docs
- **Startup Guide**: `STARTUP_GUIDE.md`
- **Backend README**: `backend/README.md`
- **Database Guide**: `pytutor-its/database/README.md`

---

**Status**: ✅ Both servers running and connected!
**Version**: 1.0.0 (Mock Development)
**Date**: January 16, 2026
