import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  currentLanguage: string;
  joinedDate: string;
  streak: number;
  totalPoints: number;
}

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: string;
}

interface GroupMessage {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  userCountry: string;
  message: string;
  timestamp: string;
  avatar: string;
  isMe?: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  language: string;
  level: string;
  members: number;
  online: number;
  description: string;
  country: string;
  lastActive: string;
  isJoined: boolean;
  messages: GroupMessage[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

interface AppState {
  user: User;
  lessonProgress: LessonProgress[];
  studyGroups: StudyGroup[];
  achievements: Achievement[];
  settings: {
    notifications: boolean;
    soundEffects: boolean;
    darkMode: boolean;
    language: string;
  };
  callHistory: Array<{
    id: string;
    contactName: string;
    type: 'incoming' | 'outgoing';
    duration: string;
    timestamp: string;
    status: 'completed' | 'missed';
  }>;
}

type AppAction =
  | { type: 'UPDATE_LESSON_PROGRESS'; lessonId: string; score: number }
  | { type: 'JOIN_GROUP'; groupId: string }
  | { type: 'LEAVE_GROUP'; groupId: string }
  | { type: 'CREATE_GROUP'; group: Omit<StudyGroup, 'id'> }
  | { type: 'ADD_MESSAGE'; groupId: string; message: Omit<GroupMessage, 'id'> }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<AppState['settings']> }
  | { type: 'ADD_CALL_HISTORY'; call: Omit<AppState['callHistory'][0], 'id'> }
  | { type: 'UPDATE_USER'; user: Partial<User> }
  | { type: 'RESET_STREAK' }
  | { type: 'INCREMENT_STREAK' }
  | { type: 'LOAD_STATE'; state: AppState };

const defaultInitialState: AppState = {
  user: {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'AJ',
    level: 'Intermediate',
    currentLanguage: 'Spanish',
    joinedDate: '2024-01-15',
    streak: 5,
    totalPoints: 1250
  },
  lessonProgress: [],
  studyGroups: [
    {
      id: '1',
      name: 'Spanish Beginners 🇪🇸',
      language: 'Spanish',
      level: 'Beginner',
      members: 12,
      online: 5,
      description: 'Practice basic Spanish conversations and help each other learn!',
      country: 'International',
      lastActive: '2 min ago',
      isJoined: true,
      messages: [
        {
          id: 'msg-1',
          groupId: '1',
          userId: 'user-2',
          userName: 'Maria Rodriguez',
          userCountry: '🇲🇽',
          message: '¡Hola everyone! How do you say "I am excited to learn" in Spanish?',
          timestamp: new Date(Date.now() - 120000).toISOString(),
          avatar: 'MR'
        },
        {
          id: 'msg-2',
          groupId: '1',
          userId: 'user-1',
          userName: 'Alex Johnson',
          userCountry: '🇺🇸',
          message: '"Estoy emocionado/a de aprender" - the ending depends on your gender!',
          timestamp: new Date(Date.now() - 60000).toISOString(),
          avatar: 'AJ',
          isMe: true
        }
      ]
    },
    {
      id: '2',
      name: 'French Conversation Club 🇫🇷',
      language: 'French',
      level: 'Intermediate',
      members: 8,
      online: 3,
      description: 'Daily French conversations for intermediate learners',
      country: 'International',
      lastActive: '5 min ago',
      isJoined: true,
      messages: []
    }
  ],
  achievements: [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      unlocked: true,
      unlockedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'week-streak',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      unlocked: false,
      progress: 5,
      target: 7
    },
    {
      id: 'social-butterfly',
      title: 'Social Butterfly',
      description: 'Join 3 study groups',
      icon: '👥',
      unlocked: false,
      progress: 2,
      target: 3
    }
  ],
  settings: {
    notifications: true,
    soundEffects: true,
    darkMode: false,
    language: 'English'
  },
  callHistory: []
};

// Function to safely load state from localStorage
function getInitialState(): AppState {
  try {
    const savedState = localStorage.getItem('linguaconnect-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Merge with default state to handle schema changes and ensure all properties exist
      return {
        user: { ...defaultInitialState.user, ...parsedState.user },
        lessonProgress: Array.isArray(parsedState.lessonProgress) ? parsedState.lessonProgress : [],
        studyGroups: Array.isArray(parsedState.studyGroups) ? parsedState.studyGroups : defaultInitialState.studyGroups,
        achievements: Array.isArray(parsedState.achievements) ? parsedState.achievements : defaultInitialState.achievements,
        settings: { ...defaultInitialState.settings, ...parsedState.settings },
        callHistory: Array.isArray(parsedState.callHistory) ? parsedState.callHistory : []
      };
    }
  } catch (error) {
    console.error('Failed to load saved state:', error);
  }
  return defaultInitialState;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_STATE': {
      return action.state;
    }

    case 'UPDATE_LESSON_PROGRESS': {
      const existingProgress = state.lessonProgress.find(p => p.lessonId === action.lessonId);
      const newProgress: LessonProgress = {
        lessonId: action.lessonId,
        completed: action.score >= 70,
        score: action.score,
        completedAt: new Date().toISOString()
      };

      const updatedProgress = existingProgress
        ? state.lessonProgress.map(p => p.lessonId === action.lessonId ? newProgress : p)
        : [...state.lessonProgress, newProgress];

      // Update user points and streak
      const pointsGained = action.score >= 70 ? 50 : 25;
      const newStreak = action.score >= 70 ? state.user.streak + 1 : state.user.streak;

      return {
        ...state,
        lessonProgress: updatedProgress,
        user: {
          ...state.user,
          totalPoints: state.user.totalPoints + pointsGained,
          streak: newStreak
        }
      };
    }

    case 'JOIN_GROUP': {
      return {
        ...state,
        studyGroups: state.studyGroups.map(group =>
          group.id === action.groupId
            ? { ...group, isJoined: true, members: group.members + 1 }
            : group
        )
      };
    }

    case 'LEAVE_GROUP': {
      return {
        ...state,
        studyGroups: state.studyGroups.map(group =>
          group.id === action.groupId
            ? { ...group, isJoined: false, members: Math.max(0, group.members - 1) }
            : group
        )
      };
    }

    case 'CREATE_GROUP': {
      const newGroup: StudyGroup = {
        ...action.group,
        id: `group-${Date.now()}`,
        isJoined: true,
        messages: [],
        lastActive: 'now'
      };

      return {
        ...state,
        studyGroups: [...state.studyGroups, newGroup]
      };
    }

    case 'ADD_MESSAGE': {
      const messageWithId: GroupMessage = {
        ...action.message,
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      return {
        ...state,
        studyGroups: state.studyGroups.map(group =>
          group.id === action.groupId
            ? {
                ...group,
                messages: [...group.messages, messageWithId],
                lastActive: 'now'
              }
            : group
        )
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      return {
        ...state,
        achievements: state.achievements.map(achievement =>
          achievement.id === action.achievementId
            ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
            : achievement
        )
      };
    }

    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: { ...state.settings, ...action.settings }
      };
    }

    case 'ADD_CALL_HISTORY': {
      const callWithId = {
        ...action.call,
        id: `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      return {
        ...state,
        callHistory: [callWithId, ...state.callHistory.slice(0, 19)] // Keep last 20 calls
      };
    }

    case 'UPDATE_USER': {
      return {
        ...state,
        user: { ...state.user, ...action.user }
      };
    }

    case 'RESET_STREAK': {
      return {
        ...state,
        user: { ...state.user, streak: 0 }
      };
    }

    case 'INCREMENT_STREAK': {
      return {
        ...state,
        user: { ...state.user, streak: state.user.streak + 1 }
      };
    }

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, getInitialState());
  
  // Try to get Clerk user if available
  let clerkUser = null;
  try {
    clerkUser = useUser?.()?.user || null;
  } catch (error) {
    // Clerk not available, clerkUser remains null
  }

  // Update user information when Clerk user data is available
  useEffect(() => {
    if (clerkUser) {
      dispatch({
        type: 'UPDATE_USER',
        user: {
          id: clerkUser.id,
          name: clerkUser.fullName || `${clerkUser.firstName} ${clerkUser.lastName}`.trim() || 'User',
          email: clerkUser.primaryEmailAddress?.emailAddress || 'user@example.com',
          avatar: clerkUser.imageUrl || clerkUser.firstName?.charAt(0) + clerkUser.lastName?.charAt(0) || 'U'
        }
      });
    }
  }, [clerkUser]);

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('linguaconnect-state', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

export type { AppState, AppAction, User, LessonProgress, GroupMessage, StudyGroup, Achievement };