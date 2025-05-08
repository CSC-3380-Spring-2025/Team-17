import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db, checkConsecutiveDays } from '../firebaseConfig';
import { Text, StyleSheet, TextInput, View, Pressable } from 'react-native';
import { useAuth } from "@/app/context/AuthContext";
import { Link } from 'expo-router';
import StoreLoginDate from './StoreLoginDate';
import { useChallenges } from '@/app/context/ChallengesContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  
  const handleEmailInputChange = (input: React.SetStateAction<string>) => {
    setEmail(input);
  };

  const handlePasswordInputChange = (input: React.SetStateAction<string>) => {
    setPassword(input);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        if (user.emailVerified) {
          await login({ name: user.displayName || "" });
          await StoreLoginDate(user.uid);
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const loginDates = userDoc.data()?.loginDates || [];
          const consecutiveDays = checkConsecutiveDays(loginDates, user.uid);
          const name = user.displayName || "";
         
          if (consecutiveDays > 1) {
            alert(`Login Successful! Great job ${name}! You've logged in for ${consecutiveDays} consecutive days!`);
          } else {
            console.log("Login successful");
            const successMessage = `Login successful! Welcome back, ${name}!`;
            alert(successMessage);
          }
        } else {
          const emailErrorMessage = "Please verify your email before logging in.";
          alert(emailErrorMessage);
        }
      } else {
        const errorMessage = 'Login failed. Your email address and/or password do not correspond to an existing account.';
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
      <Text style={styles.loginTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor="#000"
        onChangeText={handleEmailInputChange}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        placeholderTextColor="#000"
        onChangeText={handlePasswordInputChange}
        secureTextEntry
        autoCapitalize='none'
      />
      <Pressable style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </Pressable>
      <Link href="/registrationPage" style={styles.createLink}>
        <Text style={styles.createLinkText}>Create New Account</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333232',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
    textAlignVertical: 'center',
    fontFamily: 'Inter_400Regular',
  },
  signInButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 99,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 30,
    justifyContent: 'center',
  },
  signInText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  createLink: {
    marginTop: 15,
    alignSelf: 'center',
  },
  createLinkText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Login;
