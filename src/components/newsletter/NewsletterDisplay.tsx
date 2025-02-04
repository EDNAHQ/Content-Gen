import { Card } from "@/components/ui/card";
import { PostDisplay } from "@/components/PostDisplay";

interface NewsletterDisplayProps {
  content: string;
}

export function NewsletterDisplay({ content }: NewsletterDisplayProps) {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Generated Newsletter</h2>
      </div>
      {content ? (
        <div>
          <PostDisplay post={content} images={[]} />
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            Generated newsletter will appear here...
          </div>
        </div>
      )}
    </Card>
  );
}