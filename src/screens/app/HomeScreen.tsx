// src/screens/app/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderImage from '../../components/HeaderImage';
import ZenText from '../../components/ZenText';
import ZenTextInput from '../../components/ZenTextInput';
import ZenMediaCards from '../../components/ZenMediaCards';

import SearchIcon from '../../../assets/icons/SearchIcon';
import headerImage from '../../../assets/images/home-header.png';

import MEDITATION_MEDIA from '../../utils/data/MEDITATION_MEDIA';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { setPlaylistAndPlay } = useAudioPlayer();

  const [searchText, setSearchText] = useState('');

  const filteredMedia = MEDITATION_MEDIA.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  
  const handlePlay = (index: number) => {
    setPlaylistAndPlay(MEDITATION_MEDIA, index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderImage image={headerImage} />

      <ZenText heading center bold>
        Let’s Meditate
      </ZenText>

      <ZenText subtitle center opacity={0.6} style={{ marginTop: 10 }}>
        Search entire library, find calm
      </ZenText>

      <View style={styles.searchWrapper}>
        <ZenTextInput
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          icon={() => <SearchIcon />}
        />
      </View>

      <View style={styles.section}>
        <ZenText heading bold fontSize={22}>
          Mindfulness Sessions
        </ZenText>

        <FlatList
        data={MEDITATION_MEDIA.filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={item => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item, index }) => (
          <ZenMediaCards
            title={item.title}
            image={item.image}
            duration={item.duration}
            type={item.type}
            onPress={() => handlePlay(index)}
          />
        )}
      />

      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  searchWrapper: {
    marginTop: 15,
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
});
