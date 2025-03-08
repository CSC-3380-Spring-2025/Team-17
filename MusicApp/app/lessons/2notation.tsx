import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Notation(){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Notation
            </Text>
            <Link href='./1intro'>
                Previous: Introduction
            </Link>
            <Link href='./3pitch'>
                Next: Pitch
            </Link>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 14
    }
})