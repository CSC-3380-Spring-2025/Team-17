import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { Link} from 'expo-router';



export default function lessonsScreen() {
    return (
        <View style={styles.container}>
            <Link href="/lessons/0contents" asChild>
                <Pressable style={styles.squareButton}>
                    <Text style={styles.buttonText}>Start Lessons</Text>
                </Pressable>
            </Link>
        </View>
  );
}

const { width, height } = Dimensions.get('window');
const buttonSize = Math.min(width, height) * 0.8;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D2D2D2",
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Inter_700Bold",
    },
    squareButton: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: 20, 
        backgroundColor: '#D9D9D9',
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      buttonText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Inter_700Bold',
        textAlignVertical: 'bottom',
      },
});
