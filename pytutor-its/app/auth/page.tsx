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
              Enter your details to participate in the PyTutor AI research study
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
                <h3 className="font-semibold text-sm">Research Consent</h3>
                <p className="text-sm text-muted-foreground">
                  This study is conducted by Group 03 as part of our Final Year Research Project
                  on "Personalized and Explainable AI for Python Debugging Education."
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your interactions will be recorded for research purposes</li>
                  <li>• All data will be anonymized and kept confidential</li>
                  <li>• You may withdraw from the study at any time</li>
                  <li>• Results will be used solely for academic research</li>
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
                    I have read and understood the research consent information, and I agree to
                    participate in this study.
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={!consent}>
                Continue to PyTutor AI
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>Questions about the study? Contact Group 03</p>
              <p className="mt-1">
                Afrin Jeehan • Rifnas • Viyaasan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
