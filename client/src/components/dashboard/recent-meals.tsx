import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RecentMeals() {
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id";
  const today = new Date().toISOString().split('T')[0];

  const { data: foodEntries = [], isLoading } = useQuery({
    queryKey: ["/api/food-entries", userId, today],
  });

  if (isLoading) {
    return (
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">وعده‌های اخیر</h2>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-20"></div>
          ))}
        </div>
      </section>
    );
  }

  const recentMeals = foodEntries.slice(0, 3);

  return (
    <section className="px-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">وعده‌های اخیر</h2>
        <Link href="/food">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary/80"
            data-testid="button-view-all-meals"
          >
            مشاهده همه
          </Button>
        </Link>
      </div>
      
      {recentMeals.length > 0 ? (
        <div className="space-y-3">
          {recentMeals.map((entry: any) => (
            <Card key={entry.id} className="p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{getMealIcon(entry.food?.name)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900" data-testid={`meal-name-${entry.id}`}>
                        {entry.food?.name || 'نامشخص'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {entry.servings} × {entry.food?.servingSize || 'سرو'}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {entry.mealType}
                      </Badge>
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-bold text-gray-900" data-testid={`meal-calories-${entry.id}`}>
                        {Math.round((entry.food?.caloriesPerServing || 0) * entry.servings)}
                      </span>
                      <span className="text-sm text-gray-500 block">کالری</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center text-gray-500">
          <div className="text-4xl mb-2">🍽️</div>
          <p>هنوز وعده‌ای ثبت نشده</p>
          <p className="text-sm mt-1">از دکمه بالا برای اضافه کردن غذا استفاده کنید</p>
        </Card>
      )}
    </section>
  );
}

function getMealIcon(foodName?: string): string {
  if (!foodName) return "🍽️";
  
  const name = foodName.toLowerCase();
  if (name.includes("برنج") || name.includes("پلو")) return "🍚";
  if (name.includes("کباب")) return "🥩";
  if (name.includes("قورمه") || name.includes("خورش")) return "🍲";
  if (name.includes("کوکو")) return "🥘";
  if (name.includes("آش")) return "🍜";
  
  return "🍽️";
}
