import React, { useState, useEffect } from "react";
import {
  BookOpenIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  TrophyIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { dummyCourses, dummyJobs } from "../data/dummyData";
import { useLearningStore } from "../stores/learningStore";

const Learning = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  
  const { lastRecommendations } = useAppStore();
  const { user } = useUserStore();

  const categories = [
    { id: "all", name: "All Courses", count: 24 },
    { id: "frontend", name: "Frontend Development", count: 8 },
    { id: "backend", name: "Backend Development", count: 6 },
    { id: "design", name: "UI/UX Design", count: 5 },
    { id: "blockchain", name: "Blockchain", count: 3 },
    { id: "soft-skills", name: "Soft Skills", count: 2 },
  ];

  // Zustand store for dynamic enrollment
  const enrolledCourses = useLearningStore((s) => s.enrolledCourses);
  const enrollCourse = useLearningStore((s) => s.enrollCourse);
  const getAvailableCourses = useLearningStore((s) => s.getAvailableCourses);
  const updateCourseProgress = useLearningStore((s) => s.updateCourseProgress);
  const completeCourse = useLearningStore((s) => s.completeCourse);

  // Helper: Get recommended jobs for a course
  function getRecommendedJobs(course) {
    if (!course.completed) return [];
    return dummyJobs.filter((job) => {
      // Match by field or at least one skill
      const fieldMatch = course.field && job.title.toLowerCase().includes(course.field.toLowerCase());
      const skillMatch = course.skills && job.skills && course.skills.some((skill) => job.skills.includes(skill));
      return fieldMatch || skillMatch;
    });
  }

  const achievements = [
    {
      id: 1,
      title: "First Course Completed",
      description: "Completed your first course on the platform",
      icon: TrophyIcon,
      earned: true,
      date: "2 days ago",
    },
    {
      id: 2,
      title: "React Expert",
      description: "Complete 5 React-related courses",
      icon: AcademicCapIcon,
      earned: false,
      progress: 2,
      total: 5,
    },
    {
      id: 3,
      title: "Learning Streak",
      description: "Study for 7 consecutive days",
      icon: ChartBarIcon,
      earned: false,
      progress: 3,
      total: 7,
    },
  ];

  // Load AI recommendations when tab changes or user data is available
  useEffect(() => {
    const loadAIRecommendations = async () => {
      setIsLoadingRecommendations(true);
      try {
        // Try to get recommendations from recent conversation first
        if (lastRecommendations?.resources) {
          setAiRecommendations(lastRecommendations.resources);
        } else {
          // Get recommendations based on user skills
          const response = await apiService.getLearningResources(null, user?.skills);
          setAiRecommendations(response.resources || []);
        }
      } catch (error) {
        console.error('Error loading AI recommendations:', error);
        setAiRecommendations([]);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    if (activeTab === "recommended" && user?.skills) {
      loadAIRecommendations();
    }
  }, [activeTab, user?.skills, lastRecommendations?.resources]);

  const ResourceCard = ({ resource }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            {resource.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{resource.provider}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            {resource.duration && (
              <div className="flex items-center space-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>{resource.duration}</span>
              </div>
            )}
            {resource.type && (
              <div className="flex items-center space-x-1">
                <BookOpenIcon className="w-4 h-4" />
                <span className="capitalize">{resource.type}</span>
              </div>
            )}
            {resource.rating && (
              <div className="flex items-center space-x-1">
                <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${
            resource.price === 'Free' || resource.price === 'Free online'
              ? 'text-green-400'
              : 'text-white'
          }`}>
            {resource.price || 'Varied'}
          </div>
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm mt-1"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
              Visit
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">{resource.description}</p>

      <div className="flex justify-between items-center">
        <div className={`px-3 py-1 rounded-full text-xs ${
          resource.price === 'Free' || resource.price === 'Free online'
            ? 'bg-green-600 text-green-100'
            : resource.price === 'Paid'
            ? 'bg-blue-600 text-blue-100'
            : 'bg-gray-600 text-gray-300'
        }`}>
          {resource.price || 'Varied Price'}
        </div>
        {resource.url && (
          <button
            onClick={() => window.open(resource.url, '_blank')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Start Learning
          </button>
        )}
      </div>
    </div>
  );

  const CourseCard = ({ course, isMyCourse = false }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            {course.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{course.provider}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="w-4 h-4" />
              <span>
                {course.students?.toLocaleString() || "1.2k"} students
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <StarSolidIcon className="w-4 h-4 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-white">{course.price}</div>
          {course.level && (
            <div className="text-xs text-gray-400 mt-1">{course.level}</div>
          )}
        </div>
      </div>

      {isMyCourse && (
        <div className="space-y-6">
          {/* Categories and Courses Grid wrapped in fragment */}
          <>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAvailableCourses().map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        </div>
          </span>
        ))}
        {course.skills?.length > 3 && (
          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
            +{course.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex space-x-3">
        {isMyCourse ? (
          course.completed ? (
            <>
              <button className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                View Certificate
              </button>
              <button className="py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                Retake
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors" onClick={() => updateCourseProgress(course.id, Math.min(course.progress + 25, 100))}>
                Continue Learning
              </button>
              <button className="py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors" onClick={() => completeCourse(course.id)}>
                Mark Complete
              </button>
            </>
          )
        ) : (
          <>
            <button className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors" onClick={() => enrollCourse(course)}>
              Enroll Now
            </button>
            <button className="py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
              Preview
            </button>
          </>
        )}
      </div>
    </div>
  );

  const AchievementCard = ({ achievement }) => (
    <div
      className={`bg-gray-800 rounded-xl p-6 border transition-all duration-200 ${
        achievement.earned
          ? "border-yellow-500 bg-yellow-500 bg-opacity-10"
          : "border-gray-700"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg ${
            achievement.earned ? "bg-yellow-500 bg-opacity-20" : "bg-gray-700"
          }`}
        >
          <achievement.icon
            className={`w-6 h-6 ${
              achievement.earned ? "text-yellow-400" : "text-gray-400"
            }`}
          />
        </div>
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              achievement.earned ? "text-yellow-400" : "text-white"
            }`}
          >
            {achievement.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            {achievement.description}
          </p>
          {achievement.earned ? (
            <div className="flex items-center space-x-2 text-yellow-400 text-sm">
              <TrophyIcon className="w-4 h-4" />
              <span>Earned {achievement.date}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1 bg-gray-700 rounded-full h-2 mr-3">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (achievement.progress / achievement.total) * 100
                    }%`,
                  }}
                />
              </div>
              <span className="text-gray-400 text-sm">
                {achievement.progress}/{achievement.total}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Learning Hub</h1>
        <p className="text-gray-400 text-lg">
          Enhance your skills with personalized courses and track your progress
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">2</div>
          <div className="text-gray-400">Courses Enrolled</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">1</div>
          <div className="text-gray-400">Courses Completed</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">24</div>
          <div className="text-gray-400">Hours Learned</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">1</div>
          <div className="text-gray-400">Achievements</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl">
        {[
          { id: "recommended", label: "Recommended", icon: BookOpenIcon },
          { id: "my-courses", label: "My Courses", icon: PlayIcon },
          { id: "achievements", label: "Achievements", icon: TrophyIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "recommended" && (
        <div className="space-y-6">
          {/* AI Recommendations Section */}
          {aiRecommendations.length > 0 && (
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">AI-Powered Recommendations</h2>
                </div>
                <span className="text-sm text-gray-400">Based on your profile and goals</span>
              </div>
              
              {isLoadingRecommendations ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner />
                  <span className="ml-2 text-gray-400">Loading personalized recommendations...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiRecommendations.slice(0, 6).map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAvailableCourses().map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          </div>
        </div>
      )}

      {activeTab === "my-courses" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id}>
                <CourseCard course={course} isMyCourse />
                {/* Show job recommendations if course is completed */}
                {course.completed && (
                  <div className="mt-4 bg-gray-900 rounded-xl p-4 border border-gray-700">
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Recommended Jobs for {course.title}</h3>
                    {getRecommendedJobs(course).length > 0 ? (
                      <ul className="space-y-2">
                        {getRecommendedJobs(course).map((job) => (
                          <li key={job.id} className="bg-gray-800 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <span className="font-bold text-white">{job.title}</span>
                              <span className="ml-2 text-gray-400">@ {job.company}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-2 md:mt-0 md:ml-4">Skills: {job.skills.join(", ")}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-400">No matching jobs found for this course.</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;
