import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import useHasOnboarding from '../hooks/useHasOnboarding';
import AuthStack from './AuthStack';
import OnboardingStack from './OnboardingStack';
import AppStack from './AppStack';
import MeditationPlayer from '../screens/app/MeditationPlayer';
import visbyRegular from '../../assets/fonts/VisbyCF-Medium.ttf';
import visbyMedium from '../../assets/fonts/VisbyCF-DemiBold.ttf';
import visbyBold from '../../assets/fonts/VisbyCF-Bold.ttf';
import visbyExtraBold from '../../assets/fonts/VisbyCF-ExtraBold.ttf';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';
import PersistentPlayer from '../components/MinPlayer';
import HomeScreen from '../screens/app/HomeScreen';
const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const hasOnboarding = useHasOnboarding();

  const [fontsLoaded] = useFonts({
    'visby-regular': visbyRegular,
    'visby-medium': visbyMedium,
    'visby-bold': visbyBold,
    'visby-extra-bold': visbyExtraBold,
  });

  if (!fontsLoaded) return null; // Could show a splash screen here
return(
 <AudioPlayerProvider>
      <>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn && <Stack.Screen name="AuthStack" component={AuthStack} />}
      {isLoggedIn && !hasOnboarding && (
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      )}
      {isLoggedIn && hasOnboarding && <Stack.Screen name="AppStack" component={AppStack} />}
    </Stack.Navigator>
      <PersistentPlayer />
       
        {/* Persistent Player rendered outside stack screens */}
      </>
    </AudioPlayerProvider>
  );
};

export default AppNavigator;
