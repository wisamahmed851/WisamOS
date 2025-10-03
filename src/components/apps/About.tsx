'use client';

import { useState } from 'react';
import { config } from '@/lib/config';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const About = () => {
  const { title, content } = config.apps.about;
  const { avatar, name } = config.user;

  return (
    <ScrollArea className="h-full">
      <div className="p-8 text-sm">
        {avatar && (
          <div className="flex flex-col items-center mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="cursor-zoom-in">
                  <Image
                    src={avatar}
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="rounded-full shadow-lg mb-4 hover:opacity-80 transition-opacity"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="p-0 border-0 max-w-lg w-auto bg-transparent">
                  <DialogTitle className="sr-only">Enlarged Avatar</DialogTitle>
                  <Image
                    src={avatar}
                    alt="User Avatar"
                    width={512}
                    height={512}
                    className="rounded-lg shadow-2xl"
                  />
              </DialogContent>
            </Dialog>
            <h1 className="font-headline text-2xl font-bold text-center">
              {name}
            </h1>
          </div>
        )}
        <h2 className="font-headline text-xl font-semibold mb-4">{title}</h2>
        <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
          {content}
        </p>
      </div>
    </ScrollArea>
  );
};

export default About;
