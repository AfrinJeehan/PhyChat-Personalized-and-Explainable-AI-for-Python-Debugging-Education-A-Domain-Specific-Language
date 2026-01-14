'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Code, Loader2, User, Bot } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Message } from '@/types';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string, code?: string) => void;
  isLoading: boolean;
}

export function ChatInterface({ messages, onSendMessage, isLoading }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [showCodeBox, setShowCodeBox] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !codeInput.trim()) return;

    onSendMessage(input, codeInput || undefined);
    setInput('');
    setCodeInput('');
    setShowCodeBox(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to PhyChat!</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Your specialized AI debugging assistant. I use explainable AI and personalized learning
              to help you master Python debugging through guided problem-solving.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
              {[
                'Debug my for loop',
                'Explain this error message',
                'Fix my function',
                'Help with list indexing'
              ].map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(prompt)}
                  className="text-left justify-start"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  )}
                >
                  {message.codeSnippet && (
                    <div className="mb-2 p-3 rounded-lg bg-muted/50 border border-border">
                      <pre className="text-xs overflow-x-auto">
                        <code>{message.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </motion.div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {showCodeBox && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mb-3"
            >
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">Code Snippet</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCodeBox(false)}
                  >
                    Remove
                  </Button>
                </div>
                <Textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Paste your Python code here..."
                  className="font-mono text-sm min-h-[100px]"
                />
              </div>
            </motion.div>
          )}

          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Python debugging..."
                className="resize-none pr-12 min-h-[56px] max-h-[200px]"
                rows={1}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 bottom-2"
                onClick={() => setShowCodeBox(!showCodeBox)}
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || (!input.trim() && !codeInput.trim())}
              className="h-14 w-14"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}
