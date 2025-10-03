'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Folder,
  User,
  FileText,
  Mail,
  Wrench,
  Briefcase,
  LucideIcon,
  Power,
  GraduationCap,
  Terminal,
  RefreshCw,
} from 'lucide-react';
import { useDesktop } from '@/context/DesktopContext';
import type { AppId } from '@/types';
import { useState } from 'react';
import { config } from '@/lib/config';
import Image from 'next/image';

const KaliLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M12 2l-2.5 5L2 9.5l4.5 3L8 18l4-2.5 4 2.5 1.5-5.5L22 9.5l-7.5-2.5L12 2z" />
    <path d="M12 12l-4 8h8l-4-8z" />
  </svg>
);

const apps: { id: AppId; name: string; icon: LucideIcon }[] = [
  { id: 'about', name: 'About Me', icon: User },
  { id: 'projects', name: 'Projects', icon: Folder },
  { id: 'skills', name: 'Skills', icon: Wrench },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'terminal', name: 'Terminal', icon: Terminal },
  { id: 'resume', name: 'Resume', icon: FileText },
  { id: 'contact', name: 'Contact', icon: Mail },
];

const AppLauncher = () => {
  const { openWindow } = useDesktop();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenApp = (appId: AppId) => {
    openWindow(appId);
    setIsOpen(false);
  };
  
  const handleShutdown = () => {
    window.close();
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-2 h-auto hover:bg-secondary/50 rounded-lg"
        >
          <KaliLogo />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="w-80 bg-background/80 backdrop-blur-lg border-white/10"
        sideOffset={16}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-headline font-medium leading-none">
              Wisam OS
            </h4>
            <p className="text-sm text-muted-foreground">
              Welcome to my portfolio.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {apps.map((app) => {
              const isAboutWithAvatar = app.id === 'about' && config.user.avatar;
              return (
              <button
                key={app.id}
                onClick={() => handleOpenApp(app.id)}
                className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-secondary transition-colors text-center"
              >
                <div className='w-10 h-10 flex items-center justify-center'>
                  {isAboutWithAvatar ? (
                     <Image src={config.user.avatar ?? '/default-avatar.png'} alt="About Me" width={36} height={36} className="rounded-full" />
                  ) : (
                    <app.icon className="h-6 w-6" />
                  )}
                </div>
                <span className="text-xs truncate">{app.name}</span>
              </button>
            )})}
          </div>
          <div className="border-t border-border/50 pt-3 mt-2 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                {config.user.avatar && <Image src={config.user.avatar} alt="User Avatar" width={24} height={24} className="rounded-full" />}
                <span className='font-medium'>{config.user.name}</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleRestart}>
                  <RefreshCw size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/80" onClick={handleShutdown}>
                  <Power size={16} />
                </Button>
              </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AppLauncher;
