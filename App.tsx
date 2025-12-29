import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import ProfileProvider from './src/context/ProfileProvider';
import './config/firebase';

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ProfileProvider>
  );
}
