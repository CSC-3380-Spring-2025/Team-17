import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Link} from 'expo-router';

export default function Chords(){
    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Chords
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        In music, it is often not enough to just have a melody. Songs and compositions often accompany a melody with 
                        some form of harmony. <Text style={styles.bold}>Harmony</Text> is the vertical structure of a piece, which 
                        consists of multiple notes being played at the same time. Harmony is based on <Text style={styles.bold}>chords</Text>,
                        which are combinations of three or more notes that sound simultaneously. The most common chords are 
                        <Text style={styles.bold}>triads</Text>, which are chords made of three notes that are stacked in thirds. A 
                        triad can always be stacked so that its notes are either on all lines or all spaces. When a triad is stacked 
                        in its most compact form, it looks like a snowperson. Just as a snowperson consists of a bottom, middle, & head, 
                        a triad consists of bottom, middle, & upper notes. 
                    </Text>
                    <Image source={require('@/assets/images/triads.png')} 
                            style={styles.image}
                            resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        When a triad is stacked in thirds like a snowperson, this is referred to as root position. The lowest note of 
                        the triad is called the root. The middle note of the triad is called the third (a generic third above the root). 
                        The top note of the triad is called the fifth (a generic fifth above the root).
                    </Text>
                    <Image 
                        source={require('@/assets/images/triad.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./9melody' style={styles.secondaryLink}>
                            ← Previous: Melody
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./11progressions' style={styles.link}>
                            Next: Harmonic Progressions →
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
    },
    bold: {
        fontWeight: 'bold',
        color: '#5543A5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
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