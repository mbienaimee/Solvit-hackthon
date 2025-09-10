import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    id: 1,
    name: "Sarah Chen",
    title: "Frontend Developer",
    profilePicture: "/api/placeholder/60/60",
    profileCompletion: 78,
    skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML"],
    location: "Lagos, Nigeria",
    experience: "3 years",
    education: "Computer Science, University of Lagos",
    blockchainVerified: true,
    trustScore: 85,
    culturalAdaptability: 92,
    marketReadiness: 78,
  },

  updateProfile: (updates) =>
    set((state) => ({
      user: { ...state.user, ...updates },
    })),

  updateProfileCompletion: (completion) =>
    set((state) => ({
      user: { ...state.user, profileCompletion: completion },
    })),

  addSkill: (skill) =>
    set((state) => ({
      user: {
        ...state.user,
        skills: [...state.user.skills, skill],
      },
    })),

  removeSkill: (skill) =>
    set((state) => ({
      user: {
        ...state.user,
        skills: state.user.skills.filter((s) => s !== skill),
      },
    })),

  setUser: (userData) => set(() => ({ user: userData })),
}));
