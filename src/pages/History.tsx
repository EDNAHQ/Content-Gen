import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ContentHistoryItem, ContentType } from "@/types/history";
import { HistoryFilters } from "@/components/history/HistoryFilters";
import { HistoryTable } from "@/components/history/HistoryTable";
import { HistoryDetailDialog } from "@/components/history/HistoryDetailDialog";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState<ContentType | "all">("all");
  const [selectedItem, setSelectedItem] = useState<ContentHistoryItem | null>(null);

  const { data: historyItems, isLoading } = useQuery({
    queryKey: ['content-history', searchTerm, contentType],
    queryFn: async () => {
      let query = supabase
        .from('content_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`content.ilike.%${searchTerm}%,original_content.ilike.%${searchTerm}%`);
      }

      if (contentType !== "all") {
        query = query.eq('content_type', contentType);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching history:', error);
        throw error;
      }
      
      return data as ContentHistoryItem[];
    },
    refetchInterval: 5000
  });

  return (
    <div className="container mt-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Content History</h1>
        <p className="text-muted-foreground mt-2">
          Review and search through all previously generated content
        </p>
      </div>

      <Card className="p-6">
        <HistoryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          contentType={contentType}
          onContentTypeChange={setContentType}
        />

        <HistoryTable
          isLoading={isLoading}
          historyItems={historyItems}
          onItemClick={setSelectedItem}
        />
      </Card>

      <HistoryDetailDialog
        selectedItem={selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
    </div>
  );
}