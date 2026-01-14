'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Code, CheckCircle2, Circle } from 'lucide-react';
import { mockAI } from '@/lib/mock-ai';
import { Challenge } from '@/types';

export default function ChallengesPage() {
  const [challenges] = useState<Challenge[]>(mockAI.getChallenges());
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.difficulty === filter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'hard': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-xl">Debugging Challenges</h1>
              <p className="text-sm text-muted-foreground">Practice with curated exercises</p>
            </div>
          </div>
          <Link href="/chat">
            <Button>
              <Code className="h-4 w-4 mr-2" />
              Open Chat
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8">
          {['all', 'easy', 'medium', 'hard'].map((level) => (
            <Button
              key={level}
              variant={filter === level ? 'default' : 'outline'}
              onClick={() => setFilter(level as any)}
              className="capitalize"
            >
              {level}
            </Button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="border-2 hover:border-primary transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </div>
                  {challenge.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {challenge.title}
                </CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                  <pre className="text-xs overflow-x-auto">
                    <code>{challenge.buggyCode}</code>
                  </pre>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{challenge.category}</span>
                  <Link href={`/chat?challenge=${challenge.id}`}>
                    <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Try Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
            <p className="text-muted-foreground">Try a different difficulty level</p>
          </div>
        )}
      </div>
    </div>
  );
}
