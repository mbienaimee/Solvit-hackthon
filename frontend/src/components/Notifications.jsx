import React from "react";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { dummyNotifications } from "../data/dummyData";

const Notifications = () => {
  const unreadCount = dummyNotifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "job_match":
        return "🎯";
      case "mentor_response":
        return "👨‍🏫";
      case "course_recommendation":
        return "📚";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "job_match":
        return "text-green-400";
      case "mentor_response":
        return "text-blue-400";
      case "course_recommendation":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-custom-card rounded-lg p-6 border border-custom-accent">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <BellIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <p className="text-sm text-gray-400">Stay updated</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {unreadCount}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {dummyNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-colors cursor-pointer ${
              notification.read
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-750 border-gray-500"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-lg">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4
                    className={`text-sm font-medium ${
                      notification.read ? "text-gray-300" : "text-white"
                    }`}
                  >
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-xs ${getNotificationColor(
                      notification.type
                    )}`}
                  >
                    {notification.timestamp}
                  </span>
                  {!notification.read && (
                    <button className="text-gray-400 hover:text-white">
                      <CheckIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors text-sm">
        View All Notifications
      </button>
    </div>
  );
};

export default Notifications;
