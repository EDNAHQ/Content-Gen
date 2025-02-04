export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          brand_voice: string | null
          content_guidelines: string | null
          created_at: string
          description: string | null
          handle: string
          hashtag_groups: string[] | null
          id: string
          is_active: boolean | null
          key_topics: string[] | null
          name: string
          notes: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          posting_schedule: Json | null
          target_audience: string | null
          updated_at: string
        }
        Insert: {
          brand_voice?: string | null
          content_guidelines?: string | null
          created_at?: string
          description?: string | null
          handle: string
          hashtag_groups?: string[] | null
          id?: string
          is_active?: boolean | null
          key_topics?: string[] | null
          name: string
          notes?: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          posting_schedule?: Json | null
          target_audience?: string | null
          updated_at?: string
        }
        Update: {
          brand_voice?: string | null
          content_guidelines?: string | null
          created_at?: string
          description?: string | null
          handle?: string
          hashtag_groups?: string[] | null
          id?: string
          is_active?: boolean | null
          key_topics?: string[] | null
          name?: string
          notes?: string | null
          platform?: Database["public"]["Enums"]["platform_type"]
          posting_schedule?: Json | null
          target_audience?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ai_models: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          model_id: string
          name: string
          provider: string
          type: Database["public"]["Enums"]["model_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          model_id: string
          name: string
          provider?: string
          type: Database["public"]["Enums"]["model_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          model_id?: string
          name?: string
          provider?: string
          type?: Database["public"]["Enums"]["model_type"]
          updated_at?: string
        }
        Relationships: []
      }
      content_history: {
        Row: {
          content: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          id: string
          metadata: Json | null
          original_content: string | null
          updated_at: string
        }
        Insert: {
          content: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          id?: string
          metadata?: Json | null
          original_content?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          id?: string
          metadata?: Json | null
          original_content?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      post_images: {
        Row: {
          created_at: string
          id: string
          image_path: string
          image_url: string
          post_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_path: string
          image_url: string
          post_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_path?: string
          image_url?: string
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_media_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      prompts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          prompt_text: string
          type: Database["public"]["Enums"]["prompt_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          prompt_text: string
          type?: Database["public"]["Enums"]["prompt_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          prompt_text?: string
          type?: Database["public"]["Enums"]["prompt_type"]
          updated_at?: string
        }
        Relationships: []
      }
      social_media_posts: {
        Row: {
          created_at: string
          generated_content: string
          id: string
          image_path: string
          image_url: string
        }
        Insert: {
          created_at?: string
          generated_content: string
          id?: string
          image_path: string
          image_url: string
        }
        Update: {
          created_at?: string
          generated_content?: string
          id?: string
          image_path?: string
          image_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_type:
        | "social_media"
        | "email_broadcast"
        | "newsletter"
        | "article"
      model_type: "text" | "vision" | "audio"
      platform_type:
        | "instagram"
        | "facebook"
        | "twitter"
        | "linkedin"
        | "tiktok"
      prompt_type:
        | "social_media"
        | "blog"
        | "email"
        | "general"
        | "email_broadcast"
        | "newsletter"
        | "article"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
