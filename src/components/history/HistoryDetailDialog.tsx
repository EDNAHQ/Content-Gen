import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Copy } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ContentHistoryItem } from "@/types/history";

interface HistoryDetailDialogProps {
  selectedItem: ContentHistoryItem | null;
  onOpenChange: (open: boolean) => void;
}

export function HistoryDetailDialog({ selectedItem, onOpenChange }: HistoryDetailDialogProps) {
  const copyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Content copied to clipboard!");
  };

  const renderMetadata = (metadata: any) => {
    if (!metadata) return null;
    return (
      <div className="space-y-2">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="text-sm">
            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
            <span className="text-muted-foreground">
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AlertDialog open={!!selectedItem} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="capitalize">{selectedItem?.content_type.replace('_', ' ')} Content</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-6">
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-foreground">Generated Content</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => selectedItem && copyContent(selectedItem.content)}
                    className="h-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-1 text-sm whitespace-pre-wrap">{selectedItem?.content}</p>
              </div>
              
              {selectedItem?.original_content && (
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">Original Content</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => selectedItem && copyContent(selectedItem.original_content)}
                      className="h-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-1 text-sm whitespace-pre-wrap">{selectedItem.original_content}</p>
                </div>
              )}
              
              <div className="bg-accent/30 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-foreground mb-2">Metadata</h4>
                <div className="mt-1">
                  {selectedItem?.metadata && renderMetadata(selectedItem.metadata)}
                </div>
              </div>
              
              <div className="bg-accent/20 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-foreground mb-2">Created At</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedItem?.created_at && format(new Date(selectedItem.created_at), 'MMMM d, yyyy HH:mm:ss')}
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}