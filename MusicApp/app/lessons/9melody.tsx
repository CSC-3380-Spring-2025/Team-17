import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Melody(){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Melody
            </Text>
            <Link href='./8intervals'>
                Previous: Intervals
            </Link>
            <Link href='./10chords'>
                Next: Chords
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