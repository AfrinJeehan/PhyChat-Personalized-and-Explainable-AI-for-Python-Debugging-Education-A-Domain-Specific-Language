'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Brain, Target, Zap, BookOpen, Shield, TrendingUp } from 'lucide-react';

export default function AboutPage() {
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3776AB] to-[#FFD43B] flex items-center justify-center">
                <span className="text-white font-bold">Φ</span>
              </div>
              <span className="font-bold text-lg">PhyChat</span>
            </div>
          </div>
          <Link href="/chat">
            <Button>Start Learning</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About PhyChat</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary AI-powered platform designed to transform how students learn Python debugging
          </p>
        </div>

        {/* Background Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Background & Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Programming has become essential in the modern world. However, a major challenge in education is the 
              high failure rate (up to 40%) in introductory courses, largely because students struggle with 
              debugging—the complex skill of finding and fixing errors. Debugging requires systematic thinking, 
              which is rarely taught well.
            </p>
            <p>
              While AI assistants like ChatGPT and GitHub Copilot have become popular, their design focus—giving 
              instant solutions—actually undermines learning for students. By solving bugs instantly, they prevent 
              students from engaging in the cognitive struggle necessary to build deep problem-solving skills, 
              leading to dependence and "surface learning".
            </p>
            <p className="font-semibold text-foreground">
              PhyChat addresses this by providing an integrated AI tutor framework specifically designed for 
              Python debugging instruction that teaches methodology, not just solutions.
            </p>
          </CardContent>
        </Card>

        {/* Problem Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">The Problem We Solve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pedagogical Misalignment</h3>
                    <p className="text-sm text-muted-foreground">
                      Current AI tools prioritize solutions over understanding, creating dependency rather than capability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Transparency Deficit</h3>
                    <p className="text-sm text-muted-foreground">
                      "Black box" AI provides no insight into reasoning processes, preventing learning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">No Debugging Methodology</h3>
                    <p className="text-sm text-muted-foreground">
                      Students get fixes but don't learn systematic debugging approaches
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Lack of Personalization</h3>
                    <p className="text-sm text-muted-foreground">
                      One-size-fits-all responses ignore individual skill levels and learning needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hallucination Risk</h3>
                    <p className="text-sm text-muted-foreground">
                      General LLMs can provide incorrect information that students can't verify
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Solution */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Innovative Solution</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-[#3776AB]/20 hover:border-[#3776AB] transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-[#3776AB] mb-4" />
                <CardTitle>Domain-Specific LLM</CardTitle>
                <CardDescription>
                  Fine-tuned CodeT5+ model specialized on pedagogically annotated Python debugging scenarios, 
                  ensuring high accuracy and factual correctness
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-[#3776AB]/20 hover:border-[#3776AB] transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-[#3776AB] mb-4" />
                <CardTitle>Explainable AI (XAI)</CardTitle>
                <CardDescription>
                  LIME and SHAP integration shows exactly which parts of your code triggered AI suggestions, 
                  building transparency and trust
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-[#3776AB]/20 hover:border-[#3776AB] transition-colors">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#3776AB] mb-4" />
                <CardTitle>Adaptive Learning (RL)</CardTitle>
                <CardDescription>
                  Reinforcement Learning agent tracks progress and dynamically adjusts help levels to maximize 
                  long-term learning outcomes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <Card className="mb-8 bg-gradient-to-br from-[#3776AB]/5 to-[#FFD43B]/5">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Why PhyChat is Different</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Target className="h-6 w-6 text-[#3776AB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Teaches Methodology, Not Just Answers</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn systematic debugging approaches through guided discovery, not instant solutions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-6 w-6 text-[#3776AB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Step-by-Step Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Walk through error identification, hypothesis formation, and iterative refinement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="h-6 w-6 text-[#3776AB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Transparent Reasoning</h3>
                  <p className="text-sm text-muted-foreground">
                    See exactly why the AI suggests each fix with explainable AI visualizations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-[#3776AB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Personalized to Your Level</h3>
                  <p className="text-sm text-muted-foreground">
                    Adaptive feedback adjusts to your skill level and learning progress
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Who Is PhyChat For?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              PhyChat is designed primarily for <strong className="text-foreground">intermediate-level Computer Science undergraduates</strong> who 
              have basic Python knowledge but struggle with systematic debugging approaches.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Beginners</h4>
                <p className="text-sm">Learn foundational debugging concepts with gentle guidance</p>
              </div>
              <div className="bg-[#3776AB]/10 rounded-lg p-4 border-2 border-[#3776AB]">
                <h4 className="font-semibold text-foreground mb-2">Intermediate (Primary)</h4>
                <p className="text-sm">Master systematic debugging methodologies and build confidence</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Advanced</h4>
                <p className="text-sm">Refine complex debugging strategies and learn best practices</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
