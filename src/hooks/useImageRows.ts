import { useLocalStoragePersistence } from "./useLocalStoragePersistence";
import { useContentManagement } from "./useContentManagement";
import { useNavigationWarning } from "./useNavigationWarning";
import { toast } from "sonner";
import { PostRow } from "@/types";

export function useImageRows() {
  const { postRows, setPostRows } = useLocalStoragePersistence();
  const { 
    isGenerating: isAnalyzing, 
    currentProgress, 
    generateContent: handleAnalyzeImages,
    handleRegenerate 
  } = useContentManagement(postRows, setPostRows);
  
  useNavigationWarning(postRows);

  const handleImageSelect = (files: File[], rowId: string) => {
    setPostRows(prevRows => 
      prevRows.map(row => 
        row.id === rowId 
          ? { ...row, files }
          : row
      )
    );
  };

  const handlePromptSelect = (promptId: string, rowId: string) => {
    setPostRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId
          ? { ...row, selectedPromptId: promptId }
          : row
      )
    );
  };

  const handleContextChange = (context: string, rowId: string) => {
    setPostRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId
          ? { ...row, additionalContext: context }
          : row
      )
    );
  };

  const handleTextContentChange = (text: string, rowId: string) => {
    setPostRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId
          ? { ...row, textContent: text }
          : row
      )
    );
  };

  const handleContentTypeChange = (type: 'image' | 'text', rowId: string) => {
    setPostRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId
          ? { ...row, contentType: type, files: undefined, textContent: undefined }
          : row
      )
    );
  };

  const handleVersionChange = (index: number, rowId: string) => {
    setPostRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId
          ? { ...row, currentVersionIndex: index }
          : row
      )
    );
  };

  const addMoreRows = () => {
    const currentLength = postRows.length;
    const newRows = Array.from({ length: 5 }, (_, index) => ({
      id: (currentLength + index + 1).toString(),
      isLoading: false,
      contentType: 'image' as const
    }));
    setPostRows(prevRows => [...prevRows, ...newRows]);
  };

  const handleReset = () => {
    localStorage.removeItem('imagePostsData');
    setPostRows([
      { id: '1', isLoading: false, contentType: 'image' },
      { id: '2', isLoading: false, contentType: 'image' },
      { id: '3', isLoading: false, contentType: 'image' },
      { id: '4', isLoading: false, contentType: 'image' },
      { id: '5', isLoading: false, contentType: 'image' },
    ]);
    toast.success("All content has been cleared!");
  };

  const generatedPosts = postRows
    .filter(row => row.generatedPost)
    .map(row => ({
      post: row.generatedPost!,
      imageUrl: row.imageUrls || []
    }));

  return {
    postRows,
    isAnalyzing,
    currentProgress,
    handleImageSelect,
    handlePromptSelect,
    handleContextChange,
    handleTextContentChange,
    handleContentTypeChange,
    handleAnalyzeImages,
    handleRegenerate,
    handleVersionChange,
    addMoreRows,
    handleReset,
    generatedPosts
  };
}