import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * TopLoadingBar - Displays a sleek neon top loading indicator on route transition
 */
export function TopLoadingBar() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none h-[3px] bg-transparent overflow-hidden">
      <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.9)] animate-top-progress" />
    </div>
  );
}

/**
 * ScrollToTop - Automatically scrolls to top on route change
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/**
 * AnimatedPageWrapper - Applies smooth entry animation (fade-in + slide/scale)
 */
export function AnimatedPageWrapper({ children }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="page-enter-animation w-full flex-1 flex flex-col"
    >
      {children}
    </div>
  );
}
