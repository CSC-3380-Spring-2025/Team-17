import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBBQVC3VGLGF6TdYjIbB2NogGAkdEWMvL8",
  authDomain: "music-app-65dfe.firebaseapp.com",
  projectId: "music-app-65dfe",
  storageBucket: "music-app-65dfe.firebasestorage.app",
  messagingSenderId: "976645166528",
  appId: "1:976645166528:web:56179393fd282f0ab56425",
  measurementId: "G-F1KY58966Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, app };