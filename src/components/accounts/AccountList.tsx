import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccountRow } from "./AccountRow";
import { Tables } from "@/integrations/supabase/types";

type Account = Tables<"accounts">;

interface AccountListProps {
  accounts: Account[];
  editingId: string | null;
  onEdit: (id: string) => void;
  onSave: (id: string, updatedData: Partial<Account>) => Promise<void>;
  onCancel: () => void;
}

export function AccountList({
  accounts,
  editingId,
  onEdit,
  onSave,
  onCancel,
}: AccountListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Handle</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              isEditing={editingId === account.id}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}