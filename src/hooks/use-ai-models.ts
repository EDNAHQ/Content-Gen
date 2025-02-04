import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type AIModel = Tables<"ai_models">;

interface SetDefaultModelParams {
  model_id: string;
}

export const useAIModels = () => {
  const { toast } = useToast();

  const { data: models, refetch } = useQuery({
    queryKey: ["ai-models"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_models")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as AIModel[];
    },
  });

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("ai_models")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Model status updated successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error updating model status:", error);
      toast({
        title: "Error",
        description: "Failed to update model status",
        variant: "destructive",
      });
    }
  };

  const handleSetDefault = async (modelId: string) => {
    try {
      const { error } = await supabase.rpc('set_default_model', {
        model_id: modelId,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Default model updated successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error setting default model:", error);
      toast({
        title: "Error",
        description: "Failed to set default model",
        variant: "destructive",
      });
    }
  };

  return {
    models,
    handleToggleActive,
    handleSetDefault,
  };
};