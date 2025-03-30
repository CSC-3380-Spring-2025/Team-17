// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBQVC3VGLGF6TdYjIbB2NogGAkdEWMvL8",
  authDomain: "music-app-65dfe.firebaseapp.com",
  projectId: "music-app-65dfe",
  storageBucket: "music-app-65dfe.firebasestorage.app",
  messagingSenderId: "976645166528",
  appId: "1:976645166528:web:56179393fd282f0ab56425",
  measurementId: "G-F1KY58966Z"
};

//function to handle user authentication
export async function authenticateUser(email: string, password: string) {
  try {
    // Create a new user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Return the user object
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unknown error occurred.' };
    }
  }
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);

//export const db = getFirestore(app);
//export const storage = getStorage(app);
