import { findJobsBySkills, findJobsByKeywords, jobDatabase } from '../data/jobDatabase.js';
import { getResourcesForJob, getResourcesForSkills, getGeneralCareerResources } from '../data/learningResources.js';
import { getMentorRecommendations, getAllMentorshipPlatforms } from '../data/mentorshipData.js';

class CareerService {
  constructor() {
    this.jobDatabase = jobDatabase;
  }

  // Main function to get career recommendations based on user profile
  getCareerRecommendations(userProfile, analysisData = {}) {
    const recommendations = {
      jobs: [],
      resources: [],
      mentors: [],
      careerAdvice: ''
    };

    // Get job recommendations
    recommendations.jobs = this.getJobRecommendations(userProfile, analysisData);
    
    // Get learning resources
    recommendations.resources = this.getLearningRecommendations(userProfile, recommendations.jobs);
    
    // Get mentorship recommendations
    recommendations.mentors = this.getMentorshipRecommendations(recommendations.jobs);
    
    // Generate career advice
    recommendations.careerAdvice = this.generateCareerAdvice(userProfile, recommendations.jobs);

    return recommendations;
  }

  // Get job recommendations based on user skills and interests
  getJobRecommendations(userProfile, analysisData = {}) {
    let jobRecommendations = [];

    // Combine skills from profile and analysis
    const allSkills = [
      ...(userProfile.skills || []),
      ...(analysisData.skills || [])
    ];

    // Remove duplicates
    const uniqueSkills = [...new Set(allSkills)];

    if (uniqueSkills.length > 0) {
      // Get jobs based on skills
      jobRecommendations = findJobsBySkills(uniqueSkills, 5);
    }

    // If we have interests from analysis, also search by keywords
    if (analysisData.interests && analysisData.interests.length > 0) {
      const interestBasedJobs = analysisData.interests.flatMap(interest => 
        findJobsByKeywords(interest, 2)
      );
      
      // Merge and deduplicate
      const allJobs = [...jobRecommendations, ...interestBasedJobs];
      const uniqueJobs = allJobs.filter((job, index, self) =>
        index === self.findIndex(j => j.id === job.id)
      );
      
      jobRecommendations = uniqueJobs.slice(0, 5);
    }

    // If no specific matches, provide some general tech jobs
    if (jobRecommendations.length === 0) {
      jobRecommendations = this.jobDatabase.slice(0, 3);
    }

    // Add additional context based on user experience
    return jobRecommendations.map(job => ({
      ...job,
      whyRecommended: this.generateJobRecommendationReason(job, userProfile, analysisData),
      nextSteps: this.generateNextSteps(job, userProfile)
    }));
  }

  // Generate reason why a job is recommended
  generateJobRecommendationReason(job, userProfile, analysisData) {
    const userSkills = [
      ...(userProfile.skills || []),
      ...(analysisData.skills || [])
    ].map(skill => skill.toLowerCase());

    const matchingSkills = job.skills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill)
      )
    );

    if (matchingSkills.length > 0) {
      return `This role matches your skills in ${matchingSkills.slice(0, 3).join(', ')}.`;
    }

    // Experience-based recommendation
    const userExperience = userProfile.experience || analysisData.experience;
    if (userExperience === 'entry' && job.level === 'Entry') {
      return "This is a great entry-level position to start your career.";
    }
    if (userExperience === 'mid' && (job.level === 'Mid' || job.level === 'Senior')) {
      return "This role aligns with your experience level and offers growth opportunities.";
    }

    return "This role offers good career prospects in a growing field.";
  }

  // Generate next steps for a recommended job
  generateNextSteps(job, userProfile) {
    const steps = [];

    // Skills analysis
    const userSkills = (userProfile.skills || []).map(skill => skill.toLowerCase());
    const requiredSkills = job.skills.map(skill => skill.toLowerCase());
    const missingSkills = requiredSkills.filter(skill => 
      !userSkills.some(userSkill => 
        userSkill.includes(skill) || skill.includes(userSkill)
      )
    );

    if (missingSkills.length > 0) {
      steps.push(`Learn ${missingSkills.slice(0, 2).join(' and ')} to strengthen your application`);
    }

    // Portfolio/experience suggestions
    if (job.category === 'Technology' || job.category === 'Design') {
      steps.push("Build projects showcasing relevant skills for your portfolio");
    }

    // Networking suggestions
    steps.push("Connect with professionals in this field on LinkedIn");

    // Education/certification
    if (job.level === 'Senior' && userProfile.experience !== 'senior') {
      steps.push("Consider gaining more experience in relevant technologies");
    }

    return steps.slice(0, 3); // Return top 3 steps
  }

  // Get learning resource recommendations
  getLearningRecommendations(userProfile, jobRecommendations) {
    let resources = [];

    // Get resources for recommended jobs
    jobRecommendations.forEach(job => {
      const jobResources = getResourcesForJob(job.title);
      resources.push(...jobResources);
    });

    // Get resources for user skills
    if (userProfile.skills) {
      const skillResources = getResourcesForSkills(userProfile.skills);
      resources.push(...skillResources);
    }

    // Add general career resources
    const generalResources = getGeneralCareerResources();
    resources.push(...generalResources.slice(0, 2));

    // Remove duplicates and limit results
    const uniqueResources = resources.filter((resource, index, self) =>
      index === self.findIndex(r => r.title === resource.title)
    );

    return uniqueResources.slice(0, 8);
  }

  // Get mentorship recommendations
  getMentorshipRecommendations(jobRecommendations) {
    if (jobRecommendations.length === 0) {
      return getAllMentorshipPlatforms().slice(0, 3);
    }

    const mentorRecommendations = [];
    jobRecommendations.forEach(job => {
      const jobMentors = getMentorRecommendations(job.title);
      mentorRecommendations.push(...jobMentors);
    });

    // Remove duplicates and add platform details
    const uniqueMentors = mentorRecommendations.filter((mentor, index, self) =>
      index === self.findIndex(m => m.platform === mentor.platform)
    );

    // Add platform details
    const platformDetails = getAllMentorshipPlatforms();
    const detailedMentors = uniqueMentors.map(mentor => {
      const platform = platformDetails.find(p => p.name === mentor.platform);
      return {
        ...mentor,
        platformDetails: platform
      };
    });

    return detailedMentors.slice(0, 4);
  }

  // Generate personalized career advice
  generateCareerAdvice(userProfile, jobRecommendations) {
    let advice = '';

    const userSkills = userProfile.skills || [];
    const experience = userProfile.experience;

    if (jobRecommendations.length > 0) {
      const topJob = jobRecommendations[0];
      advice += `Based on your profile, I recommend focusing on ${topJob.title} roles. `;

      // Skills advice
      const allJobSkills = jobRecommendations.flatMap(job => job.skills);
      const skillCounts = {};
      allJobSkills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });

      const topSkills = Object.entries(skillCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([skill]) => skill);

      const missingTopSkills = topSkills.filter(skill => 
        !userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );

      if (missingTopSkills.length > 0) {
        advice += `Consider learning ${missingTopSkills.slice(0, 2).join(' and ')} as these skills appear frequently in recommended roles. `;
      }

      // Experience advice
      if (experience === 'entry' || !experience) {
        advice += "Focus on building a strong portfolio with personal projects and consider internships or entry-level positions to gain experience. ";
      } else if (experience === 'mid') {
        advice += "You're in a great position to take on more challenging projects and consider leadership opportunities. ";
      }

      // General career advice
      advice += "Keep networking, stay updated with industry trends, and consider finding a mentor in your field of interest.";
    } else {
      advice = "I'd recommend exploring different career paths based on your interests. Consider taking some online courses to discover what you enjoy most, and don't hesitate to reach out to professionals in fields that interest you.";
    }

    return advice;
  }

  // Search jobs by specific criteria
  searchJobs(query, filters = {}) {
    let results = [];

    if (query) {
      results = findJobsByKeywords(query, 10);
    } else {
      results = [...this.jobDatabase];
    }

    // Apply filters
    if (filters.category) {
      results = results.filter(job => 
        job.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.level) {
      results = results.filter(job => 
        job.level.toLowerCase() === filters.level.toLowerCase()
      );
    }

    if (filters.skills && filters.skills.length > 0) {
      results = results.filter(job =>
        filters.skills.some(skill =>
          job.skills.some(jobSkill =>
            jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(jobSkill.toLowerCase())
          )
        )
      );
    }

    return results.slice(0, 10);
  }
}

export default CareerService;
