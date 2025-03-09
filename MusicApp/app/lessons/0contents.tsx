import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Link} from 'expo-router';
//whatever
export default function Contents(){
    return(
        <View>
            <Text style={styles.head}>
                Table of Contents
            </Text>
            <Link href='./1intro' style={styles.link}>
                Introduction
            </Link>
            <Link href='./2notation' style={styles.link}>
                Music Notation
            </Link>
            <Link href='./3pitch' style={styles.link}>
                Pitch
            </Link>
            <Link href='./4rhythm' style={styles.link}>
                Rhythm
            </Link>
            <Link href='./5meter' style={styles.link}>
                Meter
            </Link>
            <Link href='./6scales' style={styles.link}>
                Scales
            </Link>
            <Link href='./7modes' style={styles.link}>
                Modes
            </Link>
            <Link href='./8intervals' style={styles.link}>
                Intervals
            </Link>
            <Link href='./9melody' style={styles.link}>
                Melodies
            </Link>
            <Link href='./10chords' style={styles.link}>
                Chords
            </Link>
            <Link href='./11progressions' style={styles.link}>
                Harmonic Progressions
            </Link>
            <Link href='./12texture' style={styles.link}>
                Musical Textures
            </Link>
            <Link href='./13structure' style={styles.link}>
                Song Structures
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    link: {
        fontSize: 14,
        padding: 10
    }
})
