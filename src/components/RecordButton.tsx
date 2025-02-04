import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";

interface RecordButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function RecordButton({ 
  isRecording, 
  isProcessing, 
  onStartRecording, 
  onStopRecording 
}: RecordButtonProps) {
  if (isProcessing) {
    return (
      <Button 
        size="icon" 
        className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700" 
        disabled
      >
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </Button>
    );
  }

  if (isRecording) {
    return (
      <Button 
        size="icon"
        className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600"
        onClick={onStopRecording}
      >
        <Square className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Button 
      size="icon"
      className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700"
      onClick={onStartRecording}
    >
      <Mic className="h-6 w-6 text-white" />
    </Button>
  );
}