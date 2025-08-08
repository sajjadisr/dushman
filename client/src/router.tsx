import { Router, Route, useLocation } from 'wouter';
import { useState, useEffect } from 'react';

// Pages
import Dashboard from './pages/dashboard';
import Food from './pages/food';
import Workout from './pages/workout';
import Progress from './pages/progress';
import Profile from './pages/profile';
import NotFound from './pages/not-found';

// Get base path from Vite environment
const base = import.meta.env.BASE_URL;

// Custom hook for hash-based location
const useHashLocation = () => {
  const [loc, setLoc] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setLoc(hash);
    };

    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [loc, navigate];
};

export function AppRouter() {
  // Use hash location in production, regular location in development
  const locationHook = process.env.NODE_ENV === 'production' ? useHashLocation : useLocation;

  return (
    <Router base={base} hook={locationHook}>
      <Route path="/" component={Dashboard} />
      <Route path="/food" component={Food} />
      <Route path="/workout" component={Workout} />
      <Route path="/progress" component={Progress} />
      <Route path="/profile" component={Profile} />
      <Route path="/:rest*" component={NotFound} />
    </Router>
  );
}