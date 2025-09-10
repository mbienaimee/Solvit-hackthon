import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Simple global job market keywords
const GLOBAL_KEYWORDS = [
  'react', 'node', 'python', 'javascript', 'typescript', 'cloud', 'devops', 'data', 'ai', 'machine learning', 'sql', 'docker', 'kubernetes', 'agile', 'scrum', 'design', 'testing', 'security', 'api', 'frontend', 'backend', 'fullstack', 'mobile', 'aws', 'azure', 'gcp', 'linux', 'git', 'project management', 'communication', 'leadership'
];

export const analyzeCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No CV uploaded' });
    }
    const cvPath = path.join(process.cwd(), req.file.path);
    const cvText = fs.readFileSync(cvPath, 'utf-8');
    const foundKeywords = GLOBAL_KEYWORDS.filter((kw) => cvText.toLowerCase().includes(kw));
    // Fetch jobs from arbeitnow API
    const jobsRes = await fetch('https://arbeitnow.com/api/job-board-api');
    const jobsData = await jobsRes.json();
    let recommendedJobs = [];
    if (jobsData && jobsData.data) {
      recommendedJobs = jobsData.data.filter((job) => {
        // Only recommend jobs in tech fields if CV matches tech keywords
        const jobText = `${job.title} ${job.tags ? job.tags.join(' ') : ''}`.toLowerCase();
        const isTechJob = [
          'developer', 'engineer', 'software', 'frontend', 'backend', 'fullstack', 'devops', 'cloud', 'data', 'ai', 'machine learning', 'python', 'javascript', 'typescript', 'react', 'node', 'sql', 'docker', 'kubernetes', 'mobile', 'aws', 'azure', 'gcp', 'linux', 'git'
        ].some((kw) => jobText.includes(kw));
        const matchesCV = foundKeywords.some((kw) => jobText.includes(kw));
        return isTechJob && matchesCV;
      });
    }
    // If CV is weak (few keywords), suggest courses
    let courseSuggestion = null;
    if (foundKeywords.length < 5) {
      courseSuggestion = 'Your CV does not match enough global tech skills. Please visit the Learning Hub and take recommended courses in programming, cloud, or data to improve your profile.';
    } else if (recommendedJobs.length === 0) {
      courseSuggestion = 'No matching jobs found for your CV. Consider improving your CV or taking new courses in the Learning Hub.';
    }
    res.json({
      keywords: foundKeywords,
      recommendedJobs,
      courseSuggestion,
    });
  } catch (err) {
    res.status(500).json({ message: 'CV analysis failed', error: err.message });
  }
};
