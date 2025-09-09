import React, { useState } from "react";
import {
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { dummyMentors } from "../data/dummyData";

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState("find");
  const [selectedMentor, setSelectedMentor] = useState(null);

  const upcomingSessions = [
    {
      id: 1,
      mentor: "David Kim",
      title: "Career Growth Strategy",
      date: "Tomorrow",
      time: "2:00 PM - 3:00 PM",
      type: "video_call",
    },
    {
      id: 2,
      mentor: "Sarah Johnson",
      title: "Product Management Insights",
      date: "Friday",
      time: "3:00 PM - 4:00 PM",
      type: "in_person",
    },
  ];

  const completedSessions = [
    {
      id: 1,
      mentor: "David Kim",
      title: "React Best Practices",
      date: "Last week",
      rating: 5,
      feedback: "Excellent session! Learned a lot about modern React patterns.",
    },
    {
      id: 2,
      mentor: "Sarah Johnson",
      title: "Interview Preparation",
      date: "2 weeks ago",
      rating: 4,
      feedback: "Great tips for technical interviews and behavioral questions.",
    },
  ];

  const MentorCard = ({ mentor }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white text-xl font-bold">
            {mentor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {mentor.name}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{mentor.title}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{mentor.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-4 h-4" />
              <span>{mentor.experience}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            <StarSolidIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium">{mentor.rating}</span>
          </div>
          <div className="text-gray-400 text-sm">{mentor.mentees} mentees</div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">{mentor.bio}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {mentor.expertise.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {mentor.expertise.length > 3 && (
          <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
            +{mentor.expertise.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              mentor.availability === "Available"
                ? "bg-green-400"
                : "bg-gray-400"
            }`}
          />
          <span className="text-sm text-gray-400">{mentor.availability}</span>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
          Request Session
        </button>
      </div>
    </div>
  );

  const SessionCard = ({ session, isCompleted = false }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {session.title}
            </h3>
            <p className="text-gray-400 text-sm">with {session.mentor}</p>
          </div>
        </div>
        {isCompleted && (
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon
                key={i}
                className={`w-4 h-4 ${
                  i < session.rating ? "text-yellow-400" : "text-gray-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{session.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ClockIcon className="w-4 h-4" />
          <span>{session.time}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ChatBubbleLeftRightIcon className="w-4 h-4" />
          <span className="capitalize">
            {session.type?.replace("_", " ") || session.type}
          </span>
        </div>
      </div>

      {isCompleted && session.feedback && (
        <p className="text-gray-300 text-sm mb-4">{session.feedback}</p>
      )}

      <div className="flex space-x-3">
        {!isCompleted ? (
          <>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              Join Session
            </button>
            <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
              Reschedule
            </button>
          </>
        ) : (
          <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Mentorship Platform
        </h1>
        <p className="text-gray-400 text-lg">
          Connect with experienced professionals and accelerate your career
          growth
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl">
        {[
          { id: "find", label: "Find Mentors", icon: UserGroupIcon },
          { id: "upcoming", label: "Upcoming Sessions", icon: CalendarIcon },
          {
            id: "completed",
            label: "Completed Sessions",
            icon: CheckCircleIcon,
          },
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
      {activeTab === "find" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Available Mentors
            </h2>
            <div className="flex space-x-3">
              <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Product Management</option>
                <option>Design</option>
              </select>
              <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Locations</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "upcoming" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Upcoming Sessions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "completed" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Completed Sessions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedSessions.map((session) => (
              <SessionCard key={session.id} session={session} isCompleted />
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
          <div className="text-gray-400">Total Sessions</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">4.8</div>
          <div className="text-gray-400">Average Rating</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
          <div className="text-gray-400">Active Mentors</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">24</div>
          <div className="text-gray-400">Hours Completed</div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
