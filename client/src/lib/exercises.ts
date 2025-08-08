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
  // سینه (Chest)
  {
    id: "1",
    name: "پرس سینه با بار صاف",
    category: "سینه",
    muscleGroups: ["سینه", "سه‌سر", "شانه جلو"],
    caloriesPerMinute: 8,
    description: "پرس سینه با بار روی نیمکت صاف",
    difficulty: "متوسط"
  },
  {
    id: "2",
    name: "پرس سینه با بار شیب دار",
    category: "سینه",
    muscleGroups: ["سینه بالا", "سه‌سر", "شانه جلو"],
    caloriesPerMinute: 8,
    description: "پرس سینه با بار روی نیمکت شیب دار",
    difficulty: "متوسط"
  },
  {
    id: "3",
    name: "پرس سینه با بار شیب منفی",
    category: "سینه",
    muscleGroups: ["سینه پایین", "سه‌سر"],
    caloriesPerMinute: 8,
    description: "پرس سینه با بار روی نیمکت شیب منفی",
    difficulty: "متوسط"
  },
  {
    id: "4",
    name: "پرس سینه با دمبل صاف",
    category: "سینه",
    muscleGroups: ["سینه", "سه‌سر"],
    caloriesPerMinute: 7,
    description: "پرس سینه با دمبل روی نیمکت صاف",
    difficulty: "متوسط"
  },
  {
    id: "5",
    name: "پرس سینه با دمبل شیب دار",
    category: "سینه",
    muscleGroups: ["سینه بالا", "سه‌سر"],
    caloriesPerMinute: 7,
    description: "پرس سینه با دمبل روی نیمکت شیب دار",
    difficulty: "متوسط"
  },
  {
    id: "6",
    name: "شنا با دمبل",
    category: "سینه",
    muscleGroups: ["سینه", "شانه جلو"],
    caloriesPerMinute: 6,
    description: "حرکت شنا با دمبل",
    difficulty: "متوسط"
  },
  {
    id: "7",
    name: "دیپ روی میله موازی",
    category: "سینه",
    muscleGroups: ["سینه پایین", "سه‌سر"],
    caloriesPerMinute: 9,
    description: "دیپ روی میله موازی",
    difficulty: "پیشرفته"
  },
  {
    id: "8",
    name: "شنای کابل",
    category: "سینه",
    muscleGroups: ["سینه"],
    caloriesPerMinute: 6,
    description: "شنا با کابل",
    difficulty: "متوسط"
  },
  {
    id: "9",
    name: "پوش آپ",
    category: "سینه",
    muscleGroups: ["سینه", "سه‌سر", "شانه"],
    caloriesPerMinute: 7,
    description: "شنای زمینی",
    difficulty: "مبتدی"
  },
  {
    id: "10",
    name: "پک دک",
    category: "سینه",
    muscleGroups: ["سینه"],
    caloriesPerMinute: 5,
    description: "پک دک روی دستگاه",
    difficulty: "مبتدی"
  },

  // پشت (Back)
  {
    id: "11",
    name: "ددلیفت کلاسیک",
    category: "پشت",
    muscleGroups: ["پشت", "همسترینگ", "باسن", "تراپز"],
    caloriesPerMinute: 12,
    description: "ددلیفت کلاسیک با بار",
    difficulty: "پیشرفته"
  },
  {
    id: "12",
    name: "پول آپ",
    category: "پشت",
    muscleGroups: ["پشت", "دوسر"],
    caloriesPerMinute: 10,
    description: "بارفیکس کلاسیک",
    difficulty: "پیشرفته"
  },
  {
    id: "13",
    name: "چین آپ",
    category: "پشت",
    muscleGroups: ["دوسر", "پشت"],
    caloriesPerMinute: 9,
    description: "چین آپ با گریپ معکوس",
    difficulty: "پیشرفته"
  },
  {
    id: "14",
    name: "قایقرانی با بار",
    category: "پشت",
    muscleGroups: ["پشت میانی", "دوسر", "ترپز میانی"],
    caloriesPerMinute: 8,
    description: "قایقرانی با بار خم شده",
    difficulty: "متوسط"
  },
  {
    id: "15",
    name: "قایقرانی با دمبل",
    category: "پشت",
    muscleGroups: ["پشت", "دوسر"],
    caloriesPerMinute: 7,
    description: "قایقرانی تک دست با دمبل",
    difficulty: "متوسط"
  },
  {
    id: "16",
    name: "لت پول داون",
    category: "پشت",
    muscleGroups: ["پشت", "دوسر"],
    caloriesPerMinute: 7,
    description: "کشش لت با کابل",
    difficulty: "متوسط"
  },
  {
    id: "17",
    name: "کشش کابل نشسته",
    category: "پشت",
    muscleGroups: ["پشت میانی", "دوسر"],
    caloriesPerMinute: 6,
    description: "کشش کابل در حالت نشسته",
    difficulty: "مبتدی"
  },
  {
    id: "18",
    name: "تی بار رو",
    category: "پشت",
    muscleGroups: ["پشت", "ترپز میانی"],
    caloriesPerMinute: 8,
    description: "تی بار رو با بار",
    difficulty: "متوسط"
  },

  // پا (Legs)
  {
    id: "19",
    name: "اسکات با بار پشت",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن", "همسترینگ"],
    caloriesPerMinute: 10,
    description: "اسکات با بار روی شانه",
    difficulty: "پیشرفته"
  },
  {
    id: "20",
    name: "اسکات با بار جلو",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 10,
    description: "اسکات با بار جلوی بدن",
    difficulty: "پیشرفته"
  },
  {
    id: "21",
    name: "لانژ جلو",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 8,
    description: "حرکت لانژ به جلو",
    difficulty: "متوسط"
  },
  {
    id: "22",
    name: "لانژ عقب",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 8,
    description: "حرکت لانژ به عقب",
    difficulty: "متوسط"
  },
  {
    id: "23",
    name: "لگ پرس",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 9,
    description: "پرس پا روی دستگاه",
    difficulty: "متوسط"
  },
  {
    id: "24",
    name: "رومانین ددلیفت",
    category: "پا",
    muscleGroups: ["همسترینگ", "باسن"],
    caloriesPerMinute: 8,
    description: "ددلیفت رومانین برای همسترینگ",
    difficulty: "متوسط"
  },
  {
    id: "25",
    name: "لگ کرل",
    category: "پا",
    muscleGroups: ["همسترینگ"],
    caloriesPerMinute: 6,
    description: "خم کردن پا روی دستگاه",
    difficulty: "مبتدی"
  },
  {
    id: "26",
    name: "لگ اکستنشن",
    category: "پا",
    muscleGroups: ["چهارسر"],
    caloriesPerMinute: 6,
    description: "صاف کردن پا روی دستگاه",
    difficulty: "مبتدی"
  },
  {
    id: "27",
    name: "کاف ریز",
    category: "پا",
    muscleGroups: ["ساق پا"],
    caloriesPerMinute: 5,
    description: "بالا آمدن روی پنجه پا",
    difficulty: "مبتدی"
  },
  {
    id: "28",
    name: "بلغاری اسکات",
    category: "پا",
    muscleGroups: ["چهارسر", "باسن"],
    caloriesPerMinute: 9,
    description: "اسکات تک پا با پای عقب روی نیمکت",
    difficulty: "پیشرفته"
  },

  // شانه (Shoulders)
  {
    id: "29",
    name: "پرس شانه با بار نشسته",
    category: "شانه",
    muscleGroups: ["شانه", "سه‌سر"],
    caloriesPerMinute: 7,
    description: "پرس بالای سر با بار نشسته",
    difficulty: "متوسط"
  },
  {
    id: "30",
    name: "پرس شانه با بار ایستاده",
    category: "شانه",
    muscleGroups: ["شانه", "سه‌سر", "کور"],
    caloriesPerMinute: 8,
    description: "پرس بالای سر با بار ایستاده",
    difficulty: "متوسط"
  },
  {
    id: "31",
    name: "پرس شانه با دمبل",
    category: "شانه",
    muscleGroups: ["شانه", "سه‌سر"],
    caloriesPerMinute: 7,
    description: "پرس شانه با دمبل",
    difficulty: "متوسط"
  },
  {
    id: "32",
    name: "رایز جانبی",
    category: "شانه",
    muscleGroups: ["شانه میانی"],
    caloriesPerMinute: 5,
    description: "بالا بردن دمبل از کنار",
    difficulty: "مبتدی"
  },
  {
    id: "33",
    name: "رایز جلو",
    category: "شانه",
    muscleGroups: ["شانه جلو"],
    caloriesPerMinute: 5,
    description: "بالا بردن دمبل از جلو",
    difficulty: "مبتدی"
  },
  {
    id: "34",
    name: "رایز عقب",
    category: "شانه",
    muscleGroups: ["شانه عقب"],
    caloriesPerMinute: 5,
    description: "رایز عقب با دمبل",
    difficulty: "مبتدی"
  },
  {
    id: "35",
    name: "شراگ با بار",
    category: "شانه",
    muscleGroups: ["تراپز"],
    caloriesPerMinute: 6,
    description: "بالا کشیدن شانه با بار",
    difficulty: "مبتدی"
  },
  {
    id: "36",
    name: "شراگ با دمبل",
    category: "شانه",
    muscleGroups: ["تراپز"],
    caloriesPerMinute: 6,
    description: "بالا کشیدن شانه با دمبل",
    difficulty: "مبتدی"
  },
  {
    id: "37",
    name: "آپ رایت رو",
    category: "شانه",
    muscleGroups: ["شانه", "تراپز"],
    caloriesPerMinute: 6,
    description: "کشیدن بار به زیر چانه",
    difficulty: "متوسط"
  },

  // بازو (Arms)
  {
    id: "38",
    name: "جلو بازو با بار",
    category: "بازو",
    muscleGroups: ["دوسر"],
    caloriesPerMinute: 5,
    description: "جلو بازو با بار ایستاده",
    difficulty: "مبتدی"
  },
  {
    id: "39",
    name: "جلو بازو با دمبل",
    category: "بازو",
    muscleGroups: ["دوسر"],
    caloriesPerMinute: 5,
    description: "جلو بازو با دمبل",
    difficulty: "مبتدی"
  },
  {
    id: "40",
    name: "جلو بازو چکشی",
    category: "بازو",
    muscleGroups: ["دوسر", "ساعد"],
    caloriesPerMinute: 5,
    description: "جلو بازو با گریپ چکشی",
    difficulty: "مبتدی"
  },
  {
    id: "41",
    name: "جلو بازو کابل",
    category: "بازو",
    muscleGroups: ["دوسر"],
    caloriesPerMinute: 5,
    description: "جلو بازو با کابل",
    difficulty: "مبتدی"
  },
  {
    id: "42",
    name: "پشت بازو روی سر",
    category: "بازو",
    muscleGroups: ["سه‌سر"],
    caloriesPerMinute: 5,
    description: "پشت بازو با دمبل روی سر",
    difficulty: "متوسط"
  },
  {
    id: "43",
    name: "پشت بازو کابل",
    category: "بازو",
    muscleGroups: ["سه‌سر"],
    caloriesPerMinute: 5,
    description: "پشت بازو با کابل",
    difficulty: "مبتدی"
  },
  {
    id: "44",
    name: "دیپ میز",
    category: "بازو",
    muscleGroups: ["سه‌سر"],
    caloriesPerMinute: 6,
    description: "دیپ روی میز یا صندلی",
    difficulty: "مبتدی"
  },
  {
    id: "45",
    name: "کلوز گریپ پرس",
    category: "بازو",
    muscleGroups: ["سه‌سر", "سینه"],
    caloriesPerMinute: 7,
    description: "پرس با گریپ باریک",
    difficulty: "متوسط"
  },

  // شکم (Abs/Core)
  {
    id: "46",
    name: "پلانک کلاسیک",
    category: "شکم",
    muscleGroups: ["شکم", "کمر"],
    caloriesPerMinute: 4,
    description: "نگه داشتن وضعیت پلانک",
    difficulty: "مبتدی"
  },
  {
    id: "47",
    name: "پلانک جانبی",
    category: "شکم",
    muscleGroups: ["شکم جانبی", "کمر"],
    caloriesPerMinute: 4,
    description: "پلانک روی یک طرف",
    difficulty: "متوسط"
  },
  {
    id: "48",
    name: "کرانچ کلاسیک",
    category: "شکم",
    muscleGroups: ["شکم بالا"],
    caloriesPerMinute: 4,
    description: "حرکت کرانچ معمولی",
    difficulty: "مبتدی"
  },
  {
    id: "49",
    name: "کرانچ معکوس",
    category: "شکم",
    muscleGroups: ["شکم پایین"],
    caloriesPerMinute: 5,
    description: "بالا آوردن پا در حالت دراز",
    difficulty: "متوسط"
  },
  {
    id: "50",
    name: "پای آویزان",
    category: "شکم",
    muscleGroups: ["شکم پایین"],
    caloriesPerMinute: 6,
    description: "بالا آوردن پا در حالت آویزان",
    difficulty: "پیشرفته"
  },
  {
    id: "51",
    name: "دوچرخه",
    category: "شکم",
    muscleGroups: ["شکم", "پهلو"],
    caloriesPerMinute: 5,
    description: "حرکت دوچرخه دراز کش",
    difficulty: "متوسط"
  },
  {
    id: "52",
    name: "کرانچ روسی",
    category: "شکم",
    muscleGroups: ["شکم", "پهلو"],
    caloriesPerMinute: 6,
    description: "حرکت کرانچ روسی با وزنه",
    difficulty: "متوسط"
  },
  {
    id: "53",
    name: "ماونتین کلایمبر",
    category: "شکم",
    muscleGroups: ["شکم", "کور"],
    caloriesPerMinute: 8,
    description: "حرکت کوهنوردی",
    difficulty: "متوسط"
  },

  // کاردیو (Cardio)
  {
    id: "54",
    name: "دویدن روی تردمیل",
    category: "کاردیو",
    muscleGroups: ["پا", "قلب"],
    caloriesPerMinute: 12,
    description: "دویدن روی تردمیل",
    difficulty: "متوسط"
  },
  {
    id: "55",
    name: "دوچرخه ثابت",
    category: "کاردیو",
    muscleGroups: ["پا", "قلب"],
    caloriesPerMinute: 10,
    description: "دوچرخه سواری ثابت",
    difficulty: "مبتدی"
  },
  {
    id: "56",
    name: "ایلیپتیکال",
    category: "کاردیو",
    muscleGroups: ["تمام بدن", "قلب"],
    caloriesPerMinute: 11,
    description: "دستگاه ایلیپتیکال",
    difficulty: "مبتدی"
  },
  {
    id: "57",
    name: "طناب زدن",
    category: "کاردیو",
    muscleGroups: ["تمام بدن", "ساق پا"],
    caloriesPerMinute: 13,
    description: "طناب زدن",
    difficulty: "متوسط"
  },
  {
    id: "58",
    name: "برپی",
    category: "کاردیو",
    muscleGroups: ["تمام بدن"],
    caloriesPerMinute: 15,
    description: "حرکت برپی کامل",
    difficulty: "پیشرفته"
  },
  {
    id: "59",
    name: "جامپینگ جک",
    category: "کاردیو",
    muscleGroups: ["تمام بدن"],
    caloriesPerMinute: 10,
    description: "پرش با باز و بسته کردن پا",
    difficulty: "مبتدی"
  },
  {
    id: "60",
    name: "های نی",
    category: "کاردیو",
    muscleGroups: ["پا", "شکم"],
    caloriesPerMinute: 11,
    description: "بالا آوردن زانو",
    difficulty: "مبتدی"
  }
];
