import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import { Link, Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth, db, updateCoins } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useAuth} from '../app/context/AuthContext';

const Coins: React.FC=() =>{
  const [coins, setCoins]= useState('');
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
            setCoins(userDoc.data()?.coins || 0);
          } else {
            updateCoins(userId, 0);
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
      <Link href="/challenges" style={styles.imageButton}>
                        <Image
                          source={require('@/assets/images/coin.png')}
                          style={styles.buttonImage}
                          resizeMode="contain"
                        />
                      </Link>
                      <Text style={styles.coins}>  :{coins}</Text>
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
      justifyContent: 'flex-end',
      width: '100%',
    },
    streakContainer: {
      flexDirection:'row',
      alignItems: 'center',
      bottom:10,
      right: 100,
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
    coins: {
      fontSize: 14,
      color: "#fff",
      marginRight: 5
    }
  });
  export default Coins;