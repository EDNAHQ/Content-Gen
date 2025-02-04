import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContentHistoryItem } from "@/types/history";

interface HistoryTableProps {
  isLoading: boolean;
  historyItems: ContentHistoryItem[] | null;
  onItemClick: (item: ContentHistoryItem) => void;
}

export function HistoryTable({ isLoading, historyItems, onItemClick }: HistoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Original</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                Loading...
              </TableCell>
            </TableRow>
          ) : !historyItems || historyItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No content history found
              </TableCell>
            </TableRow>
          ) : (
            historyItems.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onItemClick(item)}
              >
                <TableCell className="font-medium capitalize">
                  {item.content_type.replace('_', ' ')}
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{item.content}</div>
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{item.original_content || '-'}</div>
                </TableCell>
                <TableCell>
                  {format(new Date(item.created_at), 'MMM d, yyyy HH:mm')}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}