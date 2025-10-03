'use client';

import { useDesktop } from '@/context/DesktopContext';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import { config } from '@/lib/config';
import Wallpaper from './Wallpaper';
import { AnimatePresence } from 'framer-motion';

const Desktop = () => {
  const { windows } = useDesktop();

  return (
    <main className="flex-grow relative overflow-hidden">
      <Wallpaper />
      <div className="absolute top-0 left-0 h-full w-full p-4">
        <div className="grid grid-flow-col grid-rows-5 auto-cols-max gap-x-4 gap-y-2">
          {config.desktop.icons.map((icon) => (
            <DesktopIcon key={icon.id} iconConfig={icon} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {windows
          .filter((w) => !w.isMinimized)
          .map((window) => (
            <Window key={window.id} {...window} />
          ))}
      </AnimatePresence>
    </main>
  );
};

export default Desktop;
