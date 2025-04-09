import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';

type Props = {
  label: string;
  streak: number;
};

export default function Streak({ label, streak }: Props) {
  return (
    <View style={styles.streakContainer}>
        <Link href="/challenges" style={styles.streak}>
            🔥: {streak}
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  streakContainer: {
    bottom:10,
    right: 300,
  },
  streak: {
    fontSize: 14,
    color: "#fff",
    right: 10,
  }
});
