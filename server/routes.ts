import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFoodEntrySchema, insertWorkoutSetSchema, insertWeightEntrySchema, insertWorkoutSchema, insertWorkoutPlanSchema, insertWorkoutPlanExerciseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Food routes
  app.get("/api/foods", async (req, res) => {
    try {
      const { search } = req.query;
      let foods;
      
      if (search && typeof search === 'string') {
        foods = await storage.searchFoods(search);
      } else {
        foods = await storage.getAllFoods();
      }
      
      res.json(foods);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت غذاها" });
    }
  });

  app.get("/api/food-entries", async (req, res) => {
    try {
      const { userId, date } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "شناسه کاربر الزامی است" });
      }

      const targetDate = date ? new Date(date as string) : undefined;
      const entries = await storage.getFoodEntriesByUser(userId as string, targetDate);
      
      // Populate with food details
      const entriesWithFood = await Promise.all(
        entries.map(async (entry) => {
          const food = await storage.getFood(entry.foodId);
          return { ...entry, food };
        })
      );

      res.json(entriesWithFood);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت وعده‌های غذایی" });
    }
  });

  app.post("/api/food-entries", async (req, res) => {
    try {
      const validatedData = insertFoodEntrySchema.parse(req.body);
      const entry = await storage.createFoodEntry(validatedData);
      
      // Get food details for response
      const food = await storage.getFood(entry.foodId);
      res.json({ ...entry, food });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "داده‌های نامعتبر", errors: error.errors });
      }
      res.status(500).json({ message: "خطا در ثبت وعده غذایی" });
    }
  });

  app.delete("/api/food-entries/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteFoodEntry(id);
      
      if (!success) {
        return res.status(404).json({ message: "وعده غذایی یافت نشد" });
      }

      res.json({ message: "وعده غذایی حذف شد" });
    } catch (error) {
      res.status(500).json({ message: "خطا در حذف وعده غذایی" });
    }
  });

  // Exercise routes
  app.get("/api/exercises", async (req, res) => {
    try {
      const { category } = req.query;
      let exercises;
      
      if (category && typeof category === 'string') {
        exercises = await storage.getExercisesByCategory(category);
      } else {
        exercises = await storage.getAllExercises();
      }
      
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت تمرینات" });
    }
  });

  app.get("/api/workout-sets", async (req, res) => {
    try {
      const { userId, date } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "شناسه کاربر الزامی است" });
      }

      const targetDate = date ? new Date(date as string) : undefined;
      const sets = await storage.getWorkoutSetsByUser(userId as string, targetDate);
      
      // Populate with exercise details
      const setsWithExercise = await Promise.all(
        sets.map(async (set) => {
          const exercise = await storage.getExercise(set.exerciseId);
          return { ...set, exercise };
        })
      );

      res.json(setsWithExercise);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت ست‌های تمرین" });
    }
  });

  app.post("/api/workout-sets", async (req, res) => {
    try {
      const validatedData = insertWorkoutSetSchema.parse(req.body);
      const set = await storage.createWorkoutSet(validatedData);
      
      // Get exercise details for response
      const exercise = await storage.getExercise(set.exerciseId);
      res.json({ ...set, exercise });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "داده‌های نامعتبر", errors: error.errors });
      }
      res.status(500).json({ message: "خطا در ثبت ست تمرین" });
    }
  });

  app.delete("/api/workout-sets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteWorkoutSet(id);
      
      if (!success) {
        return res.status(404).json({ message: "ست تمرین یافت نشد" });
      }

      res.json({ message: "ست تمرین حذف شد" });
    } catch (error) {
      res.status(500).json({ message: "خطا در حذف ست تمرین" });
    }
  });

  // Weight tracking routes
  app.get("/api/weight-entries", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "شناسه کاربر الزامی است" });
      }

      const entries = await storage.getWeightEntriesByUser(userId as string);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت وزن‌ها" });
    }
  });

  app.post("/api/weight-entries", async (req, res) => {
    try {
      const validatedData = insertWeightEntrySchema.parse(req.body);
      const entry = await storage.createWeightEntry(validatedData);
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "داده‌های نامعتبر", errors: error.errors });
      }
      res.status(500).json({ message: "خطا در ثبت وزن" });
    }
  });

  // Workout Plan routes
  app.get("/api/workout-plans", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "شناسه کاربر الزامی است" });
      }

      const plans = await storage.getWorkoutPlansByUser(userId as string);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت برنامه‌های تمرین" });
    }
  });

  app.get("/api/workout-plans/active", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "شناسه کاربر الزامی است" });
      }

      const activePlan = await storage.getActiveWorkoutPlan(userId as string);
      if (!activePlan) {
        return res.status(404).json({ message: "برنامه تمرین فعال یافت نشد" });
      }

      // Get exercises for the active plan
      const exercises = await storage.getWorkoutPlanExercises(activePlan.id);
      const exercisesWithDetails = await Promise.all(
        exercises.map(async (planExercise) => {
          const exercise = await storage.getExercise(planExercise.exerciseId);
          return { ...planExercise, exercise };
        })
      );

      res.json({ ...activePlan, exercises: exercisesWithDetails });
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت برنامه تمرین فعال" });
    }
  });

  app.post("/api/workout-plans", async (req, res) => {
    try {
      const validatedData = insertWorkoutPlanSchema.parse(req.body);
      const plan = await storage.createWorkoutPlan(validatedData);
      res.json(plan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "داده‌های نامعتبر", errors: error.errors });
      }
      res.status(500).json({ message: "خطا در ایجاد برنامه تمرین" });
    }
  });

  app.put("/api/workout-plans/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const plan = await storage.updateWorkoutPlan(id, req.body);
      
      if (!plan) {
        return res.status(404).json({ message: "برنامه تمرین یافت نشد" });
      }

      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "خطا در به‌روزرسانی برنامه تمرین" });
    }
  });

  app.delete("/api/workout-plans/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteWorkoutPlan(id);
      
      if (!success) {
        return res.status(404).json({ message: "برنامه تمرین یافت نشد" });
      }

      res.json({ message: "برنامه تمرین حذف شد" });
    } catch (error) {
      res.status(500).json({ message: "خطا در حذف برنامه تمرین" });
    }
  });

  app.put("/api/workout-plans/:id/activate", async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "شناسه کاربر الزامی است" });
      }

      const success = await storage.setActiveWorkoutPlan(userId, id);
      
      if (!success) {
        return res.status(404).json({ message: "برنامه تمرین یافت نشد" });
      }

      res.json({ message: "برنامه تمرین فعال شد" });
    } catch (error) {
      res.status(500).json({ message: "خطا در فعال‌سازی برنامه تمرین" });
    }
  });

  // Workout Plan Exercise routes
  app.get("/api/workout-plans/:planId/exercises", async (req, res) => {
    try {
      const { planId } = req.params;
      const exercises = await storage.getWorkoutPlanExercises(planId);
      
      // Populate with exercise details
      const exercisesWithDetails = await Promise.all(
        exercises.map(async (planExercise) => {
          const exercise = await storage.getExercise(planExercise.exerciseId);
          return { ...planExercise, exercise };
        })
      );

      res.json(exercisesWithDetails);
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت تمرینات برنامه" });
    }
  });

  app.post("/api/workout-plan-exercises", async (req, res) => {
    try {
      const validatedData = insertWorkoutPlanExerciseSchema.parse(req.body);
      const exercise = await storage.createWorkoutPlanExercise(validatedData);
      
      // Get exercise details for response
      const exerciseDetails = await storage.getExercise(exercise.exerciseId);
      res.json({ ...exercise, exercise: exerciseDetails });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "داده‌های نامعتبر", errors: error.errors });
      }
      res.status(500).json({ message: "خطا در افزودن تمرین به برنامه" });
    }
  });

  app.put("/api/workout-plan-exercises/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const exercise = await storage.updateWorkoutPlanExercise(id, req.body);
      
      if (!exercise) {
        return res.status(404).json({ message: "تمرین برنامه یافت نشد" });
      }

      const exerciseDetails = await storage.getExercise(exercise.exerciseId);
      res.json({ ...exercise, exercise: exerciseDetails });
    } catch (error) {
      res.status(500).json({ message: "خطا در به‌روزرسانی تمرین برنامه" });
    }
  });

  app.delete("/api/workout-plan-exercises/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteWorkoutPlanExercise(id);
      
      if (!success) {
        return res.status(404).json({ message: "تمرین برنامه یافت نشد" });
      }

      res.json({ message: "تمرین از برنامه حذف شد" });
    } catch (error) {
      res.status(500).json({ message: "خطا در حذف تمرین از برنامه" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard-stats", async (req, res) => {
    try {
      const { userId, date } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "شناسه کاربر الزامی است" });
      }

      const targetDate = date ? new Date(date as string) : new Date();
      
      // Get food entries for the day
      const foodEntries = await storage.getFoodEntriesByUser(userId as string, targetDate);
      let totalCalories = 0;
      
      for (const entry of foodEntries) {
        const food = await storage.getFood(entry.foodId);
        if (food) {
          totalCalories += food.caloriesPerServing * entry.servings;
        }
      }

      // Get workout sets for the day
      const workoutSets = await storage.getWorkoutSetsByUser(userId as string, targetDate);
      let caloriesBurned = 0;
      let workoutDuration = 0;
      
      for (const set of workoutSets) {
        const exercise = await storage.getExercise(set.exerciseId);
        if (exercise && set.duration) {
          caloriesBurned += (exercise.caloriesPerMinute * set.duration) / 60;
          workoutDuration += set.duration / 60; // convert to minutes
        }
      }

      // Get user's goals
      const user = await storage.getUser(userId as string);
      const dailyCalorieGoal = user?.dailyCalorieGoal || 2000;

      res.json({
        totalCalories,
        caloriesBurned,
        workoutDuration,
        dailyCalorieGoal,
        progress: Math.min((totalCalories / dailyCalorieGoal) * 100, 100)
      });
    } catch (error) {
      res.status(500).json({ message: "خطا در دریافت آمار داشبورد" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
