import React from "react";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "../stores/userStore";

const ProfileCard = () => {
  const { user } = useUserStore();

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
          <p className="text-gray-400 text-sm">{user.title}</p>
          <div className="flex items-center mt-1">
            <ShieldCheckIcon className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400 text-xs">Blockchain Verified</span>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Profile Completion</span>
          <span className="text-sm text-white">{user.profileCompletion}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${user.profileCompletion}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {user.trustScore}
          </div>
          <div className="text-xs text-gray-400">Trust Score</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {user.culturalAdaptability}
          </div>
          <div className="text-xs text-gray-400">Cultural Fit</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {user.marketReadiness}
          </div>
          <div className="text-xs text-gray-400">Market Ready</div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Skills</h4>
        <div className="flex flex-wrap gap-1">
          {user.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {user.skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
              +{user.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Location & Experience */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Location:</span>
          <span className="text-white">{user.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Experience:</span>
          <span className="text-white">{user.experience}</span>
        </div>
      </div>

      <button className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
        Complete Profile
      </button>
    </div>
  );
};

export default ProfileCard;
