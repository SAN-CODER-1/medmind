import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { useState } from 'react';
import { auth } from '../../config/firebase'; // Expo-compatible auth

const validate = (email: string, password: string) => !!email && !!password;

interface AuthHook {
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  currentUser?: User | null;
}

const useAuthentication = (): AuthHook => {
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string) => {
    setLoading(true);
    if (!validate(email, password)) {
      Alert.alert('Invalid email or password');
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
    } catch (error: any) {
      console.log('Error registering user:', error);
      Alert.alert('Error registering user', error.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    if (!validate(email, password)) {
      Alert.alert('Invalid email or password');
      setLoading(false);
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error: any) {
      console.log('Error logging in user:', error);
      Alert.alert('Error logging in user', error.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error: any) {
      console.log('Error logging out user:', error);
      Alert.alert('Error logging out user', error.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return {
    register,
    login,
    logout,
    loading,
    currentUser: auth.currentUser,
  };
};

export default useAuthentication;
