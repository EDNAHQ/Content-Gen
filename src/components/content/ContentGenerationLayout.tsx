import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ContentGenerationLayoutProps {
  title: string;
  notes: string;
  onNotesChange: (value: string) => void;
  selectedPrompt: string;
  onPromptChange: (value: string) => void;
  prompts: Array<{ id: string; name: string; is_default?: boolean }>;
  isGenerating: boolean;
  onGenerate: () => void;
  generatedContent: string;
  isLoadingPrompts?: boolean;
}

export function ContentGenerationLayout({
  title,
  notes,
  onNotesChange,
  selectedPrompt,
  onPromptChange,
  prompts,
  isGenerating,
  onGenerate,
  generatedContent,
  isLoadingPrompts = false,
}: ContentGenerationLayoutProps) {
  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Input */}
          <div className="w-full md:w-1/2">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="notes">Enter your notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    placeholder={`Enter all your notes, ideas, and content for the ${title.toLowerCase()} here...`}
                    className="min-h-[300px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select Style</Label>
                  <Select value={selectedPrompt} onValueChange={onPromptChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select a ${title.toLowerCase()} style`} />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingPrompts ? (
                        <SelectItem value="loading" disabled>
                          Loading prompts...
                        </SelectItem>
                      ) : prompts.length > 0 ? (
                        prompts.map((prompt) => (
                          <SelectItem
                            key={prompt.id || prompt.name}
                            value={prompt.id || prompt.name}
                            className="flex items-center gap-2"
                          >
                            <span>{prompt.name}</span>
                            {prompt.is_default && (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No prompts available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    `Generate ${title}`
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Output */}
          <div className="w-full md:w-1/2">
            <Card className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Generated {title}</h2>
                <div className="prose prose-purple max-w-none min-h-[300px] bg-gray-50 rounded-md p-4">
                  {generatedContent || `Generated ${title.toLowerCase()} will appear here...`}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
