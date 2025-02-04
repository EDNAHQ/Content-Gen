import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProgressBar } from "@/components/ProgressBar";
import { ImageGrid } from "@/components/ImageGrid";
import { ActionButtons } from "@/components/ActionButtons";
import { useImageRows } from "@/hooks/useImageRows";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Prompt {
  id: string;
  name: string;
  prompt_text: string;
}

export default function SocialMedia() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const {
    postRows,
    isAnalyzing,
    currentProgress,
    handleImageSelect,
    handlePromptSelect,
    handleContextChange,
    handleTextContentChange,
    handleContentTypeChange,
    handleAnalyzeImages,
    addMoreRows,
    handleReset,
    generatedPosts
  } = useImageRows();

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('id, name, prompt_text')
        .eq('type', 'social_media')
        .eq('is_active', true);

      if (error) throw error;
      setPrompts(data);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast.error('Failed to load prompts');
    }
  };

  return (
    <div className="container mt-24 text-left">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Social Media
        </h1>
      </div>

      <ProgressBar 
        isAnalyzing={isAnalyzing} 
        currentProgress={currentProgress} 
      />

      <ImageGrid
        postRows={postRows}
        prompts={prompts}
        onImageSelect={handleImageSelect}
        onPromptSelect={handlePromptSelect}
        onContextChange={handleContextChange}
        onTextContentChange={handleTextContentChange}
        onContentTypeChange={handleContentTypeChange}
      />

      <ActionButtons 
        onAnalyze={handleAnalyzeImages}
        onAddMore={addMoreRows}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
        hasFiles={postRows.some(row => row.files && row.files.length > 0)}
        generatedPosts={generatedPosts}
      />
    </div>
  );
}