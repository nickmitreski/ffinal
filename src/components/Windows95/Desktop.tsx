import React, { useState, useEffect, useCallback } from 'react';
import Icon from './Icon';
import Taskbar from './Taskbar';
import DesktopContextMenu from './DesktopContextMenu';
import TutorialPopup from './TutorialPopup';
import { WindowsContextProvider } from '../../contexts/WindowsContext';
import { AppData, initialAppData, AppContentProps } from '../../data/appData.tsx';
import { Windows95DesktopProps } from '../../types';
import useSound from 'use-sound';
import '../../styles/windows95.css';
import { posthog } from '../../lib/posthog';
import { useWindowsManager } from '../../context/WindowsManagerContext';
import WindowManager from './WindowManager';

interface ContextMenuPosition {
  x: number;
  y: number;
}

const Desktop: React.FC<Windows95DesktopProps> = ({ onBack }) => {
  // State
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [appData] = useState<AppData>(initialAppData);
  
  // Sounds
  const [playMinimize] = useSound('/sounds/windows95-minimize.mp3');
  const [playMaximize] = useSound('/sounds/windows95-maximize.mp3');
  const [playStartup] = useSound('/sounds/windows95-startup.mp3', { volume: 0.5 });
  const [playShutdown] = useSound('/sounds/windows95-shutdown.mp3', { volume: 0.5 });

  // Window management
  const { windows, openWindow, closeWindow, minimizeWindow, restoreWindow } = useWindowsManager();

  // Tutorial steps
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

  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Play startup sound when component mounts
    playStartup();
    
    // Track page view with PostHog
    posthog.capture('page_view', { page: 'windows95_desktop' });
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [playStartup]);

  // Handle tutorial progression
  const handleTutorialClose = useCallback(() => {
    posthog.capture('tutorial_step_completed', { step: currentTutorialStep + 1 });
    setCurrentTutorialStep(prev => prev + 1);
  }, [currentTutorialStep]);

  // Helper functions for window positioning
  const getRandomOffset = useCallback(() => Math.floor(Math.random() * 61) - 30, []); // -30 to +30

  const clampPositionToViewport = useCallback((x: number, y: number, width: number, height: number) => {
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - 28 - height; // 28px for taskbar
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  }, []);

  // Handle opening an app
  const handleOpenApp = useCallback((
    appId: string, 
    content?: React.ReactNode, 
    title?: string, 
    positionOverride?: { x: number; y: number }, 
    sizeOverride?: { width: number; height: number }
  ) => {
    console.log(`Opening app: ${appId}`);
    posthog.capture('app_opened', { app_id: appId });

    // Get app size
    const appDefaultSize = appData[appId]?.defaultSize || { width: 400, height: 300 };
    const size = sizeOverride || appDefaultSize;

    // Determine window position
    let finalPosition: { x: number; y: number };
    let zIndex = windows.length + 1;
    
    // Special case positioning for specific apps
    if (appId === 'winamp') {
      finalPosition = { x: 100, y: 100 };
      zIndex = Math.max(...windows.map(w => w.zIndex || 1), 1) + 1;
    } else if (appId === 'flashForwardFolder') {
      finalPosition = { x: 130, y: 40 };
    } else if (appId === 'servicesWindow') {
      finalPosition = positionOverride || { x: 150, y: 80 };
    } else if (appId === 'pricingWindow') {
      finalPosition = positionOverride || { x: 200, y: 120 };
    } else if (appId === 'contactUsWindow') {
      finalPosition = positionOverride || { x: 250, y: 160 };
    } else if (appId === 'ourWork') {
      finalPosition = positionOverride || { x: 300, y: 200 };
    } else if (appId === 'internetExplorer') {
      finalPosition = positionOverride || { x: 50, y: 50 };
      size.width = sizeOverride?.width || 1000;
      size.height = sizeOverride?.height || 700;
    } else if (appId === 'msPaint') {
      finalPosition = positionOverride || { x: 60, y: 60 };
      size.width = sizeOverride?.width || 1000;
      size.height = sizeOverride?.height || 800;
    } else {
      // Default positioning with random offset
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
      
      // Ensure window is fully visible
      finalPosition = clampPositionToViewport(finalPosition.x, finalPosition.y, size.width, size.height);
    }

    // Create window with provided content or from app data
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
        content: appData[appId].contentType === 'component' 
          ? React.createElement(appData[appId].component as React.ComponentType<AppContentProps>, { onOpenApp: handleOpenApp }) 
          : undefined,
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
  }, [appData, clampPositionToViewport, getRandomOffset, openWindow, windows]);

  // Handle closing an app
  const handleCloseApp = useCallback((appId: string) => {
    posthog.capture('app_closed', { app_id: appId });
    closeWindow(appId);
  }, [closeWindow]);

  // Handle minimizing an app
  const handleMinimize = useCallback((appId: string) => {
    posthog.capture('app_minimized', { app_id: appId });
    minimizeWindow(appId);
  }, [minimizeWindow]);

  // Handle context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Only show context menu if clicking directly on the desktop
    if (e.target === e.currentTarget) {
      setContextMenu({ x: e.clientX, y: e.clientY });
      posthog.capture('desktop_context_menu_opened');
    }
  }, []);

  // Context menu actions
  const handleArrangeIcons = useCallback(() => {
    posthog.capture('desktop_icons_arranged');
  }, []);

  const handleRefresh = useCallback(() => {
    posthog.capture('desktop_refreshed');
  }, []);

  const handleNewFolder = useCallback(() => {
    posthog.capture('new_folder_created');
  }, []);

  // Handle back to modern site
  const handleBackToModern = useCallback(() => {
    playShutdown();
    posthog.capture('windows95_exit');
    
    // Wait for sound to finish before navigating
    setTimeout(() => {
      onBack();
    }, 1500);
  }, [onBack, playShutdown]);

  // Desktop icon configuration
  const renderDesktopIcons = useCallback(() => {
    // First column: My Computer, Documents, Recycle Bin, Calculator, Explorer, MS Paint, Winamp
    const firstColumnIds = [
      'myComputer', 'myDocuments', 'recycleBin', 'calculator', 'internetExplorer', 'msPaint', 'winamp'
    ];
    
    // Second column: Notepad at top, then Media, Games, AI Stuff, TV, Flash Forward
    const secondColumnIds = [
      'notepad', 'mediaFolder', 'gamesFolder', 'aiStuffFolder', 'tv', 'flashForwardFolder'
    ];
    
    const icons = [
      ...firstColumnIds.map(id => appData[id]).filter(Boolean),
      ...secondColumnIds.map(id => appData[id]).filter(Boolean)
    ];
    
    const xStart = 20;
    const yStart = 20;
    const xSpacing = 120;
    const ySpacing = 100; // Increased vertical spacing
    
    return icons.map((app, i) => {
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
          onOpen={() => handleOpenApp(app.name)}
        />
      );
    });
  }, [appData, handleOpenApp]);

  return (
    <WindowsContextProvider onBack={onBack}>
      <div 
        className="win95"
        onContextMenu={handleContextMenu}
        onClick={() => setContextMenu(null)}
      >
        {/* Tutorial Popup */}
        {currentTutorialStep < tutorialSteps.length && (
          <TutorialPopup
            message={tutorialSteps[currentTutorialStep].message}
            onClose={handleTutorialClose}
            position={isMobile ? 
              { x: window.innerWidth / 2 - 150, y: window.innerHeight / 3 } : 
              tutorialSteps[currentTutorialStep].position}
          />
        )}
        
        {/* Desktop Icons */}
        {renderDesktopIcons()}
        
        {/* Windows */}
        <WindowManager />
        
        {/* Context Menu */}
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
        
        {/* Taskbar */}
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