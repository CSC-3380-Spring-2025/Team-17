import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, collection, increment } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "music-app-65dfe.firebaseapp.com",
  projectId: "music-app-65dfe",
  storageBucket: "music-app-65dfe.firebasestorage.app",
  messagingSenderId: "976645166528",
  appId: "1:976645166528:web:56179393fd282f0ab56425",
  measurementId: "G-F1KY58966Z"
};

export async function authenticateUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unknown error occurred.' };
    }
  }
}



export const checkConsecutiveDays=(loginDates: string[], userId: string)=>{
  let consecutiveDays = 1;

  for (let i=1; i<loginDates.length; i++){
    const prevDate= new Date(loginDates[i-1]);
    const currDate= new Date(loginDates[i]);

    if(
      currDate.getFullYear()==prevDate.getFullYear()&&
      currDate.getMonth() == prevDate.getMonth() &&
      currDate.getDate() == prevDate.getDate() + 1
    ){
      consecutiveDays++;
    }else{
      consecutiveDays=1;
    }
  } 
  updateStreak(userId, consecutiveDays)
  return consecutiveDays;
 
};

export const updateStreak = async(userId: string, confirmedConsecDays: number)=> {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  await updateDoc(userRef,{
    streak: confirmedConsecDays
  });
};



export const addCoins = async (userId: string, coins: number) => {
  if (!userId) {
    throw new Error("User ID is required to add coins.");
  }

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    coins: increment(coins)
  });
};



export const updateCoins = async(userId: string, coins: number)=> {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  await updateDoc(userRef,{
    coins: coins
  });
};
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
//export const db = getFirestore(app);
//export const storage = getStorage(app);
