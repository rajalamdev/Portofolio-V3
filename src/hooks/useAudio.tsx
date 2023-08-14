"use client"
import { useEffect, useRef } from 'react';

type Options = {
  volume: number;
  playbackRate: number;
};

const useAudio = (src: string, { volume = 1, playbackRate = 1 }: Options) => {
  const sound = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(src) : undefined
  );

  
  useEffect(() => {
    sound.current!.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    sound.current!.volume = volume;
  }, [volume]);

  return sound.current;
};

export default useAudio;
