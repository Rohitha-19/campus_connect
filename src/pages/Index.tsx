import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ReportForm } from '@/components/ReportForm';
import { SearchFilter } from '@/components/SearchFilter';
import { ReportsGrid } from '@/components/ReportsGrid';
import { StatsBar } from '@/components/StatsBar';
import { useReports } from '@/hooks/useReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

const Index = () => {
  const { reports, addReport, markAsResolved } = useReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSubmit = (report: Parameters<typeof addReport>[0]) => {
    addReport(report);
    toast({
      title: 'Report Submitted!',
      description: `Your ${report.type} item report has been submitted successfully.`,
    });
  };

  const handleResolve = (id: string) => {
    markAsResolved(id);
    toast({
      title: 'Item Resolved!',
      description: 'The item has been marked as resolved.',
    });
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch = report.itemName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesLocation = report.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || report.status === statusFilter;
      return matchesSearch && matchesLocation && matchesStatus;
    });
  }, [reports, searchQuery, locationFilter, statusFilter]);

  const activeReports = filteredReports.filter((r) => r.status !== 'resolved');
  const resolvedReports = filteredReports.filter((r) => r.status === 'resolved');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Report Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
          <ReportForm type="lost" onSubmit={handleSubmit} />
          <ReportForm type="found" onSubmit={handleSubmit} />
        </div>

        {/* Stats */}
        <StatsBar reports={reports} />

        {/* Search & Filter */}
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Reports Tabs */}
        <Tabs defaultValue="active" className="animate-fade-in">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="active" className="gap-2">
              Active Reports
              {activeReports.length > 0 && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {activeReports.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="resolved" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Resolved
              {resolvedReports.length > 0 && (
                <span className="text-xs bg-muted-foreground/20 px-2 py-0.5 rounded-full">
                  {resolvedReports.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <ReportsGrid
              reports={activeReports}
              onResolve={handleResolve}
              emptyMessage="No active reports"
            />
          </TabsContent>

          <TabsContent value="resolved">
            <ReportsGrid
              reports={resolvedReports}
              onResolve={handleResolve}
              emptyMessage="No resolved items yet"
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>Campus Lost & Found Smart Portal</p>
          <p className="mt-1">Helping students and staff reunite with their belongings</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
