import React from 'react';
import {Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Link} from 'expo-router';

export default function Intervals(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Intervals
            </Text>
            <Text style={styles.text}>
                An <b>interval</b> is defined as the distance in pitch between two notes. An interval primarily measures two things: 
                the written distance between two notes on a staff, and the aural distance between the pitches of two notes. Intervals
                can be melodic (played or sung separately) or harmonic (played or sung simultaneously). In the image below, the first 
                measure show a melodic interval between C & E while the second measure show a harmonic interval between the same pitches.
            </Text>
            <Image source={require('@/assets/images/intervals.png')} />
            <Text style={styles.text}>
                Every interval has a size & quality. A size is the distance between two notes on a staff, measured by the number of lines 
                & spaces between them. Sizes are written as numbers & are spoken as ordinal numbers (second, third, fourth, fifth, sixth, 
                seventh, etc.). Size must always be counted starting from 1. When two notes are on the same line or space, their interval 
                is called a unison. When two notes are eight lines & spaces apart, their interval is called an octave. Size is considered
                generic. That means no matter what accidentals are applied to the notes of an interval, the size is always the same. 
            </Text>
            <Link href='./7modes' style={styles.edgelinks}>
                Previous: Modes
            </Link>
            <Link href='/(tabs)/home' style={styles.homelink}>
                MusicApp
            </Link>
            <Link href='./9melody' style={styles.edgelinks}>
                Next: Melody
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
    title: {
        color: 'black',
        fontSize: 80,
        fontFamily: 'TIMES_NEW_ROMAN',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: 20
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'ARIAL',
        padding: 10
    },
    header: {
        color: 'black',
        fontSize: 36,
        fontFamily: 'ARIAL',
        fontWeight: 'bold',
        padding: 40,
        paddingTop: 60,
        textAlign: 'left',
    },
    buttons: {
        flexDirection: 'row'
    },
    links: {
        flexDirection: 'row',
        padding: 40,
        gap: 500
    },
    edgelinks: {
        color: 'purple',
        fontSize: 30
    },
    homelink: {
        color: 'purple',
        fontSize: 30,
        alignSelf: 'center'
    }
})