import React, { useState } from "react";
import {
  CogIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useUserStore } from "../stores/userStore";

const Settings = () => {
  const { user, updateProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      jobMatches: true,
      mentorMessages: true,
      courseUpdates: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      showLocation: true,
    },
    preferences: {
      theme: "dark",
      language: "en",
      timezone: "UTC+1",
      currency: "USD",
    },
  });

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const SettingSection = ({ title, children }) => (
    <div className="bg-custom-card rounded-xl p-6 border border-custom-accent">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-white font-medium">{label}</p>
        {description && (
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-custom-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-accent"></div>
      </label>
    </div>
  );

  const SelectField = ({ label, value, options, onChange, description }) => (
    <div className="py-3">
      <label className="block text-white font-medium mb-2">{label}</label>
      {description && (
        <p className="text-gray-400 text-sm mb-3">{description}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-custom-accent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const InputField = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    description,
  }) => (
    <div className="py-3">
      <label className="block text-white font-medium mb-2">{label}</label>
      {description && (
        <p className="text-gray-400 text-sm mb-3">{description}</p>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-custom-accent"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-custom-card p-1 rounded-xl border border-custom-accent">
        {[
          { id: "profile", label: "Profile", icon: UserIcon },
          { id: "notifications", label: "Notifications", icon: BellIcon },
          { id: "privacy", label: "Privacy", icon: ShieldCheckIcon },
          { id: "preferences", label: "Preferences", icon: CogIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-custom-accent text-white"
                  : "text-gray-400 hover:text-white hover:bg-custom-secondary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <SettingSection title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                type="text"
                value={user.name}
                onChange={(value) => updateProfile({ name: value })}
                placeholder="Enter your full name"
              />
              <InputField
                label="Job Title"
                type="text"
                value={user.title}
                onChange={(value) => updateProfile({ title: value })}
                placeholder="Enter your job title"
              />
              <InputField
                label="Location"
                type="text"
                value={user.location}
                onChange={(value) => updateProfile({ location: value })}
                placeholder="Enter your location"
              />
              <InputField
                label="Experience"
                type="text"
                value={user.experience}
                onChange={(value) => updateProfile({ experience: value })}
                placeholder="e.g., 3 years"
              />
            </div>
          </SettingSection>

          <SettingSection title="Account Security">
            <div className="space-y-4">
              <InputField
                label="Current Password"
                type={showPassword ? "text" : "password"}
                value=""
                onChange={() => {}}
                placeholder="Enter current password"
              />
              <InputField
                label="New Password"
                type={showPassword ? "text" : "password"}
                value=""
                onChange={() => {}}
                placeholder="Enter new password"
              />
              <InputField
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                value=""
                onChange={() => {}}
                placeholder="Confirm new password"
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-4 py-2 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg font-medium transition-colors">
                Update Password
              </button>
              <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg font-medium transition-colors">
                Enable 2FA
              </button>
            </div>
          </SettingSection>

          <SettingSection title="Danger Zone">
            <div className="space-y-4">
              <div className="p-4 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-2">
                  Delete Account
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <TrashIcon className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </SettingSection>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-6">
          <SettingSection title="Email Notifications">
            <ToggleSwitch
              enabled={settings.notifications.email}
              onChange={(value) =>
                handleSettingChange("notifications", "email", value)
              }
              label="Email Notifications"
              description="Receive notifications via email"
            />
            <ToggleSwitch
              enabled={settings.notifications.jobMatches}
              onChange={(value) =>
                handleSettingChange("notifications", "jobMatches", value)
              }
              label="Job Matches"
              description="Get notified when new jobs match your profile"
            />
            <ToggleSwitch
              enabled={settings.notifications.mentorMessages}
              onChange={(value) =>
                handleSettingChange("notifications", "mentorMessages", value)
              }
              label="Mentor Messages"
              description="Receive messages from your mentors"
            />
            <ToggleSwitch
              enabled={settings.notifications.courseUpdates}
              onChange={(value) =>
                handleSettingChange("notifications", "courseUpdates", value)
              }
              label="Course Updates"
              description="Get updates about your enrolled courses"
            />
          </SettingSection>

          <SettingSection title="Push Notifications">
            <ToggleSwitch
              enabled={settings.notifications.push}
              onChange={(value) =>
                handleSettingChange("notifications", "push", value)
              }
              label="Push Notifications"
              description="Receive push notifications on your device"
            />
          </SettingSection>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="space-y-6">
          <SettingSection title="Profile Visibility">
            <SelectField
              label="Profile Visibility"
              value={settings.privacy.profileVisibility}
              onChange={(value) =>
                handleSettingChange("privacy", "profileVisibility", value)
              }
              options={[
                { value: "public", label: "Public - Visible to everyone" },
                { value: "connections", label: "Connections only" },
                { value: "private", label: "Private - Only you can see" },
              ]}
              description="Control who can see your profile information"
            />
          </SettingSection>

          <SettingSection title="Contact Information">
            <ToggleSwitch
              enabled={settings.privacy.showEmail}
              onChange={(value) =>
                handleSettingChange("privacy", "showEmail", value)
              }
              label="Show Email Address"
              description="Display your email address on your profile"
            />
            <ToggleSwitch
              enabled={settings.privacy.showPhone}
              onChange={(value) =>
                handleSettingChange("privacy", "showPhone", value)
              }
              label="Show Phone Number"
              description="Display your phone number on your profile"
            />
            <ToggleSwitch
              enabled={settings.privacy.showLocation}
              onChange={(value) =>
                handleSettingChange("privacy", "showLocation", value)
              }
              label="Show Location"
              description="Display your location on your profile"
            />
          </SettingSection>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="space-y-6">
          <SettingSection title="Appearance">
            <SelectField
              label="Theme"
              value={settings.preferences.theme}
              onChange={(value) =>
                handleSettingChange("preferences", "theme", value)
              }
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
                { value: "auto", label: "Auto (System)" },
              ]}
              description="Choose your preferred theme"
            />
          </SettingSection>

          <SettingSection title="Regional Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Language"
                value={settings.preferences.language}
                onChange={(value) =>
                  handleSettingChange("preferences", "language", value)
                }
                options={[
                  { value: "en", label: "English" },
                  { value: "es", label: "Spanish" },
                  { value: "fr", label: "French" },
                  { value: "de", label: "German" },
                ]}
              />
              <SelectField
                label="Timezone"
                value={settings.preferences.timezone}
                onChange={(value) =>
                  handleSettingChange("preferences", "timezone", value)
                }
                options={[
                  { value: "UTC+0", label: "UTC+0 (London)" },
                  { value: "UTC+1", label: "UTC+1 (Berlin)" },
                  { value: "UTC-5", label: "UTC-5 (New York)" },
                  { value: "UTC+8", label: "UTC+8 (Singapore)" },
                ]}
              />
              <SelectField
                label="Currency"
                value={settings.preferences.currency}
                onChange={(value) =>
                  handleSettingChange("preferences", "currency", value)
                }
                options={[
                  { value: "USD", label: "USD ($)" },
                  { value: "EUR", label: "EUR (€)" },
                  { value: "GBP", label: "GBP (£)" },
                  { value: "NGN", label: "NGN (₦)" },
                ]}
              />
            </div>
          </SettingSection>

          <SettingSection title="Data & Export">
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Download a copy of your data including profile information, job
                applications, and learning progress.
              </p>
              <button className="px-4 py-2 bg-custom-accent hover:bg-custom-tertiary text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Export My Data</span>
              </button>
            </div>
          </SettingSection>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-custom-accent hover:bg-opacity-80 text-white rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
