import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Intro() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Hello there, and welcome to the Music Theory Lessons! Are you trying to write an original song
                but have no idea where to start? Well, you have come to the right place! In these lessons, you will 
                learn everything you need to know about writing original melodies, building strong harmonies, and 
                creating your own music. These lessons will allow you to dive deep into topics like music notation, 
                pitch & rhythm, scales & modes, chords & progressions, textures & structures. At the end of it all, 
                you will be well-educated in music theory and will be able to create your own music and share it with 
                the world. Well, what are you waiting for? Let's get started! Click the link below to navigate to your 
                first lesson.
            </Text>
            <Link href='./2notation'>
                Next: Music Notation
            </Link>
        </View>
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