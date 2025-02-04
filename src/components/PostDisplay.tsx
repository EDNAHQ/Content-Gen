import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageUploadSection } from "@/components/ImageUploadSection";

interface PostDisplayProps {
  post: string;
  images: string[];
  originalText?: string;
  additionalContext?: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
  versions?: { content: string; timestamp: string; }[];
  currentVersionIndex?: number;
  onVersionChange?: (index: number) => void;
  onImagesAdd?: (files: File[]) => void;
}

export function PostDisplay({ 
  post, 
  images, 
  originalText, 
  additionalContext,
  onRegenerate,
  isRegenerating,
  versions = [],
  currentVersionIndex = 0,
  onVersionChange,
  onImagesAdd
}: PostDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = () => {
    const cleanText = post
      .replace(/[#*_~`]/g, '')
      .trim();
    
    navigator.clipboard.writeText(cleanText);
    toast.success("Copied to clipboard!");
  };

  const displayText = post
    .replace(/[#*_~`]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const hasMultipleVersions = versions.length > 1;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="rounded-lg w-full h-32 object-cover"
              />
            ))}
          </div>
        )}
        
        {onImagesAdd && (
          <ImageUploadSection
            isLoading={false}
            onImageSelect={onImagesAdd}
            label="Add supporting images"
          />
        )}
        
        {(originalText || additionalContext) && (
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            {originalText && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Original Text:</h4>
                <p className="text-sm text-gray-600">{originalText}</p>
              </div>
            )}
            {additionalContext && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Additional Context:</h4>
                <p className="text-sm text-gray-600">{additionalContext}</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-gray-700">Generated Post:</h4>
              {hasMultipleVersions && (
                <span className="text-sm text-gray-500">
                  Version {currentVersionIndex + 1} of {versions.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasMultipleVersions && onVersionChange && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onVersionChange(currentVersionIndex - 1)}
                    disabled={currentVersionIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onVersionChange(currentVersionIndex + 1)}
                    disabled={currentVersionIndex === versions.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {onRegenerate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRegenerate}
                  disabled={isRegenerating}
                  className="flex items-center gap-1"
                >
                  <RotateCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                  {isRegenerating ? 'Regenerating...' : 'Generate Alternative'}
                </Button>
              )}
            </div>
          </div>
          <div className={`relative ${!isExpanded ? 'max-h-48' : ''} overflow-hidden`}>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-left pb-12">
              {displayText}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show More
                </>
              )}
            </Button>
            <Button 
              size="sm"
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}