import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">ف</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">فود کالری</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-primary"
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-primary"
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
