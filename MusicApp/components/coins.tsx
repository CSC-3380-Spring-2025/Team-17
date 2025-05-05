import { StyleSheet, View, Pressable, Text, Image, TouchableOpacity } from 'react-native';
import { Link, router, Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth, db, updateCoins } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../app/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const Coins: React.FC = () => {
  const [coins, setCoins] = useState('');
  const [userId, setUserId] = useState('');

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
            setCoins(userDoc.data()?.coins || 0);
          } else {
            updateCoins(userId, 0);
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push('/challenges')}>
      <View style={styles.coinLink}>
        <Ionicons name="diamond" size={26} color="white" style={[styles.icon, styles.iconBorder]} />
        <Ionicons name="diamond" size={24} color="#00BFFF" style={styles.icon} />
        <Text style={styles.coinText}> {coins}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  coinLink: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    marginRight: 4,
  },
  iconBorder: {
    position: 'absolute',
    left: -1,
    top: -1,
    zIndex: -1,
  },
  coinText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: 'bold',
  }
});

export default Coins;