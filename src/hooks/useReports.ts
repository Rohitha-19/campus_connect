import { useState, useEffect } from 'react';
import { Report } from '@/types/report';

const STORAGE_KEY = 'campus-lost-found-reports';

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setReports(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (newReports: Report[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newReports));
    setReports(newReports);
  };

  const addReport = (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
    const newReport: Report = {
      ...report,
      id: crypto.randomUUID(),
      status: report.type,
      createdAt: new Date().toISOString(),
    };
    saveToStorage([newReport, ...reports]);
  };

  const markAsResolved = (id: string) => {
    const updated = reports.map((r) =>
      r.id === id ? { ...r, status: 'resolved' as const } : r
    );
    saveToStorage(updated);
  };

  const deleteReport = (id: string) => {
    saveToStorage(reports.filter((r) => r.id !== id));
  };

  return { reports, addReport, markAsResolved, deleteReport };
}
