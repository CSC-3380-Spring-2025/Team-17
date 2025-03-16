import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Progressions(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                Harmonic Progressions
            </Text>
            <Link href='./10chords'>
                Previous: Chords
            </Link>
            <Link href='./12texture'>
                Next: Musical Textures
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