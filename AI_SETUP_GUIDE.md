# AI-Powered Career Assistant Setup Guide

## Overview

This project is an AI-powered career assistant that provides personalized job recommendations, learning resources, and mentorship guidance using OpenAI's GPT model and comprehensive career databases.

## Features

- 🤖 **AI Chat Assistant**: Conversational career guidance powered by OpenAI
- 💼 **Job Recommendations**: Smart job matching based on skills and preferences
- 📚 **Learning Resources**: Curated courses and tutorials mapped to career goals
- 👥 **Mentorship Platform**: Recommendations for finding mentors and platforms
- 📊 **Progress Tracking**: Dashboard with AI-powered career insights

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, MongoDB
- **AI**: OpenAI GPT-3.5-turbo API
- **Data**: O\*NET-inspired job database, curated learning resources

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (already configured)
- OpenAI API account and API key

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd "c:\Users\LENOVO\Desktop\Solvit-hackthon"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

#### Backend Configuration

Edit `backend/.env` file:

```env
# Required: Get your OpenAI API key from https://platform.openai.com/
OPENAI_API_KEY=your_actual_openai_api_key_here

# Optional: Change other settings if needed
OPENAI_MODEL=gpt-3.5-turbo
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

**Important**: Replace `your_actual_openai_api_key_here` with your real OpenAI API key!

### 3. Start the Development Servers

#### Terminal 1 - Backend Server

```bash
cd backend
npm start
```

Server will run on http://localhost:3000

#### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173

### 4. Test the AI Features

1. **Open the application** in your browser at http://localhost:5173
2. **Sign up/Sign in** with any email and password
3. **Complete your profile** with job title and skills
4. **Test AI Chat**: Click the AI Assistant icon and ask career questions
5. **View AI Recommendations**:
   - Go to Learning page for AI-recommended courses
   - Go to Mentorship page for platform recommendations
   - Check Dashboard for personalized career insights

## API Endpoints

### AI & Career Endpoints

- `POST /api/ai/chat` - AI chat conversations
- `GET /api/ai/job-recommendations` - AI job matching
- `GET /api/ai/learning-recommendations` - AI learning suggestions
- `GET /api/ai/mentorship-recommendations` - AI mentorship guidance

### Authentication Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

## Data Sources

### Job Database

- 20+ curated job roles from entry to senior level
- Skills, responsibilities, and growth paths
- Salary ranges and market demand indicators

### Learning Resources

- 50+ courses from top platforms (Coursera, Udemy, edX)
- Mapped to specific skills and career levels
- Industry-relevant certifications and bootcamps

### Mentorship Platforms

- 10+ vetted mentorship platforms
- Cost information and specializations
- Platform ratings and user reviews

## Troubleshooting

### Common Issues

1. **AI Chat not working**

   - Check if OPENAI_API_KEY is set correctly in backend/.env
   - Verify OpenAI API key has sufficient credits
   - Check browser console for error messages

2. **Backend connection errors**

   - Ensure MongoDB URI is correct
   - Check if backend server is running on port 3000
   - Verify no firewall blocking the connection

3. **Frontend not loading**

   - Check if frontend dev server is running on port 5173
   - Clear browser cache and reload
   - Check for any console errors

4. **CORS errors**
   - Verify FRONTEND_URL in backend/.env matches your frontend URL
   - Check if both servers are running

### Development Tips

1. **AI Response Quality**: The AI responses improve with:

   - Complete user profiles (job title, skills, experience)
   - Specific questions rather than generic ones
   - Context from previous conversations

2. **Data Customization**: You can modify the data in:

   - `backend/data/jobDatabase.js` - Add more job roles
   - `backend/data/learningResources.js` - Add more courses
   - `backend/data/mentorshipData.js` - Add more platforms

3. **UI Customization**: All UI components preserve the existing design
   - Components are in `frontend/src/components/`
   - Pages are in `frontend/src/pages/`
   - Styling uses Tailwind CSS classes

## Project Structure

```
├── backend/
│   ├── controllers/authController.js
│   ├── models/User.js
│   ├── routes/auth.js
│   ├── routes/ai.js
│   ├── services/aiService.js
│   ├── services/careerService.js
│   ├── data/jobDatabase.js
│   ├── data/learningResources.js
│   ├── data/mentorshipData.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── CareerRecommendations.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Learning.jsx
│   │   │   ├── Mentorship.jsx
│   │   │   └── ...
│   │   ├── stores/
│   │   │   ├── appStore.js
│   │   │   ├── userStore.js
│   │   │   └── jobStore.js
│   │   └── services/apiService.js
│   └── ...
```

## Next Steps

1. **Get OpenAI API Key**: Visit https://platform.openai.com/ to get your API key
2. **Test All Features**: Go through each page and test AI recommendations
3. **Customize Data**: Add more jobs, courses, or mentorship platforms
4. **Deploy**: Consider deploying to Vercel (frontend) and Railway/Heroku (backend)

## Support

For issues or questions:

1. Check the console logs (browser and terminal)
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Test API endpoints using tools like Postman

---

**Important**: Remember to never commit your actual API keys to version control!
