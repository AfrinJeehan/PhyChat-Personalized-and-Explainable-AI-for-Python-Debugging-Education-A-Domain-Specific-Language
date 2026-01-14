'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Conversation } from '@/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
}

export function Sidebar({
  conversations,
  currentConversation,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  isOpen
}: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col",
        "lg:relative lg:translate-x-0"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">PT</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">PyTutor AI</h1>
            <p className="text-xs text-muted-foreground">Debug Smarter</p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button onClick={onNewChat} className="w-full" size="lg">
          <PlusIcon className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="text-xs font-semibold text-muted-foreground px-2 mb-2">
          RECENT HISTORY
        </div>
        <AnimatePresence>
          {conversations.map((conv) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={cn(
                "group relative mb-1 rounded-lg p-3 cursor-pointer transition-colors",
                "hover:bg-accent",
                currentConversation?.id === conv.id && "bg-accent"
              )}
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{conv.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {conv.messages.length} messages
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {conversations.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No conversations yet
          </p>
        )}
      </div>

      {/* Student Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold">S</span>
          </div>
          <div className="flex-1">
            <p className="font-medium">Student Mode</p>
            <p className="text-xs text-muted-foreground">Intermediate Level</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
