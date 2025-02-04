import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PromptFiltersProps {
  searchQuery: string;
  selectedType: string;
  onSearchChange: (query: string) => void;
  onTypeChange: (type: string) => void;
}

export function PromptFilters({
  searchQuery,
  selectedType,
  onSearchChange,
  onTypeChange,
}: PromptFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
        <Input
          placeholder="Search prompts..."
          className="search-input pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select
        value={selectedType}
        onValueChange={onTypeChange}
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="social_media">Social Media</SelectItem>
          <SelectItem value="blog">Blog</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="article">Article</SelectItem>
          <SelectItem value="newsletter">Newsletter</SelectItem>
          <SelectItem value="general">General</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}