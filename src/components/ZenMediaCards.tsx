import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ZenText from './ZenText';
import convertSecondToMinute from '../utils/helper/convertSecondToMinute';

interface ZenMediaCardsProps {
  title: string;
  image: string;
  duration: number;
  type?: string; // ✅ optional
  onPress?: () => void;
}

const ZenMediaCards: React.FC<ZenMediaCardsProps> = ({
  title,
  image,
  duration,
  type = 'audio', // ✅ default value
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <ZenText subtitle bold style={styles.title}>
        {title}
      </ZenText>

      <ZenText bold opacity={0.6} style={styles.meta}>
        {type.toUpperCase()} • {convertSecondToMinute(duration)}
      </ZenText>
    </TouchableOpacity>
  );
};

export default ZenMediaCards;

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 12,
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  title: {
    marginTop: 8,
  },
  meta: {
    marginTop: 4,
  },
});
