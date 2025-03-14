import ProgressBar from "@/components/ProgressBar";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type ChallengeProps = {
  title: string;
  progress: number;
  goal: number;
};

const ChallengeBox = ({ title, progress, goal }: ChallengeProps) => {
  return (
    <View style={styles.challengeItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.progressText}>
        {progress}/{goal}
      </Text>
      <ProgressBar progress={(progress / goal) * 100} />
    </View>
  );
};

export default function ChallengesScreen() {
  const [challenges] = useState([
    { title: "Complete 2 lessons", progress: 1, goal: 2 }, // Change progress manually
    { title: "Spend 10 minutes learning", progress: 3, goal: 20 }, // Change here
    { title: "Use the acoustic guitar in a track", progress: 1, goal: 1 }, // Change here
    { title: "Create a 3-minute track", progress: 2, goal: 3 }, // Change here
    { title: "Upload 4 custom recordings", progress: 3, goal: 4 }, // Change here
    { title: "Score 80% or higher in 5 lessons", progress: 1, goal: 5 }, // Change here
  ]);
//comment
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily</Text>
      <View style={styles.challengeGroup}>
        {challenges.slice(0, 3).map((challenge, index) => (
          <ChallengeBox key={index} {...challenge} />
        ))}
      </View>

      <Text style={styles.header}>Weekly</Text>
      <View style={styles.challengeGroup}>
        {challenges.slice(3).map((challenge, index) => (
          <ChallengeBox key={index} {...challenge} />
        ))}
      </View>
    </View>
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
  challengeItem: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  progressText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Inter_400Regular",
    marginTop: 5,
  },
});
