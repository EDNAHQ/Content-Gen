import React from "react";
import { PromptEditForm } from "@/components/PromptEditForm";
import { DeletePromptDialog } from "@/components/DeletePromptDialog";
import { Tables, TablesUpdate } from "@/integrations/supabase/types";

type Prompt = Tables<"prompts">;

interface PromptRowProps {
  prompt: Prompt;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onSave: (id: string, updatedData: TablesUpdate<"prompts">) => Promise<void>;
  onCancel: () => void;
  onToggleActive: (id: string, currentStatus: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function PromptRow({
  prompt,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onToggleActive,
  onDelete,
}: PromptRowProps) {
  if (isEditing) {
    return (
      <div className="prompt-card-secondary">
        <PromptEditForm
          prompt={prompt}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    );
  }

  return (
    <div className="prompt-card">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">{prompt.name}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleActive(prompt.id, prompt.is_active || false)}
              className={`px-3 py-1 rounded-full text-sm ${
                prompt.is_active
                  ? "bg-green-400/20 text-green-100"
                  : "bg-gray-400/20 text-gray-100"
              }`}
            >
              {prompt.is_active ? "Active" : "Inactive"}
            </button>
            <button
              onClick={() => onEdit(prompt.id)}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-sm"
            >
              Edit
            </button>
            <DeletePromptDialog onDelete={() => onDelete(prompt.id)} />
          </div>
        </div>
        
        <p className="text-sm opacity-90 mb-2">{prompt.description}</p>
        <div className="mt-auto">
          <div className="text-xs opacity-75">Type: {prompt.type}</div>
        </div>
      </div>
    </div>
  );
}