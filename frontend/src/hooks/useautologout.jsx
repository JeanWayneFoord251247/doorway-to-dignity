import { useEffect } from 'react';

export function useAutoLogout(timeoutMinutes = 15) {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) return;

    const timeoutMs = timeoutMinutes * 60 * 1000;

    const performLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('lastActive');

      window.location.href = '/login';
    };

    let timer;

    const checkAndReset = () => {
      const now = Date.now();
      const lastActive = parseInt(localStorage.getItem('lastActive') || now.toString(), 10);

      if (now - lastActive >= timeoutMs) {
        performLogout();
        return;
      }

      localStorage.setItem('lastActive', now.toString());

      clearTimeout(timer);
      timer = setTimeout(performLogout, timeoutMs);
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, checkAndReset));

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkAndReset();
      }
    });

    checkAndReset();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, checkAndReset));
    };
  }, [timeoutMinutes]);
}
