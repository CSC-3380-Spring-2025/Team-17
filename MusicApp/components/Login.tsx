import React, { useState } from 'react';
import { signInWithEmailAndPassword} from "firebase/auth";
import {getDoc, doc} from "firebase/firestore"
import { auth, db, storeLoginDate, checkConsecutiveDays } from '../firebaseConfig';
import { Text, StyleSheet, TextInput, View, Button } from 'react-native';
import {useAuth} from "@/app/context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login}= useAuth();
  
  const handleEmailInputChange = (input: React.SetStateAction<string>)=>{
    setEmail(input)
  }

  const handlePasswordInputChange = (input: React.SetStateAction<string>)=>{
    setPassword(input)
  }

  const handleLogin = async() => {
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        if (user.emailVerified){
          await storeLoginDate(user.uid);
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const loginDates = userDoc.data()?.loginDates || [];
          const consecutiveDays = checkConsecutiveDays(loginDates, user.uid);
          const name = user.displayName||"";
          login({name:user.displayName ||""});
          if(consecutiveDays>1){
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
     <View style={styles.container}>
       <Text style={styles.title}>Login</Text>
       <TextInput
         style={styles.input}
         placeholder="Email"
         value={email}
         placeholderTextColor="#000"
         onChangeText={handleEmailInputChange}
       />
       <TextInput
         style={styles.input}
         placeholder="Password"
         value={password}
         placeholderTextColor="#000"
         onChangeText={handlePasswordInputChange}
         secureTextEntry
       />
       <Button title="Login" onPress={handleLogin} />
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     paddingHorizontal: 20,
   },
   title: {
     fontSize: 24,
     marginBottom: 20,
     textAlign: 'center',
   },
   input: {
     height: 40,
     borderColor: 'gray',
     borderWidth: 1,
     marginBottom: 20,
     paddingHorizontal: 10,
   },
 });
 
 export default Login;
 