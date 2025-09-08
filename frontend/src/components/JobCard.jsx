import React from "react";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useJobStore } from "../stores/jobStore";

const JobCard = ({ job }) => {
  const { saveJob, unsaveJob, applyToJob, isJobSaved, isJobApplied } =
    useJobStore();

  const isSaved = isJobSaved(job.id);
  const isApplied = isJobApplied(job.id);

  const handleSave = () => {
    if (isSaved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  const handleApply = () => {
    if (!isApplied) {
      applyToJob(job.id);
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return "text-green-400";
    if (match >= 80) return "text-blue-400";
    if (match >= 70) return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700 card-hover h-fit">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=3B82F6&color=fff&size=48`;
            }}
          />
          <div>
            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            <p className="text-gray-400">{job.company}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isSaved ? (
            <HeartSolidIcon className="w-5 h-5 text-red-400" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-400" />
          )}
        </button>
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-400">
          <span>📍 {job.location}</span>
          {job.remote && (
            <span className="ml-2 px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs">
              Remote
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <span>💰 {job.salary}</span>
          <span className="mx-2">•</span>
          <span>📅 {job.posted}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400">Level: </span>
          <span className="ml-1 text-white">{job.level}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-400">Industry: </span>
          <span className="ml-1 text-white">{job.industry}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Match Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Match Score:</span>
          <span className={`font-semibold ${getMatchColor(job.match)}`}>
            {job.match}%
          </span>
        </div>
        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              job.match >= 90
                ? "bg-green-400"
                : job.match >= 80
                ? "bg-blue-400"
                : job.match >= 70
                ? "bg-yellow-400"
                : "bg-gray-500"
            }`}
            style={{ width: `${job.match}%` }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Actions */}
      <div className="flex space-x-3 text-sm">
        <button
          onClick={handleApply}
          disabled={isApplied}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            isApplied
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
        <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
