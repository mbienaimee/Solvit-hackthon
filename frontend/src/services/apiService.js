import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class APIService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Generate a unique session ID for this browser session
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  // AI Chat endpoints
  async sendChatMessage(message, userProfile = null) {
    try {
      const response = await this.api.post('/ai/chat', {
        message,
        sessionId: this.sessionId,
        userProfile
      });
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      // Return fallback response
      return {
        message: {
          type: 'ai',
          content: this.getFallbackResponse(message),
          timestamp: new Date().toISOString()
        },
        recommendations: null
      };
    }
  }

  // Get career recommendations
  async getCareerRecommendations(userProfile = null) {
    try {
      const response = await this.api.post('/ai/recommendations', {
        userProfile,
        sessionId: this.sessionId
      });
      return response.data;
    } catch (error) {
      console.error('Error getting career recommendations:', error);
      return this.getFallbackRecommendations();
    }
  }

  // Search jobs
  async searchJobs(query = '', filters = {}) {
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (filters.category) params.append('category', filters.category);
      if (filters.level) params.append('level', filters.level);
      if (filters.skills && filters.skills.length > 0) {
        params.append('skills', filters.skills.join(','));
      }

      const response = await this.api.get(`/ai/jobs/search?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      return { jobs: [] };
    }
  }

  // Get learning resources
  async getLearningResources(jobTitle = null, skills = null) {
    try {
      const response = await this.api.post('/ai/resources', {
        jobTitle,
        skills
      });
      return response.data;
    } catch (error) {
      console.error('Error getting learning resources:', error);
      return { resources: [] };
    }
  }

  // Get mentorship recommendations
  async getMentorshipRecommendations(jobTitles = []) {
    try {
      const response = await this.api.post('/ai/mentorship', {
        jobTitles
      });
      return response.data;
    } catch (error) {
      console.error('Error getting mentorship recommendations:', error);
      return { mentors: [] };
    }
  }

  // Clear conversation session
  async clearSession() {
    try {
      await this.api.delete(`/ai/session/${this.sessionId}`);
      this.sessionId = this.generateSessionId(); // Generate new session ID
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }

  // Get conversation history
  async getConversationHistory() {
    try {
      const response = await this.api.get(`/ai/session/${this.sessionId}`);
      return response.data.messages || [];
    } catch (error) {
      console.error('Error getting conversation history:', error);
      return [];
    }
  }

  // Fallback response when API is not available
  getFallbackResponse(message) {
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('job') || messageLower.includes('career')) {
      return "I'd love to help you with your career! While I'm having some connection issues, I can suggest exploring roles that match your skills. What technical skills do you currently have?";
    }
    
    if (messageLower.includes('skill') || messageLower.includes('learn')) {
      return "That's great that you want to learn! Some popular skills in tech right now include JavaScript, Python, React, and data analysis. What interests you most?";
    }
    
    if (messageLower.includes('hello') || messageLower.includes('hi')) {
      return "Hello! I'm your AI career assistant. I'm here to help you find suitable job roles and career guidance. What can I help you with today?";
    }
    
    return "I'm here to help with your career journey! While I'm having some connection issues, feel free to tell me about your background and career goals.";
  }

  // Fallback recommendations when API is not available
  getFallbackRecommendations() {
    return {
      jobs: [
        {
          id: 'fallback_1',
          title: 'Software Developer',
          category: 'Technology',
          level: 'Mid',
          skills: ['JavaScript', 'React', 'Node.js'],
          description: 'Design, develop, and maintain software applications',
          whyRecommended: 'Great opportunity for tech enthusiasts',
          nextSteps: ['Build portfolio projects', 'Learn modern frameworks', 'Practice coding interviews']
        },
        {
          id: 'fallback_2',
          title: 'UX/UI Designer',
          category: 'Design',
          level: 'Mid',
          skills: ['Figma', 'User Research', 'Prototyping'],
          description: 'Create user-centered designs for digital products',
          whyRecommended: 'Perfect for creative problem solvers',
          nextSteps: ['Build design portfolio', 'Learn design tools', 'Study user experience principles']
        }
      ],
      resources: [
        {
          title: 'freeCodeCamp',
          provider: 'freeCodeCamp',
          type: 'course',
          url: 'https://www.freecodecamp.org/',
          price: 'Free',
          description: 'Learn programming for free'
        },
        {
          title: 'Coursera',
          provider: 'Coursera',
          type: 'platform',
          url: 'https://www.coursera.org/',
          price: 'Freemium',
          description: 'Online courses from top universities'
        }
      ],
      mentors: [
        {
          platform: 'LinkedIn',
          reason: 'Connect with professionals in your field',
          focus: 'Networking and career advice',
          platformDetails: {
            name: 'LinkedIn',
            url: 'https://linkedin.com/',
            cost: 'Free'
          }
        },
        {
          platform: 'ADPList',
          reason: 'Free mentorship from industry experts',
          focus: 'Career guidance and skill development',
          platformDetails: {
            name: 'ADPList',
            url: 'https://adplist.org/',
            cost: 'Free'
          }
        }
      ],
      careerAdvice: 'Focus on building relevant skills, creating a strong portfolio, and networking with professionals in your field of interest. Consider starting with free online resources to explore different career paths.'
    };
  }
}

// Create a singleton instance
const apiService = new APIService();

export default apiService;
