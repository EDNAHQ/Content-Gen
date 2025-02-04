import { useState } from "react";
import { usePrompts } from "@/hooks/usePrompts";
import { toast } from "sonner";
import { getDefaultPromptsByType } from "@/config/defaultPrompts";
import { ContentGenerationLayout } from "@/components/content/ContentGenerationLayout";

export default function Newsletter() {
  const [content, setContent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { prompts, isLoading: isLoadingPrompts } = usePrompts();

  // Get all available prompts - combine user prompts with defaults
  const newsletterPrompts = [
    ...(prompts?.filter(prompt => prompt.type === 'newsletter') ?? []),
    ...getDefaultPromptsByType('newsletter')
  ];

  const handleGenerate = async () => {
    if (!content || !selectedPrompt) {
      toast.error("Please fill in your notes and select a newsletter style");
      return;
    }

    setIsGenerating(true);
    try {
      // Find the selected prompt
      const selectedPromptData = newsletterPrompts.find(p => 
        p.id === selectedPrompt || p.name === selectedPrompt
      );

      if (!selectedPromptData) {
        throw new Error('Selected prompt not found');
      }

      // TODO: Replace with actual API call
      const response = await fetch('/api/generate-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content, 
          promptId: selectedPromptData.id,
          promptText: selectedPromptData.prompt_text || selectedPromptData.description
        })
      });

      if (!response.ok) throw new Error('Failed to generate newsletter');
      
      const data = await response.json();
      setGeneratedContent(data.generatedContent);
      toast.success("Newsletter generated successfully!");
    } catch (error) {
      console.error("Error generating newsletter:", error);
      toast.error("Failed to generate newsletter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ContentGenerationLayout
      title="Newsletter"
      notes={content}
      onNotesChange={setContent}
      selectedPrompt={selectedPrompt}
      onPromptChange={setSelectedPrompt}
      prompts={newsletterPrompts}
      isGenerating={isGenerating}
      onGenerate={handleGenerate}
      generatedContent={generatedContent}
      isLoadingPrompts={isLoadingPrompts}
    />
  );
}