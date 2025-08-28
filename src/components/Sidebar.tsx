import  { useState } from 'react';
import { BookOpen, Home, Users, Phone, Trophy, User, LogOut, Edit } from 'lucide-react';
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
  const { user } = useUser();
  const { signOut } = useClerk();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customName, setCustomName] = useState(user?.firstName || "");

  // Update Clerk name directly
  const handleSaveName = async () => {
    if (!user) return;
    try {
      await user.update({
        firstName: customName,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update name:", error);
      alert("Failed to update name. Please try again.");
    }
  };

  const displayName = user?.firstName || "User";

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
      onBackToLanding();
    } else {
      window.location.reload();
    }
  };

  // Profile section with edit
  const ProfileSection = () => (
    <div className="flex-shrink-0 border-t border-sidebar-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={displayName} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="bg-green-100 rounded-full p-2">
              <User className="w-6 h-6 text-primary" />
            </div>
          )}
          <div className="ml-3">
            <p className="font-medium text-sidebar-foreground">{displayName}</p>
            <p className="text-sidebar-foreground/60">Student</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-1 rounded-md hover:bg-sidebar-accent/50"
        >
          <Edit className="w-4 h-4 text-sidebar-foreground" />
        </button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-sidebar border-r border-sidebar-border pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="ml-2 font-bold text-sidebar-foreground">Lingu</span>
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

            <ProfileSection />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between flex-shrink-0 px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="ml-2 font-bold text-sidebar-foreground">Lingu</span>
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

            <ProfileSection />
          </div>
        </div>
      </div>

      {/* Modal for editing name */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Name</h2>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveName}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
