import { useState, useRef, useCallback, useEffect } from 'react';
import { Position, Size, WindowState, WindowType } from '../types/window';

interface UseWindowManagerProps {
  id: string;
  initialPosition: Position;
  initialSize: Size;
  onMinimize: () => void;
  bringToFront: (id: string) => void;
  type: WindowType;
}

export const useWindowManager = ({
  id,
  initialPosition,
  initialSize,
  onMinimize,
  bringToFront,
  type
}: UseWindowManagerProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number>();
  const isMobileRef = useRef(window.innerWidth <= 768);
  const resizingRef = useRef(false);
  const resizeStartSizeRef = useRef<Size | null>(null);
  const resizeStartPosRef = useRef<{ x: number; y: number } | null>(null);
  
  const [windowState, setWindowState] = useState<WindowState>({
    position: initialPosition,
    size: initialSize,
    isMaximized: false,
    isMinimized: false,
    isDragging: false,
    zIndex: 0,
    type: type
  });

  const [preMaximizeState, setPreMaximizeState] = useState<{position: Position, size: Size} | null>(null);

  // On mount, ensure initial size does not overflow the screen
  useEffect(() => {
    const maxWidth = document.documentElement.clientWidth;
    const maxHeight = document.documentElement.clientHeight - 28;
    
    // Only clamp if the window would overflow the screen
    if (windowState.size.width > maxWidth || windowState.size.height > maxHeight) {
      setWindowState(prev => ({
        ...prev,
        size: {
          width: Math.min(prev.size.width, maxWidth),
          height: Math.min(prev.size.height, maxHeight)
        }
      }));
    }
    // eslint-disable-next-line
  }, []);

  // On resize, clamp window size to fit within the viewport
  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobileRef.current;
      isMobileRef.current = window.innerWidth <= 768;
      if (!wasMobile && isMobileRef.current && !windowState.isMaximized) {
        handleMaximize();
      }
      if (windowState.isMaximized) {
        setWindowState(prev => ({
          ...prev,
          size: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight - 28
          }
        }));
      }
      // Clamp window size to fit within the viewport
      const maxWidth = document.documentElement.clientWidth;
      const maxHeight = document.documentElement.clientHeight - 28;
      let newWidth = Math.min(windowState.size.width, maxWidth);
      let newHeight = Math.min(windowState.size.height, maxHeight);
      setWindowState(prev => ({
        ...prev,
        size: {
          width: newWidth,
          height: newHeight
        },
        position: {
          x: Math.min(prev.position.x, Math.max(0, maxWidth - newWidth)),
          y: Math.min(prev.position.y, Math.max(0, maxHeight - newHeight))
        }
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowState.isMaximized, windowState.size]);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (e.target instanceof HTMLButtonElement || windowState.isMaximized) return;
    
    const window = windowRef.current;
    if (!window) return;

    // Check if this is a resize handle click
    const isResizeHandle = (e.target as HTMLElement).className === 'win95-window-resize-handle';
    resizingRef.current = isResizeHandle;

    setWindowState(prev => ({ ...prev, isDragging: true }));
    window.classList.add('dragging');
    bringToFront(id);

    // Handle both mouse and touch events
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      if (isResizeHandle) {
        resizeStartSizeRef.current = { ...windowState.size };
        resizeStartPosRef.current = {
          x: touch.clientX,
          y: touch.clientY
        };
      } else {
        dragStartPosRef.current = {
          x: touch.clientX - window.offsetLeft,
          y: touch.clientY - window.offsetTop
        };
      }
    } else {
      // Mouse event
      if (isResizeHandle) {
        resizeStartSizeRef.current = { ...windowState.size };
        resizeStartPosRef.current = {
          x: e.clientX,
          y: e.clientY
        };
      } else {
        dragStartPosRef.current = {
          x: e.clientX - window.offsetLeft,
          y: e.clientY - window.offsetTop
        };
      }
    }

    e.preventDefault();
  }, [windowState.isMaximized, bringToFront, id, windowState.size]);

  useEffect(() => {
    if (!windowState.isDragging) return;

    const window = windowRef.current;
    if (!window) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!windowState.isDragging) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        let clientX, clientY;
        
        if ('touches' in e) {
          // Touch event
          const touch = e.touches[0];
          clientX = touch.clientX;
          clientY = touch.clientY;
        } else {
          // Mouse event
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        }
        
        if (resizingRef.current && resizeStartSizeRef.current && resizeStartPosRef.current) {
          // Resizing
          const deltaX = clientX - resizeStartPosRef.current.x;
          const deltaY = clientY - resizeStartPosRef.current.y;
          
          const newWidth = Math.max(200, resizeStartSizeRef.current.width + deltaX);
          const newHeight = Math.max(150, resizeStartSizeRef.current.height + deltaY);
          
          setWindowState(prev => ({
            ...prev,
            size: { width: newWidth, height: newHeight }
          }));
        } else if (dragStartPosRef.current) {
          // Moving
          const newX = clientX - dragStartPosRef.current.x;
          const newY = clientY - dragStartPosRef.current.y;
          
          const maxX = window.parentElement?.clientWidth ?? window.ownerDocument.documentElement.clientWidth;
          const maxY = (window.parentElement?.clientHeight ?? window.ownerDocument.documentElement.clientHeight) - 28;
          
          const boundedX = Math.max(0, Math.min(newX, maxX - window.offsetWidth));
          const boundedY = Math.max(0, Math.min(newY, maxY - window.offsetHeight));
          
          setWindowState(prev => ({
            ...prev,
            position: { x: boundedX, y: boundedY }
          }));
        }
      });
    };

    const handleMouseUp = () => {
      setWindowState(prev => ({ ...prev, isDragging: false }));
      window.classList.remove('dragging');
      dragStartPosRef.current = null;
      resizingRef.current = false;
      resizeStartSizeRef.current = null;
      resizeStartPosRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    // Add both mouse and touch event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [windowState.isDragging]);

  const handleMaximize = useCallback(() => {
    const window = windowRef.current;
    if (!window) return;

    if (!windowState.isMaximized) {
      setPreMaximizeState({
        position: windowState.position,
        size: windowState.size
      });

      setWindowState(prev => ({
        ...prev,
        position: { x: 0, y: 0 },
        size: {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight - 28
        },
        isMaximized: true
      }));
    } else {
      if (preMaximizeState) {
        setWindowState(prev => ({
          ...prev,
          position: preMaximizeState.position,
          size: preMaximizeState.size,
          isMaximized: false
        }));
      }
    }
  }, [windowState.isMaximized, windowState.position, windowState.size, preMaximizeState]);

  const handleMinimize = useCallback(() => {
    setWindowState(prev => ({ ...prev, isMinimized: true }));
    onMinimize();
  }, [onMinimize]);

  // Auto-maximize on mobile for better UX - immediately on mount
  useEffect(() => {
    if (isMobileRef.current) {
      handleMaximize();
    }
  }, []);

  return {
    windowRef,
    windowState,
    handleMouseDown,
    handleMaximize,
    handleMinimize
  };
};