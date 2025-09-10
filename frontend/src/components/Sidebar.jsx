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
          <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          {sidebarOpen && (
            <span className="text-white font-bold text-xl">SOLVIT</span>
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
                    ? "bg-blue-800 text-white"
                    : "text-blue-200 hover:bg-blue-800 hover:text-white"
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
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {sidebarOpen && <span>AI Assistant</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
