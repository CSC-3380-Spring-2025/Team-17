import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Link} from 'expo-router';

export default function Rhythm(){
    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Rhythm
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        Music is a temporal art, meaning that time is an essential component of music. Rhythm refers to the duration of 
                        musical sounds and rests in time. 
                    </Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.header}>
                        Note Values
                    </Text>
                    <Text style={styles.text}>
                        There are many different types of notes in Western music notation that carry different rhythmic values. Note values 
                        are hierarchical. Their lengths are relative to one another. Each note value can be divided in half, creating two 
                        notes that last half as long as the first note. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/note_values.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Whole Note: </Text> This note has a thick, unfilled oval shape and no stem. This is the longest note value used in 
                        Western music. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Half Note: </Text> This note has a thin, unfilled oval shape and does have a stem. It lasts half as long as a whole
                        note. 2 half notes = 1 whole note. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Quarter Note: </Text> This note looks like a half note, except the oval notehead is filled in. It lasts half as long 
                        as a half note. 2 quarter notes = 1 half note. 4 quarter notes = 1 whole note. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Eighth Note: </Text> This note looks like a quarter note, except a flag is added to the stem. It lasts half as long 
                        as a quarter note. 2 eighth notes = 1 quarter note. 4 eighth notes = 1 half note. 8 eighth notes = 1 whole note. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Sixteenth Note: </Text> This note looks like a eighth note, except an extra flag is added to the stem. It lasts half as
                        long as a eighth note. 2 sixteenth notes = 1 eighth note. 4 sixteenth notes = 1 quarter note. 8 sixteenth notes = 1 
                        half note. 16 sixteenth notes = 1 whole note. 
                    </Text>
                    <Text style={styles.text}>
                        This pattern continues with 32nd notes, 64th notes, and so on. These notes are created by adding more flags to the stem.
                    </Text>
                </View>                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./3pitch' style={styles.secondaryLink}>
                            ← Previous: Pitch
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./5meter' style={styles.link}>
                            Next: Meter →
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        backgroundColor: '#D2D2D2',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        color: '#5543A5',
        fontSize: 36,
        fontFamily: 'Inter_700Bold',
        fontWeight: 'bold',
        marginVertical: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 3,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: 'black',
        borderWidth: 2,
        elevation: 3,
    },
    text: {
        color: '#333',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
        color: '#5543A5',
    },
    header: {
        color: '#5543A5',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'left',
    },
    image: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 8,
    },
    linksContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        gap: 12,
    },
    linkWrapper: {
        width: '100%',
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
    },
    link: {
        color: 'white',
        fontSize: 18,
        padding: 15,
        textAlign: 'center',
        backgroundColor: '#5543A5',
        borderRadius: 8,
        fontWeight: '600',
    },
    secondaryLink: {
        color: '#5543A5',
        fontSize: 16,
        padding: 15,
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#5543A5',
        borderRadius: 8,
        fontWeight: '600',
    },
});