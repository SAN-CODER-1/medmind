import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/auth/SignupScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import { STANDARD_NAVIGATION_OPTIONS } from '../utils/NavigationOptions';

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={STANDARD_NAVIGATION_OPTIONS}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={STANDARD_NAVIGATION_OPTIONS}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
