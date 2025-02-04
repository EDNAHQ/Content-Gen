import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { TablesInsert } from "@/integrations/supabase/types";

const modelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  model_id: z.string().min(1, "Model ID is required"),
  provider: z.string().min(1, "Provider is required"),
  type: z.enum(["text", "vision", "audio"], {
    required_error: "Please select a model type",
  }),
});

type ModelFormProps = {
  onSuccess: () => void;
};

export const AddModelForm = ({ onSuccess }: ModelFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof modelSchema>>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      name: "",
      model_id: "",
      provider: "openai",
      type: "text",
    },
  });

  const onSubmit = async (values: z.infer<typeof modelSchema>) => {
    try {
      const modelData: TablesInsert<"ai_models"> = {
        name: values.name,
        model_id: values.model_id,
        provider: values.provider,
        type: values.type,
      };

      const { error } = await supabase
        .from("ai_models")
        .insert([modelData]);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Model added successfully",
      });
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error adding model:", error);
      toast({
        title: "Error",
        description: "Failed to add model",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="GPT-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model ID</FormLabel>
              <FormControl>
                <Input placeholder="gpt-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="vision">Vision</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Model</Button>
      </form>
    </Form>
  );
};