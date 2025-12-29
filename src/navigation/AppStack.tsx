import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { STANDARD_NAVIGATION_OPTIONS } from '../utils/NavigationOptions';
import HomeScreen from '../screens/app/HomeScreen';
import AppTabs from './AppTabs';
import MeditationPlayer from '../screens/app/MeditationPlayer'; // <-- add this

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => (
  <>
    <StatusBar style="light" /> {/* outside navigator */}
    <Navigator screenOptions={STANDARD_NAVIGATION_OPTIONS}>
      <Screen name="AppTabs" component={AppTabs} />
      <Screen name="MeditationPlayer" component={MeditationPlayer} />
    </Navigator>
  </>
);


export default AppStack;
