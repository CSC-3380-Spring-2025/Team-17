import React, { useState } from 'react';
import { updateProfile, sendEmailVerification } from 'firebase/auth';
import { authenticateUser, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Text, StyleSheet, View, TextInput, Pressable, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Link } from 'expo-router';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ name: string, src: number } | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const profileImages = [
    { name: 'aesthetic.jpg', src: require('../assets/profilepictures/aesthetic.jpg') },
    { name: 'bluemusic.jpg', src: require('../assets/profilepictures/bluemusic.jpg') },
    { name: 'blues.jpg', src: require('../assets/profilepictures/blues.jpg') },
    { name: 'brain.jpg', src: require('../assets/profilepictures/brain.jpg') },
    { name: 'grass.jpg', src: require('../assets/profilepictures/grass.jpg') },
    { name: 'guitarplayer.jpg', src: require('../assets/profilepictures/guitarplayer.jpg') },
    { name: 'musichead.jpg', src: require('../assets/profilepictures/musichead.jpg') },
    { name: 'musicmedley.jpg', src: require('../assets/profilepictures/musicmedley.jpg') },
    { name: 'piano.jpg', src: require('../assets/profilepictures/piano.jpg') },
    { name: 'purpleheadphone.jpg', src: require('../assets/profilepictures/purpleheadphone.jpg') },
    { name: 'red.jpg', src: require('../assets/profilepictures/red.jpg') },
    { name: 'rock.jpg', src: require('../assets/profilepictures/rock.jpg') },
  ];
  

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
  
        if (selectedImage) {
          await setDoc(doc(db, 'users', user.uid), {
            displayName,
            profilePicture: selectedImage.name,
          });
        }
  
        alert(`Registration successful! A verification email has been sent to ${email}.`);
      }
    } catch (error) {
      console.error('Unknown error caught', error);
      alert('An unknown error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registrationTitle}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
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
      <Pressable
        style={{
          backgroundColor: '#555',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          marginBottom: 20,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: '#fff' }}>
          {selectedImage ? 'Change Profile Picture' : 'Choose Profile Picture'}
        </Text>
      </Pressable>

      {selectedImage && (
        <Image
          source={selectedImage.src}
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
        />
      )}

      <Pressable style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </Pressable>
      <Link href="/loginPage" style={styles.createLink}>
        <Text style={styles.createLinkText}>Back to Login Page</Text>
      </Link>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.popUpContainer}>
          <Text style={styles.popUpText}>Choose a Profile Picture</Text>
          <ScrollView contentContainerStyle={styles.imageGrid}>
            {profileImages.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedImage(img);
                  setModalVisible(false);
                }}
              >
                <Image
                  source={img.src}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    margin: 10,
                    borderWidth: selectedImage === img ? 2 : 0,
                    borderColor: '#000',
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Pressable onPress={() => setModalVisible(false)} style={styles.popUpClose}>
            <Text style={{ color: '#fff' }}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

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
  popUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#333232',
  },
  popUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  popUpClose: {
    backgroundColor: '#5543A5',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
});

export default Register;
