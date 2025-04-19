// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, collection } from "firebase/firestore";
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

export const storeLoginDate = async(userId: string)=> {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()){
    await updateDoc(userRef,{
      loginDates: arrayUnion(new Date().toISOString().split('T')[0])
    });
  }else{
    await setDoc(userRef, {
      loginDates: [new Date().toISOString().split('T')[0]]
    });
  }
};

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
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const currentCoins = userDoc.data()?.coins || 0;
      const newCoinBalance = currentCoins + coins;
      await updateDoc(userRef, {
        coins: newCoinBalance
      });
      console.log(`Coins updated successfully. New balance: ${newCoinBalance}`);
    } else {
      const newCoinRef=doc(collection(db, "users"), userId);
      await setDoc(newCoinRef, {coins})
      console.error("User document does not exist");
    }
  } catch (error) {
    console.error("Error updating coins:", error);
  }
};


export const updateCoins = async(userId: string, coins: number)=> {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  await updateDoc(userRef,{
    coins: coins
  });
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
//export const db = getFirestore(app);
//export const storage = getStorage(app);
