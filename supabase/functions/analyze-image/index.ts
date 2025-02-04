import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { images, promptText, additionalContext, textContent } = await req.json();

    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    if (!promptText) {
      console.error('No prompt text provided');
      throw new Error('No prompt text provided');
    }

    // For text-based posts
    if (!images || images.length === 0) {
      if (!textContent) {
        console.error('Neither images nor text content provided');
        throw new Error('Content is required');
      }

      console.log('Processing text-based post:', {
        textLength: textContent.length,
        promptLength: promptText.length,
        hasAdditionalContext: !!additionalContext
      });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: promptText },
            { 
              role: 'user', 
              content: additionalContext 
                ? `Please analyze this text and create a social media post based on it. Text: ${textContent}. Additional context: ${additionalContext}`
                : `Please analyze this text and create a social media post based on it. Text: ${textContent}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API error:', error);
        throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Successfully generated content for text-based post');
      
      return new Response(JSON.stringify({ 
        content: data.choices[0].message.content,
        imageUrls: []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // For image-based posts
    console.log('Processing image-based post:', {
      imageCount: images.length,
      promptLength: promptText.length,
      hasAdditionalContext: !!additionalContext
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: promptText },
          { 
            role: 'user',
            content: [
              {
                type: "text",
                text: additionalContext 
                  ? `Please analyze these images and create a social media post based on them. Additional context: ${additionalContext}`
                  : "Please analyze these images and create a social media post based on them."
              },
              ...images.map((image: string) => ({
                type: "image_url",
                image_url: {
                  url: image
                }
              }))
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Successfully generated content for image-based post');
    
    return new Response(JSON.stringify({ 
      content: data.choices[0].message.content, 
      imageUrls: images 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-image function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});