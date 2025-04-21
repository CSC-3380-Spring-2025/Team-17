import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import { Link, Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useAuth} from '../app/context/AuthContext';

const Streak: React.FC=() =>{
  const {user}=useAuth();
  const [streak, setStreak]= useState('');
  const [userId, setUserId]= useState('');

  useEffect(()=>{
    if (auth.currentUser){
      setUserId(auth.currentUser.uid);
    }
  }, []);

  useEffect(()=>{
    const fetchUserData= async()=>{
      if(userId){
        console.log('Fetching data for userId:', userId);

        try{
          const userRef= doc(db, 'users', userId);
          const userDoc = await getDoc(userRef)
          
          if (userDoc.exists()) {
            console.log('Document data:', userDoc.data());
            setStreak(userDoc.data()?.streak || '');
          } else {
            console.log('No such document!');
          }
  
        }catch(error){
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);
  
  return (
    
      <View style={styles.headerRow}>
    <Link href="/lessons" style={styles.imageButton}>
                      <Image
                        source={require('@/assets/images/flame.png')}
                        style={styles.buttonImage}
                        resizeMode="contain"
                      />
                    </Link>
                    <Text style={styles.streak}>:{streak}</Text>
                    </View>
                    
  );
}

const styles = StyleSheet.create({
  headerContainer: {

    alignItems: "center",
    paddingTop: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  imageButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'none',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  streak: {
    fontSize: 18, // Increased font size
    color: "#f0f8ff", // Ensure high contrast color
    marginLeft: 10, // Increased margin
    padding: 5, // Added padding
    
    width: 50, // Explicit width
    height: 30, // Explicit height
    textAlign: 'center', // Center text
  }
});

export default Streak;
