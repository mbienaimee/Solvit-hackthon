import React, { useEffect } from "react";
import { useAppStore } from "./stores/appStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useJobStore } from "./stores/jobStore";
import { dummyJobs } from "./data/dummyData";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import JobFeed from "./pages/JobFeed";
import Profile from "./pages/Profile";
import Mentorship from "./pages/Mentorship";
import Learning from "./pages/Learning";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const setJobs = useJobStore((state) => state.setJobs);
  const { theme } = useAppStore();
  useEffect(() => {
    setJobs(dummyJobs);
  }, [setJobs]);

  // Theme classes
  const isDark = theme === 'dark';
  const themeClasses = isDark
    ? 'min-h-screen bg-custom-dark text-white'
    : 'min-h-screen bg-blue-50 text-blue-900';

  return (
    <div className={themeClasses}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="job-feed" element={<JobFeed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="mentorship" element={<Mentorship />} />
            <Route path="learning" element={<Learning />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<JobFeed />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
