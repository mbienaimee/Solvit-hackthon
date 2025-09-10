import React, { useState } from "react";
import {
  UserIcon,
  PencilIcon,
  ShieldCheckIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  PlusIcon,
  XMarkIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useUserStore } from "../stores/userStore";

const Profile = () => {
  const { user, updateProfile, addSkill, removeSkill } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [cvResult, setCvResult] = useState(null);
  const [cvLoading, setCvLoading] = useState(false);
  const [cvError, setCvError] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !user.skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    removeSkill(skill);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  const handleCVUpload = async (e) => {
    e.preventDefault();
    setCvError("");
    setCvLoading(true);
    setCvResult(null);
    const formData = new FormData();
    formData.append("cv", cvFile);
    try {
      const res = await fetch("http://localhost:3000/api/cv/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setCvResult(data);
      } else {
        setCvError(data.message || "CV analysis failed");
      }
    } catch {
      setCvError("Network error");
    }
    setCvLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header - Name Card at Top */}
      <div className="bg-custom-accent rounded-2xl p-8 border border-custom-accent">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-custom-accent" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <PencilIcon className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-xl text-white text-opacity-90 mb-2">{user.title}</p>
            <div className="flex items-center space-x-4 text-white text-opacity-80">
              <div className="flex items-center space-x-1">
                <MapPinIcon className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BriefcaseIcon className="w-4 h-4" />
                <span>{user.experience}</span>
              </div>
              <div className="flex items-center space-x-1">
                <AcademicCapIcon className="w-4 h-4" />
                <span>{user.education}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white mb-1">
              {user.trustScore}
            </div>
            <div className="text-sm text-white text-opacity-80">Trust Score</div>
          </div>
        </div>
      </div>

      {/* CV Upload & Analysis */}
      <div className="bg-custom-card rounded-xl p-8 border border-custom-accent shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <DocumentArrowUpIcon className="w-8 h-8 text-custom-accent" />
          CV Analysis & Recommendations
        </h2>
        <form
          onSubmit={handleCVUpload}
          className="flex flex-col md:flex-row gap-4 items-center mb-6"
        >
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="bg-custom-dark text-gray-200 px-4 py-3 rounded-lg border border-custom-accent focus:outline-none focus:ring-2 focus:ring-custom-accent transition-all duration-200 shadow"
            required
          />
          <button
            type="submit"
            disabled={cvLoading || !cvFile}
            className="px-8 py-3 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
          >
            {cvLoading ? (
              <span className="flex items-center gap-2">
                <span className="loader"></span> Analyzing...
              </span>
            ) : (
              "Analyze CV"
            )}
          </button>
        </form>
        {cvError && (
          <div className="text-red-400 mb-2 font-semibold animate-shake">
            {cvError}
          </div>
        )}
        {cvResult && (
          <div className="mt-6 bg-custom-card rounded-xl p-6 border border-custom-accent shadow-lg animate-fade-in">
            <h3 className="text-xl font-bold text-indigo-400 mb-4">
              Analysis Result
            </h3>
            <div className="mb-4">
              <span className="font-semibold text-white">Matched Skills:</span>
              <span className="ml-2 text-blue-300">
                {cvResult.keywords.length > 0
                  ? cvResult.keywords.join(", ")
                  : "None"}
              </span>
            </div>
            {cvResult.courseSuggestion && (
              <div className="mb-4 text-yellow-400 text-base font-medium">
                <span className="font-semibold">Course Suggestion:</span>{" "}
                {cvResult.courseSuggestion}
              </div>
            )}
            <div className="mb-2">
              <span className="font-semibold text-white">Recommended Jobs:</span>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                {cvResult.recommendedJobs.length > 0 ? (
                  cvResult.recommendedJobs.slice(0, 5).map((job, idx) => (
                    <li key={idx} className="text-gray-200">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-semibold"
                      >
                        {job.title} at {job.company_name}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No matching jobs found</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-custom-accent bg-opacity-20 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-custom-accent" />
            </div>
            <span className="text-2xl font-bold text-white">
              {user.trustScore}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Trust Score
          </h3>
          <p className="text-gray-400 text-sm">
            Blockchain verified credibility rating
          </p>
        </div>

        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-custom-secondary bg-opacity-20 rounded-lg">
              <StarIcon className="w-6 h-6 text-custom-secondary" />
            </div>
            <span className="text-2xl font-bold text-white">
              {user.culturalAdaptability}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Cultural Adaptability
          </h3>
          <p className="text-gray-400 text-sm">
            International workplace readiness
          </p>
        </div>

        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-custom-tertiary bg-opacity-20 rounded-lg">
              <BriefcaseIcon className="w-6 h-6 text-custom-tertiary" />
            </div>
            <span className="text-2xl font-bold text-white">
              {user.marketReadiness}%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Market Readiness
          </h3>
          <p className="text-gray-400 text-sm">
            European job market preparation
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Skills & Expertise
          </h2>
          <span className="text-gray-400 text-sm">
            {(user.skills || []).length} skills
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {(user.skills || []).map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-custom-secondary bg-opacity-20 px-4 py-2 rounded-lg"
            >
              <span className="text-custom-secondary text-sm">{skill}</span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="flex space-x-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new skill..."
              className="flex-1 px-4 py-2 bg-custom-dark border border-custom-accent rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-accent"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Completion */}
      <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Profile Completion
          </h2>
          <span className="text-gray-400 text-sm">
            {user.profileCompletion}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div
            className="bg-custom-accent h-3 rounded-full transition-all duration-500"
            style={{ width: `${user.profileCompletion}%` }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-custom-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-gray-300 text-sm">Basic Information</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-custom-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-gray-300 text-sm">Skills & Experience</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-custom-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="text-gray-300 text-sm">Portfolio Projects</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-custom-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-gray-300 text-sm">
                Blockchain Verification
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-custom-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="text-gray-300 text-sm">Cultural Assessment</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">○</span>
              </div>
              <span className="text-gray-300 text-sm">Video Introduction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 py-3 px-6 bg-custom-accent hover:bg-opacity-80 text-white rounded-xl font-medium transition-colors">
          Complete Profile
        </button>
        <button className="flex-1 py-3 px-6 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl font-medium transition-colors">
          Download Resume
        </button>
        <button className="flex-1 py-3 px-6 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl font-medium transition-colors">
          Share Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
