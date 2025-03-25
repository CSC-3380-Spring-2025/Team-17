import React, { useState } from 'react';
import { updateProfile } from "firebase/auth";
import { auth, authenticateUser } from '../firebaseConfig';
import { Text, StyleSheet } from 'react-native';

  const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await authenticateUser(email, password);
      if ('error' in user) {
        setMessage(user.error);
      }else{
        await updateProfile(user, { displayName });
        const name = user.displayName||"";
        console.log("User registered successfully");
        setMessage(`Registration successful! Welcome, ${name}!`);
      }
    } catch (error) {
      
        console.error("Unknown error caught");
        setMessage("An unknown error occurred.");
    
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
      <button type="submit">Register</button>
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

export default Register;