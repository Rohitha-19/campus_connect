import { Search, MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="gradient-hero text-primary-foreground">
      <div className="container py-8 md:py-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Campus Lost & Found
            </h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">
              Smart Portal
            </p>
          </div>
        </div>
        <p className="text-primary-foreground/90 max-w-xl text-base md:text-lg">
          Lost something on campus? Found an item? Report it here and help reunite 
          items with their owners. Together, we make our campus community stronger.
        </p>
        <div className="flex items-center gap-2 mt-4 text-primary-foreground/70 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Serving the entire campus community</span>
        </div>
      </div>
    </header>
  );
}
