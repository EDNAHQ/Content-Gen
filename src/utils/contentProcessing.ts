import { PostRow } from "@/types";
import { toast } from "sonner";

export const validateContentRows = (postRows: PostRow[]): PostRow[] => {
  const rowsToProcess = postRows.filter(row => 
    !row.generatedPost && 
    ((row.contentType === 'image' && row.files && row.files.length > 0 && row.selectedPromptId) ||
     (row.contentType === 'text' && row.textContent && row.selectedPromptId))
  );
  
  const rowsWithoutPrompts = postRows.filter(row => 
    !row.generatedPost &&
    ((row.contentType === 'image' && row.files && row.files.length > 0) ||
     (row.contentType === 'text' && row.textContent)) && 
    !row.selectedPromptId
  );

  if (rowsToProcess.length === 0) {
    if (rowsWithoutPrompts.length > 0) {
      toast.error("Please select prompts for all content before generating");
    } else {
      toast.info("No new content to process");
    }
    return [];
  }

  return rowsToProcess;
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));