import { useState } from "react";
import { analyzeImageAndGeneratePost } from "@/lib/openai";
import { toast } from "sonner";
import { PostRow } from "@/types";
import { GenerationResult } from "@/types/content";
import { validateContentRows, delay } from "@/utils/contentProcessing";
import { useContentHistory } from "./useContentHistory";

export function useContentGeneration(
  postRows: PostRow[], 
  setPostRows: React.Dispatch<React.SetStateAction<PostRow[]>>,
  setCurrentProgress: (progress: number) => void
) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { saveToHistory } = useContentHistory();

  const generateContent = async (): Promise<GenerationResult | null> => {
    const rowsToProcess = validateContentRows(postRows);
    if (rowsToProcess.length === 0) return null;

    setIsGenerating(true);
    setCurrentProgress(0);

    const totalItems = rowsToProcess.length;
    let processedItems = 0;
    let lastError: Error | null = null;
    let hasSuccessfulGeneration = false;

    for (const row of rowsToProcess) {
      if (!row.selectedPromptId) {
        processedItems++;
        setCurrentProgress((processedItems / totalItems) * 100);
        continue;
      }

      try {
        console.log(`Processing row ${row.id}`, {
          contentType: row.contentType,
          hasFiles: row.files?.length,
          hasText: !!row.textContent,
          promptId: row.selectedPromptId
        });

        setPostRows(prevRows => 
          prevRows.map(r => 
            r.id === row.id 
              ? { ...r, isLoading: true }
              : r
          )
        );

        const result = await analyzeImageAndGeneratePost(
          row.files || [], 
          row.selectedPromptId,
          row.additionalContext,
          row.textContent
        );
        
        if (!result) {
          throw new Error('No result returned from content generation');
        }

        await saveToHistory({
          content: result.content,
          originalContent: row.textContent || (row.files ? row.files.map(f => f.name).join(', ') : null),
          metadata: {
            promptId: row.selectedPromptId,
            timestamp: new Date().toISOString(),
            hasAdditionalContext: !!row.additionalContext,
            additionalContext: row.additionalContext,
            imageCount: row.files?.length || 0,
            originalTextLength: row.textContent?.length || 0,
            contentType: row.contentType === 'image' ? 'social_media' : 'social_media'
          }
        });

        console.log('Content saved to history successfully');

        setPostRows(prevRows => 
          prevRows.map(r => 
            r.id === row.id 
              ? { 
                  ...r, 
                  isLoading: false,
                  generatedPost: result.content,
                  imageUrls: result.imageUrls,
                  versions: [
                    {
                      content: result.content,
                      timestamp: new Date().toISOString()
                    }
                  ],
                  currentVersionIndex: 0
                }
              : r
          )
        );

        hasSuccessfulGeneration = true;
        processedItems++;
        setCurrentProgress((processedItems / totalItems) * 100);

        if (processedItems < totalItems) {
          await delay(3000);
        }

      } catch (error) {
        console.error(`Error processing ${row.contentType}-based content for row ${row.id}:`, error);
        lastError = error as Error;
        
        setPostRows(prevRows => 
          prevRows.map(r => 
            r.id === row.id 
              ? { ...r, isLoading: false }
              : r
          )
        );

        toast.error(`Failed to process content ${row.id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        
        processedItems++;
        setCurrentProgress((processedItems / totalItems) * 100);
        
        if (processedItems < totalItems) {
          await delay(3000);
        }
      }
    }

    setIsGenerating(false);
    setCurrentProgress(0);

    if (processedItems > 0) {
      if (!hasSuccessfulGeneration) {
        toast.error("Failed to generate any content. Please try again.");
      } else if (lastError) {
        toast.warning("Some content could not be processed, but others completed successfully.");
      } else {
        toast.success("All content has been processed successfully!");
      }
    }

    return null;
  };

  return {
    isGenerating,
    generateContent
  };
}