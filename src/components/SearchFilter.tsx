import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locationFilter: string;
  onLocationChange: (location: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  locationFilter,
  onLocationChange,
  statusFilter,
  onStatusChange,
}: SearchFilterProps) {
  const hasFilters = searchQuery || locationFilter || statusFilter !== 'all';

  const clearFilters = () => {
    onSearchChange('');
    onLocationChange('');
    onStatusChange('all');
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-4 space-y-4 animate-slide-up">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Search & Filter</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by item name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <Input
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
        />

        <div className="flex gap-2">
          {['all', 'lost', 'found', 'resolved'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(status)}
              className={`flex-1 capitalize ${
                statusFilter === status
                  ? 'shadow-button'
                  : 'hover:bg-secondary'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
