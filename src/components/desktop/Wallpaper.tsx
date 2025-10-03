'use client';
import Image from 'next/image';

const Wallpaper = () => {
  return (
    <div className="absolute inset-0 aurora-background">
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="relative w-[30vw] h-[30vh] max-w-[256px] max-h-[256px] animate-pulse-slow">
          <Image
            src="/a-logo.svg"
            alt="A Logo"
            fill
            className="object-contain"
            style={{
              filter:
                'drop-shadow(0 0 0.5rem hsl(var(--accent) / 0.5)) drop-shadow(0 0 2rem hsl(var(--accent) / 0.3))',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;
