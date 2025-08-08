export interface PersianFood {
  id: string;
  name: string;
  caloriesPerServing: number;
  servingSize: string;
  category: string;
  description?: string;
}

export const persianFoods: PersianFood[] = [
  // غلات و نان
  {
    id: "1",
    name: "برنج سفید",
    caloriesPerServing: 205,
    servingSize: "1 پیمانه (150 گرم)",
    category: "غلات",
    description: "برنج سفید پخته"
  },
  {
    id: "2",
    name: "برنج زعفرانی",
    caloriesPerServing: 280,
    servingSize: "1 پیمانه (150 گرم)",
    category: "غلات",
    description: "برنج پخته شده با زعفران"
  },
  {
    id: "3",
    name: "زرشک پلو",
    caloriesPerServing: 320,
    servingSize: "1 پیمانه",
    category: "غلات",
    description: "برنج با زرشک و زعفران"
  },
  {
    id: "4",
    name: "عدس پلو",
    caloriesPerServing: 290,
    servingSize: "1 پیمانه",
    category: "غلات",
    description: "برنج با عدس و خرما"
  },
  {
    id: "5",
    name: "باقالی پلو",
    caloriesPerServing: 310,
    servingSize: "1 پیمانه",
    category: "غلات",
    description: "برنج با باقالی و شوید"
  },
  {
    id: "6",
    name: "نان بربری",
    caloriesPerServing: 240,
    servingSize: "1 عدد (80 گرم)",
    category: "غلات",
    description: "نان سنتی ایرانی"
  },
  {
    id: "7",
    name: "نان سنگک",
    caloriesPerServing: 260,
    servingSize: "1 عدد (85 گرم)",
    category: "غلات",
    description: "نان سنگک کامل"
  },
  {
    id: "8",
    name: "نان تافتون",
    caloriesPerServing: 200,
    servingSize: "1 عدد (70 گرم)",
    category: "غلات",
    description: "نان نازک تافتون"
  },
  {
    id: "9",
    name: "نان لواش",
    caloriesPerServing: 180,
    servingSize: "1 عدد (60 گرم)",
    category: "غلات",
    description: "نان نازک لواش"
  },

  // پروتئین ها
  {
    id: "10",
    name: "کباب کوبیده",
    caloriesPerServing: 450,
    servingSize: "2 سیخ (200 گرم)",
    category: "پروتئین",
    description: "کباب گوشت چرخ کرده"
  },
  {
    id: "11",
    name: "جوجه کباب",
    caloriesPerServing: 380,
    servingSize: "1 سرو (180 گرم)",
    category: "پروتئین",
    description: "کباب مرغ تنوری"
  },
  {
    id: "12",
    name: "کباب برگ",
    caloriesPerServing: 520,
    servingSize: "1 سیخ (250 گرم)",
    category: "پروتئین",
    description: "کباب گوشت قرمز"
  },
  {
    id: "13",
    name: "کباب بختیاری",
    caloriesPerServing: 480,
    servingSize: "1 سیخ (220 گرم)",
    category: "پروتئین",
    description: "ترکیب جوجه و کوبیده"
  },
  {
    id: "14",
    name: "ماهی سالمون",
    caloriesPerServing: 350,
    servingSize: "1 قطعه (150 گرم)",
    category: "پروتئین",
    description: "ماهی سالمون کبابی"
  },
  {
    id: "15",
    name: "ماهی آزاد",
    caloriesPerServing: 320,
    servingSize: "1 قطعه (150 گرم)",
    category: "پروتئین",
    description: "ماهی آزاد دریای خزر"
  },
  {
    id: "16",
    name: "مرغ تنوری",
    caloriesPerServing: 280,
    servingSize: "1 قطعه (120 گرم)",
    category: "پروتئین",
    description: "مرغ پخته در تنور"
  },
  {
    id: "17",
    name: "گوشت قرمز",
    caloriesPerServing: 400,
    servingSize: "100 گرم",
    category: "پروتئین",
    description: "گوشت گوساله یا گوسفند"
  },
  {
    id: "18",
    name: "تخم مرغ",
    caloriesPerServing: 70,
    servingSize: "1 عدد",
    category: "پروتئین",
    description: "تخم مرغ پخته"
  },

  // خورش ها
  {
    id: "19",
    name: "قورمه سبزی",
    caloriesPerServing: 320,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش سبزیجات با گوشت و لوبیا"
  },
  {
    id: "20",
    name: "فسنجان",
    caloriesPerServing: 420,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش انار با گردو"
  },
  {
    id: "21",
    name: "کرفس",
    caloriesPerServing: 280,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش کرفس با گوشت"
  },
  {
    id: "22",
    name: "بامیه",
    caloriesPerServing: 250,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش بامیه با گوشت"
  },
  {
    id: "23",
    name: "بادمجان",
    caloriesPerServing: 290,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش بادمجان"
  },
  {
    id: "24",
    name: "کشک بادمجان",
    caloriesPerServing: 220,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "بادمجان سرخ شده با کشک"
  },
  {
    id: "25",
    name: "خورش کدو",
    caloriesPerServing: 200,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش کدو سبز"
  },
  {
    id: "26",
    name: "آلو اسفناج",
    caloriesPerServing: 260,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش آلو و اسفناج"
  },

  // کوکو ها
  {
    id: "27",
    name: "کوکو سبزی",
    caloriesPerServing: 180,
    servingSize: "1 برش",
    category: "کوکو",
    description: "کوکوی سبزیجات معطر"
  },
  {
    id: "28",
    name: "کوکو سیب زمینی",
    caloriesPerServing: 220,
    servingSize: "1 برش",
    category: "کوکو",
    description: "کوکو سیب زمینی"
  },
  {
    id: "29",
    name: "کوکو بادمجان",
    caloriesPerServing: 200,
    servingSize: "1 برش",
    category: "کوکو",
    description: "کوکو بادمجان"
  },

  // آش و سوپ
  {
    id: "30",
    name: "آش رشته",
    caloriesPerServing: 300,
    servingSize: "1 کاسه",
    category: "سوپ",
    description: "آش سبزیجات با رشته"
  },
  {
    id: "31",
    name: "آش انار",
    caloriesPerServing: 280,
    servingSize: "1 کاسه",
    category: "سوپ",
    description: "آش انار با گردو"
  },
  {
    id: "32",
    name: "آش دوغ",
    caloriesPerServing: 250,
    servingSize: "1 کاسه",
    category: "سوپ",
    description: "آش دوغ با سبزیجات"
  },
  {
    id: "33",
    name: "سوپ جو",
    caloriesPerServing: 200,
    servingSize: "1 کاسه",
    category: "سوپ",
    description: "سوپ جو پرک"
  },

  // میوه ها
  {
    id: "34",
    name: "سیب",
    caloriesPerServing: 80,
    servingSize: "1 عدد متوسط",
    category: "میوه",
    description: "سیب تازه"
  },
  {
    id: "35",
    name: "پرتقال",
    caloriesPerServing: 60,
    servingSize: "1 عدد متوسط",
    category: "میوه",
    description: "پرتقال تازه"
  },
  {
    id: "36",
    name: "موز",
    caloriesPerServing: 100,
    servingSize: "1 عدد متوسط",
    category: "میوه",
    description: "موز رسیده"
  },
  {
    id: "37",
    name: "انگور",
    caloriesPerServing: 120,
    servingSize: "1 پیمانه",
    category: "میوه",
    description: "انگور تازه"
  },
  {
    id: "38",
    name: "خرما",
    caloriesPerServing: 20,
    servingSize: "1 عدد",
    category: "میوه",
    description: "خرما خشک"
  },
  {
    id: "39",
    name: "انجیر",
    caloriesPerServing: 50,
    servingSize: "1 عدد متوسط",
    category: "میوه",
    description: "انجیر تازه"
  },
  {
    id: "40",
    name: "هندوانه",
    caloriesPerServing: 40,
    servingSize: "1 برش",
    category: "میوه",
    description: "هندوانه تازه"
  },
  {
    id: "41",
    name: "طالبی",
    caloriesPerServing: 50,
    servingSize: "1 برش",
    category: "میوه",
    description: "طالبی تازه"
  },

  // سبزیجات
  {
    id: "42",
    name: "سالاد شیرازی",
    caloriesPerServing: 80,
    servingSize: "1 پیمانه",
    category: "سبزیجات",
    description: "سالاد خیار و گوجه"
  },
  {
    id: "43",
    name: "سالاد فصل",
    caloriesPerServing: 60,
    servingSize: "1 پیمانه",
    category: "سبزیجات",
    description: "سالاد سبزیجات فصل"
  },
  {
    id: "44",
    name: "کاهو",
    caloriesPerServing: 15,
    servingSize: "1 پیمانه",
    category: "سبزیجات",
    description: "برگ کاهو تازه"
  },
  {
    id: "45",
    name: "خیار",
    caloriesPerServing: 16,
    servingSize: "1 عدد متوسط",
    category: "سبزیجات",
    description: "خیار تازه"
  },
  {
    id: "46",
    name: "گوجه فرنگی",
    caloriesPerServing: 22,
    servingSize: "1 عدد متوسط",
    category: "سبزیجات",
    description: "گوجه فرنگی تازه"
  },

  // نوشیدنی ها
  {
    id: "47",
    name: "چای",
    caloriesPerServing: 2,
    servingSize: "1 استکان",
    category: "نوشیدنی",
    description: "چای بدون شکر"
  },
  {
    id: "48",
    name: "قهوه",
    caloriesPerServing: 5,
    servingSize: "1 فنجان",
    category: "نوشیدنی",
    description: "قهوه بدون شکر"
  },
  {
    id: "49",
    name: "دوغ",
    caloriesPerServing: 80,
    servingSize: "1 لیوان",
    category: "نوشیدنی",
    description: "دوغ سنتی"
  },
  {
    id: "50",
    name: "آب آلبالو",
    caloriesPerServing: 120,
    servingSize: "1 لیوان",
    category: "نوشیدنی",
    description: "شربت آلبالو"
  },

  // لبنیات
  {
    id: "51",
    name: "ماست",
    caloriesPerServing: 100,
    servingSize: "1 پیمانه",
    category: "لبنیات",
    description: "ماست کم چرب"
  },
  {
    id: "52",
    name: "پنیر سفید",
    caloriesPerServing: 120,
    servingSize: "50 گرم",
    category: "لبنیات",
    description: "پنیر سفید ایرانی"
  },
  {
    id: "53",
    name: "شیر",
    caloriesPerServing: 150,
    servingSize: "1 لیوان",
    category: "لبنیات",
    description: "شیر کم چرب"
  },

  // خشکبار
  {
    id: "54",
    name: "گردو",
    caloriesPerServing: 185,
    servingSize: "30 گرم",
    category: "خشکبار",
    description: "گردو خشک"
  },
  {
    id: "55",
    name: "بادام",
    caloriesPerServing: 170,
    servingSize: "30 گرم",
    category: "خشکبار",
    description: "بادام شیرین"
  },
  {
    id: "56",
    name: "پسته",
    caloriesPerServing: 160,
    servingSize: "30 گرم",
    category: "خشکبار",
    description: "پسته اکبری"
  },
  {
    id: "57",
    name: "کشمش",
    caloriesPerServing: 130,
    servingSize: "40 گرم",
    category: "خشکبار",
    description: "کشمش آفتابی"
  },

  // غذاهای کامل
  {
    id: "58",
    name: "چلو کباب",
    caloriesPerServing: 650,
    servingSize: "1 سرو",
    category: "غذای کامل",
    description: "برنج با کباب کوبیده"
  },
  {
    id: "59",
    name: "زرشک پلو با مرغ",
    caloriesPerServing: 580,
    servingSize: "1 سرو",
    category: "غذای کامل",
    description: "زرشک پلو با مرغ"
  },
  {
    id: "60",
    name: "قیمه پلو",
    caloriesPerServing: 520,
    servingSize: "1 سرو",
    category: "غذای کامل",
    description: "برنج با خورش قیمه"
  },
  {
    id: "61",
    name: "لوبیا پلو",
    caloriesPerServing: 480,
    servingSize: "1 سرو",
    category: "غذای کامل",
    description: "برنج با خورش لوبیا"
  }
];
