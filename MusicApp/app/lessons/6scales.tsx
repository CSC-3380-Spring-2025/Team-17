import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {Link} from 'expo-router';

export default function Scales(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Scales
            </Text>
            <Text style={styles.text}>
                A <b>scale</b> is an ordered collection of notes centered around a tonic note. A scale starts on a tonic note and 
                proceeds upwards in a pattern of whole steps and half steps until it reaches the tonic note again. Scales are always 
                named after their tonic note.
            </Text>
            <Text style={styles.header}>
                Major Scale
            </Text>
            <Text style={styles.text}>
                A <b>major scale</b> is an ordered collection of whole steps (W) & half steps (H) in the following pattern: W, W, H, W, W, W, H.
                This pattern of whole steps and half steps is always the same in every major scale. 
            </Text>
            <Text style={styles.header}>
                Scale Degrees
            </Text>
            <Text style={styles.text}>

            </Text>
            <Text style={styles.header}>
                Key Signatures
            </Text>
            <View style={styles.links}>
                <Link href='./5meter' style={styles.edgelinks}>
                    Previous: Meter
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./7modes' style={styles.edgelinks}>
                    Next: Modes
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