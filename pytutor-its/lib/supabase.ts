import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Student {
  id: string;
  student_id: string;
  name: string;
  email: string;
  consent_given: boolean;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  student_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  code_snippet?: string;
  explanation?: string;
  created_at: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bug_code: string;
  error_type: string;
  learning_objectives: string[];
  created_at: string;
}

export interface Progress {
  id: string;
  student_id: string;
  challenge_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  attempts: number;
  time_spent: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// Database Helper Functions
export const dbHelpers = {
  // Student Operations
  async getStudent(studentId: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('student_id', studentId)
      .single();
    
    if (error) throw error;
    return data as Student;
  },

  async createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()
      .single();
    
    if (error) throw error;
    return data as Student;
  },

  // Conversation Operations
  async getConversations(studentId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('student_id', studentId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data as Conversation[];
  },

  async createConversation(conversation: Omit<Conversation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('conversations')
      .insert([conversation])
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async updateConversation(id: string, updates: Partial<Conversation>) {
    const { data, error } = await supabase
      .from('conversations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async deleteConversation(id: string) {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Message Operations
  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as Message[];
  },

  async createMessage(message: Omit<Message, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();
    
    if (error) throw error;
    return data as Message;
  },

  // Challenge Operations
  async getChallenges() {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Challenge[];
  },

  async getChallenge(id: string) {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Challenge;
  },

  // Progress Operations
  async getProgress(studentId: string) {
    const { data, error } = await supabase
      .from('progress')
      .select('*, challenges(*)')
      .eq('student_id', studentId);
    
    if (error) throw error;
    return data;
  },

  async updateProgress(studentId: string, challengeId: string, updates: Partial<Progress>) {
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        student_id: studentId,
        challenge_id: challengeId,
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Progress;
  },
};
