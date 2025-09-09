import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useJobStore } from "../stores/jobStore";
import { filterOptions } from "../data/dummyData";

const SearchAndFilters = () => {
  const { searchQuery, setSearchQuery, filters, setFilter, clearFilters } =
    useJobStore();

  const filterButtons = [
    { key: "location", label: "Location" },
    { key: "industry", label: "Industry" },
    { key: "salary", label: "Salary" },
    { key: "level", label: "Level" },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {filterButtons.map((filter) => (
          <div key={filter.key} className="relative">
            <select
              value={filters[filter.key]}
              onChange={(e) => setFilter(filter.key, e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{filter.label}</option>
              {filterOptions[`${filter.key}s`]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        ))}

        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Clear Filters
        </button>

        {/* Remote Toggle */}
        <div className="flex items-center space-x-2 ml-auto">
          <span className="text-sm text-gray-400">Remote</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.remote}
              onChange={(e) => setFilter("remote", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
