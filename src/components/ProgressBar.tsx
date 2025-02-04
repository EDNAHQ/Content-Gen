import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  isAnalyzing: boolean;
  currentProgress: number;
}

export function ProgressBar({ isAnalyzing, currentProgress }: ProgressBarProps) {
  if (!isAnalyzing) return null;

  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Creating content...</span>
        <span>{Math.round(currentProgress)}%</span>
      </div>
      <Progress value={currentProgress} className="w-full" />
    </div>
  );
}