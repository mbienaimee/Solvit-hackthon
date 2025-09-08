import React, { useState } from "react";
import { SparklesIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "../stores/appStore";

const AIAssistant = () => {
  const { aiChatOpen, toggleAIChat, aiMessages, addAIMessage } = useAppStore();
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addAIMessage({
        type: "user",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      });

      // Simulate AI response
      setTimeout(() => {
        addAIMessage({
          type: "ai",
          content:
            "I can help you find the perfect job match! Try asking about specific roles, companies, or skills you're interested in.",
          timestamp: new Date().toLocaleTimeString(),
        });
      }, 1000);

      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-750 transition-colors"
        onClick={toggleAIChat}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
            <p className="text-sm text-gray-400">
              Get personalized job recommendations
            </p>
          </div>
          <div className="text-gray-400">{aiChatOpen ? "−" : "+"}</div>
        </div>
      </div>

      {/* Chat Interface */}
      {aiChatOpen && (
        <div className="border-t border-gray-700">
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {aiMessages.length === 0 ? (
              <div className="text-center text-gray-400 text-sm">
                <p>Ask me anything about jobs, careers, or skills!</p>
                <p className="mt-2">Try: "Find me React jobs in Berlin"</p>
              </div>
            ) : (
              aiMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {message.content}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about jobs, skills, or careers..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
