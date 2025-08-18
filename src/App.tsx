import React, { useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Calendar, Users, Phone, BookOpen, Trophy, Settings, MessageCircle, Video } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LearningModule } from './components/LearningModule';
import { StudyGroups } from './components/StudyGroups';
import { CallCenter } from './components/CallCenter';
import { Progress } from './components/Progress';
import { ClerkLoginPage } from './components/ClerkLoginPage';
import { AppProvider } from './components/AppContext';
import { Toaster } from './components/ui/sonner';
import './styles/globals.css';

// Replace this with your actual Clerk publishable key from the Clerk Dashboard
const CLERK_PUBLISHABLE_KEY = 'pk_test_YOUR_PUBLISHABLE_KEY_HERE';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Try to get user from Clerk if available
  let user = null;
  try {
    user = useUser?.()?.user || null;
  } catch (error) {
    // Clerk not available, user will remain null
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'learn':
        return <LearningModule />;
      case 'groups':
        return <StudyGroups />;
      case 'calls':
        return <CallCenter />;
      case 'progress':
        return <Progress />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
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
        
        {/* User Profile - Mobile */}
        {user && (
          <div className="flex items-center space-x-2">
            <img 
              src={user.imageUrl} 
              alt={user.fullName || 'User'} 
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:block text-foreground">
              {user.firstName || 'User'}
            </span>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="min-h-screen">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

function AuthenticatedApp() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default function App() {
  const [demoMode, setDemoMode] = useState(false);

  // Check if Clerk is properly configured
  const isClerkConfigured = CLERK_PUBLISHABLE_KEY && !CLERK_PUBLISHABLE_KEY.includes('YOUR_PUBLISHABLE_KEY_HERE');

  // If not configured or in demo mode, show the app directly
  if (!isClerkConfigured || demoMode) {
    return (
      <div className="min-h-screen">
        <AuthenticatedApp />
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <div className="min-h-screen">
        <SignedIn>
          <AuthenticatedApp />
        </SignedIn>
        <SignedOut>
          <ClerkLoginPage />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}