// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7neQH7TbxVLo8r7CjYC8Wl8ayUC6is7M",
  authDomain: "meditation-app-7c483.firebaseapp.com",
  projectId: "meditation-app-7c483",
  storageBucket: "meditation-app-7c483.firebasestorage.app",
  messagingSenderId: "941531777954",
  appId: "1:941531777954:web:b4d2272acd175dc73580fb",
  measurementId: "G-QCBJB44ZXL"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);