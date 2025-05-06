import { StyleSheet, View, Pressable, Text, Image, TouchableOpacity } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../app/context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const Streak: React.FC = () => {
  const { user } = useAuth();
  const [streak, setStreak] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

  const flameColor = streak === '0' ? '#808080' : '#FFA500';
  const borderColor = streak === '0' ? '#D3D3D3' : 'white';

  useEffect(() => {
    if (auth.currentUser) {
      setUserId(auth.currentUser.uid);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        console.log('Fetching data for userId:', userId);

        try {
          const userRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userRef)

          if (userDoc.exists()) {
            console.log('Document data:', userDoc.data());
            setStreak(userDoc.data()?.streak || '0');
          } else {
            console.log('No such document');
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push('/lessons')}>
      <View style={styles.iconContainer}>
        <Ionicons name="flame" size={28} color="white" style={styles.iconBorder}/>
        <Ionicons name="flame" size={24} color="#FFA500" style={styles.icon}/>
      </View>
      <Text style={[ styles.streakText, streak === '0' && styles.greyText ]}> {streak}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 8,
  },
  iconContainer: {
    position: 'relative',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
  },
  iconBorder: {
    position: 'absolute',
    zIndex: -1,
  },
  streakText: {
    fontSize: 18,
    color: "#f0f8ff",
    fontWeight: 'bold',
    includeFontPadding: false,
    marginLeft: 0,
    marginTop: 4,
  },
  greyText: {
    color: '#808080',
  }
});

export default Streak;