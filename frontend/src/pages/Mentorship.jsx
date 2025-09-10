import React, { useState, useEffect } from "react";
import {
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { dummyMentors } from "../data/dummyData";
import { useAppStore } from "../stores/appStore";
import { useUserStore } from "../stores/userStore";
import apiService from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState("find");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [aiMentorRecommendations, setAiMentorRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [filters, setFilters] = useState({
    industry: "All Industries",
    location: "All Locations",
    availability: "All"
  });
  
  const { lastRecommendations } = useAppStore();
  const { user } = useUserStore();

  // Load AI mentorship recommendations when tab changes
  useEffect(() => {
    const loadAIMentorshipRecommendations = async () => {
      setIsLoadingRecommendations(true);
      try {
        // Try to get recommendations from recent conversation first
        if (lastRecommendations?.mentors) {
          setAiMentorRecommendations(lastRecommendations.mentors);
        } else {
          // Get recommendations based on user interests or general recommendations
          const jobTitles = user?.title ? [user.title] : ['Software Developer', 'Product Manager'];
          const response = await apiService.getMentorshipRecommendations(jobTitles);
          setAiMentorRecommendations(response.mentors || []);
        }
      } catch (error) {
        console.error('Error loading AI mentorship recommendations:', error);
        setAiMentorRecommendations([]);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    if (activeTab === "find") {
      loadAIMentorshipRecommendations();
    }
  }, [activeTab, lastRecommendations?.mentors, user?.title]);

  // Filter mentors based on selected filters
  const filteredMentors = dummyMentors.filter(mentor => {
    const industryMatch = filters.industry === "All Industries" || 
      mentor.title.toLowerCase().includes(filters.industry.toLowerCase()) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(filters.industry.toLowerCase()));
    
    const locationMatch = filters.location === "All Locations" || 
      mentor.location === filters.location ||
      (filters.location === "Remote" && mentor.location.includes("Remote"));
    
    const availabilityMatch = filters.availability === "All" || 
      mentor.availability === filters.availability;
    
    return industryMatch && locationMatch && availabilityMatch;
  });

  const PlatformCard = ({ platform }) => (
    <div className="bg-custom-card rounded-xl p-6 border border-custom-accent hover:border-opacity-80 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
            {platform.platform}
            {platform.platformDetails?.url && (
              <a
                href={platform.platformDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-400 hover:text-blue-300"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            )}
          </h3>
          <p className="text-gray-400 text-sm">{platform.reason}</p>
        </div>
        {platform.platformDetails?.cost && (
          <div className={`px-3 py-1 rounded-full text-xs ${
            platform.platformDetails.cost === 'Free'
              ? 'bg-custom-secondary text-white'
              : 'bg-custom-accent text-white'
          }`}>
            {platform.platformDetails.cost}
          </div>
        )}
      </div>
      
      <p className="text-gray-300 text-sm mb-4">{platform.focus}</p>
      
      {platform.platformDetails?.features && (
        <div className="flex flex-wrap gap-2 mb-4">
          {platform.platformDetails.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
      
      {platform.platformDetails?.url && (
        <button
          onClick={() => window.open(platform.platformDetails.url, '_blank')}
          className="w-full px-4 py-2 bg-custom-accent hover:bg-opacity-80 text-white text-sm rounded-lg transition-colors"
        >
          Visit Platform
        </button>
      )}
    </div>
  );

  // Mentor Profile Modal Component
  const MentorProfileModal = ({ mentor, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-custom-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-custom-accent">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-custom-accent rounded-xl flex items-center justify-center overflow-hidden">
                {mentor.profileImage ? (
                  <img 
                    src={mentor.profileImage} 
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-2xl font-bold">
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{mentor.name}</h2>
                <p className="text-gray-400 mb-2">{mentor.title}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium">{mentor.rating}</span>
                    <span>({mentor.mentees} mentees)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{mentor.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">About</h3>
            <p className="text-gray-300 leading-relaxed">{mentor.bio}</p>
          </div>

          {/* Experience & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{mentor.experience}</div>
              <div className="text-gray-400 text-sm">Experience</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{mentor.sessionPrice}</div>
              <div className="text-gray-400 text-sm">Per Session</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{mentor.mentees}</div>
              <div className="text-gray-400 text-sm">Mentees</div>
            </div>
          </div>

          {/* Specialties */}
          {mentor.specialties && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-custom-accent bg-opacity-20 text-custom-accent text-sm rounded-lg border border-custom-accent border-opacity-30"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Expertise */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Technical Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gray-700 text-gray-300 text-sm rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Achievements</h3>
            <div className="space-y-2">
              {mentor.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Response Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {mentor.languages && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.languages.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Response Time</h4>
              <p className="text-gray-300 text-sm">{mentor.responseTime}</p>
            </div>
          </div>

          {/* Availability & Booking */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    mentor.availability === "Available"
                      ? "bg-green-400"
                      : mentor.availability === "Limited"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                />
                <span className="text-white font-medium">{mentor.availability}</span>
              </div>
              {mentor.nextAvailable && (
                <div className="text-sm text-gray-400">
                  Next available: <span className="text-green-400">{mentor.nextAvailable}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => window.open(mentor.calendarLink, '_blank')}
                className="flex-1 px-6 py-3 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>Book Session Now</span>
              </button>
              <button 
                onClick={() => window.open(`mailto:mentor+${mentor.id}@diament.com?subject=Mentorship Inquiry`, '_blank')}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
    <div className="bg-custom-card rounded-xl p-6 border border-custom-accent hover:border-opacity-80 transition-all duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-custom-accent rounded-xl flex items-center justify-center overflow-hidden">
          {mentor.profileImage ? (
            <img 
              src={mentor.profileImage} 
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-xl font-bold">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
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
          <div className="text-lg font-semibold text-white">{mentor.sessionPrice}</div>
          <div className="flex items-center space-x-1 mb-1">
            <StarSolidIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium">{mentor.rating}</span>
          </div>
          <div className="text-gray-400 text-sm">{mentor.mentees} mentees</div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">{mentor.bio}</p>

      {/* Specialties */}
      {mentor.specialties && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {mentor.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-custom-secondary bg-opacity-20 text-custom-secondary text-xs rounded-full border border-custom-secondary border-opacity-30"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Expertise:</h4>
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {mentor.expertise.length > 4 && (
            <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
              +{mentor.expertise.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Next Available */}
      {mentor.nextAvailable && (
        <div className="flex items-center space-x-2 mb-3 text-sm">
          <ClockIcon className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-medium">Next: {mentor.nextAvailable}</span>
        </div>
      )}

      {/* Response Time */}
      {mentor.responseTime && (
        <div className="text-xs text-gray-400 mb-4">{mentor.responseTime}</div>
      )}

      {/* Availability and Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              mentor.availability === "Available"
                ? "bg-green-400"
                : mentor.availability === "Limited"
                ? "bg-yellow-400"
                : "bg-gray-400"
            }`}
          />
          <span className="text-sm text-gray-400">{mentor.availability}</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedMentor(mentor)}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Profile
          </button>
          <button 
            onClick={() => window.open(mentor.calendarLink, '_blank')}
            className="px-4 py-2 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Book Session</span>
          </button>
        </div>
      </div>
    </div>
  );

  const SessionCard = ({ session, isCompleted = false }) => (
    <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-custom-accent rounded-lg flex items-center justify-center">
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
            <button className="px-4 py-2 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg text-sm font-medium transition-colors">
              Join Session
            </button>
            <button className="px-4 py-2 border border-custom-accent text-custom-accent hover:bg-custom-accent hover:bg-opacity-20 rounded-lg text-sm font-medium transition-colors">
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
      <div className="flex space-x-1 bg-custom-card p-1 rounded-xl border border-custom-accent">
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
                  ? "bg-custom-accent text-white"
                  : "text-gray-400 hover:text-white hover:bg-custom-secondary hover:bg-opacity-20"
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
          {/* AI Recommendations Section */}
          {aiMentorRecommendations.length > 0 && (
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">Recommended Mentorship Platforms</h2>
                </div>
                <span className="text-sm text-gray-400">Tailored to your career goals</span>
              </div>
              
              {isLoadingRecommendations ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner />
                  <span className="ml-2 text-gray-400">Loading platform recommendations...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiMentorRecommendations.map((platform, index) => (
                    <PlatformCard key={index} platform={platform} />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Available Mentors ({filteredMentors.length})
            </h2>
            <div className="flex space-x-3">
              <select 
                value={filters.industry}
                onChange={(e) => setFilters({...filters, industry: e.target.value})}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Industries</option>
                <option>Technology</option>
                <option>Product Management</option>
                <option>Design</option>
                <option>Data Science</option>
                <option>DevOps</option>
                <option>Marketing</option>
              </select>
              <select 
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Locations</option>
                <option>San Francisco, CA</option>
                <option>Menlo Park, CA</option>
                <option>San Jose, CA</option>
                <option>Los Gatos, CA</option>
                <option>Seattle, WA</option>
                <option>Remote</option>
              </select>
              <select 
                value={filters.availability}
                onChange={(e) => setFilters({...filters, availability: e.target.value})}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All</option>
                <option>Available</option>
                <option>Limited</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => (
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
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-accent mb-2">12</div>
          <div className="text-gray-400">Total Sessions</div>
        </div>
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-secondary mb-2">4.8</div>
          <div className="text-gray-400">Average Rating</div>
        </div>
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-tertiary mb-2">3</div>
          <div className="text-gray-400">Active Mentors</div>
        </div>
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-quaternary mb-2">24</div>
          <div className="text-gray-400">Hours Completed</div>
        </div>
      </div>

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <MentorProfileModal 
          mentor={selectedMentor} 
          onClose={() => setSelectedMentor(null)} 
        />
      )}
    </div>
  );
};

export default Mentorship;
