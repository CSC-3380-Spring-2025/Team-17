import React, { useState } from 'react';
import { updateProfile } from "firebase/auth";
import { auth, authenticateUser } from '../firebaseConfig';

  const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await authenticateUser(email, password);
      if (user) {
        await updateProfile(user, { displayName });
        console.log("User registered successfully");
      } else {
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
        required
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;