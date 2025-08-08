export interface PersianFood {
  id: string;
  name: string;
  caloriesPerServing: number;
  servingSize: string;
  category: string;
  description?: string;
}

export const persianFoods: PersianFood[] = [
  {
    id: "1",
    name: "برنج زعفرانی",
    caloriesPerServing: 280,
    servingSize: "1 پیمانه (150 گرم)",
    category: "غلات",
    description: "برنج پخته شده با زعفران"
  },
  {
    id: "2", 
    name: "کباب کوبیده",
    caloriesPerServing: 450,
    servingSize: "2 سیخ (200 گرم)",
    category: "پروتئین",
    description: "کباب گوشت چرخ کرده"
  },
  {
    id: "3",
    name: "قورمه سبزی",
    caloriesPerServing: 320,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش سبزیجات با گوشت و لوبیا"
  },
  {
    id: "4",
    name: "زرشک پلو",
    caloriesPerServing: 280,
    servingSize: "1 پیمانه",
    category: "غلات",
    description: "برنج با زرشک و زعفران"
  },
  {
    id: "5",
    name: "جوجه کباب",
    caloriesPerServing: 380,
    servingSize: "1 سرو (180 گرم)",
    category: "پروتئین",
    description: "کباب مرغ تنوری"
  },
  {
    id: "6",
    name: "کشک بادمجان",
    caloriesPerServing: 220,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "بادمجان سرخ شده با کشک"
  },
  {
    id: "7",
    name: "آش رشته",
    caloriesPerServing: 300,
    servingSize: "1 کاسه",
    category: "سوپ",
    description: "آش سبزیجات با رشته"
  },
  {
    id: "8",
    name: "کوکو سبزی",
    caloriesPerServing: 180,
    servingSize: "1 برش",
    category: "کوکو",
    description: "کوکوی سبزیجات معطر"
  },
  {
    id: "9",
    name: "فسنجان",
    caloriesPerServing: 420,
    servingSize: "1 پیمانه",
    category: "خورش",
    description: "خورش انار با گردو"
  },
  {
    id: "10",
    name: "چلو کباب",
    caloriesPerServing: 650,
    servingSize: "1 سرو",
    category: "غذای کامل",
    description: "برنج با کباب کوبیده"
  }
];
