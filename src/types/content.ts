import { Json } from "@/integrations/supabase/types";
import { Database } from "@/integrations/supabase/types";

type ContentType = Database['public']['Enums']['content_type'];

export interface GenerationResult {
  content: string;
  imageUrls?: string[];
}

export interface ContentMetadata {
  promptId?: string;
  isRegeneration?: boolean;
  originalContent?: string;
  timestamp: string;
  imageCount?: number;
  hasAdditionalContext?: boolean;
  originalTextLength?: number;
  additionalContext?: string;
  contentType: ContentType;
  processingDetails?: {
    [key: string]: string | number | boolean | null;
  };
}

// Helper type to ensure metadata is JSON-compatible
export type JsonCompatibleMetadata = {
  [Key in keyof ContentMetadata]: ContentMetadata[Key] extends object
    ? Json
    : ContentMetadata[Key];
};