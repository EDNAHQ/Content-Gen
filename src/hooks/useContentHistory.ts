import { supabase } from "@/integrations/supabase/client";
import { ContentMetadata, JsonCompatibleMetadata } from "@/types/content";
import { Database } from "@/integrations/supabase/types";
import { Json } from "@/integrations/supabase/types";

type ContentType = Database['public']['Enums']['content_type'];

interface ContentHistoryEntry {
  content: string;
  originalContent: string | null;
  metadata: ContentMetadata;
}

export function useContentHistory() {
  const saveToHistory = async ({
    content,
    originalContent,
    metadata
  }: ContentHistoryEntry) => {
    try {
      // Convert metadata to a JSON-compatible format
      const jsonMetadata: JsonCompatibleMetadata = {
        ...metadata,
        processingDetails: metadata.processingDetails ? JSON.parse(JSON.stringify(metadata.processingDetails)) : null
      };

      const { error } = await supabase
        .from('content_history')
        .insert({
          content,
          content_type: metadata.contentType,
          original_content: originalContent,
          metadata: jsonMetadata as Json
        });

      if (error) throw error;
      console.log('Content saved to history successfully');
    } catch (error) {
      console.error('Error saving to history:', error);
      throw error;
    }
  };

  return { saveToHistory };
}