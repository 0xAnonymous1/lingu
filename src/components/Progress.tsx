import React from 'react';
import { Trophy, Calendar, Target, TrendingUp, Award, Star, BookOpen, Users, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress as ProgressBar } from './ui/progress';
import { Badge } from './ui/badge';

export function Progress() {
  const achievements = [
    { name: 'First Lesson Complete', icon: BookOpen, earned: true, color: 'text-green-600' },
    { name: 'Week Streak', icon: Calendar, earned: true, color: 'text-blue-600' },
    { name: 'First Group Chat', icon: Users, earned: true, color: 'text-purple-600' },
    { name: 'First Voice Call', icon: Phone, earned: false, color: 'text-gray-400' },
    { name: 'Perfect Week', icon: Target, earned: false, color: 'text-gray-400' },
    { name: 'Language Master', icon: Award, earned: false, color: 'text-gray-400' },
  ];

  const weeklyActivity = [
    { day: 'Mon', lessons: 2, calls: 1, groups: 3 },
    { day: 'Tue', lessons: 1, calls: 0, groups: 2 },
    { day: 'Wed', lessons: 3, calls: 2, groups: 4 },
    { day: 'Thu', lessons: 2, calls: 1, groups: 2 },
    { day: 'Fri', lessons: 1, calls: 0, groups: 1 },
    { day: 'Sat', lessons: 0, calls: 1, groups: 2 },
    { day: 'Sun', lessons: 2, calls: 1, groups: 3 },
  ];

  const languageProgress = [
    { language: 'Spanish', flag: '🇪🇸', progress: 65, level: 'Intermediate', lessons: 24, hours: 18 },
    { language: 'French', flag: '🇫🇷', progress: 40, level: 'Beginner', lessons: 12, hours: 9 },
    { language: 'German', flag: '🇩🇪', progress: 25, level: 'Beginner', lessons: 8, hours: 6 },
  ];

  const recentMilestones = [
    { date: '2 days ago', achievement: 'Completed 20th Spanish lesson', type: 'lesson' },
    { date: '5 days ago', achievement: 'First 30-minute call with Maria', type: 'call' },
    { date: '1 week ago', achievement: 'Joined French Conversation Club', type: 'group' },
    { date: '2 weeks ago', achievement: '7-day learning streak achieved', type: 'streak' },
  ];

  const getMaxActivity = () => {
    const allValues = weeklyActivity.flatMap(day => [day.lessons, day.calls, day.groups]);
    return Math.max(...allValues);
  };

  const maxActivity = getMaxActivity();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-600">Track your language learning journey</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">44</div>
              <div className="text-sm text-gray-600">Lessons Done</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">145</div>
              <div className="text-sm text-gray-600">Call Minutes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">3</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Language Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Language Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {languageProgress.map((lang, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{lang.flag}</span>
                      <span className="font-medium text-gray-900">{lang.language}</span>
                      <Badge variant="outline" className="ml-2">
                        {lang.level}
                      </Badge>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{lang.progress}%</span>
                  </div>
                  <ProgressBar value={lang.progress} className="h-3 mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{lang.lessons} lessons</span>
                    <span>{lang.hours} hours</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{day.day}</div>
                  <div className="flex-1 flex space-x-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Lessons</span>
                        <span>{day.lessons}</span>
                      </div>
                      <div 
                        className="h-2 bg-green-200 rounded-full overflow-hidden"
                      >
                        <div 
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${(day.lessons / maxActivity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Calls</span>
                        <span>{day.calls}</span>
                      </div>
                      <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${(day.calls / maxActivity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Groups</span>
                        <span>{day.groups}</span>
                      </div>
                      <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(day.groups / maxActivity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 text-center ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
                    <p className={`text-sm font-medium ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </p>
                    {achievement.earned && (
                      <div className="flex justify-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Recent Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    milestone.type === 'lesson' ? 'bg-green-500' :
                    milestone.type === 'call' ? 'bg-purple-500' :
                    milestone.type === 'group' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{milestone.achievement}</p>
                    <p className="text-xs text-gray-500">{milestone.date}</p>
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