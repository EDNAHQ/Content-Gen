import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModelRow } from "./ModelRow";
import { useAIModels } from "@/hooks/use-ai-models";

export const ModelList = () => {
  const { models, handleToggleActive, handleSetDefault } = useAIModels();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Default</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models?.map((model) => (
          <ModelRow
            key={model.id}
            model={model}
            onToggleActive={handleToggleActive}
            onSetDefault={handleSetDefault}
          />
        ))}
      </TableBody>
    </Table>
  );
};