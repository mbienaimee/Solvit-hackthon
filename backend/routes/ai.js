import express from 'express';
import AIService from '../services/aiService.js';
import CareerService from '../services/careerService.js';

const router = express.Router();
const aiService = new AIService();
const careerService = new CareerService();

// Store conversation sessions (in production, use a database)
const conversationSessions = new Map();

// Chat with AI assistant
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, userProfile } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation session
    let messages = conversationSessions.get(sessionId) || [];
    
    // Add user message to conversation
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    messages.push(userMessage);

    // Generate AI response
    const aiResponse = await aiService.generateResponse(messages, userProfile);
    
    const aiMessage = {
      type: 'ai',
      content: aiResponse,
      timestamp: new Date().toISOString()
    };
    messages.push(aiMessage);

    // Update conversation session
    conversationSessions.set(sessionId, messages);

    // Analyze conversation for career recommendations
    let recommendations = null;
    if (messages.length >= 4) { // After some conversation
      const analysisData = aiService.analyzeUserProfile(messages);
      recommendations = careerService.getCareerRecommendations(userProfile || {}, analysisData);
    }

    res.json({
      message: aiMessage,
      recommendations: recommendations,
      conversationLength: messages.length
    });

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      message: {
        type: 'ai',
        content: "I apologize, but I'm having trouble responding right now. Could you please try again?",
        timestamp: new Date().toISOString()
      }
    });
  }
});

// Get career recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const { userProfile, sessionId } = req.body;

    // Get conversation context if available
    const messages = conversationSessions.get(sessionId) || [];
    const analysisData = aiService.analyzeUserProfile(messages);

    // Generate recommendations
    const recommendations = careerService.getCareerRecommendations(userProfile || {}, analysisData);

    res.json(recommendations);

  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Search jobs
router.get('/jobs/search', async (req, res) => {
  try {
    const { query, category, level, skills } = req.query;
    
    const filters = {};
    if (category) filters.category = category;
    if (level) filters.level = level;
    if (skills) filters.skills = skills.split(',').map(s => s.trim());

    const jobs = careerService.searchJobs(query, filters);

    res.json({ jobs });

  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({ error: 'Failed to search jobs' });
  }
});

// Get learning resources for specific job or skills
router.post('/resources', async (req, res) => {
  try {
    const { jobTitle, skills } = req.body;

    let resources = [];
    
    if (jobTitle) {
      resources = careerService.getLearningRecommendations({}, [{ title: jobTitle }]);
    } else if (skills && skills.length > 0) {
      resources = careerService.getLearningRecommendations({ skills }, []);
    }

    res.json({ resources });

  } catch (error) {
    console.error('Error getting resources:', error);
    res.status(500).json({ error: 'Failed to get resources' });
  }
});

// Get mentorship recommendations
router.post('/mentorship', async (req, res) => {
  try {
    const { jobTitles } = req.body;

    const jobs = jobTitles ? jobTitles.map(title => ({ title })) : [];
    const mentors = careerService.getMentorshipRecommendations(jobs);

    res.json({ mentors });

  } catch (error) {
    console.error('Error getting mentorship recommendations:', error);
    res.status(500).json({ error: 'Failed to get mentorship recommendations' });
  }
});

// Clear conversation session
router.delete('/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    conversationSessions.delete(sessionId);
    res.json({ message: 'Session cleared successfully' });
  } catch (error) {
    console.error('Error clearing session:', error);
    res.status(500).json({ error: 'Failed to clear session' });
  }
});

// Get conversation history
router.get('/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = conversationSessions.get(sessionId) || [];
    res.json({ messages });
  } catch (error) {
    console.error('Error getting session:', error);
    res.status(500).json({ error: 'Failed to get session' });
  }
});

export default router;
