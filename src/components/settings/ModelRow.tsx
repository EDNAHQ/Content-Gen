import { Tables } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

type ModelRowProps = {
  model: Tables<"ai_models">;
  onToggleActive: (id: string, currentStatus: boolean) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>;
};

export const ModelRow = ({ model, onToggleActive, onSetDefault }: ModelRowProps) => {
  return (
    <TableRow key={model.id}>
      <TableCell>
        <div>
          <div className="font-medium">{model.name}</div>
          <div className="text-sm text-gray-500">{model.model_id}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {model.provider}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className="capitalize">
          {model.type}
        </Badge>
      </TableCell>
      <TableCell>
        <Switch
          checked={model.is_active}
          onCheckedChange={() => onToggleActive(model.id, model.is_active)}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={model.is_default}
          onCheckedChange={() => onSetDefault(model.id)}
        />
      </TableCell>
    </TableRow>
  );
};