import React from 'react';
import {Text, ScrollView, StyleSheet, View, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Texture(){
    const bach = useAudioPlayer(require('@/assets/sounds/bach_cello.mp3'));
    const oboe = useAudioPlayer(require('@/assets/sounds/messiaen_oboe.mp3'));
    const seikilos = useAudioPlayer(require('@/assets/sounds/seikilos.mp3'));
    const turkey = useAudioPlayer(require('@/assets/sounds/turkey.mp3'));

    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Musical Textures
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Musical texture</Text> is the density of & interaction between the different voices in 
                        a musical work. There are many different types of textures, but the four most common categories are monophony, 
                        heterophony, homophony, & polyphony. 
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Monophony
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Monophony</Text> is a texture characterized by a single, unaccompanied melodic line of music.
                        Monophony consists of either a solo voice or instrument, or all instruments playing or singing in unison, making it the 
                        simplest & most exposed of all musical textures. 
                    </Text>
                    <Text style={styles.text}>
                        J. S. Bach's Cello Suite No. 1 in G Major features a solo cello that is the only voice in this work. It carries a melodic line 
                        all by itself with no accompaniment whatsoever. This is a good example of a monophonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Cello Suite No. 1 in G Major - Johann Sebastian Bach
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Monophony" 
                                onPress={() => bach.play()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Monophony" 
                                onPress={() => bach.pause()} 
                            /> 
                        </View>
                    </View>
                    <Text style={styles.text}>
                        The third movement of Olivier Messiaen's Quartet for the End of Time features a solo oboe that carries a melodic line 
                        without any accompaniment. This is another good example of a monophonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Quartet for the End of Time: III. Abime des Oiseaux - Olivier Messiaen
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Monophony" 
                                onPress={() => oboe.play()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Monophony" 
                                onPress={() => oboe.pause()} 
                            /> 
                        </View>
                    </View>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.header}>
                        Heterophony
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Heterophony</Text> is a texture characterized by multiple variations of the same melodic line 
                        that are heard across different voices. These variations can range from small embellishing tones to longer runs in a 
                        single voice, as long as the melodic material remains relatively constant.
                    </Text>
                    <Text style={styles.text}>
                        The Song of Seikilos is the oldest song ever recovered in its entirety. It was composed by Seikilos in ancient Greece in 200 BC 
                        in memory of his dead wife. There are two voices: a plucked string instrument and a soprano voice. The two voices play the same   
                        melodic line in unison, but the soprano voice uses certain embellishments to create variation & distinction between the voices. 
                        This is a good example of a heterophonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Song of Seikilos
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Heterophony" 
                                onPress={() => seikilos.play()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Heterophony" 
                                onPress={() => seikilos.pause()} 
                            /> 
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Urfaliyam Ezelden is a Turkish classical song. In the beginning, there is a melodic line performed by a plucked string 
                        instrument & a wind instrument. While both instruments play the same melody, the wind instrument performs slight embellishments 
                        to create variation & distinction between the instruments. This is another good example of a heterophonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Urfaliyam Ezelden
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Heterophony" 
                                onPress={() => turkey.play()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Heterophony" 
                                onPress={() => turkey.pause()} 
                            /> 
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Homophony
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Homophony</Text> is a texture characterized by multiple voices moving together harmonically at 
                        the same pace. This is the most common musical texture. This often takes the form of a single predominant voice that carries the melody
                        while the other voices are used to provide harmonies. Homophony is sometimes divided into two subcategories: homorhythm and 
                        melody & accompaniment. 
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Polyphony
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Polyphony</Text> is a texture characterized by multiple voices having separate melodic lines & 
                        rhythms. Each voice has its own independent melodic line, and the independent voices blend together to create harmonies.  
                    </Text>
                </View>

                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./11progressions' style={styles.secondaryLink}>
                            ← Previous: Harmonic Progressions
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./13structure' style={styles.link}>
                            Next: Song Structures →
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
        padding: 10
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
    bold: {
        fontWeight: 'bold',
        color: '#5543A5',
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
    image: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 8,
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