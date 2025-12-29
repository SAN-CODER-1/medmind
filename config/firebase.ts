import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7neQH7TbxVLo8r7CjYC8Wl8ayUC6is7M",
  authDomain: "meditation-app-7c483.firebaseapp.com",
  projectId: "meditation-app-7c483",
  storageBucket: "meditation-app-7c483.firebasestorage.app",
  messagingSenderId: "941531777954",
  appId: "1:941531777954:web:b4d2272acd175dc73580fb",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
