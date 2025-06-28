import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopContextMenu from './DesktopContextMenu';
import TutorialPopup from './TutorialPopup';
import { WindowsContextProvider } from '../../contexts/WindowsContext';
import { AppData, AppConfig, initialAppData, AppContentProps } from '../../data/appData.tsx';
import { Windows95DesktopProps } from '../../types';
import useSound from 'use-sound';
import '../../styles/windows95.css';
import { WindowType } from '../../types/window';
import { posthog } from '../../lib/posthog';
import { useWindowsManager } from '../../context/WindowsManagerContext';
import WindowManager from './WindowManager';

interface ContextMenuPosition {
  x: number;
  y: number;
}

// Define a type that combines AppConfig and the dynamic app structure
type CombinedAppConfig = AppConfig | {
  content: React.ReactNode;
  title: string;
  name?: string;
  defaultSize?: { width: number; height: number };
  position?: { x: number; y: number };
  contentType?: string;
  url?: string;
  icon?: string;
  type?: WindowType;
  isResizable?: boolean;
  isAlwaysOnTop?: boolean;
};

const Desktop: React.FC<Windows95DesktopProps> = ({ onBack }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [appData] = useState<AppData>(initialAppData);
  
  const [playMinimize] = useSound('/sounds/windows95-minimize.mp3');
  const [playMaximize] = useSound('/sounds/windows95-maximize.mp3');
  const [playStartup] = useSound('/sounds/windows95-startup.mp3', { volume: 0.5 });
  const [playShutdown] = useSound('/sounds/windows95-shutdown.mp3', { volume: 0.5 });

  const { windows, openWindow, closeWindow, minimizeWindow, restoreWindow, focusWindow } = useWindowsManager();

  useEffect(() => {
    // Play startup sound when component mounts
    playStartup();
    
    // Track page view with PostHog
    posthog.capture('page_view', { page: 'windows95_desktop' });
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [playStartup]);

  const tutorialSteps = [
    {
      message: "Welcome to 1996! This is a Windows 95 desktop experience.",
      position: { x: 200, y: 200 }
    },
    {
      message: "Feel free to explore the site! Double-click on icons to open them and have some fun.",
      position: { x: 250, y: 250 }
    },
    {
      message: "The Flash Forward folder contains our digital agency services. Take a look inside. Click on 'Update' if you want to update the website to a 2025 one!",
      position: { x: 300, y: 300 }
    }
  ];

  const handleTutorialClose = () => {
    posthog.capture('tutorial_step_completed', { step: currentTutorialStep + 1 });
    setCurrentTutorialStep(prev => prev + 1);
  };

  const getRandomOffset = () => Math.floor(Math.random() * 61) - 30; // -30 to +30

  const clampPositionToViewport = (x: number, y: number, width: number, height: number) => {
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - 28 - height; // 28px for taskbar
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  };

  const handleOpenApp = (appId: string, content?: React.ReactNode, title?: string, positionOverride?: { x: number; y: number }, sizeOverride?: { width: number; height: number }) => {
    posthog.capture('app_opened', { app_id: appId });

    // Use the correct size for this app
    const appDefaultSize = appData[appId]?.defaultSize || { width: 400, height: 300 };
    const size = sizeOverride || appDefaultSize;

    let finalPosition: { x: number; y: number };
    let zIndex = windows.length + 1;
    
    if (appId === 'winamp') {
      finalPosition = { x: 100, y: 100 };
      zIndex = Math.max(...windows.map(w => w.zIndex || 1), 1) + 1;
    } else if (appId === 'flashForwardFolder') {
      finalPosition = { x: 130, y: 40 };
    } else if (appId === 'servicesWindow') {
      // Services window - use positionOverride if provided, otherwise use default
      if (positionOverride) {
        finalPosition = positionOverride;
      } else {
        finalPosition = { x: 150, y: 80 };
      }
    } else if (appId === 'pricingWindow') {
      // Pricing window - use positionOverride if provided, otherwise use default
      if (positionOverride) {
        finalPosition = positionOverride;
      } else {
        finalPosition = { x: 200, y: 120 };
      }
    } else if (appId === 'contactUsWindow') {
      // Contact Us window - use positionOverride if provided, otherwise use default
      if (positionOverride) {
        finalPosition = positionOverride;
      } else {
        finalPosition = { x: 250, y: 160 };
      }
    } else if (appId === 'ourWork') {
      // Our Work window - use positionOverride if provided, otherwise use default
      if (positionOverride) {
        finalPosition = positionOverride;
      } else {
        finalPosition = { x: 300, y: 200 };
      }
    } else if (appId === 'internetExplorer') {
      // Special handling for Internet Explorer to ensure it uses the correct size
      finalPosition = positionOverride || { x: 50, y: 50 };
      size = sizeOverride || { width: 1000, height: 700 }; // Ensure it uses the larger size
    } else if (appId === 'msPaint') {
      // Special handling for MS Paint to ensure it uses the correct size
      finalPosition = positionOverride || { x: 60, y: 60 };
      size = sizeOverride || { width: 1000, height: 800 }; // Make MS Paint larger
    } else {
      // Calculate random offset for position for all other apps
      let basePosition: { x: number; y: number };
      if (positionOverride) {
        basePosition = positionOverride;
      } else if (appData[appId]?.position) {
        basePosition = { ...appData[appId].position };
      } else {
        basePosition = { x: 100, y: 100 };
      }
      const randomOffset = { x: getRandomOffset(), y: getRandomOffset() };
      finalPosition = {
        x: basePosition.x + randomOffset.x,
        y: basePosition.y + randomOffset.y
      };
      // Clamp so window is always fully visible
      finalPosition = clampPositionToViewport(finalPosition.x, finalPosition.y, size.width, size.height);
    }

    if (content !== undefined && title !== undefined) {
      openWindow({
        id: appId,
        title: title,
        content: content,
        position: finalPosition,
        size,
        zIndex,
        minimized: false,
      });
    } else if (appData[appId]) {
      openWindow({
        id: appId,
        title: title || appData[appId]?.name || appId,
        content: appData[appId].contentType === 'component' ? React.createElement(appData[appId].component as React.ComponentType<AppContentProps>, { onOpenApp: handleOpenApp }) : undefined,
        position: finalPosition,
        size,
        zIndex,
        minimized: false,
        isResizable: appData[appId]?.isResizable !== undefined ? appData[appId]?.isResizable : true,
        isAlwaysOnTop: appData[appId]?.isAlwaysOnTop || false,
        type: appData[appId]?.type || 'default',
      });
    } else {
      console.error(`Data for app ${appId} not found.`);
    }
  };

  const handleCloseApp = (appId: string) => {
    // Track app closing with PostHog
    posthog.capture('app_closed', { app_id: appId });
    
    closeWindow(appId);
  };

  const handleMinimize = (appId: string) => {
    // Track app minimizing with PostHog
    posthog.capture('app_minimized', { app_id: appId });
    
    minimizeWindow(appId);
  };

  const handleRestore = (appId: string) => {
    // ... existing code ...
    restoreWindow(appId);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only show context menu if clicking directly on the desktop
    if (e.target === e.currentTarget) {
      setContextMenu({ x: e.clientX, y: e.clientY });
      
      // Track context menu opening with PostHog
      posthog.capture('desktop_context_menu_opened');
    }
  };

  const handleArrangeIcons = () => {
    // Implement icon arrangement logic
    posthog.capture('desktop_icons_arranged');
  };

  const handleRefresh = () => {
    // Implement refresh logic
    posthog.capture('desktop_refreshed');
  };

  const handleNewFolder = () => {
    // Implement new folder creation logic
    posthog.capture('new_folder_created');
  };

  const handleBackToModern = () => {
    // Play shutdown sound and wait for it to finish before navigating
    playShutdown();
    posthog.capture('windows95_exit');
    
    // Wait for sound to finish before navigating
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  // Adjust icon positions for mobile
  const getAdjustedIconPosition = (originalPosition: { x: number; y: number }) => {
    if (!isMobile) return originalPosition;
    
    // Scale down positions for mobile
    const scaleFactor = 0.7;
    return {
      x: originalPosition.x * scaleFactor,
      y: originalPosition.y * scaleFactor
    };
  };

  return (
    <WindowsContextProvider onBack={onBack}>
      <div 
        className="win95"
        onContextMenu={handleContextMenu}
        onClick={() => setContextMenu(null)}
      >
        {currentTutorialStep < tutorialSteps.length && (
          <TutorialPopup
            message={tutorialSteps[currentTutorialStep].message}
            onClose={handleTutorialClose}
            position={isMobile ? 
              { x: window.innerWidth / 2 - 150, y: window.innerHeight / 3 } : 
              tutorialSteps[currentTutorialStep].position}
          />
        )}
        {/* Classic Windows icon layout: two vertical columns, media icon at top of right column */}
        {(() => {
          // First column: My Computer, Documents, Recycle Bin, Calculator, Explorer, MS Paint, Winamp, Notepad
          const firstColumnIds = [
            'myComputer', 'myDocuments', 'recycleBin', 'calculator', 'internetExplorer', 'msPaint', 'winamp', 'notepad'
          ];
          // Second column: Media at top, then Games, AI Stuff, TV, Flash Forward
          const secondColumnIds = [
            'mediaFolder', 'gamesFolder', 'aiStuffFolder', 'tv', 'flashForwardFolder'
          ];
          const icons = [
            ...firstColumnIds.map(id => appData[id]).filter(Boolean),
            ...secondColumnIds.map(id => appData[id]).filter(Boolean)
          ];
          const xStart = 20;
          const yStart = 20;
          const xSpacing = 120;
          const ySpacing = 85;
          return icons.map((app, i) => {
            // First column: 0-7, Second column: 8-12
            const col = i < firstColumnIds.length ? 0 : 1;
            const row = col === 0 ? i : i - firstColumnIds.length;
            const x = xStart + col * xSpacing;
            const y = yStart + row * ySpacing;
            return (
              <Icon
                key={app.name}
                id={app.name}
                name={app.name}
                icon={app.icon}
                x={x}
                y={y}
                onOpen={() => handleOpenApp(app.name, app.contentType === 'component' ? React.createElement(app.component as React.ComponentType<AppContentProps>, { onOpenApp: handleOpenApp }) : undefined, app.name)}
              />
            );
          });
        })()}
        {/* Render all windows using WindowManager */}
        <WindowManager />
        {contextMenu && (
          <DesktopContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onArrange={handleArrangeIcons}
            onRefresh={handleRefresh}
            onNewFolder={handleNewFolder}
          />
        )}
        <Taskbar 
          openApps={windows.map(win => ({
            id: win.id,
            name: win.title,
            isMinimized: win.minimized
          }))}
          onAppClick={handleOpenApp}
          onBack={handleBackToModern}
        />
      </div>
    </WindowsContextProvider>
  );
};

export default Desktop;