import { Button } from "@/components/ui/button";
import { Plus, Download, RotateCcw } from "lucide-react";
import { downloadCSV } from "@/lib/csvExport";
import { toast } from "sonner";

interface ActionButtonsProps {
  onAnalyze: () => void;
  onAddMore: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  hasFiles: boolean;
  generatedPosts?: Array<{ post: string; imageUrl: string | string[] }>;
}

export function ActionButtons({ 
  onAnalyze, 
  onAddMore, 
  onReset,
  isAnalyzing, 
  hasFiles,
  generatedPosts 
}: ActionButtonsProps) {
  const handleDownload = () => {
    if (generatedPosts && generatedPosts.length > 0) {
      downloadCSV(generatedPosts);
    }
  };

  const handleReset = () => {
    onReset();
    toast.success("All images have been cleared!");
  };

  return (
    <div className="flex justify-center gap-2 mt-4 mb-16">
      <Button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="h-8 px-3 text-sm"
      >
        {isAnalyzing ? "Creating..." : "Create Content"}
      </Button>
      <Button
        variant="outline"
        onClick={onAddMore}
        className="flex items-center gap-1 h-8 px-3 text-sm"
      >
        <Plus className="h-3 w-3" />
        Create More
      </Button>
      {generatedPosts && generatedPosts.length > 0 && (
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex items-center gap-1 h-8 px-3 text-sm"
        >
          <Download className="h-3 w-3" />
          Download
        </Button>
      )}
      <Button
        variant="outline"
        onClick={handleReset}
        className="flex items-center gap-1 h-8 px-3 text-sm"
        disabled={isAnalyzing}
      >
        <RotateCcw className="h-3 w-3" />
        Reset
      </Button>
    </div>
  );
}