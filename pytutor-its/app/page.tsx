import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, Code, Sparkles, Users, Target, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">PT</span>
            </div>
            <span className="font-bold text-xl">PyTutor AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/chat">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Intelligent Tutoring System by Group 03
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Debug Python Code with AI-Powered Assistance
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            An intelligent tutoring system that uses personalized and explainable AI to help you learn Python debugging through interactive conversations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat">
              <Button size="lg" className="text-lg px-8">
                Start Debugging <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/challenges">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Browse Challenges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why PyTutor AI?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powered by CodeT5+ and reinforcement learning, our system adapts to your learning style
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Brain className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Explainable AI</CardTitle>
              <CardDescription>
                Understand not just what the bug is, but why it happens using SHAP and LIME visualizations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Personalized Learning</CardTitle>
              <CardDescription>
                RL-based recommendation system that suggests challenges tailored to your skill level
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Conversational Interface</CardTitle>
              <CardDescription>
                Gemini-style chat experience that makes debugging feel like talking to a mentor
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Research Team Section */}
      <section className="container mx-auto px-4 py-20 bg-card/50 rounded-2xl">
        <div className="text-center mb-12">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Research Group 03</h2>
          <p className="text-muted-foreground">
            Final Year Research Project - Intelligent Tutoring System
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>A.K. Afrin Jeehan</CardTitle>
              <CardDescription>ML Model & XAI Integration</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>A.R.M. Rifnas</CardTitle>
              <CardDescription>Backend & RL Agent</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>T. Viyaasan</CardTitle>
              <CardDescription>Frontend & UI/UX</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-600/10 rounded-2xl p-12 border border-primary/20">
          <Code className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up Your Debugging Skills?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the future of programming education with AI-powered learning
          </p>
          <Link href="/auth">
            <Button size="lg" className="text-lg px-12">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 PyTutor AI - Group 03 Final Year Research Project</p>
          <p className="mt-2">Personalized and Explainable AI for Python Debugging Education</p>
        </div>
      </footer>
    </div>
  );
}
