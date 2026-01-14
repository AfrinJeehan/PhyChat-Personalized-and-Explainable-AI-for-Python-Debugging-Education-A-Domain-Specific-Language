# PhyChat Database Setup Guide

## Overview
PhyChat uses Supabase (PostgreSQL) for data persistence, authentication, and real-time features.

## Quick Start

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: PhyChat
   - **Database Password**: (choose a strong password)
   - **Region**: (select closest to your users)
6. Click "Create new project"

### 2. Get Your API Credentials
1. Once the project is created, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJh...`)

### 3. Configure Environment Variables
1. Open `.env.local` in the project root
2. Replace the placeholder values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `database/schema.sql`
4. Paste into the SQL editor
5. Click "Run" to execute

This will create:
- ✅ All tables (students, conversations, messages, challenges, progress)
- ✅ Indexes for performance
- ✅ Triggers for auto-updating timestamps
- ✅ 6 sample debugging challenges
- ✅ 1 test student account
- ✅ Row Level Security policies

### 5. Verify Setup
1. Go to **Table Editor** in Supabase
2. You should see 5 tables:
   - `students`
   - `conversations`
   - `messages`
   - `challenges` (with 6 pre-loaded challenges)
   - `progress`

### 6. Run the Application
```bash
npm run dev
```

Visit `http://localhost:3000` - the app will now persist data to Supabase!

---

## Database Schema

### Students Table
Stores user information and learning preferences.
```
id              UUID (PK)
student_id      VARCHAR (Unique)
name            VARCHAR
email           VARCHAR (Unique)
consent_given   BOOLEAN
skill_level     VARCHAR (beginner|intermediate|advanced)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Conversations Table
Stores chat sessions for each student.
```
id              UUID (PK)
student_id      VARCHAR (FK → students.student_id)
title           VARCHAR
is_active       BOOLEAN
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Messages Table
Stores individual messages in conversations.
```
id                UUID (PK)
conversation_id   UUID (FK → conversations.id)
role              VARCHAR (user|assistant|system)
content           TEXT
code_snippet      TEXT (optional)
explanation       TEXT (optional)
created_at        TIMESTAMP
```

### Challenges Table
Pre-defined debugging exercises.
```
id                    UUID (PK)
title                 VARCHAR
description           TEXT
difficulty            VARCHAR (Easy|Medium|Hard)
bug_code              TEXT
error_type            VARCHAR
learning_objectives   TEXT[]
created_at            TIMESTAMP
```

### Progress Table
Tracks student progress on challenges.
```
id              UUID (PK)
student_id      VARCHAR (FK → students.student_id)
challenge_id    UUID (FK → challenges.id)
status          VARCHAR (not_started|in_progress|completed)
attempts        INTEGER
time_spent      INTEGER (seconds)
completed_at    TIMESTAMP (nullable)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

---

## Database Helper Functions

All database operations are abstracted in `lib/supabase.ts`:

```typescript
import { dbHelpers } from '@/lib/supabase';

// Student operations
const student = await dbHelpers.getStudent('STU001');
const newStudent = await dbHelpers.createStudent({ ... });

// Conversation operations
const conversations = await dbHelpers.getConversations('STU001');
const newConversation = await dbHelpers.createConversation({ ... });
await dbHelpers.updateConversation(id, { title: 'New Title' });
await dbHelpers.deleteConversation(id);

// Message operations
const messages = await dbHelpers.getMessages(conversationId);
await dbHelpers.createMessage({ ... });

// Challenge operations
const challenges = await dbHelpers.getChallenges();
const challenge = await dbHelpers.getChallenge(id);

// Progress operations
const progress = await dbHelpers.getProgress('STU001');
await dbHelpers.updateProgress('STU001', challengeId, { status: 'completed' });
```

---

## Migration from LocalStorage

The current chat history stored in localStorage can be migrated to Supabase:

1. Export data from localStorage
2. Transform to match database schema
3. Bulk insert using Supabase API

We've kept the `useChatHistory` hook compatible - you can gradually migrate by:
- Adding a `useDatabase` flag
- Implementing dual-write (localStorage + Supabase)
- Eventually removing localStorage fallback

---

## Security Considerations

### Row Level Security (RLS)
Currently, policies allow all access for development. For production:

```sql
-- Students can only see their own data
CREATE POLICY "Students see own data" ON students
  FOR SELECT USING (auth.uid() = id);

-- Students can only access their own conversations
CREATE POLICY "Students own conversations" ON conversations
  FOR ALL USING (student_id = auth.uid());
```

### Authentication
Supabase provides built-in authentication. To enable:

1. Go to **Authentication** > **Providers** in Supabase
2. Enable desired providers (Email, Google, GitHub, etc.)
3. Update your auth page to use Supabase Auth

```typescript
import { supabase } from '@/lib/supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

---

## Monitoring & Maintenance

### Supabase Dashboard Features:
- **Table Editor**: View and edit data directly
- **SQL Editor**: Run custom queries
- **Database**: Backup, restore, connection pooling
- **API Docs**: Auto-generated API documentation
- **Logs**: Monitor queries and errors

### Useful Queries:

```sql
-- Get conversation count by student
SELECT student_id, COUNT(*) as total_conversations
FROM conversations
GROUP BY student_id;

-- Most attempted challenges
SELECT c.title, COUNT(p.id) as attempts
FROM challenges c
LEFT JOIN progress p ON c.id = p.challenge_id
GROUP BY c.title
ORDER BY attempts DESC;

-- Student completion rates
SELECT s.name, 
       COUNT(CASE WHEN p.status = 'completed' THEN 1 END)::FLOAT / 
       COUNT(p.id) * 100 as completion_percentage
FROM students s
LEFT JOIN progress p ON s.student_id = p.student_id
GROUP BY s.name;
```

---

## Troubleshooting

### Connection Issues
- Verify `.env.local` has correct credentials
- Check Supabase project is active (not paused)
- Ensure network allows Supabase domain

### Query Errors
- Check RLS policies aren't blocking queries
- Verify foreign key constraints
- Use Supabase logs to debug

### Performance
- Add indexes for frequently queried columns
- Use `.select()` to limit returned columns
- Consider pagination for large datasets

---

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Configure environment variables
3. ✅ Run database schema
4. ⬜ Migrate `useChatHistory` hook to use Supabase
5. ⬜ Add authentication with Supabase Auth
6. ⬜ Implement real-time features for live updates
7. ⬜ Add data export functionality
8. ⬜ Set up production RLS policies

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **PhyChat Issues**: Contact support@phychat.ai
- **Community**: Join our Discord (coming soon)
