import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

interface WorkoutProgressChartProps {
  userId: string;
}

export default function WorkoutProgressChart({ userId }: WorkoutProgressChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  const { data: workoutSets = [] } = useQuery({
    queryKey: ["/api/workout-sets", userId],
  });

  // Group workout data by exercise and date for progress tracking
  const processWorkoutData = () => {
    const exerciseProgress: Record<string, any[]> = {};
    
    workoutSets.forEach((set: any) => {
      const exerciseName = set.exercise?.name || 'نامشخص';
      const date = new Date(set.completedAt).toLocaleDateString('fa-IR');
      
      if (!exerciseProgress[exerciseName]) {
        exerciseProgress[exerciseName] = [];
      }
      
      // Calculate max weight or total volume for this exercise on this date
      const existingEntry = exerciseProgress[exerciseName].find(entry => entry.date === date);
      if (existingEntry) {
        existingEntry.maxWeight = Math.max(existingEntry.maxWeight, set.weight || 0);
        existingEntry.totalVolume += (set.weight || 0) * (set.reps || 0);
        existingEntry.sets += 1;
      } else {
        exerciseProgress[exerciseName].push({
          date,
          maxWeight: set.weight || 0,
          totalVolume: (set.weight || 0) * (set.reps || 0),
          sets: 1,
          avgRpe: set.rpe || 0,
          completedAt: set.completedAt
        });
      }
    });

    return exerciseProgress;
  };

  const exerciseProgress = processWorkoutData();
  const exerciseNames = Object.keys(exerciseProgress);
  
  // Get the most frequently trained exercises for display
  const topExercises = exerciseNames
    .map(name => ({
      name,
      sessions: exerciseProgress[name].length,
      data: exerciseProgress[name].sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
    }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 3);

  // Generate simple line chart data for visualization
  const generateChartData = (data: any[]) => {
    if (data.length === 0) return [];
    
    const maxValue = Math.max(...data.map(d => d.maxWeight));
    const minValue = Math.min(...data.map(d => d.maxWeight));
    const range = maxValue - minValue;
    
    return data.map((item, index) => ({
      ...item,
      height: range > 0 ? Math.max(8, ((item.maxWeight - minValue) / range) * 60) : 30,
      x: (index / (data.length - 1)) * 100
    }));
  };

  return (
    <Card className="p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">پیشرفت تمرین</h3>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32" data-testid="select-workout-period">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 روز اخیر</SelectItem>
            <SelectItem value="30days">30 روز اخیر</SelectItem>
            <SelectItem value="3months">3 ماه اخیر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {topExercises.length > 0 ? (
        <div className="space-y-6">
          {topExercises.map((exercise) => {
            const chartData = generateChartData(exercise.data);
            const latestWeight = exercise.data[exercise.data.length - 1]?.maxWeight || 0;
            const previousWeight = exercise.data.length > 1 ? exercise.data[exercise.data.length - 2]?.maxWeight || 0 : latestWeight;
            const weightChange = latestWeight - previousWeight;
            
            return (
              <div key={exercise.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 text-sm">{exercise.name}</h4>
                  <div className="flex items-center gap-2">
                    {weightChange !== 0 && (
                      <>
                        {weightChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-secondary" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          weightChange > 0 ? 'text-secondary' : 'text-red-500'
                        }`}>
                          {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} کیلو
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Simple Line Chart */}
                <div className="relative h-20 bg-gray-50 rounded-lg p-2">
                  <div className="absolute top-1 right-2 text-xs text-gray-500">
                    {latestWeight} کیلو
                  </div>
                  
                  {chartData.length > 1 && (
                    <svg className="w-full h-full" viewBox="0 0 100 60">
                      <polyline
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        points={chartData.map((point, index) => 
                          `${(index / (chartData.length - 1)) * 100},${60 - point.height}`
                        ).join(' ')}
                      />
                      {chartData.map((point, index) => (
                        <circle
                          key={index}
                          cx={(index / (chartData.length - 1)) * 100}
                          cy={60 - point.height}
                          r="2"
                          fill="hsl(var(--primary))"
                        />
                      ))}
                    </svg>
                  )}
                  
                  <div className="absolute bottom-1 left-2 text-xs text-gray-400">
                    {exercise.sessions} جلسه
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold text-primary">{latestWeight}</div>
                    <div className="text-xs text-gray-500">حداکثر وزن</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-secondary">{exercise.sessions}</div>
                    <div className="text-xs text-gray-500">جلسات تمرین</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-accent">
                      {Math.round(exercise.data.reduce((sum, d) => sum + d.totalVolume, 0) / exercise.data.length)}
                    </div>
                    <div className="text-xs text-gray-500">میانگین حجم</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>هنوز داده‌ای برای نمایش نمودار موجود نیست</p>
          <p className="text-sm mt-1">با ثبت تمرینات، پیشرفت خود را رصد کنید</p>
        </div>
      )}
    </Card>
  );
}