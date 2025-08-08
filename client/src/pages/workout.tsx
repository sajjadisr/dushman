import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MobileHeader from "@/components/layout/mobile-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Dumbbell, Trash2, Clock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

export default function Workout() {
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

  const addWorkoutSetMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/workout-sets", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workout-sets", userId, today] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      toast({ description: "ست تمرین ثبت شد" });
    },
  });

  const deleteWorkoutSetMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/workout-sets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workout-sets", userId, today] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      toast({ description: "ست تمرین حذف شد" });
    },
  });

  const handleAddSet = (exerciseId: string) => {
    // In a real app, this would open a modal for detailed input
    const weight = 20; // Mock weight
    const reps = 12; // Mock reps
    const duration = 60; // Mock duration in seconds
    
    addWorkoutSetMutation.mutate({
      userId,
      exerciseId,
      weight,
      reps,
      duration,
    });
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

  return (
    <div className="pb-20">
      <MobileHeader />
      
      <main className="px-4 py-6">
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

        {/* Today's Workout Sets */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            تمرین‌های امروز
          </h2>
          
          {workoutSets.length > 0 ? (
            <div className="space-y-3">
              {workoutSets.map((set: any) => (
                <Card key={set.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{set.exercise?.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {set.weight ? `${set.weight} کیلو × ` : ''}
                        {set.reps} تکرار
                        {set.duration && ` - ${Math.round(set.duration / 60)} دقیقه`}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {set.exercise?.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteWorkoutSetMutation.mutate(set.id)}
                      className="text-red-500 hover:text-red-700"
                      data-testid={`button-delete-set-${set.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4 text-center text-gray-500">
              هنوز تمرینی ثبت نشده
            </Card>
          )}
        </div>

        {/* Exercise Library */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            کتابخانه تمرینات
          </h2>

          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 3)}, minmax(0, 1fr))` }}>
              {categories.slice(0, 3).map((category: string) => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category: string) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-2">
                  {exercises
                    .filter((exercise: any) => exercise.category === category)
                    .map((exercise: any) => (
                      <Card key={exercise.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{exercise.name}</h4>
                            <p className="text-sm text-gray-600">
                              {exercise.muscleGroups.join('، ')}
                            </p>
                            <div className="text-xs text-gray-500 mt-1">
                              {exercise.caloriesPerMinute} کالری در دقیقه
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddSet(exercise.id)}
                            disabled={addWorkoutSetMutation.isPending}
                            data-testid={`button-add-exercise-${exercise.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
