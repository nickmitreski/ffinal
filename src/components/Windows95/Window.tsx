import React, { useEffect, useState } from 'react';
import { useWindowsContext } from '../../contexts/WindowsContext';
import useSound from 'use-sound';
import { WindowProps } from '../../types/window';
import { useWindowManager } from '../../hooks/useWindowManager';

const Window: React.FC<WindowProps> = ({ 
  id, 
  title, 
  initialPosition, 
  initialSize, 
  onClose, 
  onMinimize,
  isMinimized,
  content,
  className,
  type = 'default',
  isResizable = true,
  isAlwaysOnTop = false
}) => {
  const { bringToFront } = useWindowsContext();
  const [playMaximize] = useSound('/sounds/windows95-maximize.mp3');
  const [playMinimize] = useSound('/sounds/windows95-minimize.mp3');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const {
    windowRef,
    windowState,
    handleMouseDown,
    handleMaximize,
    handleMinimize
  } = useWindowManager({
    id,
    initialPosition,
    initialSize,
    onMinimize,
    bringToFront,
    type
  });

  useEffect(() => {
    if (windowRef.current) {
      bringToFront(id);
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [id, bringToFront]);

  // Auto-maximize on mobile - fixed to apply immediately
  useEffect(() => {
    if (isMobile && !windowState.isMaximized) {
      handleMaximize();
    }
  }, [isMobile, windowState.isMaximized, handleMaximize]);

  const handleMinimizeClick = () => {
    playMinimize();
    handleMinimize();
  };

  const handleMaximizeClick = () => {
    playMaximize();
    handleMaximize();
  };

  if (isMinimized) {
    return null;
  }

  // Fixed mobile styling to ensure windows take full screen
  const mobileStyles = isMobile ? {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: 'calc(100vh - 28px)',
    maxWidth: '100vw',
    maxHeight: 'calc(100vh - 28px)',
    borderRadius: 0,
    margin: 0,
    zIndex: isAlwaysOnTop ? 9999 : undefined
  } : {};

  return (
    <div
      ref={windowRef}
      className={`win95-window ${windowState.isMaximized ? 'maximized' : ''} ${className || ''}`}
      style={{
        position: 'absolute',
        left: `${windowState.position.x}px`,
        top: `${windowState.position.y}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        cursor: windowState.isDragging ? 'grabbing' : 'default',
        display: 'flex',
        flexDirection: 'column',
        ...(isMobile && windowState.isMaximized ? mobileStyles : {}),
        zIndex: isAlwaysOnTop ? 9999 : undefined
      }}
      onClick={() => bringToFront(id)}
      data-window-id={id}
    >
      <div 
        className="win95-window-title"
        onMouseDown={handleMouseDown}
        onTouchStart={isMobile ? handleMouseDown : undefined}
        style={{ cursor: windowState.isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="win95-window-title-text">{title}</div>
        <div className="win95-window-controls">
          <button 
            className="win95-window-button" 
            onClick={handleMinimizeClick}
            style={isMobile ? { width: '20px', height: '18px' } : undefined}
          >_</button>
          <button 
            className="win95-window-button" 
            onClick={handleMaximizeClick}
            style={isMobile ? { width: '20px', height: '18px' } : undefined}
          >□</button>
          <button 
            className="win95-window-button" 
            onClick={onClose}
            style={isMobile ? { width: '20px', height: '18px' } : undefined}
          >×</button>
        </div>
      </div>
      <div className="win95-window-menubar">
        <div className="win95-window-menubar-item">File</div>
        <div className="win95-window-menubar-item">Edit</div>
        <div className="win95-window-menubar-item">View</div>
        <div className="win95-window-menubar-item">Help</div>
      </div>
      <div className="win95-window-content" style={{ flex: 1, overflow: 'hidden' }}>
        {content}
      </div>
      {isResizable && !windowState.isMaximized && !isMobile && (
        <div 
          className="win95-window-resize-handle"
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '10px',
            height: '10px',
            cursor: 'nwse-resize'
          }}
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
};

export default Window;