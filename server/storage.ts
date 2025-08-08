import { 
  type User, 
  type InsertUser,
  type Food,
  type InsertFood,
  type FoodEntry,
  type InsertFoodEntry,
  type Exercise,
  type InsertExercise,
  type WorkoutSet,
  type InsertWorkoutSet,
  type Workout,
  type InsertWorkout,
  type WeightEntry,
  type InsertWeightEntry
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Food operations
  getFood(id: string): Promise<Food | undefined>;
  getAllFoods(): Promise<Food[]>;
  searchFoods(query: string): Promise<Food[]>;
  createFood(food: InsertFood): Promise<Food>;
  
  // Food entry operations
  getFoodEntry(id: string): Promise<FoodEntry | undefined>;
  getFoodEntriesByUser(userId: string, date?: Date): Promise<FoodEntry[]>;
  createFoodEntry(entry: InsertFoodEntry): Promise<FoodEntry>;
  deleteFoodEntry(id: string): Promise<boolean>;
  
  // Exercise operations
  getExercise(id: string): Promise<Exercise | undefined>;
  getAllExercises(): Promise<Exercise[]>;
  getExercisesByCategory(category: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  
  // Workout set operations
  getWorkoutSet(id: string): Promise<WorkoutSet | undefined>;
  getWorkoutSetsByUser(userId: string, date?: Date): Promise<WorkoutSet[]>;
  createWorkoutSet(set: InsertWorkoutSet): Promise<WorkoutSet>;
  deleteWorkoutSet(id: string): Promise<boolean>;
  
  // Workout operations
  getWorkout(id: string): Promise<Workout | undefined>;
  getWorkoutsByUser(userId: string): Promise<Workout[]>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  updateWorkout(id: string, updates: Partial<Workout>): Promise<Workout | undefined>;
  
  // Weight entry operations
  getWeightEntry(id: string): Promise<WeightEntry | undefined>;
  getWeightEntriesByUser(userId: string): Promise<WeightEntry[]>;
  createWeightEntry(entry: InsertWeightEntry): Promise<WeightEntry>;
  deleteWeightEntry(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private foods: Map<string, Food>;
  private foodEntries: Map<string, FoodEntry>;
  private exercises: Map<string, Exercise>;
  private workoutSets: Map<string, WorkoutSet>;
  private workouts: Map<string, Workout>;
  private weightEntries: Map<string, WeightEntry>;

  constructor() {
    this.users = new Map();
    this.foods = new Map();
    this.foodEntries = new Map();
    this.exercises = new Map();
    this.workoutSets = new Map();
    this.workouts = new Map();
    this.weightEntries = new Map();
    
    // Initialize with some Persian foods and exercises
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add Persian foods
    const persianFoods: InsertFood[] = [
      { name: "برنج زعفرانی", caloriesPerServing: 280, servingSize: "1 پیمانه (150 گرم)", category: "غلات" },
      { name: "کباب کوبیده", caloriesPerServing: 450, servingSize: "2 سیخ (200 گرم)", category: "پروتئین" },
      { name: "قورمه سبزی", caloriesPerServing: 320, servingSize: "1 پیمانه", category: "خورش" },
      { name: "زرشک پلو", caloriesPerServing: 280, servingSize: "1 پیمانه", category: "غلات" },
      { name: "جوجه کباب", caloriesPerServing: 380, servingSize: "1 سرو (180 گرم)", category: "پروتئین" },
      { name: "کشک بادمجان", caloriesPerServing: 220, servingSize: "1 پیمانه", category: "خورش" },
      { name: "آش رشته", caloriesPerServing: 300, servingSize: "1 کاسه", category: "سوپ" },
      { name: "کوکو سبزی", caloriesPerServing: 180, servingSize: "1 برش", category: "کوکو" }
    ];

    persianFoods.forEach(food => {
      const id = randomUUID();
      this.foods.set(id, { ...food, id });
    });

    // Add exercises
    const exercises: InsertExercise[] = [
      { name: "پرس سینه با دمبل", category: "سینه", muscleGroups: ["سینه", "سه‌سر"], caloriesPerMinute: 8 },
      { name: "اسکات با بار", category: "پا", muscleGroups: ["چهارسر", "باسن"], caloriesPerMinute: 10 },
      { name: "کشش پشت", category: "پشت", muscleGroups: ["پشت", "دوسر"], caloriesPerMinute: 7 },
      { name: "پرس شانه", category: "شانه", muscleGroups: ["شانه", "سه‌سر"], caloriesPerMinute: 6 },
      { name: "جلو بازو", category: "بازو", muscleGroups: ["دوسر"], caloriesPerMinute: 5 },
      { name: "پشت بازو", category: "بازو", muscleGroups: ["سه‌سر"], caloriesPerMinute: 5 }
    ];

    exercises.forEach(exercise => {
      const id = randomUUID();
      this.exercises.set(id, { ...exercise, id });
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      currentWeight: insertUser.currentWeight || null,
      targetWeight: insertUser.targetWeight || null,
      dailyCalorieGoal: insertUser.dailyCalorieGoal || 2000
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Food operations
  async getFood(id: string): Promise<Food | undefined> {
    return this.foods.get(id);
  }

  async getAllFoods(): Promise<Food[]> {
    return Array.from(this.foods.values());
  }

  async searchFoods(query: string): Promise<Food[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.foods.values()).filter(food => 
      food.name.toLowerCase().includes(lowerQuery)
    );
  }

  async createFood(insertFood: InsertFood): Promise<Food> {
    const id = randomUUID();
    const food: Food = { ...insertFood, id };
    this.foods.set(id, food);
    return food;
  }

  // Food entry operations
  async getFoodEntry(id: string): Promise<FoodEntry | undefined> {
    return this.foodEntries.get(id);
  }

  async getFoodEntriesByUser(userId: string, date?: Date): Promise<FoodEntry[]> {
    const entries = Array.from(this.foodEntries.values()).filter(entry => entry.userId === userId);
    
    if (date) {
      const targetDate = new Date(date);
      const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
      
      return entries.filter(entry => {
        const entryDate = new Date(entry.loggedAt!);
        return entryDate >= startOfDay && entryDate < endOfDay;
      });
    }
    
    return entries;
  }

  async createFoodEntry(insertEntry: InsertFoodEntry): Promise<FoodEntry> {
    const id = randomUUID();
    const entry: FoodEntry = { ...insertEntry, id, loggedAt: new Date() };
    this.foodEntries.set(id, entry);
    return entry;
  }

  async deleteFoodEntry(id: string): Promise<boolean> {
    return this.foodEntries.delete(id);
  }

  // Exercise operations
  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(exercise => exercise.category === category);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = { ...insertExercise, id };
    this.exercises.set(id, exercise);
    return exercise;
  }

  // Workout set operations
  async getWorkoutSet(id: string): Promise<WorkoutSet | undefined> {
    return this.workoutSets.get(id);
  }

  async getWorkoutSetsByUser(userId: string, date?: Date): Promise<WorkoutSet[]> {
    const sets = Array.from(this.workoutSets.values()).filter(set => set.userId === userId);
    
    if (date) {
      const targetDate = new Date(date);
      const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
      
      return sets.filter(set => {
        const setDate = new Date(set.completedAt!);
        return setDate >= startOfDay && setDate < endOfDay;
      });
    }
    
    return sets;
  }

  async createWorkoutSet(insertSet: InsertWorkoutSet): Promise<WorkoutSet> {
    const id = randomUUID();
    const set: WorkoutSet = { 
      ...insertSet, 
      id, 
      completedAt: new Date(),
      sets: insertSet.sets || 1,
      rpe: insertSet.rpe || null
    };
    this.workoutSets.set(id, set);
    return set;
  }

  async deleteWorkoutSet(id: string): Promise<boolean> {
    return this.workoutSets.delete(id);
  }

  // Workout operations
  async getWorkout(id: string): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  async getWorkoutsByUser(userId: string): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(workout => workout.userId === userId);
  }

  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const id = randomUUID();
    const workout: Workout = { 
      ...insertWorkout, 
      id, 
      startedAt: new Date(),
      completedAt: insertWorkout.completedAt || null,
      totalCaloriesBurned: insertWorkout.totalCaloriesBurned || 0
    };
    this.workouts.set(id, workout);
    return workout;
  }

  async updateWorkout(id: string, updates: Partial<Workout>): Promise<Workout | undefined> {
    const workout = this.workouts.get(id);
    if (!workout) return undefined;
    const updatedWorkout = { ...workout, ...updates };
    this.workouts.set(id, updatedWorkout);
    return updatedWorkout;
  }

  // Weight entry operations
  async getWeightEntry(id: string): Promise<WeightEntry | undefined> {
    return this.weightEntries.get(id);
  }

  async getWeightEntriesByUser(userId: string): Promise<WeightEntry[]> {
    return Array.from(this.weightEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => new Date(b.recordedAt!).getTime() - new Date(a.recordedAt!).getTime());
  }

  async createWeightEntry(insertEntry: InsertWeightEntry): Promise<WeightEntry> {
    const id = randomUUID();
    const entry: WeightEntry = { ...insertEntry, id, recordedAt: new Date() };
    this.weightEntries.set(id, entry);
    return entry;
  }

  async deleteWeightEntry(id: string): Promise<boolean> {
    return this.weightEntries.delete(id);
  }
}

export const storage = new MemStorage();
