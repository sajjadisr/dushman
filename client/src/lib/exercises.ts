export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  caloriesPerMinute: number;
  description?: string;
  difficulty?: "مبتدی" | "متوسط" | "پیشرفته";
}

export const exercises: Exercise[] = [
  {
    id: "1",
    name: "پرس سینه با دمبل",
    category: "سینه",
    muscleGroups: ["سینه", "سه‌سر"],
    caloriesPerMinute: 8,
    description: "تمرین پرس سینه با دمبل روی نیمکت",
    difficulty: "متوسط"
  },
  {
    id: "2",
    name: "اسکات با بار",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن", "همسترینگ"],
    caloriesPerMinute: 10,
    description: "اسکات با بار روی شانه",
    difficulty: "پیشرفته"
  },
  {
    id: "3",
    name: "کشش پشت",
    category: "پشت",
    muscleGroups: ["پشت", "دوسر"],
    caloriesPerMinute: 7,
    description: "کشش عضلات پشت با کابل",
    difficulty: "متوسط"
  },
  {
    id: "4",
    name: "پرس شانه",
    category: "شانه",
    muscleGroups: ["شانه", "سه‌سر"],
    caloriesPerMinute: 6,
    description: "پرس بالای سر برای شانه",
    difficulty: "متوسط"
  },
  {
    id: "5",
    name: "جلو بازو",
    category: "بازو",
    muscleGroups: ["دوسر"],
    caloriesPerMinute: 5,
    description: "تمرین عضله دوسر بازو",
    difficulty: "مبتدی"
  },
  {
    id: "6",
    name: "پشت بازو",
    category: "بازو",
    muscleGroups: ["سه‌سر"],
    caloriesPerMinute: 5,
    description: "تمرین عضله سه‌سر بازو",
    difficulty: "مبتدی"
  },
  {
    id: "7",
    name: "ددلیفت",
    category: "پا",
    muscleGroups: ["همسترینگ", "باسن", "پشت"],
    caloriesPerMinute: 12,
    description: "بلند کردن وزنه از زمین",
    difficulty: "پیشرفته"
  },
  {
    id: "8",
    name: "شنا",
    category: "سینه",
    muscleGroups: ["سینه", "شانه"],
    caloriesPerMinute: 6,
    description: "تمرین شنا با دمبل",
    difficulty: "متوسط"
  },
  {
    id: "9",
    name: "لانژ",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 8,
    description: "حرکت لانژ برای پا",
    difficulty: "متوسط"
  },
  {
    id: "10",
    name: "پلانک",
    category: "شکم",
    muscleGroups: ["شکم", "کمر"],
    caloriesPerMinute: 4,
    description: "نگه داشتن وضعیت پلانک",
    difficulty: "مبتدی"
  }
];
