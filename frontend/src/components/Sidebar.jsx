import React from "react";
import {
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BellIcon,
  CogIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useAppStore } from "../stores/appStore";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { sidebarOpen, toggleAIChat } = useAppStore();

  const navigationItems = [
    { id: "dashboard", name: "Dashboard", icon: HomeIcon },
    { id: "job-feed", name: "Job Feed", icon: BriefcaseIcon },
    { id: "profile", name: "My Profile", icon: UserIcon },
    { id: "mentorship", name: "Mentorship", icon: AcademicCapIcon },
    { id: "learning", name: "Learning Hub", icon: BookOpenIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "settings", name: "Settings", icon: CogIcon },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-custom-dark rounded-lg flex items-center justify-center">
            <img 
              src="/diament-removebg-preview.png" 
              alt="DIAMENT Logo" 
              className="w-6 h-6 object-contain"
            />
          </div>
          {sidebarOpen && (
            <span className="text-white font-bold text-xl">DIAMENT</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              className={({ isActive }) =>
                `w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-custom-dark text-white"
                    : "text-gray-200 hover:bg-custom-dark hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* AI Assistant Button */}
      <div className="p-4">
        <button 
          onClick={toggleAIChat}
          className="w-full flex items-center justify-center px-4 py-3 bg-custom-dark hover:bg-opacity-80 text-white rounded-lg transition-colors"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {sidebarOpen && <span>AI Assistant</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
