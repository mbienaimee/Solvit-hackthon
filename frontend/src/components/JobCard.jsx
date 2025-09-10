import React from "react";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useJobStore } from "../stores/jobStore";

const JobCard = ({ job }) => {
  const { saveJob, unsaveJob, applyToJob, isJobSaved, isJobApplied } = useJobStore();

  // Use slug as unique id for API jobs
  const jobId = job.slug || job.id;
  const isSaved = isJobSaved(jobId);
  const isApplied = isJobApplied(jobId);

  const handleSave = () => {
    if (isSaved) {
      unsaveJob(jobId);
    } else {
      saveJob(jobId);
    }
  };

  const handleApply = () => {
    if (!isApplied) {
      applyToJob(jobId);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700 card-hover h-fit">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={job.company_logo || `https://ui-avatars.com/api/?name=${job.company_name}&background=3B82F6&color=fff&size=48`}
            alt={job.company_name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            <p className="text-gray-400">{job.company_name}</p>
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
          <span>💰 {job.salary || 'N/A'}</span>
          <span className="mx-2">•</span>
          <span>📅 {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400">Category: </span>
          <span className="ml-1 text-white">{job.category || 'N/A'}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.tags && job.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {job.tags && job.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
              +{job.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Actions */}
      <div className="flex space-x-3 text-sm">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-4 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white text-center"
        >
          View & Apply
        </a>
        <button
          onClick={handleSave}
          className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isSaved ? 'Saved' : 'Save Job'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
