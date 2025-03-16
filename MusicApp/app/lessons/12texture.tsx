import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Texture(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                Musical Textures
            </Text>
            <Link href='./11progressions'>
                Previous: Harmonic Progressions
            </Link>
            <Link href='./13structure'>
                Next: Song Structures
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