import React, { useState } from 'react';
import { signInWithEmailAndPassword} from "firebase/auth";
import {getDoc, doc} from "firebase/firestore"
import { auth, db, storeLoginDate, checkConsecutiveDays } from '../firebaseConfig';
import { Text, StyleSheet } from 'react-native';

type LoginProps = {
  streak: number;
  setStreak: (streak: number) => void;
}
const Login: React.FC<LoginProps> = ({streak, setStreak}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        if (user.emailVerified){
          await storeLoginDate(user.uid);
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const loginDates = userDoc.data()?.loginDates || [];
          const consecutiveDays = checkConsecutiveDays(loginDates);
          const name = user.displayName||"";

          if(consecutiveDays>1){
            setStreak(consecutiveDays)
            alert(`Login Successful! Great job ${name}! You've logged in for ${consecutiveDays} consecutive days!`);
          }else{
            console.log("Login successful");
            const successMessage=`Login successful! Welcome back, ${name}!`;
            alert(successMessage);
        }}else{
          const emailErrorMessage="Please verify your email before logging in.";
          alert(emailErrorMessage);
        }
      } else {
        const errorMessage = 'Login failed. Your email address and/or password do not correspond to an existing account.'
        console.error("Login failed");
        alert(errorMessage);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error logging in:", error.message);
        alert(`Error logging in: ${error.message}`);
      } else {
        console.error("Unknown error caught");
        alert("An unknown error occurred.");
      }
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <Text style={styles.text}>Email</Text>
      <br></br>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <br></br>
      <br></br>
      <br></br>
      <Text style={styles.text}>Password</Text>
      <br></br>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <br></br>
      <br></br>
      <br></br>
      <button type="submit">Login</button>
    </form>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#ddddd",
    fontSize: 16,
    fontWeight: "bold",
  },
})


export default Login;