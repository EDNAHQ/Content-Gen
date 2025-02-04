import { useState } from "react";
import { usePrompts } from "@/hooks/usePrompts";
import { toast } from "sonner";
import { getDefaultPromptsByType } from "@/config/defaultPrompts";
import { ContentGenerationLayout } from "@/components/content/ContentGenerationLayout";

export default function Article() {
  const [content, setContent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { prompts, isLoading: isLoadingPrompts } = usePrompts();

  // Get all available prompts - combine user prompts with defaults
  const articlePrompts = [
    ...(prompts?.filter(prompt => prompt.type === 'article') ?? []),
    ...getDefaultPromptsByType('article')
  ];

  const handleGenerate = async () => {
    if (!content || !selectedPrompt) {
      toast.error("Please fill in your notes and select an article style");
      return;
    }

    setIsGenerating(true);
    try {
      // Find the selected prompt
      const selectedPromptData = articlePrompts.find(p => 
        p.id === selectedPrompt || p.name === selectedPrompt
      );

      if (!selectedPromptData) {
        throw new Error('Selected prompt not found');
      }

      // TODO: Replace with actual API call
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content, 
          promptId: selectedPromptData.id,
          promptText: selectedPromptData.prompt_text || selectedPromptData.description
        })
      });

      if (!response.ok) throw new Error('Failed to generate article');
      
      const data = await response.json();
      setGeneratedContent(data.generatedContent);
      toast.success("Article generated successfully!");
    } catch (error) {
      console.error("Error generating article:", error);
      toast.error("Failed to generate article. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ContentGenerationLayout
      title="Article"
      notes={content}
      onNotesChange={setContent}
      selectedPrompt={selectedPrompt}
      onPromptChange={setSelectedPrompt}
      prompts={articlePrompts}
      isGenerating={isGenerating}
      onGenerate={handleGenerate}
      generatedContent={generatedContent}
      isLoadingPrompts={isLoadingPrompts}
    />
  );
}