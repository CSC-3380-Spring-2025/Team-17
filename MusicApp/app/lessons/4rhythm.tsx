import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Link} from 'expo-router';

export default function Rhythm(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Rhythm
            </Text>
            <Text style={styles.text}>
                Music is a temporal art, meaning that time is an essential component of music. Rhythm refers to the duration of 
                musical sounds and rests in time. 
            </Text>
            <Text style={styles.header}>
                Note Values
            </Text>
            <Text style={styles.text}>
                There are many different types of notes in Western music notation that carry different rhythmic values. Note values 
                are hierarchical. Their lengths are relative to one another. Each note value can be divided in half, creating two 
                notes that last half as long as the first note. 
            </Text>
            <Image source={require('@/assets/images/note_values.png')} />
            <Text style={styles.text}>
                <b>Whole Note: </b> This note has a thick, unfilled oval shape and no stem. This is the longest note value used in 
                Western music. 
            </Text>
            <Text style={styles.text}>
                <b>Whole Note: </b> This note has a thin, unfilled oval shape and does have a stem. It lasts half as long as a whole
                note. 2 half notes = 1 whole note. 
            </Text>
            <Text style={styles.text}>
                <b>Quarter Note: </b> This note looks like a half note, except the oval notehead is filled in. It lasts half as long 
                as a half note. 2 quarter notes = 1 half note. 4 quarter notes = 1 whole note. 
            </Text>
            <Text style={styles.text}>
                <b>Eighth Note: </b> This note looks like a quarter note, except a flag is added to the stem. It lasts half as long 
                as a quarter note. 2 eighth notes = 1 quarter note. 4 eighth notes = 1 half note. 8 eighth notes = 1 whole note. 
            </Text>
            <Text style={styles.text}>
                <b>Sixteenth Note: </b> This note looks like a eighth note, except an extra flag is added to the stem. It lasts half as
                long as a eighth note. 2 sixteenth notes = 1 eighth note. 4 sixteenth notes = 1 quarter note. 8 sixteenth notes = 1 
                half note. 16 sixteenth notes = 1 whole note. 
            </Text>
            <Text style={styles.text}>
                This pattern continues with 32nd notes, 64th notes, and so on. These notes are created by adding more flags to the stem.
            </Text>
            <Text style={styles.header}>
                Rest Values
            </Text>
            <Text style={styles.text}>
                Rests refer to the durations of silence in music. Each hierarchical note value has a corresponding rest value. Just like
                note values, each rest value can be divided in half, creating two rests that last half as long as the first rest. 
            </Text>
            <Image source={require('@/assets/images/rest_values.png')} />
            <Text style={styles.header}>
                Dots & Ties
            </Text>
            
            <View style={styles.links}>
                <Link href='./3pitch' style={styles.edgelinks}>
                    Previous: Pitch
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./5meter' style={styles.edgelinks}>
                    Next: Meter
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