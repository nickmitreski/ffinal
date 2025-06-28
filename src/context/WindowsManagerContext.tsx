import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WindowMeta {
  id: string;
  title: string;
  content: ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  isResizable?: boolean;
  isAlwaysOnTop?: boolean;
  type?: string;
  // Add more metadata as needed
}

interface WindowsManagerContextType {
  windows: WindowMeta[];
  openWindow: (meta: Partial<WindowMeta> & { id: string }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  setWindowPosition: (id: string, position: { x: number; y: number }) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
}

const WindowsManagerContext = createContext<WindowsManagerContextType | undefined>(undefined);

export const WindowsManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // This is a placeholder state. You will migrate real logic here in the next step.
  const [windows, setWindows] = useState<WindowMeta[]>([]);

  // Placeholder implementations
  const openWindow = (meta: Partial<WindowMeta> & { id: string }) => {
    setWindows(prev => [
      ...prev.filter(w => w.id !== meta.id),
      {
        id: meta.id,
        title: meta.title || '',
        content: meta.content || null,
        position: meta.position || { x: 100, y: 100 },
        size: meta.size || { width: 400, height: 300 },
        zIndex: meta.zIndex || prev.length + 1,
        minimized: meta.minimized || false,
        isResizable: meta.isResizable !== undefined ? meta.isResizable : true,
        isAlwaysOnTop: meta.isAlwaysOnTop || false,
        type: meta.type || 'default',
      },
    ]);
  };
  const closeWindow = (id: string) => setWindows(prev => prev.filter(w => w.id !== id));
  const focusWindow = (id: string) => setWindows(prev => {
    const win = prev.find(w => w.id === id);
    if (!win) return prev;
    return [...prev.filter(w => w.id !== id), { ...win, zIndex: prev.length + 1 }];
  });
  const setWindowPosition = (id: string, position: { x: number; y: number }) => setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w));
  const minimizeWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  const restoreWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false } : w));

  return (
    <WindowsManagerContext.Provider value={{ windows, openWindow, closeWindow, focusWindow, setWindowPosition, minimizeWindow, restoreWindow }}>
      {children}
    </WindowsManagerContext.Provider>
  );
};

export const useWindowsManager = () => {
  const ctx = useContext(WindowsManagerContext);
  if (!ctx) throw new Error('useWindowsManager must be used within WindowsManagerProvider');
  return ctx;
}; 