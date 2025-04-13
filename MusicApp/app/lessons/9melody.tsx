import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {Link} from 'expo-router';

export default function Melody(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Melody
            </Text>
            <Text style={styles.text}>
                With the knowledge of pitch, rhythm, meter, scales, & intervals, it is now possible to create original melodies. A 
                <b>melody</b> is a sequence of singular notes organized in a rhythmic manner, forming the main tune of a song or
                composition. Ideally, a good melody should be catchy, singable, and easy to remember.
            </Text>
            <Text style={styles.header}>
                Melodic Characteristics
            </Text>
            <Text style={styles.text}>
                A melody is primarily defined by pitches, rhythms, and intervals. Melodies are created from a series of notes, each 
                with a specific pitch & duration. These notes are arranged in a pattern of rhythm, which adds to its overall musical
                character. 
            </Text>
            <Text style={styles.text}>
                A melody can be conjunct or disjunct depending on the prominence of certain melodic intervals. <b>Conjunct melodies</b>
                move primarily through stepwise motion. This means that conjunct melodies have mostly intervals of 2nds, keeping the notes
                close together and creating a sense of smoothness throughout the melody. 
            </Text>
            <Text style={styles.text}>
                <b>Disjunct melodies</b> move primarily through leaps, which are intervals larger than a 2nd. This keeps the notes apart 
                and creates a sense of separation throughout the melody.
            </Text>
            <Text style={styles.text}>
                Usually, a melody will consist mostly of stepwise motion and occasional leaps of a 3rd or more, which often serve as 
                the most memorable parts of a melody. 
            </Text>
            <View style={styles.links}>
                <Link href='./8intervals' style={styles.edgelinks}>
                    Previous: Intervals
                </Link>
                <Link href='/(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./10chords' style={styles.edgelinks}>
                    Next: Chords
                </Link>
            </View>
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
    examples: {
        alignItems: 'flex-start'
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