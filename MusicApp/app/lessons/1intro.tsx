import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Intro() {
    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Introduction
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        Hello there, and welcome to the Music Theory Lessons! Are you trying to write an original song
                        but have no idea where to start? Well, you have come to the right place! 
                    </Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        In these lessons, you will learn everything you need to know about writing original melodies, 
                        building strong harmonies, and creating your own music. These lessons will allow you to dive 
                        deep into topics like music notation, pitch & rhythm, scales & modes, chords & progressions, 
                        textures & structures.
                    </Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        At the end of it all, you will be well-educated in music theory and will be able to create 
                        your own music and share it with the world. Well, what are you waiting for? Let's get started!
                    </Text>
                </View>
                
                <View style={styles.ctaContainer}>
                    <Text style={styles.ctaText}>Click below to begin your journey</Text>
                </View>
                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./2notation' style={styles.link}>
                            Next: Music Notation →
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
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
    ctaContainer: {
        marginVertical: 20,
        padding: 15,
        backgroundColor: '#A49DC4',
        borderRadius: 8,
        width: '100%',
    },
    ctaText: {
        color: '#5543A5',
        opacity: 1,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    linksContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
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
        color: '#7bbl1fa2',
        fontSize: 16,
        padding: 15,
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#7b1fa2',
        borderRadius: 8,
        fontWeight: '600',
    },
});