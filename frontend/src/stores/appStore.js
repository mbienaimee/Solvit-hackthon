import { create } from "zustand";

export const useAppStore = create((set) => ({
  currentPage: "job-feed",
  sidebarOpen: true,
  theme: "dark",

  setCurrentPage: (page) => set({ currentPage: page }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setTheme: (theme) => set({ theme }),

  // AI Assistant state
  aiChatOpen: false,
  aiMessages: [],
  isAILoading: false,
  lastRecommendations: null,

  toggleAIChat: () => set((state) => ({ aiChatOpen: !state.aiChatOpen })),

  addAIMessage: (message) =>
    set((state) => ({
      aiMessages: [...state.aiMessages, message],
    })),

  setAIMessages: (messages) => set({ aiMessages: messages }),

  clearAIMessages: () => set({ aiMessages: [] }),

  setAILoading: (loading) => set({ isAILoading: loading }),

  setLastRecommendations: (recommendations) => set({ lastRecommendations: recommendations }),

  // Notifications
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Date.now() },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
