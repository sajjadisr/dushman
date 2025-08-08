import { useQuery } from "@tanstack/react-query";
import MobileHeader from "@/components/layout/mobile-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Calendar } from "lucide-react";

export default function Progress() {
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id";

  const { data: weightEntries = [] } = useQuery({
    queryKey: ["/api/weight-entries", userId],
  });

  const { data: dashboardStats } = useQuery({
    queryKey: ["/api/dashboard-stats", userId, new Date().toISOString().split('T')[0]],
  });

  // Mock data for weekly progress
  const weeklyData = [
    { day: "ش", calories: 1800, burned: 300, weight: 82.5 },
    { day: "ی", calories: 1950, burned: 450, weight: 82.3 },
    { day: "د", calories: 1750, burned: 200, weight: 82.4 },
    { day: "س", calories: 2100, burned: 500, weight: 82.1 },
    { day: "چ", calories: 1900, burned: 350, weight: 82.0 },
    { day: "پ", calories: 1650, burned: 600, weight: 81.8 },
    { day: "ج", calories: dashboardStats?.totalCalories || 1400, burned: dashboardStats?.caloriesBurned || 300, weight: 81.7 },
  ];

  const currentWeight = weightEntries[0]?.weight || 82.5;
  const previousWeight = weightEntries[1]?.weight || 84.8;
  const weightChange = currentWeight - previousWeight;
  const targetWeight = 78.0;
  const weightToGo = currentWeight - targetWeight;

  const avgCalories = Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / 7);
  const avgBurned = Math.round(weeklyData.reduce((sum, day) => sum + day.burned, 0) / 7);

  return (
    <div className="pb-20">
      <MobileHeader />
      
      <main className="px-4 py-6">
        {/* Weight Progress */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">پیشرفت وزن</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <div className="text-2xl font-bold text-primary">{currentWeight}</div>
              <div className="text-sm text-gray-500">وزن فعلی</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{targetWeight}</div>
              <div className="text-sm text-gray-500">وزن هدف</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">{weightToGo.toFixed(1)}</div>
              <div className="text-sm text-gray-500">باقی‌مانده</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            {weightChange < 0 ? (
              <TrendingDown className="h-4 w-4 text-secondary" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-500" />
            )}
            <span className={`font-medium ${weightChange < 0 ? 'text-secondary' : 'text-red-500'}`}>
              {Math.abs(weightChange).toFixed(1)} کیلو {weightChange < 0 ? 'کاهش' : 'افزایش'}
            </span>
            <span className="text-sm text-gray-500">از هفته گذشته</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-l from-primary to-secondary h-2 rounded-full"
              style={{ width: `${Math.max(0, Math.min(100, ((84.8 - currentWeight) / (84.8 - targetWeight)) * 100))}%` }}
            />
          </div>
        </Card>

        {/* Weekly Overview */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">خلاصه هفتگی</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{avgCalories}</div>
              <div className="text-sm text-gray-500">میانگین کالری</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-secondary">{avgBurned}</div>
              <div className="text-sm text-gray-500">میانگین سوخته</div>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-2">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center gap-3">
                <div className="w-6 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 relative">
                  <div className="flex gap-1 h-6">
                    <div 
                      className="bg-primary/60 rounded-r"
                      style={{ width: `${(day.calories / 2500) * 100}%`, minWidth: '4px' }}
                    />
                    <div 
                      className="bg-secondary/60 rounded-l"
                      style={{ width: `${(day.burned / 2500) * 100}%`, minWidth: '2px' }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 w-12 text-left">
                  {day.weight} کg
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-primary/60 rounded"></div>
              <span>کالری مصرفی</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-secondary/60 rounded"></div>
              <span>کالری سوخته</span>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">دستاوردهای اخیر</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-secondary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">هدف هفتگی</div>
                <div className="text-sm text-gray-600">2.3 کیلو کاهش وزن</div>
              </div>
              <Badge variant="secondary">تکمیل شده</Badge>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="font-medium">هدف کالری</div>
                <div className="text-sm text-gray-600">5 روز متوالی در محدوده</div>
              </div>
              <Badge variant="outline">در حال انجام</Badge>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full" data-testid="button-add-weight">
            ثبت وزن جدید
          </Button>
          <Button variant="outline" className="w-full" data-testid="button-view-history">
            مشاهده تاریخچه کامل
          </Button>
        </div>
      </main>
    </div>
  );
}
