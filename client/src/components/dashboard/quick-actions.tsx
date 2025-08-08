import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Dumbbell } from "lucide-react";
import FoodLoggingModal from "@/components/food/food-logging-modal";

export default function QuickActions() {
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  
  // Mock user ID - in a real app, this would come from authentication  
  const userId = "mock-user-id";

  return (
    <>
      <section className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">عملیات سریع</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-24 flex-col gap-3 bg-white shadow-sm border-gray-100 hover:shadow-md transition-shadow"
            onClick={() => setIsFoodModalOpen(true)}
            data-testid="button-quick-add-food"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-orange-500 rounded-xl flex items-center justify-center">
              <Plus className="text-white h-5 w-5" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">افزودن غذا</h3>
              <p className="text-xs text-gray-500">ثبت وعده غذایی</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex-col gap-3 bg-white shadow-sm border-gray-100 hover:shadow-md transition-shadow"
            data-testid="button-quick-add-workout"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-emerald-500 rounded-xl flex items-center justify-center">
              <Dumbbell className="text-white h-5 w-5" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">ثبت تمرین</h3>
              <p className="text-xs text-gray-500">فعالیت ورزشی</p>
            </div>
          </Button>
        </div>
      </section>

      <FoodLoggingModal 
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        userId={userId}
      />
    </>
  );
}
