'use client';

import React, { useRef } from 'react';
import { useDesktop } from '@/context/DesktopContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Square, Minimize2, ChevronDown } from 'lucide-react';
import type { WindowInstance } from '@/types';
import { cn } from '@/lib/utils';
import { motion, useDragControls } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Window: React.FC<WindowInstance> = ({
  id,
  title,
  component: ContentComponent,
  position,
  size,
  isMaximized,
}) => {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, updateWindowPosition } = useDesktop();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragControls.start(e);
    focusWindow(id);
  };
  
  const desktopVariants = {
    hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const mobileVariants = {
    hidden: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
  };
  
  const isEffectivelyMaximized = isMaximized || isMobile;

  return (
    <>
      <div ref={constraintsRef} className="absolute inset-0 bottom-16 pointer-events-none" />

      <motion.div
        drag={!isMobile}
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        onDragEnd={(_, info) => {
          if (!isEffectivelyMaximized) {
            updateWindowPosition(id, info.point);
          }
        }}
        dragMomentum={false}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={isMobile ? mobileVariants : desktopVariants}
        style={{
          width: isEffectivelyMaximized ? '100%' : size.width,
          height: isEffectivelyMaximized ? 'calc(100% - 4rem)' : size.height,
          x: isEffectivelyMaximized ? 0 : position.x,
          y: isEffectivelyMaximized ? 0 : position.y,
        }}
        className={cn(
          "absolute flex flex-col shadow-2xl z-20",
          isEffectivelyMaximized ? "rounded-none" : "rounded-lg"
        )}
        onPointerDown={() => focusWindow(id)}
        layout // This enables smooth animation between maximized/restored states
      >
        <Card className="flex flex-col flex-grow glass-card w-full h-full overflow-hidden">
          <CardHeader
            className={cn(
              "flex-row items-center justify-between p-2 h-10 select-none border-b",
              isEffectivelyMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
            )}
            onPointerDown={isEffectivelyMaximized ? undefined : handlePointerDown}
            onDoubleClick={isMobile ? undefined : () => toggleMaximize(id)}
          >
            <span className="font-headline text-sm truncate ml-2">{title}</span>
            <div className="flex items-center gap-1 md:gap-1">
              {isMobile ? (
                 <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => closeWindow(id)}>
                   <ChevronDown size={20} />
                 </Button>
              ) : (
                <>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => minimizeWindow(id)}>
                    <Minus size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleMaximize(id)}>
                    {isMaximized ? <Minimize2 size={16} /> : <Square size={16} />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/80" onClick={() => closeWindow(id)}>
                    <X size={16} />
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-0 overflow-auto">
            <ContentComponent />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Window;
