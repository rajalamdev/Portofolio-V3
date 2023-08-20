"use client"
import { useEffect, useRef } from 'react';

type Options = {
  volume: number;
  playbackRate: number;
  loop: boolean;
};

const useAudio = (src: string, { volume = 1, playbackRate = 1, loop = false }: Options) => {
  const sound = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(src) : undefined
  );

  useEffect(() => {
    sound.current!.loop = true
  }, [loop])

  useEffect(() => {
    sound.current!.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    sound.current!.volume = volume;
  }, [volume]);

  return sound.current;
};

export default useAudio;
