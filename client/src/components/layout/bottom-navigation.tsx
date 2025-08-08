import { useLocation, Link } from "wouter";
import { Home, Utensils, Dumbbell, TrendingUp, User } from "lucide-react";

const navigationItems = [
  { 
    path: "/", 
    icon: Home, 
    label: "خانه",
    testId: "nav-home"
  },
  { 
    path: "/food", 
    icon: Utensils, 
    label: "غذا",
    testId: "nav-food"
  },
  { 
    path: "/workout", 
    icon: Dumbbell, 
    label: "تمرین",
    testId: "nav-workout"
  },
  { 
    path: "/progress", 
    icon: TrendingUp, 
    label: "پیشرفت",
    testId: "nav-progress"
  },
  { 
    path: "/profile", 
    icon: User, 
    label: "پروفایل",
    testId: "nav-profile"
  },
];

export default function BottomNavigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around">
        {navigationItems.map(({ path, icon: Icon, label, testId }) => {
          const isActive = location === path || (path !== "/" && location.startsWith(path));
          
          return (
            <Link key={path} href={path}>
              <button 
                className={`flex flex-col items-center py-2 px-3 transition-colors ${
                  isActive 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-primary"
                }`}
                data-testid={testId}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
