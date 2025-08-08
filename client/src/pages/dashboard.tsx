import MobileHeader from "@/components/layout/mobile-header";
import DailySummary from "@/components/dashboard/daily-summary";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentMeals from "@/components/dashboard/recent-meals";
import WorkoutHistory from "@/components/dashboard/workout-history";
import ProgressCharts from "@/components/dashboard/progress-charts";

export default function Dashboard() {
  return (
    <div className="pb-20">
      <MobileHeader />
      
      <main>
        <DailySummary />
        <QuickActions />
        <RecentMeals />
        <WorkoutHistory />
        <ProgressCharts />
      </main>
    </div>
  );
}
