import React, { useState } from 'react';
import { updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth, authenticateUser } from '../firebaseConfig';
import { Text, StyleSheet, View, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleEmailInputChange = (input: React.SetStateAction<string>) => {
    setEmail(input);
  };

  const handlePasswordInputChange = (input: React.SetStateAction<string>) => {
    setPassword(input);
  };

  const handleDisplayNameInputChange = (input: React.SetStateAction<string>) => {
    setDisplayName(input);
  };

  const handleRegister = async () => {
    try {
      const user = await authenticateUser(email, password);
      if ('error' in user) {
        alert(user.error);
      } else {
        await updateProfile(user, { displayName });
        await sendEmailVerification(user);
        const name = user.displayName || '';
        console.log('User registered successfully');
        alert(`Registration successful! A verification email has been sent to ${email}. ${name}, please verify your email before logging in.`);
      }
    } catch (error) {
      console.error('Unknown error caught');
      alert('An unknown error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registrationTitle}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        placeholderTextColor="#000"
        value={displayName}
        onChangeText={handleDisplayNameInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={handleEmailInputChange}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        value={password}
        onChangeText={handlePasswordInputChange}
        secureTextEntry
        autoCapitalize='none'

      />
      <Pressable style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </Pressable>
      <Link href="/loginPage" style={styles.createLink}>
        <Text style={styles.createLinkText}>Back to Login Page</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  registrationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333232',
    paddingHorizontal: 20,
    flex: 1,
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
    width: '100%',
    fontFamily: 'Inter_400Regular',
  },
  registerButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 99,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 30,
    justifyContent: 'center',
  },
  registerButtonText: {
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

export default Register;
