import { useState, useEffect } from 'react';
import Windows95Desktop from './components/Windows95/Desktop';
import ModernSite from './components/ModernSite';
import AdminPage from './components/AdminPage';
import { Frame } from './components/ChoiceAnimation/Frame';
import { ViewType } from './types/index';
import './styles/global.css';
import { posthog } from './lib/posthog';
import { WindowsManagerProvider } from './context/WindowsManagerContext';

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  // Track view changes with PostHog
  useEffect(() => {
    posthog.capture('view_changed', { view: currentView });
  }, [currentView]);

  // --- Analytics setup: initialize and add global click listener ---
  useEffect(() => {
    const handleClick = () => {
      // This is handled by the analytics utility
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <WindowsManagerProvider>
      <div className="app-container">
        {currentView === 'landing' && <Frame onYearSelect={(year) => {
          posthog.capture('year_selected', { year });
          setCurrentView(year);
        }} />}
        {currentView === '1996' && <Windows95Desktop onBack={() => setCurrentView('landing')} />}
        {currentView === '2025' && <ModernSite onBack={() => setCurrentView('landing')} setCurrentView={setCurrentView} />}
        {currentView === 'admin' && <AdminPage />}
      </div>
    </WindowsManagerProvider>
  );
}

export default App;