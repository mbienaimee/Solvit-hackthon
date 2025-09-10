// Mentorship platforms and mentor recommendations
export const mentorshipPlatforms = [
  {
    id: 1,
    name: "ADPList",
    description: "Global community of amazing mentors & learners",
    url: "https://adplist.org/",
    type: "platform",
    features: ["Free mentorship", "Tech focus", "Global reach"],
    categories: ["Technology", "Design", "Product", "Career"],
    rating: 4.8,
    cost: "Free"
  },
  {
    id: 2,
    name: "MentorCruise",
    description: "Hand-picked mentors for your career growth",
    url: "https://mentorcruise.com/",
    type: "platform", 
    features: ["Paid mentorship", "Expert mentors", "Structured programs"],
    categories: ["Technology", "Business", "Design", "Marketing"],
    rating: 4.6,
    cost: "Paid"
  },
  {
    id: 3,
    name: "LinkedIn",
    description: "Professional networking and mentorship opportunities",
    url: "https://linkedin.com/",
    type: "network",
    features: ["Professional network", "Industry groups", "Career advice"],
    categories: ["All industries"],
    rating: 4.3,
    cost: "Freemium"
  },
  {
    id: 4,
    name: "SCORE",
    description: "Free business mentoring for entrepreneurs",
    url: "https://www.score.org/",
    type: "organization",
    features: ["Free mentorship", "Business focus", "Expert volunteers"],
    categories: ["Business", "Entrepreneurship"],
    rating: 4.5,
    cost: "Free"
  },
  {
    id: 5,
    name: "Ten Thousand Coffees",
    description: "Professional development and mentorship platform",
    url: "https://www.tenthousandcoffees.com/",
    type: "platform",
    features: ["Corporate programs", "Skill development", "Networking"],
    categories: ["Corporate", "Leadership", "Career Development"],
    rating: 4.4,
    cost: "Corporate"
  },
  {
    id: 6,
    name: "Coding Coach",
    description: "Free platform connecting mentors and mentees in tech",
    url: "https://codingcoach.io/",
    type: "platform",
    features: ["Free mentorship", "Coding focus", "Open source"],
    categories: ["Programming", "Technology"],
    rating: 4.7,
    cost: "Free"
  }
];

// Mentor recommendations based on career goals
export const mentorRecommendations = {
  "Software Developer": [
    {
      platform: "ADPList",
      reason: "Large community of tech mentors offering free guidance",
      focus: "Technical skills, career growth, code review"
    },
    {
      platform: "Coding Coach", 
      reason: "Specialized platform for programming mentorship",
      focus: "Programming languages, best practices, career transitions"
    },
    {
      platform: "LinkedIn",
      reason: "Connect with senior developers in your tech stack",
      focus: "Industry insights, networking, career opportunities"
    }
  ],
  
  "Data Scientist": [
    {
      platform: "ADPList",
      reason: "Many data science mentors available for career guidance",
      focus: "ML projects, career transitions, technical interviews"
    },
    {
      platform: "LinkedIn",
      reason: "Connect with data science professionals and teams",
      focus: "Industry trends, project showcasing, job opportunities"
    },
    {
      platform: "MentorCruise",
      reason: "Expert data scientists offering structured mentorship",
      focus: "Advanced techniques, career strategy, portfolio development"
    }
  ],

  "UX/UI Designer": [
    {
      platform: "ADPList",
      reason: "Large design community with experienced mentors",
      focus: "Portfolio review, design process, career guidance"
    },
    {
      platform: "LinkedIn",
      reason: "Connect with design professionals and design teams",
      focus: "Industry insights, design trends, networking"
    },
    {
      platform: "MentorCruise",
      reason: "Senior designers offering portfolio and career guidance",
      focus: "Design strategy, user research, professional development"
    }
  ],

  "Product Manager": [
    {
      platform: "ADPList",
      reason: "Many product managers offering mentorship and guidance",
      focus: "Product strategy, career transitions, PM skills"
    },
    {
      platform: "LinkedIn",
      reason: "Connect with product leaders and PM communities",
      focus: "Industry insights, product trends, job opportunities"
    },
    {
      platform: "MentorCruise",
      reason: "Senior PMs offering structured career guidance",
      focus: "Product leadership, strategy, career advancement"
    }
  ],

  "Marketing Manager": [
    {
      platform: "LinkedIn",
      reason: "Largest professional network for marketing professionals",
      focus: "Marketing trends, strategy, networking opportunities"
    },
    {
      platform: "ADPList",
      reason: "Marketing mentors offering career and strategy guidance",
      focus: "Digital marketing, career growth, skill development"
    },
    {
      platform: "SCORE",
      reason: "Business mentorship for marketing and entrepreneurship",
      focus: "Business strategy, marketing fundamentals, growth tactics"
    }
  ],

  "Cybersecurity Analyst": [
    {
      platform: "LinkedIn",
      reason: "Connect with cybersecurity professionals and groups",
      focus: "Security trends, certifications, career opportunities"
    },
    {
      platform: "ADPList",
      reason: "Security professionals offering mentorship",
      focus: "Career transitions, technical skills, industry insights"
    },
    {
      platform: "MentorCruise",
      reason: "Expert security professionals for structured guidance",
      focus: "Advanced security topics, career strategy, certifications"
    }
  ]
};

// Function to get mentor recommendations for a specific role
export function getMentorRecommendations(jobTitle) {
  // Check for exact match first
  if (mentorRecommendations[jobTitle]) {
    return mentorRecommendations[jobTitle];
  }
  
  // Check for partial matches
  const jobTitleLower = jobTitle.toLowerCase();
  for (const [role, recommendations] of Object.entries(mentorRecommendations)) {
    if (jobTitleLower.includes(role.toLowerCase()) || role.toLowerCase().includes(jobTitleLower)) {
      return recommendations;
    }
  }
  
  // Return general recommendations if no specific match
  return [
    {
      platform: "LinkedIn",
      reason: "Professional networking and industry connections",
      focus: "Career guidance, industry insights, networking"
    },
    {
      platform: "ADPList",
      reason: "Free mentorship from industry professionals",
      focus: "Career development, skill building, professional growth"
    }
  ];
}

// Function to get all mentorship platforms
export function getAllMentorshipPlatforms() {
  return mentorshipPlatforms;
}

// Function to get platforms by category
export function getMentorshipPlatformsByCategory(category) {
  return mentorshipPlatforms.filter(platform => 
    platform.categories.some(cat => 
      cat.toLowerCase().includes(category.toLowerCase())
    )
  );
}

export default {
  mentorshipPlatforms,
  mentorRecommendations,
  getMentorRecommendations,
  getAllMentorshipPlatforms,
  getMentorshipPlatformsByCategory
};
