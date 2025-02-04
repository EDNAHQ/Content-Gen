import React, { useState } from "react";
import { PromptRow } from "./PromptRow";
import { PromptFilters } from "./PromptFilters";
import { Tables, TablesUpdate } from "@/integrations/supabase/types";

type Prompt = Tables<"prompts">;

interface PromptListProps {
  prompts: Prompt[];
  editingId: string | null;
  onEdit: (id: string) => void;
  onSave: (id: string, updatedData: TablesUpdate<"prompts">) => Promise<void>;
  onCancel: () => void;
  onToggleActive: (id: string, currentStatus: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function PromptList({
  prompts,
  editingId,
  onEdit,
  onSave,
  onCancel,
  onToggleActive,
  onDelete,
}: PromptListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || prompt.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <PromptFilters
        searchQuery={searchQuery}
        selectedType={selectedType}
        onSearchChange={setSearchQuery}
        onTypeChange={setSelectedType}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt) => (
          <PromptRow
            key={prompt.id}
            prompt={prompt}
            isEditing={editingId === prompt.id}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
            onToggleActive={onToggleActive}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}