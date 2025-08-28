import { useUser } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { BookOpen } from "lucide-react";

import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { LearningModule } from "./components/LearningModule";
import { StudyGroups } from "./components/StudyGroups";
import { CallCenter } from "./components/CallCenter";
import { Progress } from "./components/Progress";
import { LandingPage } from "./components/LandingPage";
import { AppProvider } from "./components/AppContext";
import { Toaster } from "./components/ui/sonner";
import "./styles/globals.css";
import { useState } from "react";

// ✅ Correct env import
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AppContent({ onBackToLanding }: { onBackToLanding?: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useUser();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveTab} />;
      case "learn":
        return <LearningModule />;
      case "groups":
        return <StudyGroups />;
      case "calls":
        return <CallCenter />;
      case "progress":
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
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="font-medium text-foreground">Lingu</span>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-2">
            <img
              src={user.imageUrl}
              alt={user.fullName || "User"}
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:block text-foreground">
              {user.firstName || "User"}
            </span>
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

function AuthenticatedApp({
  onBackToLanding,
}: {
  onBackToLanding?: () => void;
}) {
  return (
    <AppProvider>
      <AppContent onBackToLanding={onBackToLanding} />
    </AppProvider>
  );
}

export default function App() {
  const isClerkConfigured = !!CLERK_PUBLISHABLE_KEY;

  if (!isClerkConfigured) {
    return <LandingPage />;
  }

  return (
    <>
      {/* ✅ If signed in → show main app */}
      <SignedIn>
        <AuthenticatedApp />
      </SignedIn>

      {/* ✅ If signed out → show landing page with redirect to sign-in */}
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  );
}
