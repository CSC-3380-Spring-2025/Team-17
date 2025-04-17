import React, { useState } from 'react';
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, authenticateUser } from '../firebaseConfig';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';

  const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const handleEmailInputChange = (input: React.SetStateAction<string>)=>{
      setEmail(input)
    }
  
    const handlePasswordInputChange = (input: React.SetStateAction<string>)=>{
      setPassword(input)
    }
    const handleDisplayNameInputChange = (input: React.SetStateAction<string>)=>{
      setDisplayName(input)
    }
  const handleRegister = async () => {
   
    try {
      const user = await authenticateUser(email, password);
      if ('error' in user) {
        alert(user.error);
      }else{
        await updateProfile(user, { displayName });
        await sendEmailVerification(user);
        const name = user.displayName||"";
        console.log("User registered successfully");
        const successMessage=`Registration successful! A verification email has been sent to ${email}. ${name}, please verify your email before logging in.`;
        alert(successMessage);
      }
    } catch (error) {
      
        console.error("Unknown error caught");
        const errorMessage="An unknown error occurred.";
        alert(errorMessage);
    
    }
    };

return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={handleDisplayNameInputChange}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={handleEmailInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        value={password}
        onChangeText={handlePasswordInputChange}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
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

export default Register;

  