import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { getAllDefaultPrompts } from "@/config/defaultPrompts";

export function usePrompts() {
  const { toast } = useToast();
  const defaultPrompts = getAllDefaultPrompts();

  const { data: dbPrompts, refetch, isError, error, isLoading } = useQuery({
    queryKey: ["prompts"],
    queryFn: async () => {
      console.log("Fetching prompts...");
      
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching prompts:", error);
        throw error;
      }
      
      console.log("Fetched prompts:", data);
      return data;
    },
  });

  // Combine database prompts with default prompts
  const prompts = [
    ...(dbPrompts || []),
    ...defaultPrompts.map(p => ({
      ...p,
      is_default: true,
      id: p.name, // Use name as ID for default prompts
      created_at: new Date().toISOString(),
    }))
  ];

  const handleSave = async (id: string, updatedData: TablesUpdate<"prompts">) => {
    // Don't allow editing default prompts
    if (defaultPrompts.some(p => p.name === id)) {
      toast({
        title: "Error",
        description: "Default prompts cannot be edited",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Saving prompt:", id, updatedData);
      const { error } = await supabase
        .from("prompts")
        .update(updatedData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt updated successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error updating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to update prompt",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleCreate = async (data: TablesInsert<"prompts">) => {
    try {
      const { error } = await supabase.from("prompts").insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt created successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to create prompt",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    // Don't allow toggling default prompts
    if (defaultPrompts.some(p => p.name === id)) {
      toast({
        title: "Error",
        description: "Default prompts cannot be modified",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("prompts")
        .update({ is_active: isActive })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Prompt ${isActive ? "activated" : "deactivated"} successfully`,
      });
      refetch();
    } catch (error) {
      console.error("Error toggling prompt:", error);
      toast({
        title: "Error",
        description: "Failed to update prompt",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    // Don't allow deleting default prompts
    if (defaultPrompts.some(p => p.name === id)) {
      toast({
        title: "Error",
        description: "Default prompts cannot be deleted",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("prompts").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt deleted successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting prompt:", error);
      toast({
        title: "Error",
        description: "Failed to delete prompt",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    prompts,
    isLoading,
    isError,
    error,
    handleSave,
    handleCreate,
    handleToggleActive,
    handleDelete,
  };
}