import OpenAI from 'openai';

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Conversation context for career guidance
    this.systemPrompt = `You are an AI career assistant designed to help users find suitable job roles and career guidance. Your role is to:

1. Ask engaging questions about the user's background, skills, education, experience, and career goals
2. Analyze their responses to understand their profile
3. Provide personalized career advice and job recommendations
4. Be conversational, supportive, and encouraging
5. Guide users through their career journey step by step

Key areas to explore with users:
- Current skills and experience level
- Educational background
- Career interests and goals
- Preferred work environment (remote, office, hybrid)
- Industry preferences
- Salary expectations
- Personal values and work-life balance preferences

Always be helpful, professional, and encouraging. Ask follow-up questions to better understand the user's needs. Keep responses concise but informative.`;
  }

  async generateResponse(messages, userProfile = null) {
    try {
      // Prepare conversation context
      const conversationMessages = [
        { role: 'system', content: this.systemPrompt },
        ...messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ];

      // Add user profile context if available
      if (userProfile) {
        const profileContext = `User Profile Context:
- Name: ${userProfile.name || 'Not provided'}
- Current Role: ${userProfile.title || 'Not specified'}
- Skills: ${userProfile.skills ? userProfile.skills.join(', ') : 'Not specified'}
- Experience: ${userProfile.experience || 'Not specified'}
- Education: ${userProfile.education || 'Not specified'}
- Location: ${userProfile.location || 'Not specified'}

Use this context to provide more personalized responses.`;

        conversationMessages.splice(1, 0, { role: 'system', content: profileContext });
      }

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversationMessages,
        max_tokens: 300,
        temperature: 0.7,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback responses based on message content
      const lastMessage = messages[messages.length - 1];
      return this.getFallbackResponse(lastMessage?.content || '');
    }
  }

  getFallbackResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();
    
    // Job-related keywords
    if (messageLower.includes('job') || messageLower.includes('career') || messageLower.includes('work')) {
      return "I'd love to help you with your career! Could you tell me about your current skills and what type of work interests you?";
    }
    
    // Skills-related keywords
    if (messageLower.includes('skill') || messageLower.includes('learn') || messageLower.includes('study')) {
      return "That's great that you're interested in learning! What skills do you currently have, and what areas would you like to develop?";
    }
    
    // Experience-related keywords
    if (messageLower.includes('experience') || messageLower.includes('background')) {
      return "I'd like to learn more about your background. Could you share your work experience and education with me?";
    }
    
    // Goals-related keywords
    if (messageLower.includes('goal') || messageLower.includes('future') || messageLower.includes('want')) {
      return "It's important to have clear goals! What are you hoping to achieve in your career? Are you looking to change roles, advance in your current field, or explore something new?";
    }
    
    // Greeting
    if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {
      return "Hello! I'm here to help you with your career journey. To get started, could you tell me a bit about your current situation and what you're looking for?";
    }
    
    // Default response
    return "I'm here to help you with your career! Could you tell me more about your background, skills, and what you're looking for in your career?";
  }

  // Analyze user input to extract career-relevant information
  analyzeUserProfile(messages) {
    const allText = messages
      .filter(msg => msg.type === 'user')
      .map(msg => msg.content)
      .join(' ')
      .toLowerCase();

    const profile = {
      skills: [],
      interests: [],
      experience: null,
      education: null,
      goals: []
    };

    // Extract skills (basic keyword matching)
    const skillKeywords = [
      'javascript', 'python', 'react', 'node', 'java', 'css', 'html',
      'sql', 'mongodb', 'aws', 'docker', 'git', 'typescript', 'vue',
      'angular', 'express', 'django', 'flask', 'spring', 'laravel',
      'php', 'ruby', 'go', 'rust', 'c++', 'c#', '.net', 'swift',
      'kotlin', 'android', 'ios', 'figma', 'sketch', 'photoshop',
      'illustrator', 'ui', 'ux', 'design', 'marketing', 'seo',
      'analytics', 'project management', 'agile', 'scrum'
    ];

    skillKeywords.forEach(skill => {
      if (allText.includes(skill)) {
        profile.skills.push(skill);
      }
    });

    // Extract experience level
    if (allText.includes('beginner') || allText.includes('new') || allText.includes('starting')) {
      profile.experience = 'entry';
    } else if (allText.includes('year') || allText.includes('experience')) {
      const yearMatch = allText.match(/(\d+)\s*year/);
      if (yearMatch) {
        const years = parseInt(yearMatch[1]);
        if (years <= 2) profile.experience = 'entry';
        else if (years <= 5) profile.experience = 'mid';
        else profile.experience = 'senior';
      }
    }

    // Extract interests
    const interestKeywords = [
      'web development', 'mobile development', 'data science', 
      'machine learning', 'ai', 'cybersecurity', 'devops',
      'product management', 'design', 'marketing', 'sales'
    ];

    interestKeywords.forEach(interest => {
      if (allText.includes(interest)) {
        profile.interests.push(interest);
      }
    });

    return profile;
  }
}

export default AIService;
