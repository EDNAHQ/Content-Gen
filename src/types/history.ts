import { Database } from "@/integrations/supabase/types";

export type ContentType = Database['public']['Enums']['content_type'];

export interface ContentHistoryItem {
  id: string;
  content_type: ContentType;
  content: string;
  original_content: string | null;
  metadata: any;
  created_at: string;
}