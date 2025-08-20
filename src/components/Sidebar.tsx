import React from 'react';
import { BookOpen, Home, Users, Phone, Trophy, MessageCircle, Settings, User, LogOut } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { useAppContext } from './AppContext';
import { Badge } from './ui/badge';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onBackToLanding?: () => void;
}

export function Sidebar({ activeTab, setActiveTab, isOpen, onClose, onBackToLanding }: SidebarProps) {
  const { state } = useAppContext();
  
  // Try to get user from Clerk if available, otherwise null
  let user = null;
  let signOut = null;
  
  try {
    user = useUser?.()?.user || null;
    signOut = useClerk?.()?.signOut || null;
  } catch (error) {
    // Clerk hooks not available, use mock data
    user = null;
  }

  // Get joined groups count for badge
  const joinedGroupsCount = state.studyGroups.filter(group => group.isJoined).length;
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { 
      id: 'groups', 
      label: 'Study Groups', 
      icon: Users,
      badge: joinedGroupsCount > 0 ? joinedGroupsCount : null
    },
    { id: 'calls', label: 'Call Center', icon: Phone },
    { id: 'progress', label: 'Progress', icon: Trophy },
  ];

  // Component for rendering groups section
  const GroupsSection = ({ isMobile = false }) => {
    if (joinedGroupsCount === 0) return null;
    
    return (
      <div className="px-2 py-4">
        <div className="px-2 mb-2">
          <h3 className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
            My Groups ({joinedGroupsCount})
          </h3>
        </div>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {state.studyGroups
            .filter(group => group.isJoined)
            .slice(0, 4)
            .map((group) => (
              <button
                key={group.id}
                onClick={() => {
                  setActiveTab('groups');
                  if (isMobile) {
                    onClose();
                  }
                }}
                className="group flex items-center justify-between px-2 py-1.5 text-sm rounded-md w-full transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              >
                <div className="flex items-center min-w-0 flex-1">
                  <MessageCircle className="mr-2 flex-shrink-0 h-4 w-4" />
                  <span className="truncate">{group.name}</span>
                </div>
                {group.online > 0 && (
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                )}
              </button>
            ))}
          {joinedGroupsCount > 4 && (
            <button
              onClick={() => {
                setActiveTab('groups');
                if (isMobile) {
                  onClose();
                }
              }}
              className="w-full text-left px-2 py-1.5 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
            >
              +{joinedGroupsCount - 4} more groups
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleItemClick = (itemId: string) => {
    setActiveTab(itemId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleSignOut = () => {
    if (signOut) {
      signOut();
    } else if (onBackToLanding) {
      // In demo mode, go back to landing page
      onBackToLanding();
    } else {
      // Fallback: refresh the page
      window.location.reload();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-sidebar border-r border-sidebar-border pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="ml-2 font-bold text-sidebar-foreground">LinguaConnect</span>
          </div>
          
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex items-center justify-between px-2 py-2 font-medium rounded-md w-full transition-colors ${
                      activeTab === item.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="mr-3 flex-shrink-0 h-6 w-6" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-2 bg-primary text-primary-foreground text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* My Groups Section - Desktop */}
            <GroupsSection isMobile={false} />
            
            <div className="flex-shrink-0 border-t border-sidebar-border p-4 space-y-3">
              <div className="flex items-center">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={user.fullName || 'User'} 
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="bg-green-100 rounded-full p-2">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div className="ml-3 flex-1">
                  <p className="font-medium text-sidebar-foreground">
                    {user?.fullName || user?.firstName || 'User'}
                  </p>
                  <p className="text-sidebar-foreground/60">Student</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {signOut ? 'Sign Out' : 'Back to Home'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between flex-shrink-0 px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="ml-2 font-bold text-sidebar-foreground">LinguaConnect</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`group flex items-center justify-between px-2 py-2 font-medium rounded-md w-full transition-colors ${
                      activeTab === item.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="mr-3 flex-shrink-0 h-6 w-6" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-2 bg-primary text-primary-foreground text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* My Groups Section - Mobile */}
            <GroupsSection isMobile={true} />
            
            <div className="flex-shrink-0 border-t border-sidebar-border p-4 space-y-3">
              <div className="flex items-center">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={user.fullName || 'User'} 
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="bg-green-100 rounded-full p-2">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div className="ml-3 flex-1">
                  <p className="font-medium text-sidebar-foreground">
                    {user?.fullName || user?.firstName || 'User'}
                  </p>
                  <p className="text-sidebar-foreground/60">Student</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {signOut ? 'Sign Out' : 'Back to Home'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}