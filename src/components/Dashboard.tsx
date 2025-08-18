import React from 'react';
import { BookOpen, Users, Trophy, Clock, ArrowRight, Play, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress as ProgressBar } from './ui/progress';
import { Badge } from './ui/badge';
import { useAppContext } from './AppContext';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { state } = useAppContext();

  // Calculate progress statistics
  const completedLessons = state.lessonProgress.filter(p => p.completed).length;
  const totalLessons = 24; // Total available lessons
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  const joinedGroups = state.studyGroups.filter(g => g.isJoined).length;
  const unlockedAchievements = state.achievements.filter(a => a.unlocked).length;

  // Calculate weekly progress (mock data for demonstration)
  const weeklyProgress = [65, 78, 82, 90, 85, 92, 88];
  const currentWeekAverage = Math.round(weeklyProgress.reduce((a, b) => a + b) / weeklyProgress.length);

  // Recent activities (mock data)
  const recentActivities = [
    { id: 1, type: 'lesson', title: 'Basic Greetings', time: '2 hours ago', score: 85 },
    { id: 2, type: 'group', title: 'Spanish Beginners 🇪🇸', time: '4 hours ago', action: 'Joined conversation' },
    { id: 3, type: 'achievement', title: 'First Steps', time: '1 day ago', action: 'Achievement unlocked' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-green-gradient rounded-lg p-6 text-white shadow-green">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">
              Welcome back, {state.user.name}! 👋
            </h1>
            <p className="text-green-100 mb-4">
              You're on a {state.user.streak}-day streak! Keep it up and reach your goals.
            </p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30">
                Level: {state.user.level}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {state.user.totalPoints} Points
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{state.user.streak}</div>
            <div className="text-green-100">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="lingua-card cursor-pointer transition-all duration-200 hover:scale-[1.05]" onClick={() => onNavigate('learn')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold">{completedLessons}/{totalLessons}</p>
                <p className="text-muted-foreground">Lessons Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lingua-card cursor-pointer transition-all duration-200 hover:scale-[1.05]" onClick={() => onNavigate('groups')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold">{joinedGroups}</p>
                <p className="text-muted-foreground">Study Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lingua-card cursor-pointer transition-all duration-200 hover:scale-[1.05]" onClick={() => onNavigate('progress')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-bold">{unlockedAchievements}</p>
                <p className="text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lingua-card cursor-pointer transition-all duration-200 hover:scale-[1.05]" onClick={() => onNavigate('calls')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-bold">{currentWeekAverage}%</p>
                <p className="text-muted-foreground">Weekly Average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Learning Progress</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('learn')}
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{progressPercentage}%</span>
              </div>
              <ProgressBar value={progressPercentage} className="h-3" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Basic Vocabulary</p>
                    <p className="text-sm text-gray-600">100% Complete</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Mastered</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Grammar Basics</p>
                    <p className="text-sm text-gray-600">75% Complete</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onNavigate('learn')}
                >
                  Continue
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Conversation Practice</p>
                    <p className="text-sm text-gray-600">0% Complete</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onNavigate('learn')}
                >
                  Start
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {activity.type === 'lesson' && <BookOpen className="w-4 h-4 text-green-600" />}
                    {activity.type === 'group' && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'achievement' && <Trophy className="w-4 h-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-600">
                      {activity.action || `Scored ${activity.score}%`}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex flex-col space-y-2 lingua-button-primary transition-all duration-200 hover:scale-[1.05]"
              variant="ghost"
              onClick={() => onNavigate('learn')}
            >
              <Play className="w-6 h-6" />
              <span>Start Lesson</span>
            </Button>
            
            <Button 
              className="h-20 flex flex-col space-y-2 lingua-button-secondary transition-all duration-200 hover:scale-[1.05]" 
              variant="ghost"
              onClick={() => onNavigate('groups')}
            >
              <Users className="w-6 h-6" />
              <span>Join Discussion</span>
            </Button>
            
            <Button 
              className="h-20 flex flex-col space-y-2 lingua-button-secondary transition-all duration-200 hover:scale-[1.05]" 
              variant="ghost"
              onClick={() => onNavigate('calls')}
            >
              <Clock className="w-6 h-6" />
              <span>Practice Speaking</span>
            </Button>
            
            <Button 
              className="h-20 flex flex-col space-y-2 lingua-button-secondary transition-all duration-200 hover:scale-[1.05]" 
              variant="ghost"
              onClick={() => onNavigate('progress')}
            >
              <TrendingUp className="w-6 h-6" />
              <span>View Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}