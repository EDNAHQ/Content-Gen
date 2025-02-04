import React from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { AccountEditForm } from "./AccountEditForm";
import { Tables } from "@/integrations/supabase/types";

type Account = Tables<"accounts">;

interface AccountRowProps {
  account: Account;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onSave: (id: string, updatedData: Partial<Account>) => Promise<void>;
  onCancel: () => void;
}

export function AccountRow({
  account,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: AccountRowProps) {
  if (isEditing) {
    return (
      <TableRow>
        <TableCell colSpan={6}>
          <AccountEditForm
            account={account}
            onSave={onSave}
            onCancel={onCancel}
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{account.name}</TableCell>
      <TableCell>{account.platform}</TableCell>
      <TableCell>{account.handle}</TableCell>
      <TableCell className="max-w-xs truncate">{account.description}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-sm ${account.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {account.is_active ? 'Active' : 'Inactive'}
        </span>
      </TableCell>
      <TableCell>
        <Button variant="outline" onClick={() => onEdit(account.id)}>
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}