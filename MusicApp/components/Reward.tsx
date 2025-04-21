import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import { Link, Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth, db, updateCoins } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useAuth} from '../app/context/AuthContext';

type Props = {
    reward: number;
  };
  

export default function Reward ({ reward }: Props){
  return (
    <View style= {styles.container}>
        <Image
            source={require('@/assets/images/coin.png')}
            style={styles.buttonImage}
            resizeMode="contain"
        />
        <Text style={styles.coins}>  :{reward}</Text>
    </View>
                      
    );
  }
  
  const styles = StyleSheet.create({
    container: { 
      borderRadius: 8,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
    },
    
    buttonImage: {
      width: 20,
      height: 20,
    },
    coins: {
      fontSize: 20,
    }
  });
