// src/components/PersistentPlayer.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const PersistentPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrev, position } = useAudioPlayer();

  if (!currentTrack) return null;

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = currentTrack.duration > 0 ? position / (currentTrack.duration * 1000) : 0;

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentTrack.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { flex: progress }]} />
          <View style={[styles.progressRemaining, { flex: 1 - progress }]} />
        </View>
        <Text style={styles.duration}>{formatTime(position)} / {currentTrack.duration}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={playPrev}>
          <Ionicons name="play-back-circle" size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext}>
          <Ionicons name="play-forward-circle" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersistentPlayer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    backgroundColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressContainer: {
    height: 4,
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 2,
    marginVertical: 4,
  },
  progressBar: {
    backgroundColor: '#00ffcc',
    borderRadius: 2,
  },
  progressRemaining: {
    backgroundColor: 'transparent',
  },
  duration: {
    color: '#ccc',
    fontSize: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 10,
  },
});
