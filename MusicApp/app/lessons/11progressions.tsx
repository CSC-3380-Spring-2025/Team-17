import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Progressions(){
    const major = useAudioPlayer(require('@/assets/sounds/major_triads.mp3'));
    const minor = useAudioPlayer(require('@/assets/sounds/minortriads.mp3'));

    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Harmonic Progressions
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        Chords are the basis of harmony in music. A song or composition moves from one chord to another in a <Text style={styles.bold}>harmonic progression</Text>.
                        In a progression, certain chords have important functions that are instrumental in creating stable and effective harmonic progressions.
                        These will be discussed in more detail later. However, to understand the functions of chords, one must learn to identify them 
                        using Roman numerals. 
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Roman Numerals
                    </Text>
                    <Text style={styles.text}>
                        Roman numerals are used by musicians to identify chords within the context of key signatures. Roman numerals identify the scale 
                        degree of the chord's root. Because they are based on scale degrees rather than specific pitches, Roman numerals are useful for 
                        understanding how harmonies function similarly in different keys. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/Rnumerals.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Besides indicating the root of the chord, Roman numerals also indicate the quality of the chord. Uppercase Roman 
                        numerals indicate major triads & lowercase Roman numerals indicate minor triads. Lowercase Roman numerals followed 
                        by a superscript "o" represent diminished triads. Uppercase Roman numerals followed by a + sign represent augmented 
                        triads. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/Rqualities.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Just as scale degrees & solfege are the same across keys, so are Roman numerals. The examples below show the 
                        Roman numerals for G major & G minor, but the same Roman numerals would be used regardless of which pitch is the 
                        tonic. Remember that if the leading tone is raised in minor, the chord quality changes, and thus, the Roman numerals 
                        change. The minor v chord becomes a major V chord, and the subtonic VII chord becomes a diminished viio chord. This 
                        means that a Roman numeral sometimes implies a raised leading tone, so remember that when there is a V or viio in a 
                        minor key, the leading tone will be raised.  
                    </Text>
                    <Image 
                        source={require('@/assets/images/major_numerals.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color="#4CAF50"
                            title="Play triads"
                            onPress={() => major.play()}
                        />
                        <Button 
                            color="#F44336"
                            title="Pause triads"
                            onPress={() => major.pause()}
                        />
                    </View>
                    <Image 
                        source={require('@/assets/images/minor_numerals.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color="#4CAF50"
                            title="Play triads"
                            onPress={() => minor.play()}
                        />
                        <Button 
                            color="#F44336"
                            title="Pause triads"
                            onPress={() => minor.pause()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        I: Tonic Chords
                    </Text>
                    <Text style={styles.text}>
                        The <Text style={styles.bold}>tonic chord</Text> is the chord built on the tonic note, which is the first note of a scale, and it is represented by I in 
                        major keys and i in minor keys. The tonic chord represents stability and serves as a point of resolution in most musical works. 
                        Music will often begin and end on the tonic chord I. The tonic chord will either appear in root position or 1st inversion as I6. 
                        It will rarely appear in 2nd inversion as I6/4 because of the dissonant 4th.
                    </Text>  
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        V & viio: Dominant Chords
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        IV & ii: Subdominant Chords
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        VI & III: Other Chords
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Cadences
                    </Text>
                </View>
                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./10chords' style={styles.secondaryLink}>
                            ← Previous: Chords
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./12texture' style={styles.link}>
                            Next: Musical Textures →
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
    buttons: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
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
    },
    quizContainer: {
        height: 100,
        width: 200,
        
        alignItems: 'center',
        padding:7,
    },
    quizTitle: {
        color: 'black',
        fontSize: 50,
        fontFamily: 'TIMES_NEW_ROMAN',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: 20
    },
    quizText: {
        color: '#840606',
        fontSize: 20,
        alignSelf:'center',
    },
    quizButton: {
        height: 45,
        width:150,
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 5,
    },
    quizButtonText: {
        color: 'white',
        fontSize: 15,
        alignSelf:'center',
    },
    correctAnswer: {
        height: 45,
        width: 150,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      },
      incorrectAnswer: {
        height: 45,
        width: 150,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      },
      result: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
      resetButton: {
        marginTop: 10,
        backgroundColor: '#5543A5',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});