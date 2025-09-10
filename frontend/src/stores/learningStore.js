import { create } from "zustand";
import { dummyCourses } from "../data/dummyData";

export const useLearningStore = create((set, get) => ({
  enrolledCourses: [], // { ...course, progress, completed }

  enrollCourse: (course) => {
    if (!get().enrolledCourses.find((c) => c.id === course.id)) {
      set((state) => ({
        enrolledCourses: [
          ...state.enrolledCourses,
          { ...course, progress: 0, completed: false },
        ],
      }));
    }
  },

  updateCourseProgress: (courseId, progress) => {
    set((state) => ({
      enrolledCourses: state.enrolledCourses.map((c) =>
        c.id === courseId
          ? { ...c, progress, completed: progress >= 100 }
          : c
      ),
    }));
  },

  completeCourse: (courseId) => {
    set((state) => ({
      enrolledCourses: state.enrolledCourses.map((c) =>
        c.id === courseId ? { ...c, progress: 100, completed: true } : c
      ),
    }));
  },

  unenrollCourse: (courseId) => {
    set((state) => ({
      enrolledCourses: state.enrolledCourses.filter((c) => c.id !== courseId),
    }));
  },

  getEnrolledCourse: (courseId) => {
    return get().enrolledCourses.find((c) => c.id === courseId);
  },

  getEnrolledCourses: () => get().enrolledCourses,

  getAvailableCourses: () => {
    const enrolledIds = get().enrolledCourses.map((c) => c.id);
    return dummyCourses.filter((course) => !enrolledIds.includes(course.id));
  },
}));
