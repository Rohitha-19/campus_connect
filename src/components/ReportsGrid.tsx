import { Report } from '@/types/report';
import { ReportCard } from './ReportCard';
import { Package } from 'lucide-react';

interface ReportsGridProps {
  reports: Report[];
  onResolve: (id: string) => void;
  emptyMessage?: string;
}

export function ReportsGrid({ reports, onResolve, emptyMessage = 'No reports found' }: ReportsGridProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Package className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          When items are reported, they'll appear here. Be the first to help someone find their belongings!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {reports.map((report, index) => (
        <div
          key={report.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-fade-in"
        >
          <ReportCard report={report} onResolve={onResolve} />
        </div>
      ))}
    </div>
  );
}
