import React, { useState } from "react";
import {
  BellIcon,
  CheckIcon,
  XMarkIcon,
  FunnelIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { dummyNotifications } from "../data/dummyData";

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(dummyNotifications);

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    {
      id: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.read).length,
    },
    {
      id: "job_match",
      label: "Job Matches",
      count: notifications.filter((n) => n.type === "job_match").length,
    },
    {
      id: "mentor_response",
      label: "Mentorship",
      count: notifications.filter((n) => n.type === "mentor_response").length,
    },
    {
      id: "course_recommendation",
      label: "Learning",
      count: notifications.filter((n) => n.type === "course_recommendation")
        .length,
    },
  ];

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
        return "text-green-400 bg-green-400 bg-opacity-20";
      case "mentor_response":
        return "text-custom-accent bg-custom-accent bg-opacity-20";
      case "course_recommendation":
        return "text-custom-tertiary bg-custom-tertiary bg-opacity-20";
      default:
        return "text-gray-400 bg-gray-400 bg-opacity-20";
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const NotificationCard = ({ notification }) => (
    <div
      className={`bg-custom-card rounded-xl p-6 border transition-all duration-200 ${
        notification.read ? "border-custom-accent border-opacity-50" : "border-custom-accent bg-custom-accent bg-opacity-5"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            getNotificationColor(notification.type).split(" ")[1]
          }`}
        >
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  notification.read ? "text-gray-300" : "text-white"
                }`}
              >
                {notification.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {notification.message}
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="text-xs text-gray-500">
                  {notification.timestamp}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getNotificationColor(
                    notification.type
                  )}`}
                >
                  {notification.type.replace("_", " ").toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Mark as read"
                >
                  <CheckIcon className="w-4 h-4 text-gray-400 hover:text-green-400" />
                </button>
              )}
              <button
                onClick={() => deleteNotification(notification.id)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Delete notification"
              >
                <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">
            Stay updated with your job matches, mentorship, and learning
            progress
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <CheckIcon className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
          <button className="px-4 py-2 border border-custom-accent text-custom-accent hover:bg-custom-accent hover:bg-opacity-20 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
            <ArchiveBoxIcon className="w-4 h-4" />
            <span>Archive All</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-accent mb-2">
            {notifications.length}
          </div>
          <div className="text-gray-400">Total Notifications</div>
        </div>
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-secondary mb-2">
            {notifications.filter((n) => !n.read).length}
          </div>
          <div className="text-gray-400">Unread</div>
        </div>
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-tertiary mb-2">
            {notifications.filter((n) => n.type === "job_match").length}
          </div>
          <div className="text-gray-400">Job Matches</div>
        </div>
        <div className="bg-custom-card rounded-xl p-6 border border-custom-accent text-center">
          <div className="text-3xl font-bold text-custom-quaternary mb-2">
            {notifications.filter((n) => n.type === "mentor_response").length}
          </div>
          <div className="text-gray-400">Mentorship</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.id
                ? "bg-custom-accent text-white"
                : "bg-custom-secondary bg-opacity-20 text-custom-secondary hover:bg-custom-secondary hover:bg-opacity-30"
            }`}
          >
            {filterOption.label} ({filterOption.count})
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <BellIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-500">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : "No notifications match your current filter."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
        <div className="text-center">
          <button className="px-6 py-3 border border-custom-accent text-custom-accent hover:bg-custom-accent hover:bg-opacity-20 rounded-lg font-medium transition-colors">
            Load More Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
