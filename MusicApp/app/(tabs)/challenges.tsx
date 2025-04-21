
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {useChallenges} from '../context/ChallengesContext'
import ChallengeBox from '../../components/ChallengeBox'

export default function ChallengesScreen(){
  const {challenges}=useChallenges();
  return(
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Daily</Text>
      <View style={styles.challengeGroup}>
        {challenges.slice(0,3).map((challenge, index)=>
        (
          <ChallengeBox key={index}{...challenge}/>
        ))}
      </View>

      <Text style={styles.header}>Longterm</Text>
      <View style={styles.challengeGroup}>
        {challenges.slice(3).map((challenge, index)=>(
          <ChallengeBox key={index}{...challenge}/>
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
