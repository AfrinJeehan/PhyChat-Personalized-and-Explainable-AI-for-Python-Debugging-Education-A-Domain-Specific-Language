'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, MessageSquare, HelpCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqs = [
    {
      question: "How do I get started with PhyChat?",
      answer: "Simply click the 'Start Learning' button on the homepage. You'll be guided through a quick authentication process, then you can immediately start debugging Python code with our AI assistant."
    },
    {
      question: "Is PhyChat free to use?",
      answer: "Yes! PhyChat is currently free for all Computer Science students. Our mission is to improve debugging education accessibility."
    },
    {
      question: "What Python topics does PhyChat cover?",
      answer: "PhyChat specializes in common debugging scenarios including syntax errors, logic errors, runtime exceptions, loop issues, function errors, and data structure problems. We focus on intermediate-level Python debugging."
    },
    {
      question: "How is PhyChat different from ChatGPT or GitHub Copilot?",
      answer: "Unlike general AI tools that provide instant solutions, PhyChat teaches you the debugging process through guided discovery. Our specialized AI uses explainable reasoning and adapts to your learning level, building long-term problem-solving skills."
    },
    {
      question: "Will my code and conversations be saved?",
      answer: "Yes, your chat history and progress are saved to help track your learning journey. All data is securely stored and used only to personalize your experience and improve the platform."
    },
    {
      question: "Can I use PhyChat for my homework or assignments?",
      answer: "PhyChat is designed as a learning tool, not a solution generator. It guides you through debugging methodology rather than simply fixing your code. Always follow your institution's academic integrity policies."
    }
  ];

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or need support? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#3776AB]" />
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting us. We'll respond within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#3776AB]" />
                  Support & Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-sm text-muted-foreground">
                    For general questions about PhyChat
                  </p>
                  <a href="mailto:info@phychat.ai" className="text-[#3776AB] hover:underline text-sm">
                    info@phychat.ai
                  </a>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Technical Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Experiencing issues? Need help with the platform?
                  </p>
                  <a href="mailto:support@phychat.ai" className="text-[#3776AB] hover:underline text-sm">
                    support@phychat.ai
                  </a>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Research Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Interested in research partnerships or academic collaboration?
                  </p>
                  <a href="mailto:research@phychat.ai" className="text-[#3776AB] hover:underline text-sm">
                    research@phychat.ai
                  </a>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24-48 hours during business days.
                    For urgent technical issues, please mark your email as "URGENT".
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#3776AB]/10 to-[#FFD43B]/10 border-[#3776AB]/20">
              <CardHeader>
                <CardTitle>Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Check our FAQ section below for quick answers to common questions, or try chatting 
                  with our AI assistant directly in the platform.
                </p>
                <Link href="/chat">
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <HelpCircle className="h-6 w-6 text-[#3776AB]" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Quick answers to common questions about PhyChat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
