import React, { useState } from 'react';
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, authenticateUser } from '../firebaseConfig';
import { Text, StyleSheet, View } from 'react-native';

  const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await authenticateUser(email, password);
      if ('error' in user) {
        alert(user.error);
      }else{
        await updateProfile(user, { displayName });
        await sendEmailVerification(user);
        const name = user.displayName||"";
        console.log("User registered successfully");
        const successMessage=`Registration successful! A verification email has been sent to ${email}. ${name}, please verify your email and then return to the login page.`;
        alert(successMessage);
      }
    } catch (error) {
      
        console.error("Unknown error caught");
        const errorMessage="An unknown error occurred.";
        alert(errorMessage);
    
    }
    };


  return (
    <form onSubmit={handleRegister}>
      <Text style={styles.text}>Name</Text>
      <br></br>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
        required
      />
      <br></br>
      <br></br>
      <br></br>
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
      <View style={styles.container}>
        <button type="submit">Register</button>
      </View>
    </form>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    
    justifyContent: 'center',
    alignItems: 'center',
},
  text: {
    color: "#ddddd",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default Register;