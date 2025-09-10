import React, { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useJobStore } from "../stores/jobStore";
import { useUserStore } from "../stores/userStore";
import JobCard from "./JobCard";
import SearchAndFilters from "./SearchAndFilters";
import RightSidebar from "./RightSidebar";

const JobFeed = () => {
  const { filteredJobs, fetchJobsFromAPI } = useJobStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchJobsFromAPI();
  }, [fetchJobsFromAPI]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <p className="text-gray-400 text-sm mb-2">{getCurrentDate()}</p>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8">
            {getGreeting()}, {user.name}
          </h1>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters />

        {/* Job Listings */}
        <div className="mt-6 md:mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.slug || job.id} job={job} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No jobs found matching your criteria
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80">
        <RightSidebar />
      </div>
    </div>
  );
};

export default JobFeed;
