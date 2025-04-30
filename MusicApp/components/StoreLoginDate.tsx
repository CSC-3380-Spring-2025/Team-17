import { db } from "@/firebaseConfig";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const storeLoginDate = async(userId: string)=> {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  
  const today = new Date().toISOString().split('T')[0];
  console.log(`Today's date: ${today}`);

  if (userDoc.exists()){
    const loginDates = userDoc.data()?.loginDates || [];
    console.log(`Login dates from Firestore: ${loginDates}`);
    const isFirstLoginOfDay = !loginDates.includes(today);
    console.log(`isFirstLoginOfDay: ${isFirstLoginOfDay}`);
    await updateDoc(userRef, {
      loginDates: arrayUnion(today), isFirstLoginOfDay: isFirstLoginOfDay
    });

    
  } else {
    await setDoc(userRef, {
      loginDates: [today], isFirstLoginOfDay: true
    });
    
  }
};


export default storeLoginDate;