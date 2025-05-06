import React, { useState, useEffect, useRef} from 'react';
import {Text, ScrollView, StyleSheet, View, Button, Pressable} from 'react-native';
import {Link} from 'expo-router';
import { Audio } from 'expo-av';

export default function Texture(){
    const bach = useRef(new Audio.Sound());
    const oboe = useRef(new Audio.Sound());
    const seikilos = useRef(new Audio.Sound());
    const turkey = useRef(new Audio.Sound());
    const handel = useRef(new Audio.Sound());
    const jazz = useRef(new Audio.Sound());
    const canon = useRef(new Audio.Sound());
    const chakrulo = useRef(new Audio.Sound());

    useEffect(() => {
            const loadSounds = async () => {
                await bach.current.loadAsync(require('@/assets/sounds/bach_cello.mp3'));
                await oboe.current.loadAsync(require('@/assets/sounds/messiaen_oboe.mp3'));
                await seikilos.current.loadAsync(require('@/assets/sounds/seikilos.mp3'));
                await turkey.current.loadAsync(require('@/assets/sounds/turkey.mp3'));
                await handel.current.loadAsync(require('@/assets/sounds/handel.mp3'));
                await jazz.current.loadAsync(require('@/assets/sounds/jazz.mp3'));
                await canon.current.loadAsync(require('@/assets/sounds/canon.mp3'));
                await chakrulo.current.loadAsync(require('@/assets/sounds/chakrulo.mp3'));
            };
    
            loadSounds();
    
            return () => {
                bach.current.unloadAsync();
                oboe.current.unloadAsync();
                seikilos.current.unloadAsync();
                turkey.current.unloadAsync();
                handel.current.unloadAsync();
                jazz.current.unloadAsync();
                canon.current.unloadAsync();
                chakrulo.current.unloadAsync();
            };
        }, []);

        const [quiz1Answer, setQ1Answer] = useState(null);
        const [quiz2Answer, setQ2Answer] = useState(null);
        const [quiz3Answer, setQ3Answer] = useState(null);
        const answer1 = "G,A,B,C,D,E,F,G,A";
        const answer2 = "Raises the Note by a 1/2 Step";
        const answer3 = "False";

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
                        <Text style={styles.bold}>Musical texture</Text> is the density of and interaction between the different voices in 
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
                        Johann Sebastian Bach's Cello Suite No. 1 in G Major features a solo cello that is the only voice in this work. It carries a melodic line 
                        all by itself with no accompaniment whatsoever. Thus, this is a good example of a monophonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Cello Suite No. 1 in G Major - Johann Sebastian Bach
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Monophony" 
                                onPress={() => bach.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Monophony" 
                                onPress={() => bach.current.pauseAsync()} 
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
                                onPress={() => oboe.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Monophony" 
                                onPress={() => oboe.current.pauseAsync()} 
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
                        Thus, this is a good example of a heterophonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Song of Seikilos
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Heterophony" 
                                onPress={() => seikilos.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Heterophony" 
                                onPress={() => seikilos.current.pauseAsync()} 
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
                                onPress={() => turkey.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Heterophony" 
                                onPress={() => turkey.current.pauseAsync()} 
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
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Homorhythm</Text> is a type of homophonic texture in which all voices move in a similar or 
                        completely unison rhythm. This is mostly seen in choral music, where the melody & harmonies move in block chords. The  
                        "Hallelujah" chorus from George Frederic Handel's Messiah features homorhythmic sections where all voices are 
                        moving in the same rhythm. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            "Hallelujah" Chorus from the Messiah - George Frederic Handel
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Homophony" 
                                onPress={() => handel.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Homophony" 
                                onPress={() => handel.current.pauseAsync()} 
                            /> 
                        </View>
                    </View>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Melody & accompaniment</Text> is the most common type of homophony. This texture is characterized 
                        by a clear melody that is distinct from the other supporting voices, which are called an accompaniment. The melody will often 
                        have a different rhythm than the accompanying voices. The classic jazz song "Love is Here to Stay" by Louis Armstrong & Ella 
                        Fitzgerald features a prominent melody sung by both Armstrong & Fitzgerald & accompanied by harmony in the other instruments. 
                        The melody & accompaniment are never really in rhythmic unison, but the accompanying instruments support the vocal melody by 
                        filling out the texture harmonically.
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Love is Here to Stay - Louis Armstrong & Ella Fitzgerald
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Homophony" 
                                onPress={() => jazz.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Homophony" 
                                onPress={() => jazz.current.pauseAsync()} 
                            /> 
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Polyphony
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Polyphony</Text> is a texture characterized by multiple voices having separate melodic lines & 
                        rhythms. Each voice has its own independent melodic line, and the independent voices blend together to create harmonies.  
                    </Text>
                    <Text style={styles.text}>
                        Johann Pachelbel's Canon in D utilizes a canon technique, in which different instruments play the melody at different times, 
                        and as the instruments sound together, the voices overlap & interwine with each other, giving each instrument its own independent melodic line. 
                        Thus, this is a good example of a polyphonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Canon in D - Johann Pachelbel
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Polyphony" 
                                onPress={() => canon.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Polyphony" 
                                onPress={() => canon.current.pauseAsync()} 
                            /> 
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Chakrulo is a Georgian folk choral song that appeared in the Kakheti region. It consists of two individual vocalists 
                        singing against the background of a slow chorus. The two vocalists and the chorus are singing independent melodic lines 
                        at different rhythms. This is another good example of a polyphonic texture. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Chakrulo
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                color='#4CAF50' 
                                title="Play Polyphony" 
                                onPress={() => chakrulo.current.playAsync()} 
                            />
                            <Button 
                                color='#F44336' 
                                title="Pause Polyphony" 
                                onPress={() => chakrulo.current.pauseAsync()} 
                            /> 
                        </View>
                    </View>
                </View>

<View>
                    <Text style={styles.quizTitle}>Quiz</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                        1. The four most common types of textures are Monophony, Heterophony, Homophony, & _______
                        </Text>
                        {["Multiphony", "Solophony", "Cacophony", "Polyphony"].map((option, index) => {
                            const selected = quiz1Answer === option;
                            const correct = option === answer1;

                            let buttonStyle = styles.quizButton;

                            if (quiz1Answer) {
                                if (selected && correct) {
                                    buttonStyle = styles.correctAnswer;
                                } else if (selected && !correct) {
                                    buttonStyle = styles.incorrectAnswer;
                                } else if (!selected && correct) {
                                    buttonStyle = styles.correctAnswer;
                                }
                            }

                            return (
                                <Pressable
                                    key={index}
                                    style={buttonStyle}
                                    disabled={!!quiz1Answer}
                                    onPress={() => {
                                        if (!quiz1Answer) setQ1Answer(option);
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz1Answer && (
                            <Text style={styles.result}>
                                {quiz1Answer === answer1 ? "Correct!" : "Try Again"}
                            </Text>
                        )}
                    </View>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                        2. The Song of Seikilos has what kind of texture?
                        </Text>
                        {["Monophony", "Heterophony", "Homophony", "Polyphony"].map((option, index) => {
                            const selected = quiz2Answer === option;
                            const correct = option === answer2;

                            let buttonStyle = styles.quizButton;

                            if (quiz2Answer) {
                                if (selected && correct) {
                                    buttonStyle = styles.correctAnswer;
                                } else if (selected && !correct) {
                                    buttonStyle = styles.incorrectAnswer;
                                } else if (!selected && correct) {
                                    buttonStyle = styles.correctAnswer;
                                }
                            }
                            return (
                                <Pressable
                                    key={index}
                                    style={buttonStyle}
                                    disabled={!!quiz2Answer}
                                    onPress={() => {
                                        if (!quiz2Answer) setQ2Answer(option);
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz2Answer && (
                            <Text style={styles.result}>
                                {quiz2Answer === answer2 ? "Correct!" : "Try Again"}
                            </Text>
                        )}
                    </View>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            3. Homorhythm is a type of homophonic texture in which all voices move in a similar or 
                            completely unison rhythm.
                        </Text>
                        {["True", "False"].map((option, index) => {
                            const selected = quiz3Answer === option;
                            const correct = option === answer3;

                            let buttonStyle = styles.quizButton;

                            if (quiz3Answer) {
                                if (selected && correct) {
                                    buttonStyle = styles.correctAnswer;
                                } else if (selected && !correct) {
                                    buttonStyle = styles.incorrectAnswer;
                                } else if (!selected && correct) {
                                    buttonStyle = styles.correctAnswer;
                                }
                            }

                            return (
                                <Pressable
                                    key={index}
                                    style={buttonStyle}
                                    disabled={!!quiz3Answer}
                                    onPress={() => {
                                        if (!quiz3Answer) setQ3Answer(option);
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz3Answer && (
                            <Text style={styles.result}>
                                {quiz3Answer === answer3 ? "Correct!" : "Try Again"}
                            </Text>
                        )}
                    </View>
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
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    quizTitle: {
        color: 'black',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 30,
        textDecorationLine: 'underline',
    },
    quizText: {
        color: '#840606',
        fontSize: 20,
        alignSelf: 'center',
    },
    quizButton: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    quizButtonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
    },
    correctAnswer: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    incorrectAnswer: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    result: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    }
});