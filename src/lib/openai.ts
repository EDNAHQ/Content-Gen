import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function analyzeImageAndGeneratePost(imageFiles: File[], promptId: string, additionalContext?: string, textContent?: string) {
  try {
    // First, fetch the prompt text from the database
    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .select('prompt_text')
      .eq('id', promptId)
      .single();

    if (promptError || !promptData) {
      console.error("Error fetching prompt:", promptError);
      throw new Error("Failed to fetch prompt");
    }

    // For text-based posts
    if (imageFiles.length === 0) {
      if (!textContent) {
        throw new Error("Text content is required for text-based posts");
      }

      console.log('Processing text-based post with:', { 
        textContent, 
        promptText: promptData.prompt_text,
        additionalContext 
      });

      const { data, error } = await supabase.functions.invoke('generate-text-post', {
        body: { 
          textContent,
          promptText: promptData.prompt_text,
          additionalContext
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to generate text-based post");
      }

      if (!data?.content) {
        console.error("Invalid response from Edge Function:", data);
        throw new Error("Invalid response from AI service");
      }

      return {
        content: data.content,
        imageUrls: []
      };
    }

    // For image-based posts
    console.log('Processing image-based post with:', {
      imageCount: imageFiles.length,
      promptText: promptData.prompt_text,
      additionalContext
    });

    const base64Images = await Promise.all(
      imageFiles.map(file => 
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      )
    );

    const { data, error } = await supabase.functions.invoke('analyze-image', {
      body: { 
        images: base64Images,
        promptText: promptData.prompt_text,
        additionalContext
      }
    });

    if (error) {
      console.error("Edge function error:", error);
      throw new Error(error.message || "Failed to analyze images");
    }

    if (!data?.content || !data?.imageUrls) {
      console.error("Invalid response from Edge Function:", data);
      throw new Error("Invalid response from AI service");
    }

    return {
      content: data.content,
      imageUrls: data.imageUrls
    };
  } catch (error) {
    console.error("Error analyzing content:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to analyze content";
    toast.error(errorMessage);
    throw error;
  }
}