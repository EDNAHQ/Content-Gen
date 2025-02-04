import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CreatePromptForm } from "@/components/CreatePromptForm";
import { PromptList } from "@/components/PromptList";
import { usePrompts } from "@/hooks/usePrompts";

export default function Prompts() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const {
    prompts,
    isLoading,
    isError,
    error,
    handleSave,
    handleCreate,
    handleToggleActive,
    handleDelete,
  } = usePrompts();

  if (isLoading) {
    return (
      <div className="container mt-24">
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mt-24">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Error loading prompts: {(error as Error)?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Manage Prompts</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage prompts for content generation
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <CreatePromptForm onSubmit={handleCreate} />
      </div>

      {prompts && prompts.length > 0 ? (
        <PromptList
          prompts={prompts}
          editingId={editingId}
          onEdit={setEditingId}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
          onToggleActive={handleToggleActive}
          onDelete={handleDelete}
        />
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">No prompts found. Create one above to get started.</p>
        </div>
      )}
    </div>
  );
}