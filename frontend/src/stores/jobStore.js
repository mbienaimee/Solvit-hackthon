import { create } from "zustand";

export const useJobStore = create((set, get) => ({
  jobs: [],
  filteredJobs: [],
  searchQuery: "",
  filters: {
    location: "",
    industry: "",
    salary: "",
    level: "",
    remote: false,
  },
  savedJobs: [],
  appliedJobs: [],

  setJobs: (jobs) => set({ jobs, filteredJobs: jobs }),

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setFilter: (filterType, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterType]: value },
    }));
    get().applyFilters();
  },

  clearFilters: () => {
    set({
      filters: {
        location: "",
        industry: "",
        salary: "",
        level: "",
        remote: false,
      },
      searchQuery: "",
    });
    set({ filteredJobs: get().jobs });
  },

  applyFilters: () => {
    const { jobs, searchQuery, filters } = get();

    let filtered = jobs.filter((job) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Location filter
      if (
        filters.location &&
        !job.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Industry filter
      if (filters.industry && job.industry !== filters.industry) {
        return false;
      }

      // Salary filter
      if (filters.salary) {
        const [minSalary] = filters.salary
          .split("-")
          .map((s) => parseInt(s.replace(/[^0-9]/g, "")));
        const jobMinSalary = parseInt(
          job.salary.split("-")[0].replace(/[^0-9]/g, "")
        );
        if (jobMinSalary < minSalary) return false;
      }

      // Level filter
      if (filters.level && job.level !== filters.level) {
        return false;
      }

      // Remote filter
      if (filters.remote && !job.remote) {
        return false;
      }

      return true;
    });

    set({ filteredJobs: filtered });
  },

  saveJob: (jobId) => {
    const { savedJobs } = get();
    if (!savedJobs.includes(jobId)) {
      set({ savedJobs: [...savedJobs, jobId] });
    }
  },

  unsaveJob: (jobId) => {
    const { savedJobs } = get();
    set({ savedJobs: savedJobs.filter((id) => id !== jobId) });
  },

  applyToJob: (jobId) => {
    const { appliedJobs } = get();
    if (!appliedJobs.includes(jobId)) {
      set({ appliedJobs: [...appliedJobs, jobId] });
    }
  },

  isJobSaved: (jobId) => get().savedJobs.includes(jobId),
  isJobApplied: (jobId) => get().appliedJobs.includes(jobId),
}));
