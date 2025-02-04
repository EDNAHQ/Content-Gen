export const defaultPrompts = [
  // Email prompts
  {
    name: 'Professional Email',
    description: 'Creates a professional and engaging email. You are an expert email copywriter.',
    prompt_text: `Create a professional and engaging email. You are an expert email copywriter.`,
    type: 'email',
  },
  {
    name: 'Newsletter Email',
    description: 'Template for newsletter-style emails. You are an expert email copywriter.',
    prompt_text: `Create an engaging newsletter-style email. You are an expert email copywriter.`,
    type: 'email',
  },

  // Newsletter prompts
  {
    name: 'Company Update',
    description: 'Template for sharing company news and updates. Create an informative company newsletter.',
    prompt_text: `Create an informative company newsletter. You are a professional business writer.`,
    type: 'newsletter',
  },
  {
    name: 'Educational Newsletter',
    description: 'Template for educational content. Create an engaging educational newsletter.',
    prompt_text: `Create an educational newsletter that teaches and informs. You are an expert educational content writer.`,
    type: 'newsletter',
  },

  // Article prompts
  {
    name: 'Technical Article',
    description: 'Transform complex research into articles. You are a technical writer.',
    prompt_text: `Create a technical article that is informative yet accessible. You are an expert technical writer.`,
    type: 'article',
  },
  {
    name: 'Thought Leadership',
    description: 'Create engaging and informative blogs. You are a professional blog writer.',
    prompt_text: `Create a thought leadership article that demonstrates expertise. You are an expert industry analyst.`,
    type: 'article',
  },
] as const;

export type DefaultPrompt = (typeof defaultPrompts)[number];

// Helper function to get prompts by type
export const getDefaultPromptsByType = (type: string) => {
  return defaultPrompts.filter(prompt => prompt.type === type);
};

// Helper function to get all default prompts
export const getAllDefaultPrompts = () => {
  return defaultPrompts;
};
