import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function ProgressCharts() {
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id";

  const { data: weightEntries = [] } = useQuery({
    queryKey: ["/api/weight-entries", userId],
  });

  // Mock weekly weight data for chart visualization
  const weeklyWeights = [
    { day: "ش", weight: 84.8 },
    { day: "ی", weight: 84.5 },
    { day: "د", weight: 84.2 },
    { day: "س", weight: 83.9 },
    { day: "چ", weight: 83.6 },
    { day: "پ", weight: 83.3 },
    { day: "ج", weight: weightEntries[0]?.weight || 82.5 },
  ];

  const currentWeight = weightEntries[0]?.weight || 82.5;
  const previousWeight = weightEntries[1]?.weight || 84.8;
  const weightChange = currentWeight - previousWeight;
  const targetWeight = 78.0;

  const minWeight = Math.min(...weeklyWeights.map(d => d.weight));
  const maxWeight = Math.max(...weeklyWeights.map(d => d.weight));
  const weightRange = maxWeight - minWeight;

  return (
    <section className="px-4 pb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">پیشرفت هفتگی</h2>
      <Card className="p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">روند وزن</h3>
          <Select defaultValue="7days">
            <SelectTrigger className="w-32" data-testid="select-chart-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 روز اخیر</SelectItem>
              <SelectItem value="30days">30 روز اخیر</SelectItem>
              <SelectItem value="3months">3 ماه اخیر</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Simple Chart Representation */}
        <div className="relative h-32 bg-gray-50 rounded-lg p-4 mb-4">
          <div className="absolute top-2 right-4 text-xs text-gray-500" data-testid="text-current-weight">
            {currentWeight} کیلو
          </div>
          <div className="absolute bottom-1 right-4 text-xs text-gray-400">امروز</div>
          
          {/* Chart bars */}
          <div className="flex items-end justify-between h-full px-4 pt-6 pb-4">
            {weeklyWeights.map((data, index) => {
              const height = weightRange > 0 
                ? Math.max(8, ((data.weight - minWeight) / weightRange) * 60)
                : 30;
              
              return (
                <div key={data.day} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-4 bg-primary rounded-full transition-all ${
                      index === weeklyWeights.length - 1 ? '' : 'opacity-80'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-xs text-gray-400">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1">
              {weightChange < 0 ? (
                <TrendingDown className="h-4 w-4 text-secondary" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-500" />
              )}
              <div className={`text-lg font-bold ${
                weightChange < 0 ? 'text-secondary' : 'text-red-500'
              }`} data-testid="text-weight-change">
                {Math.abs(weightChange).toFixed(1)}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              کیلو {weightChange < 0 ? 'کاهش' : 'افزایش'}
            </div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-primary" data-testid="text-current-weight-summary">
              {currentWeight}
            </div>
            <div className="text-xs text-gray-500">وزن فعلی</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-accent" data-testid="text-target-weight">
              {targetWeight}
            </div>
            <div className="text-xs text-gray-500">وزن هدف</div>
          </div>
        </div>
      </Card>
    </section>
  );
}
