import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Pitch(){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Pitch
            </Text>
            <Link href='./2notation'>
                Previous: Music Notation
            </Link>
            <Link href='./4rhythm'>
                Next: Rhythm
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