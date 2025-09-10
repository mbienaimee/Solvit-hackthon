import React from "react";
import { 
  BriefcaseIcon, 
  BookOpenIcon, 
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  ClockIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { useAppStore } from "../stores/appStore";

const CareerRecommendations = () => {
  const { lastRecommendations } = useAppStore();

  if (!lastRecommendations) {
    return null;
  }

  const { jobs, resources, mentors, careerAdvice } = lastRecommendations;

  return (
    <div className="bg-custom-card rounded-lg border border-custom-accent p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Career Recommendations</h2>
        <p className="text-gray-400 text-sm">Based on our conversation and your profile</p>
      </div>

      {/* Career Advice */}
      {careerAdvice && (
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Personalized Advice</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{careerAdvice}</p>
        </div>
      )}

      {/* Job Recommendations */}
      {jobs && jobs.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2" />
            Recommended Roles
          </h3>
          <div className="space-y-4">
            {jobs.slice(0, 3).map((job, index) => (
              <div key={job.id || index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-medium">{job.title}</h4>
                    <p className="text-gray-400 text-sm">{job.category} • {job.level}</p>
                    {job.salaryRange && (
                      <p className="text-green-400 text-sm">{job.salaryRange}</p>
                    )}
                  </div>
                  {job.matchScore && (
                    <div className="text-blue-400 text-sm font-medium">
                      {Math.round(job.matchScore)}% match
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{job.description}</p>
                
                {job.whyRecommended && (
                  <div className="mb-3">
                    <p className="text-blue-300 text-sm">{job.whyRecommended}</p>
                  </div>
                )}

                {job.skills && job.skills.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {job.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {job.nextSteps && job.nextSteps.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Next steps:</p>
                    <ul className="space-y-1">
                      {job.nextSteps.slice(0, 2).map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-300 text-xs flex items-center">
                          <CheckIcon className="w-3 h-3 mr-1 text-green-400" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Resources */}
      {resources && resources.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <BookOpenIcon className="w-5 h-5 mr-2" />
            Learning Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.slice(0, 6).map((resource, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{resource.title}</h4>
                    <p className="text-gray-400 text-xs">{resource.provider}</p>
                  </div>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                <p className="text-gray-300 text-xs mb-2 line-clamp-2">{resource.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-gray-400">
                    {resource.duration && (
                      <div className="flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {resource.duration}
                      </div>
                    )}
                    {resource.rating && (
                      <div className="flex items-center">
                        <StarIcon className="w-3 h-3 mr-1" />
                        {resource.rating}
                      </div>
                    )}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    resource.price === 'Free' || resource.price === 'Free online'
                      ? 'bg-green-600 text-green-100'
                      : resource.price === 'Paid'
                      ? 'bg-blue-600 text-blue-100'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {resource.price || 'Varied'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mentorship Recommendations */}
      {mentors && mentors.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <UserGroupIcon className="w-5 h-5 mr-2" />
            Mentorship Platforms
          </h3>
          <div className="space-y-3">
            {mentors.slice(0, 4).map((mentor, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-medium flex items-center">
                      {mentor.platform}
                      {mentor.platformDetails?.url && (
                        <a
                          href={mentor.platformDetails.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-400 hover:text-blue-300"
                        >
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      )}
                    </h4>
                    <p className="text-gray-400 text-sm">{mentor.reason}</p>
                  </div>
                  {mentor.platformDetails?.cost && (
                    <div className={`px-2 py-1 rounded text-xs ${
                      mentor.platformDetails.cost === 'Free'
                        ? 'bg-green-600 text-green-100'
                        : 'bg-blue-600 text-blue-100'
                    }`}>
                      {mentor.platformDetails.cost}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm">{mentor.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations;
