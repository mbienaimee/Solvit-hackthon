import React from "react";
import ProfileCard from "./ProfileCard";
import AIAssistant from "./AIAssistant";
import SuggestedCourses from "./SuggestedCourses";
import Notifications from "./Notifications";

const RightSidebar = () => {
  return (
    <div className="space-y-6">
      <ProfileCard />
      <AIAssistant />
      <SuggestedCourses />
      <Notifications />
    </div>
  );
};

export default RightSidebar;
