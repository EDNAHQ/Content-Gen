import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { AccountList } from "@/components/accounts/AccountList";
import { CreateAccountForm } from "@/components/accounts/CreateAccountForm";
import { Tables } from "@/integrations/supabase/types";

type Account = Tables<"accounts">;

export default function Accounts() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: accounts, refetch, isError, error, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      console.log("Fetching accounts...");
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching accounts:", error);
        throw error;
      }
      
      console.log("Fetched accounts:", data);
      return data;
    },
  });

  const handleSave = async (id: string, updatedData: Partial<Account>) => {
    try {
      console.log("Saving account:", id, updatedData);
      const { error } = await supabase
        .from("accounts")
        .update(updatedData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account updated successfully",
      });
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error("Error updating account:", error);
      toast({
        title: "Error",
        description: "Failed to update account",
        variant: "destructive",
      });
    }
  };

  const handleCreate = async (accountData: Omit<Account, "id" | "created_at" | "updated_at">) => {
    try {
      console.log("Creating account:", accountData);
      const { error } = await supabase.from("accounts").insert([accountData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account created successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    }
  };

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
          <p>Error loading accounts: {(error as Error)?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Manage Accounts</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage social media accounts
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <CreateAccountForm onSubmit={handleCreate} />
      </div>

      {accounts && accounts.length > 0 ? (
        <AccountList
          accounts={accounts}
          editingId={editingId}
          onEdit={setEditingId}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">No accounts found. Create one above to get started.</p>
        </div>
      )}
    </div>
  );
}