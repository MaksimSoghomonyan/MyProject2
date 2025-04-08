import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductFiltersProps {
  selectedFilter: 'all' | 'favorites';
  onFilterChange: (filter: 'all' | 'favorites') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductFilters({
  selectedFilter,
  onFilterChange,
  searchQuery,
  onSearchChange
}: ProductFiltersProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex gap-2">
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          onClick={() => onFilterChange('all')}
        >
          All Products
        </Button>
        <Button
          variant={selectedFilter === 'favorites' ? 'default' : 'outline'}
          onClick={() => onFilterChange('favorites')}
        >
          Favorites
        </Button>
      </div>

      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search products..."
          className="pl-8"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}
