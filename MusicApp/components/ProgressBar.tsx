import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 16,
    backgroundColor: "#E5E7EB", 
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#5543A5",
  },
});
