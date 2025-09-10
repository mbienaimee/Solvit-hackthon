import React, { useState, useEffect } from "react";
import {
  ChartBarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useUserStore } from "../stores/userStore";
import { useJobStore } from "../stores/jobStore";
import { useAppStore } from "../stores/appStore";
import { dummyJobs, dummyCourses, dummyMentors } from "../data/dummyData";
import LoadingSpinner from "../components/LoadingSpinner";
import apiService from "../services/apiService";

const Dashboard = () => {
  const { user } = useUserStore();
  const { savedJobs, appliedJobs } = useJobStore();
  const { lastRecommendations } = useAppStore();
  const [aiInsights, setAiInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    const loadAIInsights = async () => {
      if (!user?.email || !user?.title) return;
      
      setIsLoadingInsights(true);
      try {
        // Get AI insights for dashboard overview
        const insights = await apiService.getChatResponse([
          {
            role: 'user',
            content: `As a career assistant, provide a brief summary of career insights for a ${user.title} including: 1) One key market trend, 2) One skill recommendation, 3) One career tip. Keep each point to one sentence. Format as JSON with keys: trend, skill, tip.`
          }
        ]);
        
        // Try to parse as JSON, fallback to text if needed
        try {
          const parsed = JSON.parse(insights);
          setAiInsights(parsed);
        } catch {
          // If not valid JSON, create a structured response
          setAiInsights({
            trend: "AI and automation continue to reshape the tech industry.",
            skill: "Focus on developing machine learning fundamentals.",
            tip: "Network with professionals in emerging technology sectors."
          });
        }
      } catch (error) {
        console.error('Error loading AI insights:', error);
        setAiInsights({
          trend: "Remote work opportunities continue to expand globally.",
          skill: "Enhance your communication and collaboration skills.",
          tip: "Keep your skills updated with latest industry trends."
        });
      } finally {
        setIsLoadingInsights(false);
      }
    };

    loadAIInsights();
  }, [user?.email, user?.title]);

  const stats = {
    totalJobs: dummyJobs.length,
    savedJobs: savedJobs.length,
    appliedJobs: appliedJobs.length,
    matchRate: 78,
    profileViews: 42,
    mentorSessions: 3,
    coursesCompleted: 2,
    skillsLearned: 5,
  };

  const recentActivity = [
    {
      id: 1,
      type: "job_application",
      title: "Applied to Senior Frontend Engineer at Google",
      time: "2 hours ago",
      icon: BriefcaseIcon,
      color: "text-fuchsia-400",
    },
    {
      id: 2,
      type: "mentor_session",
      title: "Completed session with David Kim",
      time: "1 day ago",
      icon: AcademicCapIcon,
      color: "text-pink-400",
    },
    {
      id: 3,
      type: "course_completion",
      title: "Finished Advanced React Hooks course",
      time: "3 days ago",
      icon: BookOpenIcon,
      color: "text-violet-400",
    },
    {
      id: 4,
      type: "profile_update",
      title: "Updated skills and experience",
      time: "1 week ago",
      icon: CheckCircleIcon,
      color: "text-rose-400",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Interview with Google",
      time: "Tomorrow, 2:00 PM",
      type: "interview",
    },
    {
      id: 2,
      title: "Mentor Session with Sarah Johnson",
      time: "Friday, 3:00 PM",
      type: "mentorship",
    },
    {
      id: 3,
      title: "Blockchain Development Course",
      time: "Next Monday, 10:00 AM",
      type: "course",
    },
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
    <div className="bg-custom-card rounded-xl p-6 border border-custom-accent hover:border-opacity-80 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
          {Icon && <Icon className={`w-6 h-6 ${color}`} />}
        </div>
        {trend && (
          <div className="flex items-center text-green-400 text-sm">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
        {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="rounded-2xl p-8 text-white bounce-in" style={{ backgroundColor: '#8EA604' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name ? user.name : 'User'}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Email: {user.email ? user.email : 'Not available'}
            </p>
            <p className="text-blue-100 text-lg mt-2">
              Your journey to European opportunities continues. Here's your
              progress.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-4xl font-bold">{stats.matchRate}%</div>
              <div className="text-blue-100">Average Match Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
        <StatCard
          title="Jobs Applied"
          value={stats.appliedJobs}
          icon={BriefcaseIcon}
          color="text-fuchsia-400"
          trend="+2 this week"
        />
        <StatCard
          title="Saved Jobs"
          value={stats.savedJobs}
          icon={BookOpenIcon}
          color="text-rose-400"
        />
        <StatCard
          title="Profile Views"
          value={stats.profileViews}
          icon={UserGroupIcon}
          color="text-pink-400"
          trend="+12 this week"
        />
        <StatCard
          title="Mentor Sessions"
          value={stats.mentorSessions}
          icon={AcademicCapIcon}
          color="text-violet-400"
          subtitle="This month"
        />
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl p-6 fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">AI Career Insights</h2>
          </div>
          <span className="text-sm text-gray-400">Personalized for you</span>
        </div>
        
        {isLoadingInsights ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
            <span className="ml-2 text-gray-400">Loading insights...</span>
          </div>
        ) : aiInsights ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-custom-card rounded-lg p-4 border border-custom-accent">
              <div className="flex items-center space-x-2 mb-2">
                <ChartBarIcon className="w-5 h-5 text-custom-accent" />
                <h3 className="text-sm font-medium text-custom-accent">Market Trend</h3>
              </div>
              <p className="text-gray-200 text-sm">{aiInsights.trend}</p>
            </div>
            
            <div className="bg-custom-card rounded-lg p-4 border border-custom-accent">
              <div className="flex items-center space-x-2 mb-2">
                <AcademicCapIcon className="w-5 h-5 text-custom-secondary" />
                <h3 className="text-sm font-medium text-custom-secondary">Skill Focus</h3>
              </div>
              <p className="text-gray-200 text-sm">{aiInsights.skill}</p>
            </div>
            
            <div className="bg-custom-card rounded-lg p-4 border border-custom-accent">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowTrendingUpIcon className="w-5 h-5 text-custom-tertiary" />
                <h3 className="text-sm font-medium text-custom-tertiary">Career Tip</h3>
              </div>
              <p className="text-gray-200 text-sm">{aiInsights.tip}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">AI insights will appear here once you complete your profile.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Recent Activity
              </h2>
              <button className="text-custom-accent hover:text-custom-secondary text-sm">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-gray-700`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">
                        {activity.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Upcoming</h2>
              <ClockIcon className="w-5 h-5 text-custom-secondary" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {event.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">{event.time}</p>
                    </div>
                    <div className="w-2 h-2 bg-custom-accent rounded-full mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-custom-card rounded-xl p-6 border border-custom-accent">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <BriefcaseIcon className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-white text-sm">Browse New Jobs</span>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="w-5 h-5 text-pink-400" />
                  <span className="text-white text-sm">Find a Mentor</span>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <BookOpenIcon className="w-5 h-5 text-violet-400" />
                  <span className="text-white text-sm">Start Learning</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
        <h2 className="text-xl font-semibold text-white mb-6">
          Your Progress Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Profile Completion</span>
              <span className="text-white text-sm font-medium">
                {user.profileCompletion}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-custom-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${user.profileCompletion}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Trust Score</span>
              <span className="text-white text-sm font-medium">
                {user.trustScore}/100
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-custom-secondary h-2 rounded-full transition-all duration-500"
                style={{ width: `${user.trustScore}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Market Readiness</span>
              <span className="text-white text-sm font-medium">
                {user.marketReadiness}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-custom-tertiary h-2 rounded-full transition-all duration-500"
                style={{ width: `${user.marketReadiness}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
