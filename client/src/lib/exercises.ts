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
  // سینه
  {
    id: "1",
    name: "پرس سینه با بار",
    category: "سینه",
    muscleGroups: ["سینه", "سه‌سر", "شانه جلو"],
    caloriesPerMinute: 8,
    description: "پرس سینه با بار روی نیمکت صاف",
    difficulty: "متوسط"
  },
  {
    id: "2",
    name: "پرس سینه با دمبل",
    category: "سینه",
    muscleGroups: ["سینه", "سه‌سر"],
    caloriesPerMinute: 7,
    description: "پرس سینه با دمبل روی نیمکت",
    difficulty: "متوسط"
  },
  {
    id: "3",
    name: "شنا با دمبل",
    category: "سینه",
    muscleGroups: ["سینه", "شانه جلو"],
    caloriesPerMinute: 6,
    description: "حرکت شنا با دمبل",
    difficulty: "متوسط"
  },
  {
    id: "4",
    name: "دیپ",
    category: "سینه",
    muscleGroups: ["سینه پایین", "سه‌سر"],
    caloriesPerMinute: 9,
    description: "دیپ روی میله موازی",
    difficulty: "پیشرفته"
  },
  // پشت
  {
    id: "5",
    name: "ددلیفت",
    category: "پشت",
    muscleGroups: ["پشت", "همسترینگ", "باسن"],
    caloriesPerMinute: 12,
    description: "ددلیفت با بار",
    difficulty: "پیشرفته"
  },
  {
    id: "6",
    name: "پول آپ",
    category: "پشت",
    muscleGroups: ["پشت", "دوسر"],
    caloriesPerMinute: 10,
    description: "بارفیکس",
    difficulty: "پیشرفته"
  },
  {
    id: "7",
    name: "قایقرانی",
    category: "پشت",
    muscleGroups: ["پشت میانی", "دوسر"],
    caloriesPerMinute: 8,
    description: "قایقرانی با بار یا دمبل",
    difficulty: "متوسط"
  },
  {
    id: "8",
    name: "لت پول داون",
    category: "پشت",
    muscleGroups: ["پشت", "دوسر"],
    caloriesPerMinute: 7,
    description: "کشش لت با کابل",
    difficulty: "متوسط"
  },
  // پا
  {
    id: "9",
    name: "اسکات با بار",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن", "همسترینگ"],
    caloriesPerMinute: 10,
    description: "اسکات با بار روی شانه",
    difficulty: "پیشرفته"
  },
  {
    id: "10",
    name: "لانژ",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 8,
    description: "حرکت لانژ جلو",
    difficulty: "متوسط"
  },
  {
    id: "11",
    name: "لگ پرس",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 9,
    description: "پرس پا روی دستگاه",
    difficulty: "متوسط"
  },
  {
    id: "12",
    name: "رومانین ددلیفت",
    category: "پا",
    muscleGroups: ["همسترینگ", "باسن"],
    caloriesPerMinute: 8,
    description: "ددلیفت رومانین برای همسترینگ",
    difficulty: "متوسط"
  },
  // شانه
  {
    id: "13",
    name: "پرس شانه با بار",
    category: "شانه",
    muscleGroups: ["شانه", "سه‌سر"],
    caloriesPerMinute: 7,
    description: "پرس بالای سر با بار",
    difficulty: "متوسط"
  },
  {
    id: "14",
    name: "رایز جانبی",
    category: "شانه",
    muscleGroups: ["شانه میانی"],
    caloriesPerMinute: 5,
    description: "بالا بردن دمبل از کنار",
    difficulty: "مبتدی"
  },
  {
    id: "15",
    name: "رایز جلو",
    category: "شانه",
    muscleGroups: ["شانه جلو"],
    caloriesPerMinute: 5,
    description: "بالا بردن دمبل از جلو",
    difficulty: "مبتدی"
  },
  {
    id: "16",
    name: "شراگ",
    category: "شانه",
    muscleGroups: ["تراپز"],
    caloriesPerMinute: 6,
    description: "بالا کشیدن شانه با وزنه",
    difficulty: "مبتدی"
  },
  // بازو
  {
    id: "17",
    name: "جلو بازو با بار",
    category: "بازو",
    muscleGroups: ["دوسر"],
    caloriesPerMinute: 5,
    description: "جلو بازو با بار",
    difficulty: "مبتدی"
  },
  {
    id: "18",
    name: "جلو بازو با دمبل",
    category: "بازو",
    muscleGroups: ["دوسر"],
    caloriesPerMinute: 5,
    description: "جلو بازو با دمبل",
    difficulty: "مبتدی"
  },
  {
    id: "19",
    name: "پشت بازو روی سر",
    category: "بازو",
    muscleGroups: ["سه‌سر"],
    caloriesPerMinute: 5,
    description: "پشت بازو با دمبل روی سر",
    difficulty: "متوسط"
  },
  {
    id: "20",
    name: "دیپ میز",
    category: "بازو",
    muscleGroups: ["سه‌سر"],
    caloriesPerMinute: 6,
    description: "دیپ روی میز یا صندلی",
    difficulty: "مبتدی"
  },
  // شکم
  {
    id: "21",
    name: "پلانک",
    category: "شکم",
    muscleGroups: ["شکم", "کمر"],
    caloriesPerMinute: 4,
    description: "نگه داشتن وضعیت پلانک",
    difficulty: "مبتدی"
  },
  {
    id: "22",
    name: "کرانچ",
    category: "شکم",
    muscleGroups: ["شکم بالا"],
    caloriesPerMinute: 4,
    description: "حرکت کرانچ معمولی",
    difficulty: "مبتدی"
  },
  {
    id: "23",
    name: "پای آویزان",
    category: "شکم",
    muscleGroups: ["شکم پایین"],
    caloriesPerMinute: 6,
    description: "بالا آوردن پا در حالت آویزان",
    difficulty: "پیشرفته"
  },
  {
    id: "24",
    name: "دوچرخه",
    category: "شکم",
    muscleGroups: ["شکم", "پهلو"],
    caloriesPerMinute: 5,
    description: "حرکت دوچرخه دراز کش",
    difficulty: "متوسط"
  }
];
