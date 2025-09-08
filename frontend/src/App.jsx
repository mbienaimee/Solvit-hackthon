import React, { useEffect } from "react";
import { useJobStore } from "./stores/jobStore";
import { useAppStore } from "./stores/appStore";
import { dummyJobs } from "./data/dummyData";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import JobFeed from "./pages/JobFeed";
import Profile from "./pages/Profile";
import Mentorship from "./pages/Mentorship";
import Learning from "./pages/Learning";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  const setJobs = useJobStore((state) => state.setJobs);
  const { currentPage } = useAppStore();

  useEffect(() => {
    // Initialize with dummy data
    setJobs(dummyJobs);
  }, [setJobs]);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "job-feed":
        return <JobFeed />;
      case "profile":
        return <Profile />;
      case "mentorship":
        return <Mentorship />;
      case "learning":
        return <Learning />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      default:
        return <JobFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Layout>{renderPage()}</Layout>
    </div>
  );
}

export default App;
