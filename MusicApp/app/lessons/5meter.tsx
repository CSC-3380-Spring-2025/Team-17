import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Meter(){
    const sd = useAudioPlayer(require('@/assets/sounds/simple_duple.mp3'));
    const st = useAudioPlayer(require('@/assets/sounds/simple_triple.mp3'));
    const sq = useAudioPlayer(require('@/assets/sounds/simple_quadruple.mp3'));
    const cd = useAudioPlayer(require('@/assets/sounds/compound_duple.mp3'));
    const ct = useAudioPlayer(require('@/assets/sounds/compound_triple.mp3'));
    const cq = useAudioPlayer(require('@/assets/sounds/compound_quadruple.mp3'));
    const b1 = useAudioPlayer(require('@/assets/sounds/beams1.mp3'));
    const b2 = useAudioPlayer(require('@/assets/sounds/beams2.mp3'));

    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Meter
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        Rhythm is a major component in music, and it is defined by the beat in a song or composition. A <Text style={styles.bold}>beat</Text> is 
                        a recurring pulse in music to which one can tap or clap along. A <Text style={styles.bold}>meter</Text> is a recurring pattern of beats in a song
                        or composition. The rhythmic values of notes and rests discussed in the previous lesson are arranged by musicians 
                        to create different meters in their music. 
                    </Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.header}>
                        Simple Meter
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Simple Meter</Text> is a meter in which the beat can be divided into two and then further subdivided in half. This can 
                        be thought of as dividing the beat into two smaller beats or tapping the beat twice as fast. 
                    </Text>
                    <Text style={styles.text}>
                        Different numbers of beats group into different meters. <Text style={styles.bold}>Duple meters</Text> are meters that contain groups of two beats.
                        <Text style={styles.bold}>Triple meters</Text> are meters that contain groups of three beats. <Text style={styles.bold}>Quadruple meters</Text> are meters that contain 
                        groups of four beats. 
                    </Text>
                    <Text style={styles.text}>
                        In Western musical notation, beat groupings are indicated by barlines, which divide music into measures. Each measure
                        equivalent to one beat grouping.
                    </Text>
                    <Image 
                        source={require('@/assets/images/bars.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./4rhythm' style={styles.secondaryLink}>
                            ← Previous: Rhythm
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./6scales' style={styles.link}>
                            Next: Scales →
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
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