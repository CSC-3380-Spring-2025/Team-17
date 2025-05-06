
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useChallenges } from '../context/ChallengesContext'
import ChallengeBox from '../../components/ChallengeBox'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

const { handleTaskCompletion } = useChallenges();
const checkStreakChallenge = () => {
  handleTaskCompletion('Login three days in a row');
}
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


  useEffect(() => {
    if (isFirstLoginOfDay) {
      checkStreakChallenge();

    }
  }, [isFirstLoginOfDay, handleTaskCompletion]);




  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Daily</Text>
      <View style={styles.challengeGroup}>
        {challenges.slice(0, 3).map((challenge, index) =>
        (
          <ChallengeBox key={index}{...challenge} />
        ))}
      </View>

      <Text style={styles.header}>Longterm</Text>
      <View style={styles.challengeGroup}>
        {challenges.slice(3).map((challenge, index) => (
          <ChallengeBox key={index}{...challenge} />
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2D2D2",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  challengeGroup: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E5E5E5",
    marginBottom: 20,
  },
});
