# PhyChat - AI-Powered Python Debugging Assistant

![PhyChat](https://img.shields.io/badge/PhyChat-AI%20Debug%20Assistant-3776AB?style=for-the-badge&logo=python&logoColor=white)

**PhyChat** is a specialized intelligent tutoring system designed to teach Python debugging through AI-powered guided discovery, explainable reasoning, and personalized adaptive learning.

---

## 🎯 Project Overview

### The Problem
- **40% failure rate** in introductory programming courses, primarily due to debugging struggles
- Current AI tools (ChatGPT, Copilot) provide instant solutions, undermining learning
- Students develop dependency rather than problem-solving skills
- Lack of transparency in AI reasoning processes

### Our Solution
1. **Domain-Specific LLM** - Fine-tuned CodeT5+ specialized in Python debugging
2. **Explainable AI (XAI)** - LIME/SHAP integration for transparent reasoning
3. **Adaptive Learning (RL)** - Reinforcement Learning for personalization
4. **Methodology-First Teaching** - Guided debugging processes, not instant answers

---

## ✨ Features

- 🧠 **Guided Discovery Learning** - Step-by-step methodology
- 🔍 **Transparent AI Reasoning** - See why AI makes each suggestion
- 🎯 **Personalized Experience** - Adapts to your skill level
- 📊 **Progress Tracking** - Monitor your learning journey
- 🏆 **Curated Challenges** - Practice with 6+ debugging exercises
- 🌙 **Dark/Light Mode** - Comfortable learning environment

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+
- npm or yarn
- Supabase account (free tier)

### Installation

```bash
# 1. Navigate to project directory
cd pytutor-its

# 2. Install dependencies
npm install --ignore-scripts

# 3. Set up database (see database/README.md)
# - Create Supabase project
# - Run schema.sql
# - Configure .env.local

# 4. Configure environment
# Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# 5. Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🏗️ Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4.17** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Shadcn UI** - Accessible components
- **Supabase** - PostgreSQL database & auth

---

## 📁 Project Structure

```
pytutor-its/
├── app/                  # Next.js pages
│   ├── page.tsx         # Landing page
│   ├── chat/            # Chat interface
│   ├── challenges/      # Debugging exercises
│   ├── about/           # About page
│   └── contact/         # Contact form
├── components/          # React components
│   ├── chat/           # Chat UI
│   ├── dashboard/      # Dashboard widgets
│   └── ui/             # Base components
├── lib/
│   ├── supabase.ts     # Database helpers
│   └── mock-ai.ts      # Mock responses
├── database/
│   ├── schema.sql      # DB schema
│   └── README.md       # Setup guide
└── hooks/              # Custom React hooks
```

---

## 🎨 Design System

### Colors
- **Primary Blue**: `#3776AB` (Python blue)
- **Primary Yellow**: `#FFD43B` (Modern yellow)
- **Gradient**: `from-[#3776AB] to-[#FFD43B]`

### Logo
- **Symbol**: `Φ` (Phi - scientific methodology)

---

## 🗄️ Database Setup

See [`database/README.md`](./database/README.md) for:
- Complete schema
- Setup instructions
- Helper functions
- Sample data

---

## 🐛 Troubleshooting

### Build Errors
```bash
rm -rf node_modules .next
npm install --ignore-scripts
npm run dev
```

### Database Connection
1. Verify `.env.local` credentials
2. Check Supabase project is active
3. Review RLS policies

---

## 🚢 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

Set environment variables in Vercel dashboard.

---

## 📞 Contact

- **Email**: support@phychat.ai
- **Website**: http://localhost:3000
- **Database Docs**: [database/README.md](./database/README.md)

---

## 📈 Stats

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)

Built with ❤️ for better programming education
