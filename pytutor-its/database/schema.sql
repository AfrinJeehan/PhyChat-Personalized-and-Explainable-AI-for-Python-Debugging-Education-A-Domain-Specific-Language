-- PhyChat Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students Table
CREATE TABLE students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  consent_given BOOLEAN DEFAULT false,
  skill_level VARCHAR(20) CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations Table
CREATE TABLE conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id VARCHAR(255) REFERENCES students(student_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
  content TEXT NOT NULL,
  code_snippet TEXT,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges Table
CREATE TABLE challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  bug_code TEXT NOT NULL,
  error_type VARCHAR(100) NOT NULL,
  learning_objectives TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress Table
CREATE TABLE progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id VARCHAR(255) REFERENCES students(student_id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  attempts INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, challenge_id)
);

-- Indexes for better query performance
CREATE INDEX idx_conversations_student ON conversations(student_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_progress_student ON progress(student_id);
CREATE INDEX idx_progress_challenge ON progress(challenge_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample challenges
INSERT INTO challenges (title, description, difficulty, bug_code, error_type, learning_objectives) VALUES
(
  'Loop Variable Scope Error',
  'Fix the scope issue with the loop counter variable',
  'Easy',
  'for i in range(5):\n    print(i)\nprint(i)  # Error here',
  'NameError',
  ARRAY['Understanding variable scope', 'Loop variable lifecycle']
),
(
  'List Index Out of Range',
  'Debug the array indexing issue in this code',
  'Easy',
  'numbers = [1, 2, 3]\nfor i in range(4):\n    print(numbers[i])',
  'IndexError',
  ARRAY['Array bounds checking', 'Loop iteration control']
),
(
  'Function Return Value',
  'Fix the missing return statement',
  'Medium',
  'def calculate_sum(a, b):\n    result = a + b\n    # Missing return\ntotal = calculate_sum(5, 3)\nprint(total)',
  'TypeError',
  ARRAY['Function return values', 'None type handling']
),
(
  'Syntax Error in Conditional',
  'Find and fix the syntax error',
  'Easy',
  'x = 10\nif x > 5\n    print("Greater")',
  'SyntaxError',
  ARRAY['Python syntax rules', 'Conditional statements']
),
(
  'Type Mismatch in Operation',
  'Fix the type incompatibility issue',
  'Medium',
  'age = "25"\nyears_ahead = 5\nfuture_age = age + years_ahead',
  'TypeError',
  ARRAY['Type conversion', 'String vs numeric operations']
),
(
  'Infinite Loop Logic',
  'Fix the loop that never terminates',
  'Hard',
  'counter = 0\nwhile counter < 10:\n    print(counter)\n    counter = counter + 0',
  'LogicError',
  ARRAY['Loop termination conditions', 'Variable updates in loops']
);

-- Insert a sample student for testing
INSERT INTO students (student_id, name, email, consent_given, skill_level) VALUES
('TEST001', 'Test Student', 'test@example.com', true, 'intermediate');

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow all for now - customize based on authentication)
CREATE POLICY "Allow all access to students" ON students FOR ALL USING (true);
CREATE POLICY "Allow all access to conversations" ON conversations FOR ALL USING (true);
CREATE POLICY "Allow all access to messages" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all access to challenges" ON challenges FOR ALL USING (true);
CREATE POLICY "Allow all access to progress" ON progress FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON students TO anon, authenticated;
GRANT ALL ON conversations TO anon, authenticated;
GRANT ALL ON messages TO anon, authenticated;
GRANT ALL ON challenges TO anon, authenticated;
GRANT ALL ON progress TO anon, authenticated;
