import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Flame, Dumbbell } from "lucide-react";

export default function DailySummary() {
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id";
  const today = new Date().toISOString().split('T')[0];

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard-stats", userId, today],
  });

  if (isLoading) {
    return (
      <section className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">خلاصه امروز</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-200 animate-pulse rounded-xl h-24"></div>
          <div className="bg-gray-200 animate-pulse rounded-xl h-24"></div>
        </div>
        <div className="bg-gray-200 animate-pulse rounded-xl h-20"></div>
      </section>
    );
  }

  const totalCalories = stats?.totalCalories || 0;
  const caloriesBurned = stats?.caloriesBurned || 0;
  const dailyGoal = stats?.dailyCalorieGoal || 2000;
  const progress = Math.min((totalCalories / dailyGoal) * 100, 100);
  const remainingCalories = Math.max(0, dailyGoal - totalCalories);
  const workoutDuration = stats?.workoutDuration || 0;

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">خلاصه امروز</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Flame className="text-primary h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-gray-600">کالری مصرفی</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-gray-900" data-testid="text-daily-calories">
              {totalCalories.toLocaleString('fa-IR')}
            </span>
            <span className="text-sm text-gray-500 mb-1">کالری</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            هدف: {dailyGoal.toLocaleString('fa-IR')} کالری
          </div>
        </Card>

        <Card className="p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Dumbbell className="text-secondary h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-gray-600">کالری سوخته</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-gray-900" data-testid="text-burned-calories">
              {Math.round(caloriesBurned).toLocaleString('fa-IR')}
            </span>
            <span className="text-sm text-gray-500 mb-1">کالری</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round(workoutDuration)} دقیقه تمرین
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">پیشرفت روزانه</span>
          <span className="text-sm text-primary font-semibold" data-testid="text-progress-percent">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-l from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-2" data-testid="text-remaining-calories">
          {remainingCalories > 0 
            ? `${remainingCalories.toLocaleString('fa-IR')} کالری تا هدف`
            : 'هدف روزانه تکمیل شد! 🎉'
          }
        </div>
      </Card>
    </section>
  );
}
