import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MobileHeader from "@/components/layout/mobile-header";
import WorkoutSetModal from "@/components/workout/workout-set-modal";
import WorkoutProgressChart from "@/components/workout/workout-progress-chart";
import WorkoutPlanModal from "@/components/workout/workout-plan-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Dumbbell, Trash2, Clock, BarChart3, Target, PlayCircle, Settings } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { Exercise } from "@/lib/exercises";

export default function Workout() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [followingPlan, setFollowingPlan] = useState(false);
  const queryClient = useQueryClient();
  
  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id";
  const today = new Date().toISOString().split('T')[0];

  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ["/api/exercises"],
  });

  const { data: workoutSets = [], isLoading: setsLoading } = useQuery({
    queryKey: ["/api/workout-sets", userId, today],
  });

  const { data: activePlan } = useQuery({
    queryKey: ["/api/workout-plans/active", userId],
    queryFn: () => apiRequest("GET", `/api/workout-plans/active?userId=${userId}`),
    retry: false,
  });

  const { data: workoutPlans = [] } = useQuery({
    queryKey: ["/api/workout-plans", userId],
    queryFn: () => apiRequest("GET", `/api/workout-plans?userId=${userId}`),
  });

  const deleteWorkoutSetMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/workout-sets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workout-sets", userId, today] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      toast({ description: "ست تمرین حذف شد" });
    },
  });

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const categories = [...new Set(exercises.map((ex: any) => ex.category))];
  const totalCaloriesBurned = workoutSets.reduce((sum: number, set: any) => {
    const caloriesPerMinute = set.exercise?.caloriesPerMinute || 5;
    const minutes = (set.duration || 60) / 60;
    return sum + (caloriesPerMinute * minutes);
  }, 0);

  const workoutDuration = workoutSets.reduce((sum: number, set: any) => {
    return sum + (set.duration || 60);
  }, 0);

  // Group sets by exercise for better display
  const groupedSets = workoutSets.reduce((groups: any, set: any) => {
    const exerciseName = set.exercise?.name || 'نامشخص';
    if (!groups[exerciseName]) {
      groups[exerciseName] = [];
    }
    groups[exerciseName].push(set);
    return groups;
  }, {});

  return (
    <div className="pb-20">
      <MobileHeader />
      
      <main className="px-4 py-6">
        {/* Active Workout Plan */}
        {activePlan && (
          <Card className="p-4 mb-6 border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                برنامه فعال: {activePlan.name}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFollowingPlan(!followingPlan)}
                data-testid="button-toggle-plan-follow"
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                {followingPlan ? "توقف دنبال کردن" : "دنبال کردن برنامه"}
              </Button>
            </div>
            
            {activePlan.description && (
              <p className="text-sm text-muted-foreground mb-3">{activePlan.description}</p>
            )}
            
            {followingPlan && activePlan.exercises && (
              <div className="space-y-2">
                <h3 className="font-medium text-sm">تمرینات امروز:</h3>
                {activePlan.exercises.map((planEx: any, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-white/80 rounded-lg p-3">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{planEx.exercise?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {planEx.targetSets} ست × {planEx.targetReps} تکرار
                        {planEx.targetWeight && ` × ${planEx.targetWeight} کیلو`}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (planEx.exercise) {
                          setSelectedExercise({
                            ...planEx.exercise,
                            targetSets: planEx.targetSets,
                            targetReps: planEx.targetReps,
                            targetWeight: planEx.targetWeight,
                          });
                          setIsModalOpen(true);
                        }
                      }}
                      data-testid={`button-start-plan-exercise-${index}`}
                    >
                      شروع
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Workout Plan Management */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              مدیریت برنامه تمرین
            </h2>
            <Button
              onClick={() => setIsPlanModalOpen(true)}
              size="sm"
              data-testid="button-create-plan"
            >
              <Plus className="h-4 w-4 mr-1" />
              برنامه جدید
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {activePlan
              ? `برنامه فعال: ${activePlan.name}`
              : "هیچ برنامه فعالی تنظیم نشده"}
            {workoutPlans.length > 0 && (
              <> • {workoutPlans.length} برنامه ایجاد شده</>
            )}
          </div>
        </Card>

        {/* Today's Workout Summary */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-secondary">{Math.round(totalCaloriesBurned)}</div>
              <div className="text-sm text-gray-500">کالری سوخته</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{Math.round(workoutDuration / 60)}</div>
              <div className="text-sm text-gray-500">دقیقه تمرین</div>
            </div>
          </div>
        </Card>

        {/* Workout Progress Chart */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            نمودار پیشرفت
          </h2>
          <WorkoutProgressChart userId={userId} />
        </div>

        {/* Today's Workout Sets */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            تمرین‌های امروز
          </h2>
          
          {Object.keys(groupedSets).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedSets).map(([exerciseName, sets]: [string, any]) => (
                <Card key={exerciseName} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{exerciseName}</h3>
                      <Badge variant="outline" className="mt-1">
                        {sets[0]?.exercise?.category || 'نامشخص'}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Delete all sets for this exercise
                        sets.forEach((set: any) => deleteWorkoutSetMutation.mutate(set.id));
                      }}
                      className="text-red-500 hover:text-red-700"
                      data-testid={`button-delete-exercise-${exerciseName}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {sets.map((set: any, index: number) => (
                      <div key={set.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-600">ست {index + 1}</span>
                          <div className="text-sm">
                            {set.weight && <span className="font-medium">{set.weight} کیلو</span>}
                            {set.weight && set.reps && <span className="mx-1">×</span>}
                            {set.reps && <span>{set.reps} تکرار</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {set.rpe && (
                            <Badge variant="secondary" className="text-xs">
                              RPE {set.rpe}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {Math.round((set.duration || 60) / 60)} دقیقه
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center text-gray-500">
              <div className="text-4xl mb-2">💪</div>
              <p>هنوز تمرینی ثبت نشده</p>
              <p className="text-sm mt-1">از کتابخانه تمرینات زیر انتخاب کنید</p>
            </Card>
          )}
        </div>

        {/* Exercise Library */}
        {!followingPlan && (
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              {activePlan ? "انتخاب تمرین آزاد" : "کتابخانه تمرینات"}
            </h2>
            
            {activePlan && (
              <p className="text-sm text-muted-foreground mb-4">
                برای دنبال کردن برنامه فعال، روی "دنبال کردن برنامه" کلیک کنید یا تمرین دلخواه انتخاب کنید.
              </p>
            )}

            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="grid w-full mb-4" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 4)}, minmax(0, 1fr))` }}>
                {categories.slice(0, 4).map((category: string) => (
                  <TabsTrigger key={category} value={category} className="text-sm">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category: string) => (
                <TabsContent key={category} value={category}>
                  <div className="space-y-3">
                    {exercises
                      .filter((exercise: any) => exercise.category === category)
                      .map((exercise: any) => (
                        <Card key={exercise.id} className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground mb-1">{exercise.name}</h4>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {exercise.muscleGroups.map((muscle: string) => (
                                  <Badge key={muscle} variant="outline" className="text-xs">
                                    {muscle}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {exercise.caloriesPerMinute} کالری در دقیقه • سطح {exercise.difficulty}
                              </div>
                              {exercise.description && (
                                <p className="text-xs text-muted-foreground mt-1">{exercise.description}</p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleExerciseSelect(exercise)}
                              className="shrink-0"
                              data-testid={`button-add-exercise-${exercise.id}`}
                            >
                              <Plus className="h-4 w-4 ml-1" />
                              شروع
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </main>

      <WorkoutSetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exercise={selectedExercise}
        userId={userId}
      />
      
      <WorkoutPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        userId={userId}
      />
    </div>
  );
}
