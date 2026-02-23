import { Report } from '@/types/report';
import { AlertCircle, Eye, CheckCircle2, Package } from 'lucide-react';

interface StatsBarProps {
  reports: Report[];
}

export function StatsBar({ reports }: StatsBarProps) {
  const stats = {
    total: reports.length,
    lost: reports.filter((r) => r.status === 'lost').length,
    found: reports.filter((r) => r.status === 'found').length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
  };

  const items = [
    { label: 'Total Reports', value: stats.total, icon: Package, color: 'text-primary' },
    { label: 'Lost Items', value: stats.lost, icon: AlertCircle, color: 'text-warning' },
    { label: 'Found Items', value: stats.found, icon: Eye, color: 'text-success' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle2, color: 'text-muted-foreground' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-slide-up">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-card rounded-xl shadow-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-all"
        >
          <div className={`p-2.5 rounded-lg bg-muted ${item.color}`}>
            <item.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
