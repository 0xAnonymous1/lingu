import React, { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { BookOpen } from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LearningModule } from './components/LearningModule';
import { StudyGroups } from './components/StudyGroups';
import { CallCenter } from './components/CallCenter';
import { Progress } from './components/Progress';
import { LandingPage } from './components/LandingPage';
import { AppProvider } from './components/AppContext';
import { Toaster } from './components/ui/sonner';
import './styles/globals.css';

// ✅ Correct env import
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AppContent({ onBackToLanding }: { onBackToLanding?: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, isLoaded } = useUser();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'learn': return <LearningModule />;
      case 'groups': return <StudyGroups />;
      case 'calls': return <CallCenter />;
      case 'progress': return <Progress />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card shadow-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-foreground hover:bg-accent transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="font-medium text-foreground">LinguaConnect</span>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-2">
            <img src={user.imageUrl} alt={user.fullName || 'User'} className="w-8 h-8 rounded-full" />
            <span className="hidden sm:block text-foreground">{user.firstName || 'User'}</span>
          </div>
        )}
      </div>

      <div className="flex">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onBackToLanding={onBackToLanding}
        />
        <main className="flex-1 lg:ml-64">
          <div className="min-h-screen">{renderContent()}</div>
        </main>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Toaster />
    </div>
  );
}

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function AuthenticatedApp({ onBackToLanding }: { onBackToLanding?: () => void }) {
  return (
    <AppProvider>
      <AppContent onBackToLanding={onBackToLanding} />
    </AppProvider>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <BookOpen className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-medium text-foreground mb-2">LinguaConnect</h2>
        <p className="text-muted-foreground">Loading your account...</p>
      </div>
    </div>
  );
}

function ClerkAuthWrapper({ onBackToLanding }: { onBackToLanding: () => void }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <LoadingScreen />;
  if (isSignedIn) return <AuthenticatedApp onBackToLanding={onBackToLanding} />;

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <p className="text-foreground">Please sign in to continue.</p> */}
         
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'setup' | 'login' | 'app'>('landing');

  const isClerkConfigured = !!CLERK_PUBLISHABLE_KEY;

  const handleGetStarted = () => {
    if (isClerkConfigured) setCurrentView('login');
    else setCurrentView('setup');
  };

  const handleBackToLanding = () => setCurrentView('landing');

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} onLogin={handleGetStarted} />;
  }

  if (currentView === 'app') {
    return (
      <div className="min-h-screen">
        <AuthenticatedApp onBackToLanding={handleBackToLanding} />
      </div>
    );
  }

  if (currentView === 'login' && isClerkConfigured) {
    return (
      <div className="min-h-screen">
        <ClerkAuthWrapper onBackToLanding={handleBackToLanding} />
      </div>
    );
  }

  return <LandingPage onGetStarted={handleGetStarted} onLogin={handleGetStarted} />;
}
