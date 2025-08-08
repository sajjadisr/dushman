import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Food from "@/pages/food";
import Workout from "@/pages/workout";
import Progress from "@/pages/progress";
import Profile from "@/pages/profile";
import BottomNavigation from "@/components/layout/bottom-navigation";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/food" component={Food} />
        <Route path="/workout" component={Workout} />
        <Route path="/progress" component={Progress} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
