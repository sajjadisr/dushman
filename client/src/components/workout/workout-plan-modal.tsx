import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Target, Dumbbell } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { WorkoutPlan } from "@shared/schema";

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
}

interface WorkoutPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: WorkoutPlan;
  userId: string;
}

interface PlanExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: number;
  targetWeight?: number;
  restTime: number;
  notes?: string;
  order: number;
}

export default function WorkoutPlanModal({ isOpen, onClose, plan, userId }: WorkoutPlanModalProps) {
  const [name, setName] = useState(plan?.name || "");
  const [description, setDescription] = useState(plan?.description || "");
  const [planExercises, setPlanExercises] = useState<PlanExercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  
  const queryClient = useQueryClient();

  const { data: exercises = [] } = useQuery({
    queryKey: ["/api/exercises"],
  });

  const createPlanMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/workout-plans", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workout-plans"] });
      toast({ description: "برنامه تمرین ایجاد شد" });
      handleClose();
    },
  });

  const addExerciseToPlan = () => {
    if (!selectedExerciseId) return;
    
    const newExercise: PlanExercise = {
      exerciseId: selectedExerciseId,
      targetSets: 3,
      targetReps: 12,
      targetWeight: 20,
      restTime: 60,
      order: planExercises.length + 1,
    };
    
    setPlanExercises([...planExercises, newExercise]);
    setSelectedExerciseId("");
  };

  const removeExercise = (index: number) => {
    const updated = planExercises.filter((_, i) => i !== index);
    // Update order
    const reordered = updated.map((ex, i) => ({ ...ex, order: i + 1 }));
    setPlanExercises(reordered);
  };

  const updateExercise = (index: number, field: keyof PlanExercise, value: any) => {
    const updated = [...planExercises];
    updated[index] = { ...updated[index], [field]: value };
    setPlanExercises(updated);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({ description: "نام برنامه الزامی است", variant: "destructive" });
      return;
    }

    if (planExercises.length === 0) {
      toast({ description: "حداقل یک تمرین باید اضافه کنید", variant: "destructive" });
      return;
    }

    // Create the plan first
    const planData = {
      userId,
      name: name.trim(),
      description: description.trim() || null,
      isActive: false,
    };

    try {
      const createdPlan = await createPlanMutation.mutateAsync(planData);
      
      // Then add exercises to the plan
      for (const exercise of planExercises) {
        await apiRequest("POST", "/api/workout-plan-exercises", {
          workoutPlanId: createdPlan.id,
          ...exercise,
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ["/api/workout-plans"] });
      toast({ description: "برنامه تمرین با موفقیت ایجاد شد" });
      handleClose();
    } catch (error) {
      toast({ description: "خطا در ایجاد برنامه تمرین", variant: "destructive" });
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setPlanExercises([]);
    setSelectedExerciseId("");
    onClose();
  };

  const getExerciseById = (id: string) => {
    return exercises.find((ex: Exercise) => ex.id === id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {plan ? "ویرایش برنامه تمرین" : "ایجاد برنامه تمرین جدید"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Plan Details */}
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">نام برنامه *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: برنامه حجمی سینه و پشت"
                data-testid="input-plan-name"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">توضیحات (اختیاری)</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیحات کوتاه درباره این برنامه..."
                rows={3}
                data-testid="input-plan-description"
              />
            </div>
          </div>

          {/* Add Exercise */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              تمرینات برنامه
            </h3>
            
            <div className="flex gap-2">
              <Select value={selectedExerciseId} onValueChange={setSelectedExerciseId}>
                <SelectTrigger className="flex-1" data-testid="select-exercise">
                  <SelectValue placeholder="انتخاب تمرین..." />
                </SelectTrigger>
                <SelectContent>
                  {exercises
                    .filter((ex: Exercise) => !planExercises.some(pe => pe.exerciseId === ex.id))
                    .map((exercise: Exercise) => (
                      <SelectItem key={exercise.id} value={exercise.id}>
                        {exercise.name} - {exercise.category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={addExerciseToPlan}
                disabled={!selectedExerciseId}
                data-testid="button-add-exercise"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Exercise List */}
          {planExercises.length > 0 && (
            <div className="space-y-3">
              {planExercises.map((planEx, index) => {
                const exercise = getExerciseById(planEx.exerciseId);
                if (!exercise) return null;

                return (
                  <div key={index} className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{exercise.name}</h4>
                        <div className="flex gap-1 mt-1">
                          {exercise.muscleGroups.map((muscle) => (
                            <Badge key={muscle} variant="outline" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(index)}
                        data-testid={`button-remove-exercise-${index}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <Label className="text-xs">ست</Label>
                        <Input
                          type="number"
                          value={planEx.targetSets}
                          onChange={(e) => updateExercise(index, 'targetSets', parseInt(e.target.value) || 1)}
                          min="1"
                          max="10"
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">تکرار</Label>
                        <Input
                          type="number"
                          value={planEx.targetReps}
                          onChange={(e) => updateExercise(index, 'targetReps', parseInt(e.target.value) || 1)}
                          min="1"
                          max="50"
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">وزن (کیلو)</Label>
                        <Input
                          type="number"
                          value={planEx.targetWeight || ''}
                          onChange={(e) => updateExercise(index, 'targetWeight', parseFloat(e.target.value) || null)}
                          min="0"
                          step="0.5"
                          className="h-8"
                          placeholder="اختیاری"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">استراحت (ثانیه)</Label>
                        <Input
                          type="number"
                          value={planEx.restTime}
                          onChange={(e) => updateExercise(index, 'restTime', parseInt(e.target.value) || 60)}
                          min="10"
                          max="300"
                          className="h-8"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-muted/20">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
              data-testid="button-cancel-plan"
            >
              انصراف
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={createPlanMutation.isPending}
              className="flex-1"
              data-testid="button-save-plan"
            >
              {createPlanMutation.isPending ? "در حال ذخیره..." : "ذخیره برنامه"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}