import MobileHeader from "@/components/layout/mobile-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Target, Bell, HelpCircle, LogOut } from "lucide-react";

export default function Profile() {
  // Mock user data
  const userData = {
    name: "کاربر نمونه",
    joinDate: "اسفند 1402",
    currentWeight: 82.5,
    targetWeight: 78.0,
    dailyCalorieGoal: 2000,
    totalWorkouts: 45,
    totalMealsLogged: 180
  };

  return (
    <div className="pb-20">
      <MobileHeader />
      
      <main className="px-4 py-6">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">{userData.name}</h1>
            <p className="text-sm text-gray-500">عضو از {userData.joinDate}</p>
          </div>
        </Card>

        {/* Stats Overview */}
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">آمار کلی</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userData.totalWorkouts}</div>
              <div className="text-sm text-gray-500">تمرین انجام شده</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{userData.totalMealsLogged}</div>
              <div className="text-sm text-gray-500">وعده ثبت شده</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">وزن فعلی</span>
              <span className="font-medium">{userData.currentWeight} کیلو</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">وزن هدف</span>
              <span className="font-medium">{userData.targetWeight} کیلو</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">هدف کالری روزانه</span>
              <span className="font-medium">{userData.dailyCalorieGoal} کالری</span>
            </div>
          </div>
        </Card>

        {/* Goals & Achievements */}
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            اهداف و دستاوردها
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">کاهش وزن</div>
                <div className="text-sm text-gray-600">هدف: کاهش 5 کیلو</div>
              </div>
              <Badge variant="secondary">در حال انجام</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">تمرین مداوم</div>
                <div className="text-sm text-gray-600">هدف: 30 روز متوالی</div>
              </div>
              <Badge variant="outline">روز 15/30</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">کنترل کالری</div>
                <div className="text-sm text-gray-600">هدف: ثبت روزانه</div>
              </div>
              <Badge className="bg-secondary">تکمیل شده</Badge>
            </div>
          </div>
        </Card>

        {/* Settings Menu */}
        <div className="space-y-2 mb-6">
          <Button 
            variant="outline" 
            className="w-full justify-start h-12"
            data-testid="button-settings"
          >
            <Settings className="ml-3 h-5 w-5" />
            تنظیمات
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-12"
            data-testid="button-notifications"
          >
            <Bell className="ml-3 h-5 w-5" />
            یادآوری‌ها
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-12"
            data-testid="button-help"
          >
            <HelpCircle className="ml-3 h-5 w-5" />
            راهنما و پشتیبانی
          </Button>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50"
          data-testid="button-logout"
        >
          <LogOut className="ml-3 h-5 w-5" />
          خروج از حساب
        </Button>

        {/* App Info */}
        <div className="text-center text-xs text-gray-500 mt-8">
          فود کالری نسخه 1.0.0<br />
          ساخته شده با ❤️ برای سلامت شما
        </div>
      </main>
    </div>
  );
}
