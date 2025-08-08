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
  type InsertWeightEntry,
  type WorkoutPlan,
  type InsertWorkoutPlan,
  type WorkoutPlanExercise,
  type InsertWorkoutPlanExercise
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
  
  // Workout plan operations
  getWorkoutPlan(id: string): Promise<WorkoutPlan | undefined>;
  getWorkoutPlansByUser(userId: string): Promise<WorkoutPlan[]>;
  getActiveWorkoutPlan(userId: string): Promise<WorkoutPlan | undefined>;
  createWorkoutPlan(plan: InsertWorkoutPlan): Promise<WorkoutPlan>;
  updateWorkoutPlan(id: string, updates: Partial<WorkoutPlan>): Promise<WorkoutPlan | undefined>;
  deleteWorkoutPlan(id: string): Promise<boolean>;
  setActiveWorkoutPlan(userId: string, planId: string): Promise<boolean>;
  
  // Workout plan exercise operations
  getWorkoutPlanExercises(planId: string): Promise<WorkoutPlanExercise[]>;
  createWorkoutPlanExercise(exercise: InsertWorkoutPlanExercise): Promise<WorkoutPlanExercise>;
  updateWorkoutPlanExercise(id: string, updates: Partial<WorkoutPlanExercise>): Promise<WorkoutPlanExercise | undefined>;
  deleteWorkoutPlanExercise(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private foods: Map<string, Food>;
  private foodEntries: Map<string, FoodEntry>;
  private exercises: Map<string, Exercise>;
  private workoutSets: Map<string, WorkoutSet>;
  private workouts: Map<string, Workout>;
  private weightEntries: Map<string, WeightEntry>;
  private workoutPlans: Map<string, WorkoutPlan>;
  private workoutPlanExercises: Map<string, WorkoutPlanExercise>;

  constructor() {
    this.users = new Map();
    this.foods = new Map();
    this.foodEntries = new Map();
    this.exercises = new Map();
    this.workoutSets = new Map();
    this.workouts = new Map();
    this.weightEntries = new Map();
    this.workoutPlans = new Map();
    this.workoutPlanExercises = new Map();
    
    // Initialize with some Persian foods and exercises
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add comprehensive Persian foods
    const persianFoods: InsertFood[] = [
      // غلات و نان
      { name: "برنج سفید", caloriesPerServing: 205, servingSize: "1 پیمانه (150 گرم)", category: "غلات" },
      { name: "برنج زعفرانی", caloriesPerServing: 280, servingSize: "1 پیمانه (150 گرم)", category: "غلات" },
      { name: "زرشک پلو", caloriesPerServing: 320, servingSize: "1 پیمانه", category: "غلات" },
      { name: "عدس پلو", caloriesPerServing: 290, servingSize: "1 پیمانه", category: "غلات" },
      { name: "باقالی پلو", caloriesPerServing: 310, servingSize: "1 پیمانه", category: "غلات" },
      { name: "نان بربری", caloriesPerServing: 240, servingSize: "1 عدد (80 گرم)", category: "غلات" },
      { name: "نان سنگک", caloriesPerServing: 260, servingSize: "1 عدد (85 گرم)", category: "غلات" },
      { name: "نان تافتون", caloriesPerServing: 200, servingSize: "1 عدد (70 گرم)", category: "غلات" },
      { name: "نان لواش", caloriesPerServing: 180, servingSize: "1 عدد (60 گرم)", category: "غلات" },

      // پروتئین ها
      { name: "کباب کوبیده", caloriesPerServing: 450, servingSize: "2 سیخ (200 گرم)", category: "پروتئین" },
      { name: "جوجه کباب", caloriesPerServing: 380, servingSize: "1 سرو (180 گرم)", category: "پروتئین" },
      { name: "کباب برگ", caloriesPerServing: 520, servingSize: "1 سیخ (250 گرم)", category: "پروتئین" },
      { name: "کباب بختیاری", caloriesPerServing: 480, servingSize: "1 سیخ (220 گرم)", category: "پروتئین" },
      { name: "ماهی سالمون", caloriesPerServing: 350, servingSize: "1 قطعه (150 گرم)", category: "پروتئین" },
      { name: "ماهی آزاد", caloriesPerServing: 320, servingSize: "1 قطعه (150 گرم)", category: "پروتئین" },
      { name: "مرغ تنوری", caloriesPerServing: 280, servingSize: "1 قطعه (120 گرم)", category: "پروتئین" },
      { name: "گوشت قرمز", caloriesPerServing: 400, servingSize: "100 گرم", category: "پروتئین" },
      { name: "تخم مرغ", caloriesPerServing: 70, servingSize: "1 عدد", category: "پروتئین" },

      // خورش ها
      { name: "قورمه سبزی", caloriesPerServing: 320, servingSize: "1 پیمانه", category: "خورش" },
      { name: "فسنجان", caloriesPerServing: 420, servingSize: "1 پیمانه", category: "خورش" },
      { name: "کرفس", caloriesPerServing: 280, servingSize: "1 پیمانه", category: "خورش" },
      { name: "بامیه", caloriesPerServing: 250, servingSize: "1 پیمانه", category: "خورش" },
      { name: "بادمجان", caloriesPerServing: 290, servingSize: "1 پیمانه", category: "خورش" },
      { name: "کشک بادمجان", caloriesPerServing: 220, servingSize: "1 پیمانه", category: "خورش" },
      { name: "خورش کدو", caloriesPerServing: 200, servingSize: "1 پیمانه", category: "خورش" },
      { name: "آلو اسفناج", caloriesPerServing: 260, servingSize: "1 پیمانه", category: "خورش" },

      // کوکو ها
      { name: "کوکو سبزی", caloriesPerServing: 180, servingSize: "1 برش", category: "کوکو" },
      { name: "کوکو سیب زمینی", caloriesPerServing: 220, servingSize: "1 برش", category: "کوکو" },
      { name: "کوکو بادمجان", caloriesPerServing: 200, servingSize: "1 برش", category: "کوکو" },

      // آش و سوپ
      { name: "آش رشته", caloriesPerServing: 300, servingSize: "1 کاسه", category: "سوپ" },
      { name: "آش انار", caloriesPerServing: 280, servingSize: "1 کاسه", category: "سوپ" },
      { name: "آش دوغ", caloriesPerServing: 250, servingSize: "1 کاسه", category: "سوپ" },
      { name: "سوپ جو", caloriesPerServing: 200, servingSize: "1 کاسه", category: "سوپ" },

      // میوه ها
      { name: "سیب", caloriesPerServing: 80, servingSize: "1 عدد متوسط", category: "میوه" },
      { name: "پرتقال", caloriesPerServing: 60, servingSize: "1 عدد متوسط", category: "میوه" },
      { name: "موز", caloriesPerServing: 100, servingSize: "1 عدد متوسط", category: "میوه" },
      { name: "انگور", caloriesPerServing: 120, servingSize: "1 پیمانه", category: "میوه" },
      { name: "خرما", caloriesPerServing: 20, servingSize: "1 عدد", category: "میوه" },
      { name: "انجیر", caloriesPerServing: 50, servingSize: "1 عدد متوسط", category: "میوه" },
      { name: "هندوانه", caloriesPerServing: 40, servingSize: "1 برش", category: "میوه" },
      { name: "طالبی", caloriesPerServing: 50, servingSize: "1 برش", category: "میوه" },

      // سبزیجات
      { name: "سالاد شیرازی", caloriesPerServing: 80, servingSize: "1 پیمانه", category: "سبزیجات" },
      { name: "سالاد فصل", caloriesPerServing: 60, servingSize: "1 پیمانه", category: "سبزیجات" },
      { name: "کاهو", caloriesPerServing: 15, servingSize: "1 پیمانه", category: "سبزیجات" },
      { name: "خیار", caloriesPerServing: 16, servingSize: "1 عدد متوسط", category: "سبزیجات" },
      { name: "گوجه فرنگی", caloriesPerServing: 22, servingSize: "1 عدد متوسط", category: "سبزیجات" },

      // نوشیدنی ها
      { name: "چای", caloriesPerServing: 2, servingSize: "1 استکان", category: "نوشیدنی" },
      { name: "قهوه", caloriesPerServing: 5, servingSize: "1 فنجان", category: "نوشیدنی" },
      { name: "دوغ", caloriesPerServing: 80, servingSize: "1 لیوان", category: "نوشیدنی" },
      { name: "آب آلبالو", caloriesPerServing: 120, servingSize: "1 لیوان", category: "نوشیدنی" },

      // لبنیات
      { name: "ماست", caloriesPerServing: 100, servingSize: "1 پیمانه", category: "لبنیات" },
      { name: "پنیر سفید", caloriesPerServing: 120, servingSize: "50 گرم", category: "لبنیات" },
      { name: "شیر", caloriesPerServing: 150, servingSize: "1 لیوان", category: "لبنیات" },

      // خشکبار
      { name: "گردو", caloriesPerServing: 185, servingSize: "30 گرم", category: "خشکبار" },
      { name: "بادام", caloriesPerServing: 170, servingSize: "30 گرم", category: "خشکبار" },
      { name: "پسته", caloriesPerServing: 160, servingSize: "30 گرم", category: "خشکبار" },
      { name: "کشمش", caloriesPerServing: 130, servingSize: "40 گرم", category: "خشکبار" },

      // غذاهای کامل
      { name: "چلو کباب", caloriesPerServing: 650, servingSize: "1 سرو", category: "غذای کامل" },
      { name: "زرشک پلو با مرغ", caloriesPerServing: 580, servingSize: "1 سرو", category: "غذای کامل" },
      { name: "قیمه پلو", caloriesPerServing: 520, servingSize: "1 سرو", category: "غذای کامل" },
      { name: "لوبیا پلو", caloriesPerServing: 480, servingSize: "1 سرو", category: "غذای کامل" }
    ];

    persianFoods.forEach(food => {
      const id = randomUUID();
      this.foods.set(id, { ...food, id });
    });

    // Add comprehensive exercise database
    const exercises: InsertExercise[] = [
      // سینه (Chest)
      { name: "پرس سینه با بار صاف", category: "سینه", muscleGroups: ["سینه", "سه‌سر", "شانه جلو"], caloriesPerMinute: 8 },
      { name: "پرس سینه با بار شیب دار", category: "سینه", muscleGroups: ["سینه بالا", "سه‌سر", "شانه جلو"], caloriesPerMinute: 8 },
      { name: "پرس سینه با بار شیب منفی", category: "سینه", muscleGroups: ["سینه پایین", "سه‌سر"], caloriesPerMinute: 8 },
      { name: "پرس سینه با دمبل صاف", category: "سینه", muscleGroups: ["سینه", "سه‌سر"], caloriesPerMinute: 7 },
      { name: "پرس سینه با دمبل شیب دار", category: "سینه", muscleGroups: ["سینه بالا", "سه‌سر"], caloriesPerMinute: 7 },
      { name: "شنا با دمبل", category: "سینه", muscleGroups: ["سینه", "شانه جلو"], caloriesPerMinute: 6 },
      { name: "دیپ روی میله موازی", category: "سینه", muscleGroups: ["سینه پایین", "سه‌سر"], caloriesPerMinute: 9 },
      { name: "شنای کابل", category: "سینه", muscleGroups: ["سینه"], caloriesPerMinute: 6 },
      { name: "پوش آپ", category: "سینه", muscleGroups: ["سینه", "سه‌سر", "شانه"], caloriesPerMinute: 7 },
      { name: "پک دک", category: "سینه", muscleGroups: ["سینه"], caloriesPerMinute: 5 },

      // پشت (Back)
      { name: "ددلیفت کلاسیک", category: "پشت", muscleGroups: ["پشت", "همسترینگ", "باسن", "تراپز"], caloriesPerMinute: 12 },
      { name: "پول آپ", category: "پشت", muscleGroups: ["پشت", "دوسر"], caloriesPerMinute: 10 },
      { name: "چین آپ", category: "پشت", muscleGroups: ["دوسر", "پشت"], caloriesPerMinute: 9 },
      { name: "قایقرانی با بار", category: "پشت", muscleGroups: ["پشت میانی", "دوسر", "ترپز میانی"], caloriesPerMinute: 8 },
      { name: "قایقرانی با دمبل", category: "پشت", muscleGroups: ["پشت", "دوسر"], caloriesPerMinute: 7 },
      { name: "لت پول داون", category: "پشت", muscleGroups: ["پشت", "دوسر"], caloriesPerMinute: 7 },
      { name: "کشش کابل نشسته", category: "پشت", muscleGroups: ["پشت میانی", "دوسر"], caloriesPerMinute: 6 },
      { name: "تی بار رو", category: "پشت", muscleGroups: ["پشت", "ترپز میانی"], caloriesPerMinute: 8 },

      // پا (Legs)
      { name: "اسکات با بار پشت", category: "پا", muscleGroups: ["چهارسر", "باسن", "همسترینگ"], caloriesPerMinute: 10 },
      { name: "اسکات با بار جلو", category: "پا", muscleGroups: ["چهارسر", "باسن"], caloriesPerMinute: 10 },
      { name: "لانژ جلو", category: "پا", muscleGroups: ["چهارسر", "باسن"], caloriesPerMinute: 8 },
      { name: "لانژ عقب", category: "پا", muscleGroups: ["چهارسر", "باسن"], caloriesPerMinute: 8 },
      { name: "لگ پرس", category: "پا", muscleGroups: ["چهارسر", "باسن"], caloriesPerMinute: 9 },
      { name: "رومانین ددلیفت", category: "پا", muscleGroups: ["همسترینگ", "باسن"], caloriesPerMinute: 8 },
      { name: "لگ کرل", category: "پا", muscleGroups: ["همسترینگ"], caloriesPerMinute: 6 },
      { name: "لگ اکستنشن", category: "پا", muscleGroups: ["چهارسر"], caloriesPerMinute: 6 },
      { name: "کاف ریز", category: "پا", muscleGroups: ["ساق پا"], caloriesPerMinute: 5 },
      { name: "بلغاری اسکات", category: "پا", muscleGroups: ["چهارسر", "باسن"], caloriesPerMinute: 9 },

      // شانه (Shoulders)
      { name: "پرس شانه با بار نشسته", category: "شانه", muscleGroups: ["شانه", "سه‌سر"], caloriesPerMinute: 7 },
      { name: "پرس شانه با بار ایستاده", category: "شانه", muscleGroups: ["شانه", "سه‌سر", "کور"], caloriesPerMinute: 8 },
      { name: "پرس شانه با دمبل", category: "شانه", muscleGroups: ["شانه", "سه‌سر"], caloriesPerMinute: 7 },
      { name: "رایز جانبی", category: "شانه", muscleGroups: ["شانه میانی"], caloriesPerMinute: 5 },
      { name: "رایز جلو", category: "شانه", muscleGroups: ["شانه جلو"], caloriesPerMinute: 5 },
      { name: "رایز عقب", category: "شانه", muscleGroups: ["شانه عقب"], caloriesPerMinute: 5 },
      { name: "شراگ با بار", category: "شانه", muscleGroups: ["تراپز"], caloriesPerMinute: 6 },
      { name: "شراگ با دمبل", category: "شانه", muscleGroups: ["تراپز"], caloriesPerMinute: 6 },
      { name: "آپ رایت رو", category: "شانه", muscleGroups: ["شانه", "تراپز"], caloriesPerMinute: 6 },

      // بازو (Arms)
      { name: "جلو بازو با بار", category: "بازو", muscleGroups: ["دوسر"], caloriesPerMinute: 5 },
      { name: "جلو بازو با دمبل", category: "بازو", muscleGroups: ["دوسر"], caloriesPerMinute: 5 },
      { name: "جلو بازو چکشی", category: "بازو", muscleGroups: ["دوسر", "ساعد"], caloriesPerMinute: 5 },
      { name: "جلو بازو کابل", category: "بازو", muscleGroups: ["دوسر"], caloriesPerMinute: 5 },
      { name: "پشت بازو روی سر", category: "بازو", muscleGroups: ["سه‌سر"], caloriesPerMinute: 5 },
      { name: "پشت بازو کابل", category: "بازو", muscleGroups: ["سه‌سر"], caloriesPerMinute: 5 },
      { name: "دیپ میز", category: "بازو", muscleGroups: ["سه‌سر"], caloriesPerMinute: 6 },
      { name: "کلوز گریپ پرس", category: "بازو", muscleGroups: ["سه‌سر", "سینه"], caloriesPerMinute: 7 },

      // شکم (Abs/Core)
      { name: "پلانک کلاسیک", category: "شکم", muscleGroups: ["شکم", "کمر"], caloriesPerMinute: 4 },
      { name: "پلانک جانبی", category: "شکم", muscleGroups: ["شکم جانبی", "کمر"], caloriesPerMinute: 4 },
      { name: "کرانچ کلاسیک", category: "شکم", muscleGroups: ["شکم بالا"], caloriesPerMinute: 4 },
      { name: "کرانچ معکوس", category: "شکم", muscleGroups: ["شکم پایین"], caloriesPerMinute: 5 },
      { name: "پای آویزان", category: "شکم", muscleGroups: ["شکم پایین"], caloriesPerMinute: 6 },
      { name: "دوچرخه", category: "شکم", muscleGroups: ["شکم", "پهلو"], caloriesPerMinute: 5 },
      { name: "کرانچ روسی", category: "شکم", muscleGroups: ["شکم", "پهلو"], caloriesPerMinute: 6 },
      { name: "مانتین کلایمبر", category: "شکم", muscleGroups: ["شکم", "کور"], caloriesPerMinute: 8 },

      // کاردیو (Cardio)
      { name: "دویدن روی ترید میل", category: "کاردیو", muscleGroups: ["پا", "قلب"], caloriesPerMinute: 12 },
      { name: "دوچرخه ثابت", category: "کاردیو", muscleGroups: ["پا", "قلب"], caloriesPerMinute: 10 },
      { name: "ایلیپتیکال", category: "کاردیو", muscleGroups: ["تمام بدن", "قلب"], caloriesPerMinute: 11 },
      { name: "طناب زدن", category: "کاردیو", muscleGroups: ["تمام بدن", "ساق پا"], caloriesPerMinute: 13 },
      { name: "برپی", category: "کاردیو", muscleGroups: ["تمام بدن"], caloriesPerMinute: 15 },
      { name: "جامپینگ جک", category: "کاردیو", muscleGroups: ["تمام بدن"], caloriesPerMinute: 10 },
      { name: "های نی", category: "کاردیو", muscleGroups: ["پا", "شکم"], caloriesPerMinute: 11 }
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

  // Workout plan operations
  async getWorkoutPlan(id: string): Promise<WorkoutPlan | undefined> {
    return this.workoutPlans.get(id);
  }

  async getWorkoutPlansByUser(userId: string): Promise<WorkoutPlan[]> {
    return Array.from(this.workoutPlans.values())
      .filter(plan => plan.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getActiveWorkoutPlan(userId: string): Promise<WorkoutPlan | undefined> {
    return Array.from(this.workoutPlans.values())
      .find(plan => plan.userId === userId && plan.isActive);
  }

  async createWorkoutPlan(insertPlan: InsertWorkoutPlan): Promise<WorkoutPlan> {
    const id = randomUUID();
    const plan: WorkoutPlan = { 
      ...insertPlan, 
      id, 
      createdAt: new Date(),
      isActive: insertPlan.isActive || false
    };
    this.workoutPlans.set(id, plan);
    return plan;
  }

  async updateWorkoutPlan(id: string, updates: Partial<WorkoutPlan>): Promise<WorkoutPlan | undefined> {
    const plan = this.workoutPlans.get(id);
    if (!plan) return undefined;
    const updatedPlan = { ...plan, ...updates };
    this.workoutPlans.set(id, updatedPlan);
    return updatedPlan;
  }

  async deleteWorkoutPlan(id: string): Promise<boolean> {
    // Also delete associated exercises
    const exercises = Array.from(this.workoutPlanExercises.values())
      .filter(exercise => exercise.workoutPlanId === id);
    exercises.forEach(exercise => this.workoutPlanExercises.delete(exercise.id));
    
    return this.workoutPlans.delete(id);
  }

  async setActiveWorkoutPlan(userId: string, planId: string): Promise<boolean> {
    // First, deactivate all existing plans for this user
    Array.from(this.workoutPlans.values())
      .filter(plan => plan.userId === userId && plan.isActive)
      .forEach(plan => {
        this.workoutPlans.set(plan.id, { ...plan, isActive: false });
      });

    // Then activate the specified plan
    const plan = this.workoutPlans.get(planId);
    if (!plan || plan.userId !== userId) return false;
    
    this.workoutPlans.set(planId, { ...plan, isActive: true });
    return true;
  }

  // Workout plan exercise operations
  async getWorkoutPlanExercises(planId: string): Promise<WorkoutPlanExercise[]> {
    return Array.from(this.workoutPlanExercises.values())
      .filter(exercise => exercise.workoutPlanId === planId)
      .sort((a, b) => a.order - b.order);
  }

  async createWorkoutPlanExercise(insertExercise: InsertWorkoutPlanExercise): Promise<WorkoutPlanExercise> {
    const id = randomUUID();
    const exercise: WorkoutPlanExercise = { ...insertExercise, id };
    this.workoutPlanExercises.set(id, exercise);
    return exercise;
  }

  async updateWorkoutPlanExercise(id: string, updates: Partial<WorkoutPlanExercise>): Promise<WorkoutPlanExercise | undefined> {
    const exercise = this.workoutPlanExercises.get(id);
    if (!exercise) return undefined;
    const updatedExercise = { ...exercise, ...updates };
    this.workoutPlanExercises.set(id, updatedExercise);
    return updatedExercise;
  }

  async deleteWorkoutPlanExercise(id: string): Promise<boolean> {
    return this.workoutPlanExercises.delete(id);
  }
}

export const storage = new MemStorage();
