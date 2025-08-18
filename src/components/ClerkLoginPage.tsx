import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { BookOpen } from 'lucide-react';

interface ClerkLoginPageProps {
  mode?: 'sign-in' | 'sign-up';
}

export function ClerkLoginPage({ mode = 'sign-in' }: ClerkLoginPageProps) {
  const [currentMode, setCurrentMode] = React.useState(mode);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50" />
      
      {/* Login Container */}
      <div className="relative w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-gradient rounded-xl shadow-green">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-gradient font-bold">LinguaConnect</h1>
                <p className="text-muted-foreground">Learn. Connect. Grow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clerk Component */}
        <div className="clerk-container">
          <div className="lingua-card shadow-2xl border-0 p-8 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-foreground">Setup Required</h2>
              <p className="text-muted-foreground">
                To enable authentication, please configure your Clerk publishable key.
              </p>
            </div>
            
            <div className="space-y-4 text-left">
              <div>
                <h3 className="text-primary font-medium">Steps to setup:</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground mt-2">
                  <li>Create an account at <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">clerk.com</a></li>
                  <li>Get your publishable key from the dashboard</li>
                  <li>Replace 'pk_test_YOUR_PUBLISHABLE_KEY_HERE' in App.tsx with your key</li>
                </ol>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Demo mode:</strong> LinguaConnect is currently running with mock authentication.
                  You can explore all features without signing in.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full lingua-button-primary"
            >
              Continue to Demo
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="p-3 bg-green-100 rounded-lg mx-auto w-fit mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground">Interactive Lessons</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-lg mx-auto w-fit mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-muted-foreground">Study Groups</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-100 rounded-lg mx-auto w-fit mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-muted-foreground">Voice Practice</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clerk-container .cl-internal-b3fm6y {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }
        .clerk-container .cl-formButtonPrimary {
          background: linear-gradient(135deg, var(--color-green-500), var(--color-green-600));
        }
      `}</style>
    </div>
  );
}