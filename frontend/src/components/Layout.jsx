import React from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import AIAssistant from "./AIAssistant";
import { useAppStore } from "../stores/appStore";

const Layout = ({ children }) => {
  const { sidebarOpen, aiChatOpen } = useAppStore();

  return (
    <div className="h-screen bg-custom-dark flex flex-col">
      {/* Mobile Header */}
      <MobileHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } transition-all duration-300 bg-custom-accent hidden md:block`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-custom-dark">
            <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* AI Assistant Modal/Panel */}
      {aiChatOpen && <AIAssistant />}
    </div>
  );
};

export default Layout;
