import { Report } from '@/types/report';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Phone, CheckCircle2, Package } from 'lucide-react';
import { format } from 'date-fns';

interface ReportCardProps {
  report: Report;
  onResolve: (id: string) => void;
}

export function ReportCard({ report, onResolve }: ReportCardProps) {
  const statusConfig = {
    lost: { label: 'Lost', class: 'status-lost' },
    found: { label: 'Found', class: 'status-found' },
    resolved: { label: 'Resolved', class: 'status-resolved' },
  };

  const status = statusConfig[report.status];
  const formattedDate = report.dateTime
    ? format(new Date(report.dateTime), 'MMM d, yyyy • h:mm a')
    : 'Date not specified';

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group">
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {report.imageUrl ? (
          <img
            src={report.imageUrl}
            alt={report.itemName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
            <Package className="w-16 h-16 text-muted-foreground/40" />
          </div>
        )}
        <Badge className={`absolute top-3 right-3 ${status.class} font-semibold`}>
          {status.label}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground line-clamp-1">
            {report.itemName}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {report.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{report.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
          <a
            href={`tel:${report.contactNumber}`}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Phone className="w-4 h-4" />
            Contact
          </a>

          {report.status !== 'resolved' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onResolve(report.id)}
              className="text-success border-success/30 hover:bg-success hover:text-success-foreground"
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Mark Resolved
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
