import type { LucideIcon } from 'lucide-react';

export type AppId = 'about' | 'projects' | 'skills' | 'experience' | 'resume' | 'contact' | 'terminal' | 'education' | 'github' | 'linkedin';

export type DesktopIconType = 'app' | 'link';

export interface DesktopIconConfig {
  id: AppId;
  name: string;
  type: DesktopIconType;
  url?: string;
}

export interface WindowInstance {
  id: string;
  appId: AppId;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  component: React.ComponentType;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link: string;
  playStoreUrl?: string;
  video?: string;
  image?: string;
  appLinks?: { label: string; url: string }[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ConfigData {
  user: {
    name: string;
    tagline: string;
    avatar?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  desktop: {
    wallpaperId: string;
    funLines: string[];
    icons: DesktopIconConfig[];
  };
  apps: {
    about: {
      title: string;
      content: string;
    };
    projects: Project[];
    skills: SkillCategory[];
    experience: Experience[];
    education: Education[];
    resumeUrl: string;
    contact: {
      email: string;
      social: SocialLink[];
    };
  };
  music: {
    enabled: boolean;
    playlist: { title: string; url: string }[];
  };
}
