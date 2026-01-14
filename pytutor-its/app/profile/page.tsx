'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Award, Target, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const studentName = typeof window !== 'undefined' 
    ? localStorage.getItem('student-name') || 'Student' 
    : 'Student';

  const stats = [
    { label: 'Total Sessions', value: '12', icon: Calendar, color: 'text-blue-500' },
    { label: 'Challenges Completed', value: '8', icon: Award, color: 'text-green-500' },
    { label: 'Current Streak', value: '5 days', icon: TrendingUp, color: 'text-orange-500' },
    { label: 'Skill Level', value: 'Intermediate', icon: Target, color: 'text-purple-500' },
  ];

  const recentActivity = [
    { date: '2026-01-14', activity: 'Completed: Off-by-One Loop Error', type: 'success' },
    { date: '2026-01-13', activity: 'Started: List Index Error Challenge', type: 'info' },
    { date: '2026-01-12', activity: 'Completed: Function Return Bug', type: 'success' },
    { date: '2026-01-11', activity: 'Asked 15 debugging questions', type: 'info' },
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
            <div>
              <h1 className="font-bold text-xl">Your Progress</h1>
              <p className="text-sm text-muted-foreground">Track your learning journey</p>
            </div>
          </div>
          <Link href="/chat">
            <Button>Continue Learning</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{studentName}</h2>
                <p className="text-muted-foreground">Intermediate Python Developer</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-secondary rounded-full w-48">
                      <div className="h-2 bg-primary rounded-full w-32"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">67% to Advanced</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
