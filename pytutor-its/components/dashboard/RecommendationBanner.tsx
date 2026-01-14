'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { RecommendedTask } from '@/types';

interface RecommendationBannerProps {
  task: RecommendedTask | null;
  onAccept: () => void;
  onDismiss: () => void;
}

export function RecommendationBanner({ task, onAccept, onDismiss }: RecommendationBannerProps) {
  if (!task) return null;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="mx-4 mt-4 mb-2"
    >
      <div className="glassmorphism rounded-xl p-4 border border-primary/30 bg-gradient-to-r from-primary/10 to-blue-500/10">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Sparkles className="h-5 w-5 text-primary animate-bounce-subtle" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
              Recommended Task
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                task.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-green-500/20 text-green-500'
              }`}>
                {task.priority}
              </span>
            </h3>
            <p className="text-sm text-foreground/90 mb-1">{task.title}</p>
            <p className="text-xs text-muted-foreground">{task.reason}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={onAccept}>
              Try it <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onDismiss}>
              Later
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
