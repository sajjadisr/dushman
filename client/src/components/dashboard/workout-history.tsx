import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WorkoutHistory() {
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id";
  const today = new Date().toISOString().split('T')[0];

  const { data: workoutSets = [], isLoading } = useQuery({
    queryKey: ["/api/workout-sets", userId, today],
  });

  if (isLoading) {
    return (
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">تمرین‌های اخیر</h2>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-20"></div>
          ))}
        </div>
      </section>
    );
  }

  const recentWorkouts = workoutSets.slice(0, 3);

  return (
    <section className="px-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">تمرین‌های اخیر</h2>
        <Link href="/workout">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary/80"
            data-testid="button-view-all-workouts"
          >
            مشاهده همه
          </Button>
        </Link>
      </div>

      {recentWorkouts.length > 0 ? (
        <div className="space-y-3">
          {recentWorkouts.map((set: any) => {
            const caloriesBurned = set.exercise?.caloriesPerMinute 
              ? Math.round((set.exercise.caloriesPerMinute * (set.duration || 60)) / 60)
              : 0;

            return (
              <Card key={set.id} className="p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary/20 to-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{getExerciseIcon(set.exercise?.category)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900" data-testid={`workout-name-${set.id}`}>
                          {set.exercise?.name || 'تمرین نامشخص'}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {set.reps ? `${set.reps} تکرار` : ''}
                          {set.weight ? ` - ${set.weight} کیلو` : ''}
                          {set.duration ? ` - ${Math.round(set.duration / 60)} دقیقه` : ''}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          تمام شده
                        </Badge>
                      </div>
                      <div className="text-left">
                        <span className="text-lg font-bold text-gray-900" data-testid={`workout-calories-${set.id}`}>
                          {caloriesBurned}
                        </span>
                        <span className="text-sm text-gray-500 block">کالری</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-6 text-center text-gray-500">
          <div className="text-4xl mb-2">💪</div>
          <p>هنوز تمرینی ثبت نشده</p>
          <p className="text-sm mt-1">از قسمت تمرین برای شروع استفاده کنید</p>
        </Card>
      )}
    </section>
  );
}

function getExerciseIcon(category?: string): string {
  if (!category) return "💪";
  
  switch (category) {
    case "سینه": return "💪";
    case "پا": return "🦵";
    case "پشت": return "🔙";
    case "شانه": return "🤲";
    case "بازو": return "💪";
    default: return "🏋️";
  }
}
