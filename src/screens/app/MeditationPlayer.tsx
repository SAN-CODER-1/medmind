import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ZenText from '../../components/ZenText';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const MeditationPlayer = () => {
  const { playlist, currentIndex, isPlaying, togglePlay, next, prev } = useAudioPlayer();
  const item = playlist[currentIndex];

  if (!item) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <ZenText heading bold center>
        {item.title}
      </ZenText>

      <ZenText subtitle center opacity={0.6}>
        {item.type.toUpperCase()}
      </ZenText>

      <View style={styles.controls}>
        <TouchableOpacity onPress={prev}>
          <Ionicons name="play-back-circle" size={70} color="#00ffcc" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay}>
          <Ionicons
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={90}
            color="#00ffcc"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={next}>
          <Ionicons name="play-forward-circle" size={70} color="#00ffcc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeditationPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 14,
    marginBottom: 30,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 20,
  },
});
