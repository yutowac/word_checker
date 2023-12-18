import { useRef, useState, useEffect } from 'react';

export const useAudioPlayer = (src: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = src
    const updateCurrentTime = () => setCurrentTime(audio.currentTime);

    // イベントリスナーの設定
    audio.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      // イベントリスナーのクリーンアップ
      audio.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [src]);

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return { audioRef, isPlaying, play, pause, currentTime };
};