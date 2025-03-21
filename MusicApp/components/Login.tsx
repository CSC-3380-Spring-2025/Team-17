import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName]=useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        const name = user.displayName||"";
        //setDisplayName(name);
        console.log("Login successful");
        setMessage(`Login successful! Welcome back, ${name}!`);
      } else {
        //console.error("Login failed");
        setMessage("Login failed.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error logging in:", error.message);
        setMessage(`Error logging in: ${error.message}`);
      } else {
        console.error("Unknown error caught");
        setMessage("An unknown error occurred.");
      }
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
      
    </form>
  );
};

export default Login;