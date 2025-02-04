import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentType } from "@/types/history";

interface HistoryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  contentType: ContentType | "all";
  onContentTypeChange: (value: ContentType | "all") => void;
}

export function HistoryFilters({
  searchTerm,
  onSearchChange,
  contentType,
  onContentTypeChange,
}: HistoryFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        value={contentType}
        onValueChange={(value: ContentType | "all") => onContentTypeChange(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="social_media">Social Media</SelectItem>
          <SelectItem value="email_broadcast">Email Broadcast</SelectItem>
          <SelectItem value="newsletter">Newsletter</SelectItem>
          <SelectItem value="article">Article</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}