import React from 'react';
import { useWindowsManager } from '../../context/WindowsManagerContext';
import Window from './Window';

const WindowManager: React.FC = () => {
  const { windows, closeWindow, minimizeWindow } = useWindowsManager();
  return (
    <>
      {windows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          initialPosition={win.position}
          initialSize={win.size}
          isMinimized={win.minimized}
          content={win.content}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          isResizable={win.isResizable}
          // Add other props as needed
        />
      ))}
    </>
  );
};

export default WindowManager; 