'use client';

import { useDesktop } from '@/context/DesktopContext';
import AppLauncher from './AppLauncher';
import Clock from './Clock';
import FunLine from './FunLine';
import {
  Folder,
  User,
  FileText,
  Mail,
  Wrench,
  Briefcase,
  LucideIcon,
  Terminal,
  GraduationCap
} from 'lucide-react';
import type { AppId } from '@/types';
import MusicPlayer from './MusicPlayer';
import { config } from '@/lib/config';

const appIconMap: Record<AppId, LucideIcon> = {
  about: User,
  projects: Folder,
  skills: Wrench,
  experience: Briefcase,
  resume: FileText,
  contact: Mail,
  terminal: Terminal,
  education: GraduationCap,
};

const Taskbar = () => {
  const { windows, focusWindow } = useDesktop();

  return (
    <footer className="h-16 bg-black/30 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-2 md:px-4 gap-2 shrink-0 z-[100]">
      <div className="flex items-center gap-1 md:gap-2">
        <AppLauncher />
        <div className="h-8 w-px bg-white/10" />
        <div className="flex items-center gap-1">
          {windows.map((win) => {
            const Icon = appIconMap[win.appId];
            const isActive = windows.some(
              (w) => w.id === win.id && w.zIndex === Math.max(...windows.map(wi => wi.zIndex)) && !w.isMinimized
            );

            return (
              <button
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className={`p-2 rounded-lg hover:bg-white/10 transition-colors relative flex items-center justify-center`}
                title={win.title}
              >
                <Icon className={`h-6 w-6 transition-all duration-200 ${isActive ? 'text-accent' : 'text-foreground'}`} />
                 <div className={`absolute bottom-0 w-full h-0.5 rounded-full transition-all duration-200 ${isActive && !win.isMinimized ? 'bg-accent' : (win.isMinimized ? 'bg-muted-foreground/50' : 'bg-transparent')}`}></div>
              </button>
            );
          })}
        </div>
      </div>
      <FunLine />
      <div className="flex items-center gap-2 md:gap-4">
        {config.music.enabled && <MusicPlayer />}
        <Clock />
      </div>
    </footer>
  );
};

export default Taskbar;
