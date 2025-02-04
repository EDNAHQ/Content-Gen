-- Create the prompts table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.prompts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS on prompts table
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Insert default prompts for each type
INSERT INTO public.prompts (id, name, content, type, is_default) VALUES
-- Email prompts
('d47ec091-9a10-4f5c-a608-5dd8c5d2ca90', 'Professional Email', 
'Create a professional email that is clear, concise, and maintains a formal tone. 
Structure the email with:
- A courteous greeting
- Clear purpose in the opening
- Well-organized body paragraphs
- Professional closing
- Appropriate signature

Use the following notes to generate the email: {{content}}', 
'email', true),

('b2a9c9a9-6a9f-4f0c-b8d8-5dd8c5d2ca91', 'Newsletter Email', 
'Create an engaging newsletter-style email that is informative and maintains reader interest.
Include:
- Attention-grabbing subject line
- Brief overview/highlights
- Main content sections with headers
- Call-to-action elements
- Social media links

Transform these notes into a newsletter email: {{content}}',
'email', true),

-- Newsletter prompts
('c3b8d8b8-7b8e-4e1d-b9e9-5dd8c5d2ca92', 'Company Update', 
'Create a company/project update newsletter that is informative and engaging.
Include:
- Latest developments
- Key achievements
- Upcoming initiatives
- Team highlights
- Resources and links

Based on these notes, create a newsletter: {{content}}',
'newsletter', true),

('e4c7e7c7-8c7d-4d2c-a7f7-5dd8c5d2ca93', 'Educational Newsletter', 
'Create an educational newsletter that teaches and informs while maintaining engagement.
Structure with:
- Key learning points
- Practical examples
- Tips and best practices
- Further reading suggestions
- Interactive elements

Using these notes, create an educational newsletter: {{content}}',
'newsletter', true),

-- Article prompts
('f5d6f6d6-9d6c-4c3b-b6e6-5dd8c5d2ca94', 'Technical Article', 
'Create a technical article that is informative yet accessible.
Include:
- Clear introduction of the topic
- Step-by-step explanations
- Code examples or technical details
- Best practices
- Practical applications
- Summary and next steps

Based on these notes, write a technical article: {{content}}',
'article', true),

('g6e5e5e5-0e5b-4b4a-a5d5-5dd8c5d2ca95', 'Thought Leadership', 
'Create a thought leadership article that demonstrates expertise and provides valuable insights.
Structure with:
- Engaging hook
- Industry context
- Key insights and analysis
- Supporting evidence
- Future implications
- Call to action

Using these notes, create a thought leadership article: {{content}}',
'article', true);

-- Add system flag to default prompts
ALTER TABLE public.prompts ADD COLUMN IF NOT EXISTS is_default BOOLEAN DEFAULT false;
ALTER TABLE public.prompts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW());

-- Create a function to copy default prompts for new users
CREATE OR REPLACE FUNCTION public.copy_default_prompts_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.prompts (
        name,
        content,
        type,
        user_id,
        is_default,
        created_at
    )
    SELECT 
        name,
        content,
        type,
        NEW.id,  -- The new user's ID
        false,   -- Set is_default to false for user copies
        NOW()
    FROM public.prompts
    WHERE is_default = true;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically copy default prompts for new users
DROP TRIGGER IF EXISTS copy_default_prompts_trigger ON auth.users;
CREATE TRIGGER copy_default_prompts_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.copy_default_prompts_for_new_user();
