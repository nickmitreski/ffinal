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
export function setupAnalytics({ resetOnLoad = false }: { resetOnLoad?: boolean } = {}) {
  if (resetOnLoad) {
    resetAnalytics();
  } else {
    initSession();
  }
}

// Track page views
export function trackPageView(page: string) {
  try {
    // Implement page view tracking here
    console.log('Page view:', page);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Track clicks
export function trackClick(
  element: string, 
  page: string, 
  elementType?: string,
  elementText?: string,
  elementClass?: string,
  elementId?: string
) {
  try {
    // Implement click tracking here
    console.log('Click:', { element, page, elementType, elementText, elementClass, elementId });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

// Track visit duration
export function trackVisitDuration(duration: number, page: string, isBounce: boolean = false) {
  try {
    // Implement visit duration tracking here
    console.log('Visit duration:', { duration, page, isBounce });
  } catch (error) {
    console.error('Error tracking visit duration:', error);
  }
}

// Initialize analytics
export function initAnalytics() {
  // Track initial page view
  trackPageView(window.location.pathname);
  
  // Set up visit duration tracking
  const startTime = Date.now();
  
  // Track duration when user leaves the page
  window.addEventListener('beforeunload', () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    trackVisitDuration(duration, window.location.pathname);
  });
  
  // Set up click tracking
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    
    // Get element details
    const elementType = target.tagName.toLowerCase();
    const elementText = target.textContent?.trim().substring(0, 100) || '';
    const elementClass = target.className || '';
    const elementId = target.id || '';
    
    // Create a descriptive element name
    let elementName = elementType;
    if (elementId) elementName += `#${elementId}`;
    if (elementClass) elementName += `.${elementClass.split(' ')[0]}`;
    if (elementText) elementName += `:${elementText.substring(0, 20)}`;
    
    trackClick(
      elementName,
      window.location.pathname,
      elementType,
      elementText,
      elementClass,
      elementId
    );
  });
}