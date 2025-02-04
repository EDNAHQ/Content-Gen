import { PostRow } from "@/types";
import { useContentGeneration } from "./useContentGeneration";
import { useProgressTracking } from "./useProgressTracking";
import { useContentHistory } from "./useContentHistory";
import { toast } from "sonner";

export function useContentManagement(
  postRows: PostRow[], 
  setPostRows: React.Dispatch<React.SetStateAction<PostRow[]>>
) {
  const { currentProgress, setCurrentProgress } = useProgressTracking();
  const { isGenerating, generateContent } = useContentGeneration(postRows, setPostRows, setCurrentProgress);
  const { saveToHistory } = useContentHistory();

  const handleRegenerate = async (rowId: string) => {
    const row = postRows.find(r => r.id === rowId);
    if (!row || !row.selectedPromptId) return;
    
    try {
      setPostRows(prevRows =>
        prevRows.map(r =>
          r.id === rowId
            ? { ...r, isLoading: true }
            : r
        )
      );

      const result = await generateContent();
      
      if (result) {
        await saveToHistory({
          content: result.content,
          originalContent: row.textContent || (row.files ? row.files.map(f => f.name).join(', ') : null),
          metadata: {
            promptId: row.selectedPromptId,
            isRegeneration: true,
            originalContent: row.generatedPost,
            timestamp: new Date().toISOString(),
            contentType: row.contentType === 'image' ? 'social_media' : 'social_media'
          }
        });

        setPostRows(prevRows =>
          prevRows.map(r =>
            r.id === rowId
              ? {
                  ...r,
                  versions: [
                    ...(r.versions || [{
                      content: r.generatedPost!,
                      timestamp: new Date().toISOString()
                    }]),
                    {
                      content: result.content,
                      timestamp: new Date().toISOString()
                    }
                  ],
                  currentVersionIndex: (r.versions?.length || 1),
                  isLoading: false
                }
              : r
          )
        );
        
        toast.success("Generated a new version!");
      }
    } catch (error) {
      console.error('Error regenerating post:', error);
      toast.error("Failed to generate new version");
      
      setPostRows(prevRows =>
        prevRows.map(r =>
          r.id === rowId
            ? { ...r, isLoading: false }
            : r
        )
      );
    }
  };

  return {
    isGenerating,
    currentProgress,
    generateContent,
    handleRegenerate
  };
}