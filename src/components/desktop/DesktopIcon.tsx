'use client';

import { useDesktop } from '@/context/DesktopContext';
import type { AppId, DesktopIconConfig } from '@/types';
import {
  Folder,
  User,
  FileText,
  Mail,
  Wrench,
  Briefcase,
  LucideIcon,
  Terminal,
  GraduationCap,
  Github,
  Linkedin
} from 'lucide-react';
import Image from 'next/image';
import { config } from '@/lib/config';

const iconMap: Record<AppId, LucideIcon> = {
  about: User,
  projects: Folder,
  skills: Wrench,
  experience: Briefcase,
  resume: FileText,
  contact: Mail,
  terminal: Terminal,
  education: GraduationCap,
  github: Github,
  linkedin: Linkedin,
};

interface DesktopIconProps {
  iconConfig: DesktopIconConfig;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ iconConfig }) => {
  const { openWindow } = useDesktop();
  const { id, name, type, url } = iconConfig;
  const Icon = iconMap[id];

  const handleClick = () => {
    if (type === 'app') {
      openWindow(id);
    } else if (type === 'link' && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const isAboutAppWithAvatar = id === 'about' && config.user.avatar;

  return (
    <div
      className="flex flex-col items-center gap-1.5 w-24 text-center cursor-pointer group"
      onClick={handleClick}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 p-1 rounded-lg group-hover:bg-white/10 transition-colors flex items-center justify-center relative">
        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isAboutAppWithAvatar ? (
          <Image src={config.user.avatar} alt="About Me" width={56} height={56} className="rounded-full shadow-lg w-12 h-12 md:w-14 md:h-14" />
        ) : (
          Icon && <Icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
        )}
      </div>
      <p className="text-white text-xs md:text-sm font-medium drop-shadow-md select-none">
        {name}
      </p>
    </div>
  );
};

export default DesktopIcon;
