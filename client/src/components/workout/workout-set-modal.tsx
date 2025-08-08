import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dumbbell, Target, Zap } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { Exercise } from "@/lib/exercises";

interface WorkoutSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise | null;
  userId: string;
}

export default function WorkoutSetModal({ isOpen, onClose, exercise, userId }: WorkoutSetModalProps) {
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("12");
  const [weight, setWeight] = useState("20");
  const [rpe, setRpe] = useState("7");
  const [duration, setDuration] = useState("60");
  const [notes, setNotes] = useState("");
  
  const queryClient = useQueryClient();

  const addWorkoutSetMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/workout-sets", data),
    onSuccess: () => {
      const today = new Date().toISOString().split('T')[0];
      queryClient.invalidateQueries({ queryKey: ["/api/workout-sets", userId, today] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      toast({ description: "ست تمرین ثبت شد" });
      handleClose();
    },
  });

  const handleSubmit = () => {
    if (!exercise) return;

    // For each set, create a separate entry
    const setsCount = parseInt(sets) || 1;
    
    for (let i = 0; i < setsCount; i++) {
      addWorkoutSetMutation.mutate({
        userId,
        exerciseId: exercise.id,
        sets: 1, // Each entry represents one set
        reps: parseInt(reps) || 0,
        weight: parseFloat(weight) || 0,
        rpe: parseInt(rpe) || null,
        duration: parseInt(duration) || 60,
        notes: notes || null,
      });
    }
  };

  const handleClose = () => {
    setSets("3");
    setReps("12");
    setWeight("20");
    setRpe("7");
    setDuration("60");
    setNotes("");
    onClose();
  };

  if (!exercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            ثبت تمرین
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4 overflow-y-auto flex-1">
          {/* Exercise Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">{exercise.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {exercise.muscleGroups.map((muscle) => (
                <Badge key={muscle} variant="outline" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {exercise.caloriesPerMinute} کالری در دقیقه • سطح {exercise.difficulty}
            </div>
          </div>

          <div className="space-y-4">
            {/* Sets and Reps */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="flex items-center gap-1 mb-2">
                  <Target className="h-4 w-4" />
                  تعداد ست
                </Label>
                <Input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  min="1"
                  max="10"
                  data-testid="input-sets"
                />
              </div>
              <div>
                <Label className="mb-2 block">تکرار در هر ست</Label>
                <Input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  min="1"
                  max="50"
                  data-testid="input-reps"
                />
              </div>
            </div>

            {/* Weight and RPE */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-2 block">وزن (کیلوگرم)</Label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0"
                  step="0.5"
                  data-testid="input-weight"
                />
              </div>
              <div>
                <Label className="flex items-center gap-1 mb-2">
                  <Zap className="h-4 w-4" />
                  RPE (1-10)
                </Label>
                <Input
                  type="number"
                  value={rpe}
                  onChange={(e) => setRpe(e.target.value)}
                  min="1"
                  max="10"
                  data-testid="input-rpe"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <Label className="mb-2 block">مدت زمان هر ست (ثانیه)</Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="10"
                max="300"
                data-testid="input-duration"
              />
              <p className="text-xs text-gray-500 mt-1">
                شامل زمان اجرا + استراحت
              </p>
            </div>

            <Separator />

            {/* Notes */}
            <div>
              <Label className="mb-2 block">یادداشت (اختیاری)</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="نکات و توضیحات..."
                data-testid="input-notes"
              />
            </div>

            {/* RPE Guide */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">راهنمای RPE:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>1-3: خیلی آسان</div>
                <div>4-6: متوسط</div>
                <div>7-8: سخت</div>
                <div>9-10: خیلی سخت</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
              data-testid="button-cancel-workout"
            >
              انصراف
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={addWorkoutSetMutation.isPending}
              className="flex-1"
              data-testid="button-save-workout"
            >
              {addWorkoutSetMutation.isPending ? "در حال ثبت..." : "ثبت تمرین"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}