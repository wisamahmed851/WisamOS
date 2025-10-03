'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import type { AppId, WindowInstance } from '@/types';

import About from '@/components/apps/About';
import Projects from '@/components/apps/Projects';
import Skills from '@/components/apps/Skills';
import Experience from '@/components/apps/Experience';
import Resume from '@/components/apps/Resume';
import Contact from '@/components/apps/Contact';
import Terminal from '@/components/apps/Terminal';
import Education from '@/components/apps/Education';

interface DesktopContextType {
  windows: WindowInstance[];
  openWindow: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
}

const DesktopContext = createContext<DesktopContextType | null>(null);

const appMap = {
  about: { component: About, title: 'About Me', defaultSize: { width: 550, height: 500 } },
  projects: { component: Projects, title: 'Projects', defaultSize: { width: 700, height: 550 } },
  skills: { component: Skills, title: 'Skills', defaultSize: { width: 600, height: 500 } },
  experience: { component: Experience, title: 'Experience', defaultSize: { width: 650, height: 550 } },
  education: { component: Education, title: 'Education', defaultSize: { width: 650, height: 500 } },
  resume: { component: Resume, title: 'Resume', defaultSize: { width: 900, height: 700 } },
  contact: { component: Contact, title: 'Contact Me', defaultSize: { width: 600, height: 650 } },
  terminal: { component: Terminal, title: 'Terminal', defaultSize: { width: 640, height: 400 } },
};

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [isClient, setIsClient] = useState(false);

  const openWindow = useCallback((appId: AppId) => {
    setWindows((prevWindows) => {
      const appConfig = appMap[appId];
      if (!appConfig) return prevWindows;

      const { innerWidth, innerHeight } = window;
      const { width, height } = appConfig.defaultSize;
      
      const taskbarHeight = 64; // h-16
      const availableHeight = innerHeight - taskbarHeight;

      // Check if there are other windows of the same app to avoid exact overlap
      const sameAppWindows = prevWindows.filter(w => w.appId === appId).length;
      const offset = sameAppWindows * 20;

      const newWindow: WindowInstance = {
        id: `${appId}-${Date.now()}`,
        appId,
        title: appConfig.title,
        component: appConfig.component,
        position: { 
          x: (innerWidth - width) / 2 + offset, 
          y: (availableHeight - height) / 2 + offset
        },
        size: appConfig.defaultSize,
        zIndex: nextZIndex,
        isMinimized: false,
        isMaximized: false,
      };

      setNextZIndex(nextZIndex + 1);
      return [...prevWindows, newWindow];
    });
  }, [nextZIndex]);
  
  useEffect(() => {
    setIsClient(true);
    // Open the "About" window on initial load
    if (typeof window !== 'undefined') {
        openWindow('about');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
      setWindows((prev) => {
        const maxZIndex = prev.length > 0 ? Math.max(...prev.map(w => w.zIndex)) : nextZIndex;
        const windowToFocus = prev.find(w => w.id === id);
        
        if (!windowToFocus || windowToFocus.zIndex === maxZIndex) {
          if(windowToFocus?.isMinimized) {
            setNextZIndex(maxZIndex + 1);
            return prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w));
          }
          return prev;
        }
        
        setNextZIndex(maxZIndex + 1);
        return prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w));
      });
    }, [nextZIndex]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id:string) => {
      setWindows((prev) => {
          const maxZIndex = Math.max(...prev.map(w => w.zIndex));
          return prev.map((w) => {
              if (w.id === id) {
                  setNextZIndex(maxZIndex + 1);
                  return {
                      ...w,
                      isMaximized: !w.isMaximized,
                      zIndex: maxZIndex + 1,
                  };
              }
              return w;
          });
      });
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const mainElement = document.querySelector('main');
          if (mainElement) {
            const newPos = { ...w.position };
            const { width, height } = w.size;
            const { clientWidth, clientHeight } = mainElement;
            const taskbarHeight = 64; // 4rem

            newPos.x = Math.max(0, Math.min(position.x, clientWidth - width));
            newPos.y = Math.max(0, Math.min(position.y, clientHeight - taskbarHeight - height));

            return { ...w, position: newPos };
          }
        }
        return w;
      })
    );
  }, []);
  
  const value = useMemo(() => ({
    windows,
    openWindow: isClient ? openWindow : () => {},
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindowPosition,
  }), [windows, isClient, openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximize, updateWindowPosition]);

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = (): DesktopContextType => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
