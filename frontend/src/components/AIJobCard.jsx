import React from "react";
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  ClockIcon,
  BookmarkIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

const AIJobCard = ({ job, onSave, onApply, isSaved = false, isApplied = false }) => {
  return (
    <div className="bg-custom-card rounded-xl p-6 border border-custom-accent hover:border-opacity-80 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            {job.matchScore && (
              <span className="bg-custom-tertiary text-white px-2 py-1 rounded text-xs font-medium">
                {Math.round(job.matchScore)}% match
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
            <span>{job.category}</span>
            <span>•</span>
            <span>{job.level}</span>
            {job.workEnvironment && (
              <>
                <span>•</span>
                <span>{job.workEnvironment}</span>
              </>
            )}
          </div>
          {job.salaryRange && (
            <div className="flex items-center space-x-1 text-green-400 text-sm">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span>{job.salaryRange}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => onSave && onSave(job)}
          className={`p-2 rounded-lg transition-colors ${
            isSaved
              ? "text-yellow-400 bg-yellow-400/10"
              : "text-gray-400 hover:text-yellow-400 hover:bg-custom-secondary"
          }`}
        >
          {isSaved ? (
            <BookmarkSolidIcon className="w-5 h-5" />
          ) : (
            <BookmarkIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{job.description}</p>

      {/* Why Recommended */}
      {job.whyRecommended && (
        <div className="bg-custom-card border border-custom-accent rounded-lg p-3 mb-4">
          <p className="text-blue-300 text-sm">
            <span className="font-medium">Why this fits you: </span>
            {job.whyRecommended}
          </p>
        </div>
      )}

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-custom-secondary bg-opacity-20 text-custom-secondary text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="px-3 py-1 bg-custom-secondary bg-opacity-20 text-custom-secondary text-xs rounded-full">
                +{job.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {job.nextSteps && job.nextSteps.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Recommended next steps:</h4>
          <ul className="space-y-1">
            {job.nextSteps.slice(0, 3).map((step, index) => (
              <li key={index} className="text-xs text-gray-300 flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Responsibilities Preview */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Key responsibilities:</h4>
          <ul className="space-y-1">
            {job.responsibilities.slice(0, 2).map((responsibility, index) => (
              <li key={index} className="text-xs text-gray-300 flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {responsibility}
              </li>
            ))}
            {job.responsibilities.length > 2 && (
              <li className="text-xs text-gray-400">
                +{job.responsibilities.length - 2} more responsibilities
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          {job.growthOutlook && (
            <div className="flex items-center space-x-1">
              <ArrowTopRightOnSquareIcon className="w-3 h-3" />
              <span>{job.growthOutlook}</span>
            </div>
          )}
          {job.education && (
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-3 h-3" />
              <span>{job.education}</span>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onApply && onApply(job)}
            disabled={isApplied}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isApplied
                ? "bg-green-600 text-green-100 cursor-not-allowed"
                : "bg-custom-accent hover:bg-opacity-80 text-white"
            }`}
          >
            {isApplied ? "Applied" : "Learn More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIJobCard;
