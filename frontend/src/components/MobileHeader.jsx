import React from "react";
import { Bars3Icon, BellIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "../stores/appStore";
import { useUserStore } from "../stores/userStore";

const MobileHeader = () => {
  const { toggleSidebar, toggleAIChat } = useAppStore();
  const { user } = useUserStore();

  return (
    <div className="md:hidden bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-white">SOLVIT</h1>
          <p className="text-xs text-gray-400">AI-Powered Employment Bridge</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={toggleAIChat}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <SparklesIcon className="w-5 h-5 text-blue-400" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <BellIcon className="w-5 h-5 text-gray-400" />
        </button>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.name ? user.name.charAt(0) : 'U'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
