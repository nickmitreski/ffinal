// Analytics utility for session duration and click tracking
// Usage: Import and use these functions in your components

const SESSION_START_KEY = 'analytics_session_start';
const CLICK_COUNT_KEY = 'analytics_click_count';

// Initialize session start time if not set
function initSession() {
  if (!localStorage.getItem(SESSION_START_KEY)) {
    localStorage.setItem(SESSION_START_KEY, Date.now().toString());
  }
}

// Get the session start time (as a number)
function getSessionStart(): number {
  initSession();
  return parseInt(localStorage.getItem(SESSION_START_KEY) || '0', 10);
}

// Get the current session duration in seconds
export function getSessionDurationSeconds(): number {
  const start = getSessionStart();
  return Math.max(0, Math.floor((Date.now() - start) / 1000));
}

// Get the current session duration as mm:ss
export function getSessionDurationFormatted(): string {
  const seconds = getSessionDurationSeconds();
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

// Get the total number of clicks from localStorage
export function getClickCount(): number {
  return parseInt(localStorage.getItem(CLICK_COUNT_KEY) || '0', 10);
}

// Increment the click count and store in localStorage
export function incrementClickCount(): void {
  const current = getClickCount();
  localStorage.setItem(CLICK_COUNT_KEY, (current + 1).toString());
}

// Reset analytics (clicks and session start)
export function resetAnalytics(): void {
  localStorage.setItem(CLICK_COUNT_KEY, '0');
  localStorage.setItem(SESSION_START_KEY, Date.now().toString());
}

// Optionally, call this on page load to reset analytics
type AnalyticsOptions = { resetOnLoad?: boolean };
export function setupAnalytics({ resetOnLoad = false }: AnalyticsOptions = {}) {
  if (resetOnLoad) {
    resetAnalytics();
  } else {
    initSession();
  }
} 