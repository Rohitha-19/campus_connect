export type ReportStatus = 'lost' | 'found' | 'resolved';

export interface Report {
  id: string;
  type: 'lost' | 'found';
  status: ReportStatus;
  personName: string;
  itemName: string;
  description: string;
  dateTime: string;
  location: string;
  contactNumber: string;
  imageUrl?: string;
  createdAt: string;
}
