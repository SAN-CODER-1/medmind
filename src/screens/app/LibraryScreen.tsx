import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ZenText from '../../components/ZenText';
import ZenTextInput from '../../components/ZenTextInput';
import ZenMediaCards from '../../components/ZenMediaCards';
import HeaderImage from '../../components/HeaderImage';
import SearchIcon from '../../../assets/icons/SearchIcon';
import LIBRARY_MEDIA from '../../utils/data/LIBRARY_MEDIA';
import headerImage from '../../../assets/images/home-header.png';
import { useProfile } from '../../context/ProfileProvider';

interface LibraryScreenProps {}

const LibraryScreen = (props: LibraryScreenProps) => {
  const { profile } = useProfile();
  const [searchText, setSearchText] = useState('');

  const filteredMedia = LIBRARY_MEDIA.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <HeaderImage image={headerImage} />

          <ZenText heading center bold>
            Library
          </ZenText>

          <ZenText subtitle center opacity={0.6} style={{ marginTop: 10 }}>
            Explore all available sessions and content
          </ZenText>

          <View style={styles.searchWrapper}>
            <ZenTextInput
              placeholder="Search Library"
              value={searchText}
              onChangeText={setSearchText}
              icon={() => <SearchIcon />}
            />
          </View>

          {/* Featured Sessions */}
          <View style={styles.section}>
            <ZenText heading bold fontSize={22} style={{ marginBottom: 10 }}>
              Featured
            </ZenText>
            <FlatList
              horizontal
              data={filteredMedia.slice(0, 4)}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <ZenMediaCards
                  title={item.title}
                  image={item.image}
                  duration={item.duration}
                  type={item.type}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Genres Section */}
          <View style={styles.section}>
            <ZenText heading bold fontSize={22} style={{ marginBottom: 10 }}>
              Genres
            </ZenText>
            <FlatList
              horizontal
              data={filteredMedia.slice(0, 6)}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <ZenMediaCards
                  title={item.title}
                  image={item.image}
                  duration={item.duration}
                  type={item.type}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Recently Added */}
          <View style={styles.section}>
            <ZenText heading bold fontSize={22} style={{ marginBottom: 10 }}>
              Recently Added
            </ZenText>
            <FlatList
              horizontal
              data={filteredMedia.slice(-4)}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <ZenMediaCards
                  title={item.title}
                  image={item.image}
                  duration={item.duration}
                  type={item.type}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <ZenText heading bold fontSize={22} style={{ marginTop: 20, marginHorizontal: 20 }}>
            All Sessions
          </ZenText>
        </>
      }
      data={filteredMedia}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <ZenMediaCards
          title={item.title}
          image={item.image}
          duration={item.duration}
          type={item.type}
          style={{ marginVertical: 5 }}
        />
      )}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  searchWrapper: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
  },
});
