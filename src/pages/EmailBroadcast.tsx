import { useState } from "react";
import { usePrompts } from "@/hooks/usePrompts";
import { toast } from "sonner";
import { getDefaultPromptsByType } from "@/config/defaultPrompts";
import { ContentGenerationLayout } from "@/components/content/ContentGenerationLayout";

export default function EmailBroadcast() {
  const [content, setContent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { prompts, isLoading: isLoadingPrompts } = usePrompts();

  // Get all available prompts - combine user prompts with defaults
  const emailPrompts = [
    ...(prompts?.filter(prompt => prompt.type === 'email') ?? []),
    ...getDefaultPromptsByType('email')
  ];

  const handleGenerateEmail = async () => {
    if (!content || !selectedPrompt) {
      toast.error("Please fill in your notes and select an email style");
      return;
    }

    setIsGenerating(true);
    try {
      // Find the selected prompt
      const selectedPromptData = emailPrompts.find(p => 
        p.id === selectedPrompt || p.name === selectedPrompt
      );

      if (!selectedPromptData) {
        throw new Error('Selected prompt not found');
      }

      // TODO: Replace with actual API call
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content, 
          promptId: selectedPromptData.id,
          promptText: selectedPromptData.prompt_text || selectedPromptData.description
        })
      });

      if (!response.ok) throw new Error('Failed to generate email');
      
      const data = await response.json();
      setGeneratedEmail(data.generatedContent);
      toast.success("Email generated successfully!");
    } catch (error) {
      console.error("Error generating email:", error);
      toast.error("Failed to generate email. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ContentGenerationLayout
      title="Email Broadcast"
      notes={content}
      onNotesChange={setContent}
      selectedPrompt={selectedPrompt}
      onPromptChange={setSelectedPrompt}
      prompts={emailPrompts}
      isGenerating={isGenerating}
      onGenerate={handleGenerateEmail}
      generatedContent={generatedEmail}
      isLoadingPrompts={isLoadingPrompts}
    />
  );
}