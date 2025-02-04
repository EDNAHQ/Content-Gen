export interface PostRow {
  id: string;
  isLoading: boolean;
  files?: File[];
  textContent?: string;
  contentType: 'image' | 'text';
  generatedPost?: string;
  imageUrls?: string[];
  selectedPromptId?: string;
  additionalContext?: string;
  versions?: {
    content: string;
    timestamp: string;
  }[];
  currentVersionIndex?: number;
}