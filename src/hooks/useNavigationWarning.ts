import { useEffect } from "react";
import { PostRow } from "@/types";

export function useNavigationWarning(postRows: PostRow[]) {
  useEffect(() => {
    const hasGeneratedContent = postRows.some(row => row.generatedPost);
    
    if (hasGeneratedContent) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [postRows]);
}