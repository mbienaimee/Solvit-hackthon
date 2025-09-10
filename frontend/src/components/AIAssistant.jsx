import React, { useState, useEffect, useCallback } from "react";
import { SparklesIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "../stores/appStore";
import { useUserStore } from "../stores/userStore";
import apiService from "../services/apiService";
import LoadingSpinner from "./LoadingSpinner";

const AIAssistant = () => {
  const { 
    aiChatOpen, 
    toggleAIChat, 
    aiMessages, 
    addAIMessage, 
    setAIMessages,
    clearAIMessages,
    isAILoading,
    setAILoading,
    setLastRecommendations
  } = useAppStore();
  
  const { user } = useUserStore();
  const [inputMessage, setInputMessage] = useState("");

  const loadConversationHistory = useCallback(async () => {
    try {
      const history = await apiService.getConversationHistory();
      if (history.length > 0) {
        setAIMessages(history);
      } else {
        // Add welcome message if no history
        addAIMessage({
          type: "ai",
          content: "Hi! I'm your AI career assistant. I'm here to help you discover suitable career paths, learn new skills, and connect with mentors. What would you like to know about your career journey?",
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
      // Add welcome message on error
      addAIMessage({
        type: "ai",
        content: "Hi! I'm your AI career assistant. I'm here to help you discover suitable career paths, learn new skills, and connect with mentors. What would you like to know about your career journey?",
        timestamp: new Date().toISOString(),
      });
    }
  }, [setAIMessages, addAIMessage]);

  // Load conversation history on component mount
  useEffect(() => {
    if (aiChatOpen && aiMessages.length === 0) {
      loadConversationHistory();
    }
  }, [aiChatOpen, aiMessages.length, loadConversationHistory]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isAILoading) {
      const userMessage = {
        type: "user",
        content: inputMessage,
        timestamp: new Date().toISOString(),
      };

      // Add user message immediately
      addAIMessage(userMessage);
      setInputMessage("");
      setAILoading(true);

      try {
        // Send message to AI service
        const response = await apiService.sendChatMessage(inputMessage, user);
        
        // Add AI response
        addAIMessage(response.message);
        
        // Store recommendations if available
        if (response.recommendations) {
          setLastRecommendations(response.recommendations);
        }

      } catch (error) {
        console.error('Error sending message:', error);
        // Add error message
        addAIMessage({
          type: "ai",
          content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
          timestamp: new Date().toISOString(),
        });
      } finally {
        setAILoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = async () => {
    try {
      await apiService.clearSession();
      clearAIMessages();
      // Add welcome message
      addAIMessage({
        type: "ai",
        content: "Hi! I'm your AI career assistant. I'm here to help you discover suitable career paths, learn new skills, and connect with mentors. What would you like to know about your career journey?",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  return (
    <div className="bg-custom-card rounded-lg border border-custom-accent">
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
            <h3 className="text-lg font-semibold text-white">AI Career Assistant</h3>
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
          {/* Chat Header with Clear Button */}
          <div className="p-2 border-b border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-400">Chat with your AI assistant</span>
            <button
              onClick={handleClearChat}
              className="text-xs text-gray-400 hover:text-gray-300 flex items-center space-x-1"
            >
              <XMarkIcon className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {aiMessages.length === 0 ? (
              <div className="text-center text-gray-400 text-sm">
                <p>Ask me anything about careers, jobs, or skills!</p>
                <p className="mt-2">Try: "I'm interested in web development" or "Help me find a career path"</p>
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
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Loading indicator */}
            {isAILoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 px-3 py-2 rounded-lg flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-gray-300 text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about careers, skills, or job recommendations..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                rows="1"
                disabled={isAILoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isAILoading}
                className="px-3 py-2 bg-custom-accent hover:bg-opacity-80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
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
