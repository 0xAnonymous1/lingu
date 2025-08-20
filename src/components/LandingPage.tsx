import React, { useState } from 'react';
import { BookOpen, Users, Phone, Globe, Award, Star, ArrowRight, Play, MessageCircle, Video, Mic, CheckCircle, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
// import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;


}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Learn with engaging, bite-sized lessons that adapt to your pace and learning style.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Global Study Groups",
      description: "Connect with learners worldwide in real-time discussion groups organized by language and level.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Phone,
      title: "Voice Practice",
      description: "Practice speaking with native speakers through our integrated voice and video calling system.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Globe,
      title: "40+ Languages",
      description: "Choose from over 40 languages with content created by native speakers and language experts.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics, achievements, and personalized insights.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Practice writing and get instant feedback in topic-based chat rooms with other learners.",
      color: "bg-pink-100 text-pink-600"
    }
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      country: "🇲🇽 Mexico",
      text: "LinguaConnect helped me become fluent in English in just 6 months. The conversation practice with native speakers made all the difference!",
      rating: 5,
      language: "Learning English"
    },
    {
      name: "Jean-Pierre Dubois",
      country: "🇫🇷 France", 
      text: "The study groups are incredible. I've made friends from around the world while learning Spanish. It's like traveling without leaving home!",
      rating: 5,
      language: "Learning Spanish"
    },
    {
      name: "Yuki Tanaka",
      country: "🇯🇵 Japan",
      text: "The interactive lessons are so engaging. I actually look forward to my daily French practice now. The progress tracking keeps me motivated!",
      rating: 5,
      language: "Learning French"
    }
  ];

  const stats = [
    { number: "2M+", label: "Active Learners" },
    { number: "40+", label: "Languages" },
    { number: "150+", label: "Countries" },
    { number: "4.9★", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-gradient rounded-xl shadow-green">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-gradient font-medium">LinguaConnect</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Reviews</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
              <Button variant="ghost" onClick={onLogin}>Sign In</Button>
              <Button className="lingua-button-primary" onClick={onGetStarted}>
                Get Started Free
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-border">
              <a href="#features" className="block text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#testimonials" className="block text-foreground hover:text-primary transition-colors">Reviews</a>
              <a href="#pricing" className="block text-foreground hover:text-primary transition-colors">Pricing</a>
              <div className="space-y-2 pt-2">
                <Button variant="ghost" className="w-full" onClick={onLogin}>Sign In</Button>
                <Button className="w-full lingua-button-primary" onClick={onGetStarted}>
                  Get Started Free
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2310b981%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-6 leading-tight">
              <span className="block text-4xl md:text-6xl font-bold text-foreground mb-2">
                Learn Languages
              </span>
              <span className="block text-4xl md:text-6xl font-bold text-gradient">
                Connect Globally
              </span>
            </h1>
            
            <p className="mb-8 max-w-2xl mx-auto text-muted-foreground text-lg">
              Join millions of learners mastering new languages through interactive lessons, 
              real conversations with native speakers, and a supportive global community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="lingua-button-primary px-8 py-3 group"
                onClick={onGetStarted}
              >
                <span>Start Learning Free</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-3 group border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need to{' '}
              <span className="text-gradient">Master Any Language</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge technology with human connection 
              to accelerate your language learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="lingua-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
              Start Speaking in{' '}
              <span className="text-gradient">Just 3 Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Language",
                description: "Select from 40+ languages and set your learning goals. Our AI will create a personalized curriculum just for you.",
                icon: Globe
              },
              {
                step: "02", 
                title: "Learn & Practice",
                description: "Complete interactive lessons, practice with native speakers, and join study groups that match your level.",
                icon: BookOpen
              },
              {
                step: "03",
                title: "Track Progress",
                description: "Monitor your improvement with detailed analytics, earn achievements, and celebrate milestones with the community.",
                icon: Award
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center relative">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-primary/30 transform -translate-y-1/2"></div>
                  )}
                  <div className="relative bg-background rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center border-4 border-primary">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
              Loved by{' '}
              <span className="text-gradient">Learners Worldwide</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of successful language learners who achieved their goals with LinguaConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="lingua-card p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.country}</div>
                    </div>
                    <div className="text-primary font-medium">{testimonial.language}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold">
            Ready to Start Your Language Journey?
          </h2>
          <p className="mb-8 text-green-100 text-lg max-w-2xl mx-auto">
            Join over 2 million learners who are already speaking new languages with confidence. 
            Start your free trial today - no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 font-medium"
              onClick={onGetStarted}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
              onClick={onLogin}
            >
              Sign In
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { icon: CheckCircle, text: "Free 14-day trial" },
              { icon: CheckCircle, text: "No credit card required" },
              { icon: CheckCircle, text: "Cancel anytime" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <Icon className="w-5 h-5 text-green-200" />
                  <span className="text-green-100">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-gradient rounded-xl shadow-green">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-gradient font-medium">LinguaConnect</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Connecting language learners worldwide through interactive lessons, 
                real conversations, and a supportive global community.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Languages</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mobile App</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 LinguaConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}