
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useChallenges } from '../context/ChallengesContext'
import ChallengeBox from '../../components/ChallengeBox'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import {  } from "react-native-safe-area-context";

export default function ChallengesScreen() {
  const [userId, setUserId] = useState('');
  const { challenges } = useChallenges();
  const [isFirstLoginOfDay, setIsFirstLoginOfDay] = useState('');




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
            setIsFirstLoginOfDay(userDoc.data()?.isFirstLoginOfDay || '');
          } else {
            console.log('No such document!');
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Daily</Text>
        <View style={styles.challengeGroup}>
          {challenges.slice(0, 2).map((challenge, index) =>
          (
            <ChallengeBox key={index}{...challenge} />
          ))}
        </View>

        <Text style={styles.header}>Longterm</Text>
        <View style={styles.challengeGroup}>
          {challenges.slice(2).map((challenge, index) => (
            <ChallengeBox key={index}{...challenge} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1D1F",
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 80,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5543A5",
  },
  challengeGroup: {
    borderWidth: 2,
    borderColor: "#5543A5",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#2A2A2A",
    marginBottom: 20,
  },
});