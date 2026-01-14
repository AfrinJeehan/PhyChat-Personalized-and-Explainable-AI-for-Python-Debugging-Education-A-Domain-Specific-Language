'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && name && consent) {
      // Store in localStorage (in real app, would be sent to backend)
      localStorage.setItem('student-id', studentId);
      localStorage.setItem('student-name', name);
      router.push('/chat');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Student Authentication</CardTitle>
            <CardDescription>
              Enter your details to start your PhyChat learning journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium mb-2">
                  Student ID
                </label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="e.g., 2020CS001"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm">Learning Platform Agreement</h3>
                <p className="text-sm text-muted-foreground">
                  PhyChat uses AI to provide personalized debugging assistance and track your 
                  learning progress to improve your experience.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your conversations and progress will be saved</li>
                  <li>• Data is used to personalize your learning experience</li>
                  <li>• All information is kept secure and confidential</li>
                  <li>• You can delete your data at any time</li>
                </ul>
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="consent" className="text-sm cursor-pointer">
                    I agree to the terms and conditions and understand how my data will be used.
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={!consent}>
                Continue to PhyChat
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>Need help? Visit our <Link href="/contact" className="text-primary hover:underline">Contact page</Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
