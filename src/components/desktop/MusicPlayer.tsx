'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { config } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { playlist, enabled } = config.music;

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  }, [playlist.length]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[currentTrackIndex].url);
      audioRef.current.addEventListener('ended', handleNextTrack);
    } else {
      audioRef.current.src = playlist[currentTrackIndex].url;
    }

    if (isPlaying) {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  
    return () => {
      if (audioRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current.removeEventListener('ended', handleNextTrack);
      }
    };
  }, [currentTrackIndex, playlist, isPlaying, handleNextTrack]);


  if (!enabled || !playlist || playlist.length === 0) return null;

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[currentTrackIndex].url);
      audioRef.current.addEventListener('ended', handleNextTrack);
    }
  
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length
    );
  };

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrevTrack}>
        <SkipBack size={16} />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={togglePlay}>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextTrack}>
        <SkipForward size={16} />
      </Button>
    </div>
  );
};

export default MusicPlayer;
