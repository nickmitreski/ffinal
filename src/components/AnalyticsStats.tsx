import React, { useEffect, useState } from 'react';
import {
  getSessionDurationFormatted,
  getClickCount,
} from '../utils/analytics';

// AnalyticsStats: Shows session duration and click count, updating live
const AnalyticsStats: React.FC = () => {
  const [duration, setDuration] = useState<string>(getSessionDurationFormatted());
  const [clicks, setClicks] = useState<number>(getClickCount());

  // Update session duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(getSessionDurationFormatted());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for click count changes (localStorage is updated elsewhere)
  useEffect(() => {
    const updateClicks = () => setClicks(getClickCount());
    // Listen for storage events (in case of multi-tab)
    window.addEventListener('storage', updateClicks);
    // Poll every 500ms for local updates
    const poll = setInterval(updateClicks, 500);
    return () => {
      window.removeEventListener('storage', updateClicks);
      clearInterval(poll);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      background: 'rgba(0,0,0,0.7)',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: 8,
      fontFamily: 'monospace',
      zIndex: 9999,
      fontSize: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <div>Session Time: <b>{duration}</b></div>
      <div>Total Clicks: <b>{clicks}</b></div>
    </div>
  );
};

export default AnalyticsStats; 