import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertCircle, Eye, Upload, X } from 'lucide-react';
import { Report } from '@/types/report';

interface ReportFormProps {
  type: 'lost' | 'found';
  onSubmit: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => void;
}

export function ReportForm({ type, onSubmit }: ReportFormProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    personName: '',
    itemName: '',
    description: '',
    dateTime: '',
    location: '',
    contactNumber: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type,
      imageUrl: imagePreview || undefined,
    });
    setFormData({
      personName: '',
      itemName: '',
      description: '',
      dateTime: '',
      location: '',
      contactNumber: '',
    });
    setImagePreview('');
    setOpen(false);
  };

  const isLost = type === 'lost';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isLost ? 'default' : 'outline'}
          className={`flex-1 h-14 text-base font-semibold gap-2 transition-all ${
            isLost
              ? 'shadow-button hover:shadow-lg'
              : 'border-2 border-success text-success hover:bg-success hover:text-success-foreground'
          }`}
        >
          {isLost ? <AlertCircle className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          {isLost ? 'Report Lost Item' : 'Report Found Item'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {isLost ? (
              <>
                <AlertCircle className="w-5 h-5 text-warning" />
                Report a Lost Item
              </>
            ) : (
              <>
                <Eye className="w-5 h-5 text-success" />
                Report a Found Item
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="personName">
              {isLost ? 'Your Name' : 'Finder Name'}
            </Label>
            <Input
              id="personName"
              placeholder="Enter your full name"
              value={formData.personName}
              onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              placeholder="e.g., Blue Backpack, iPhone 14, Student ID Card"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Item Description</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description (color, brand, distinguishing features...)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateTime">
                {isLost ? 'Date & Time of Loss' : 'Found Date & Time'}
              </Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                {isLost ? 'Last Known Location' : 'Found Location'}
              </Label>
              <Input
                id="location"
                placeholder="e.g., Library, Cafeteria, Block A"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Your phone number"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Item Image {isLost && '(Optional)'}</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                imagePreview
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-32 rounded-md mx-auto"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview('');
                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <Button
            type="submit"
            className={`w-full h-12 text-base font-semibold ${
              isLost ? 'shadow-button' : 'bg-success hover:bg-success/90'
            }`}
          >
            Submit Report
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
