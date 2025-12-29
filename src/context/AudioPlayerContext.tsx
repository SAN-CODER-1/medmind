// src/context/AudioPlayerContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

interface AudioPlayerContextProps {
  currentTrack: MeditationItem | null;
  isPlaying: boolean;
  setPlaylistAndPlay: (playlist: MeditationItem[], startIndex?: number) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  position: number;
}

interface MeditationItem {
  title: string;
  audio: string;
  image: string;
  duration: number;
  type: string;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | null>(null);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudioPlayer must be used inside AudioPlayerProvider');
  return context;
};

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<MeditationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<MeditationItem | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (currentTrack) loadSound(currentTrack);
    return () => unloadSound();
  }, [currentTrack]);

  useEffect(() => {
    if (sound) {
      if (isPlaying) sound.playAsync();
      else sound.pauseAsync();
    }
  }, [isPlaying, sound]);

  const loadSound = async (track: MeditationItem) => {
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.audio },
        { shouldPlay: isPlaying },
        updateStatus
      );
      setSound(newSound);
    } catch (e) {
      console.log('Error loading sound', e);
    }
  };

  const unloadSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const updateStatus = (status: any) => {
    if (status.didJustFinish) playNext();
    setPosition(status.positionMillis || 0);
  };

  const setPlaylistAndPlay = (newPlaylist: MeditationItem[], startIndex = 0) => {
    setPlaylist(newPlaylist);
    setCurrentIndex(startIndex);
    setCurrentTrack(newPlaylist[startIndex]);
    setIsPlaying(true);
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    if (currentIndex + 1 < playlist.length) {
      setCurrentIndex(currentIndex + 1);
      setCurrentTrack(playlist[currentIndex + 1]);
      setIsPlaying(true);
    } else setIsPlaying(false);
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTrack(playlist[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{ currentTrack, isPlaying, setPlaylistAndPlay, togglePlayPause, playNext, playPrev, position }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
