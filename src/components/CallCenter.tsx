import React, { useState } from 'react';
import { Phone, Video, Search, Clock, User, PhoneCall, VideoIcon, Mic, MicOff, PhoneOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CallCenter() {
  const [activeCall, setActiveCall] = useState(false);
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const availablePartners = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      country: '🇲🇽 Mexico',
      language: 'Spanish',
      level: 'Native',
      avatar: 'MR',
      online: true,
      rating: 4.9,
      callsCompleted: 127,
      specialties: ['Conversation', 'Grammar', 'Pronunciation'],
    },
    {
      id: 2,
      name: 'Jean Dubois',
      country: '🇫🇷 France',
      language: 'French',
      level: 'Native',
      avatar: 'JD',
      online: true,
      rating: 4.8,
      callsCompleted: 89,
      specialties: ['Business French', 'Literature', 'Culture'],
    },
    {
      id: 3,
      name: 'Hans Mueller',
      country: '🇩🇪 Germany',
      language: 'German',
      level: 'Native',
      avatar: 'HM',
      online: false,
      rating: 4.7,
      callsCompleted: 156,
      specialties: ['Technical German', 'Grammar', 'Writing'],
    },
    {
      id: 4,
      name: 'Sofia Rossi',
      country: '🇮🇹 Italy',
      language: 'Italian',
      level: 'Native',
      avatar: 'SR',
      online: true,
      rating: 4.9,
      callsCompleted: 201,
      specialties: ['Conversation', 'Culture', 'Travel Italian'],
    },
    {
      id: 5,
      name: 'Yuki Tanaka',
      country: '🇯🇵 Japan',
      language: 'Japanese',
      level: 'Native',
      avatar: 'YT',
      online: true,
      rating: 4.8,
      callsCompleted: 78,
      specialties: ['Beginner Friendly', 'Business Japanese', 'Culture'],
    },
  ];

  const recentCalls = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      country: '🇲🇽',
      duration: '25 min',
      type: 'video',
      time: '2 hours ago',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jean Dubois',
      country: '🇫🇷',
      duration: '18 min',
      type: 'voice',
      time: '1 day ago',
      rating: 4,
    },
    {
      id: 3,
      name: 'Sofia Rossi',
      country: '🇮🇹',
      duration: '32 min',
      type: 'video',
      time: '3 days ago',
      rating: 5,
    },
  ];

  const filteredPartners = availablePartners.filter(partner =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startCall = (partner: any, type: 'voice' | 'video') => {
    setActiveCall(true);
    setCallType(type);
  };

  const endCall = () => {
    setActiveCall(false);
    setIsMuted(false);
  };

  if (activeCall) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-medium text-green-700">MR</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Maria Rodriguez</h2>
            <p className="text-gray-300">🇲🇽 Mexico • Spanish Native</p>
            <p className="text-green-400 mt-2">Connected • 02:45</p>
          </div>

          {callType === 'video' && (
            <div className="mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1585692614068-032d02167af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx2aWRlbyUyMGNhbGwlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NTMzODg2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Video call"
                className="w-96 h-64 object-cover rounded-lg mx-auto"
              />
            </div>
          )}

          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isMuted ? 'bg-red-600' : 'bg-gray-700'
              } hover:bg-opacity-80 transition-colors`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            
            <button
              onClick={endCall}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <PhoneOff className="w-6 h-6" />
            </button>

            {callType === 'video' && (
              <button className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                <VideoIcon className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl text-gray-900 mb-2">Call Center</h1>
        <p className="text-gray-600">Practice speaking with native speakers around the world</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, language, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Partners */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Partners</h2>
          <div className="space-y-4">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-green-700">{partner.avatar}</span>
                        </div>
                        {partner.online && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          <h3 className="font-semibold text-gray-900 mr-2">{partner.name}</h3>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {partner.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{partner.country}</p>
                        <p className="text-sm text-gray-700 mb-3">
                          <strong>{partner.language}</strong> • {partner.callsCompleted} calls completed
                        </p>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400 mr-2">
                            {'★'.repeat(Math.floor(partner.rating))}
                          </div>
                          <span className="text-sm text-gray-600">{partner.rating}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {partner.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={() => startCall(partner, 'voice')}
                        disabled={!partner.online}
                        variant="outline"
                        size="sm"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Voice
                      </Button>
                      <Button
                        onClick={() => startCall(partner, 'video')}
                        disabled={!partner.online}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Video
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Calls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                Recent Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-green-700">
                          {call.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{call.name}</p>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>{call.country}</span>
                          <span className="mx-1">•</span>
                          <span>{call.duration}</span>
                          <span className="mx-1">•</span>
                          <span>{call.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {call.type === 'video' ? (
                        <Video className="w-4 h-4 text-green-600" />
                      ) : (
                        <Phone className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Calls</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Minutes</span>
                  <span className="font-semibold">1,240</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="font-semibold">4.8 ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Languages Practiced</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Call Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Test your audio/video before starting</p>
                <p>• Have topics ready to discuss</p>
                <p>• Don't be afraid to ask for clarification</p>
                <p>• Take notes during the conversation</p>
                <p>• Be patient and encouraging</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}