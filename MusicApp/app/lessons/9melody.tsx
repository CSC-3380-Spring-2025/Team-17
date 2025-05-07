import React, { useState, useEffect, useRef } from 'react';

import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { Audio } from 'expo-av';

export default function Melody() {
    const conjunct = useRef(new Audio.Sound());
    const disjunct = useRef(new Audio.Sound());
    const condis = useRef(new Audio.Sound());
    const phrases = useRef(new Audio.Sound());


    useEffect(() => {
        const loadSounds = async () => {
            await conjunct.current.loadAsync(require('@/assets/sounds/conjunct.mp3'));
            await disjunct.current.loadAsync(require('@/assets/sounds/disjunct.mp3'));
            await condis.current.loadAsync(require('@/assets/sounds/condis.mp3'));
            await phrases.current.loadAsync(require('@/assets/sounds/phrases.mp3'));
        };

        loadSounds();

        return () => {
            conjunct.current.unloadAsync();
            disjunct.current.unloadAsync();
            condis.current.unloadAsync();
            phrases.current.unloadAsync();
        };
    }, []);

    const [quiz1Answer, setQ1Answer] = useState(null);
    const [quiz2Answer, setQ2Answer] = useState(null);
    const [quiz3Answer, setQ3Answer] = useState(null);
    const answer1 = "True";
    const answer2 = "Focal Point";
    const answer3 = "True";
    const resetQuiz1 = () => setQ1Answer(null);
    const resetQuiz2 = () => setQ2Answer(null);
    const resetQuiz3 = () => setQ3Answer(null);

    return (

        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Melody
                </Text>


                <View style={styles.card}>
                    <Text style={styles.text}>
                        With the knowledge of pitch, rhythm, meter, scales, & intervals, it is now possible to create original melodies. A
                        <Text style={styles.bold}> melody</Text> is a sequence of singular notes organized in a rhythmic manner, forming the main tune of a song or
                        composition. Ideally, a good melody should be catchy, singable, and easy to remember.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Melodic Characteristics
                    </Text>
                    <Text style={styles.text}>
                        A melody is primarily defined by pitches, rhythms, and intervals. Melodies are created from a series of notes, each
                        with a specific pitch & duration. These notes are arranged in a pattern of rhythm, which adds to its overall musical
                        character. A melody follows a <Text style={styles.bold}>contour</Text>, which is a direction determined by how the melody rises & falls in pitch.
                        Usually, a melody will reach a <Text style={styles.bold}>focal point</Text>, which is the highest or lowest note in a melody that serves as a
                        climactic moment and leads to a change in the direction of the contour.
                    </Text>
                    <Text style={styles.text}>
                        A melody can be conjunct or disjunct depending on the prominence of certain melodic intervals. <Text style={styles.bold}>Conjunct melodies </Text>
                        move primarily through stepwise motion. This means that conjunct melodies have mostly intervals of 2nds, keeping the notes
                        close together and creating a sense of smoothness throughout the melody.
                    </Text>
                    <Image
                        source={require('@/assets/images/conjunct.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => conjunct.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Conjunct</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => conjunct.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Conjunct</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Disjunct melodies</Text> move primarily through leaps, which are intervals larger than a 2nd. This keeps the notes apart
                        and creates a sense of separation throughout the melody.
                    </Text>
                    <Image
                        source={require('@/assets/images/disjunct.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => disjunct.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Disjunct</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => disjunct.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Disjunct</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        Usually, a melody will consist mostly of stepwise motion and occasional leaps of a 3rd or more, which often serve as
                        the most memorable parts of a melody.
                    </Text>
                    <Image
                        source={require('@/assets/images/condis.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => condis.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Melody</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => condis.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Melody</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Melodic Structure
                    </Text>
                    <Text style={styles.text}>
                        A melody is structured in phrases. A <Text style={styles.bold}>melodic phrase</Text> encompasses a complete musical statement, similar to a
                        sentence or a clause in spoken language. A melodic phrase usually defines itself by resting, holding, or coming to
                        some point of rhythmic or tonal resolution. Short phrases can be grouped together to form a longer phrase. In most
                        melodies, phrases will start the same way, but the melodic ideas they contain will be developed differently.
                    </Text>
                    <Image
                        source={require('@/assets/images/phrases.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => phrases.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Melody</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => phrases.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Melody</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        In general, great melodies are memorable because they utilize short, clear phrases as well as repetition of melodic ideas.
                        Popular tunes like "Twinkle, Twinkle, Little Star" & "Happy Birthday" are ingrained into our minds because their combination
                        of simplicity & repetition makes them easy to recall and sing along with.
                    </Text>
                </View>


                <View>
                    <Text style={styles.quizTitle}>Quiz{"\n"}</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            1. Melodies are comprised of singular notes organized rhythmically
                        </Text>
                        {["True", "False"].map((option, index) => {
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
                            2. The highest/lowest note in a melody is a/an ______
                        </Text>
                        {["Focal Point", "Contour", "Summit", "Climax"].map((option, index) => {
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
                            3. Short Phrases can be Grouped together to form a longer Phrase.
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
                        <Link href='./8intervals' style={styles.secondaryLink}>
                            ← Previous: Intervals
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./10chords' style={styles.link}>
                            Next: Chords →
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
        backgroundColor: '#1C1D1F',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        color: '#fff',
        fontSize: 36,
        fontFamily: 'Inter_700Bold',
        fontWeight: 'bold',
        marginVertical: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    card: {
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        padding: 25,
        marginBottom: 25,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: '5543A5',
        borderWidth: 2,
        elevation: 3,
    },
    text: {
        color: '#D2D2D2',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left',
        marginBottom: 12,
    },
    bold: {
        fontWeight: 'bold',
        color: '#5543A5',
        letterSpacing: 0.2,
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'left',
    },
    subHeader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 15,
    },
    image: {
        width: '100%',
        height: 150,
        marginVertical: 20,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        width: '100%',
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
        padding: 18,
        backgroundColor: '#5543A5',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#5543A5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
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
    homelink: {
        color: 'purple',
        fontSize: 30,
        alignSelf: 'center'
    },
    quizContainer: {
        width: '100%',
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        padding: 25,
        marginBottom: 25,
        borderColor: '#5543A5',
        borderWidth: 1,
    },
    quizTitle: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 24,
    },
    quizText: {
        color: '#D2D2D2',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'center',
    },
    quizButton: {
        backgroundColor: '#3A3A3A',
        padding: 15,
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    quizButtonText: {
        color: '#D2D2D2',
        fontSize: 16,
    },
    correctAnswer: {
        backgroundColor: '#2E7D32',
        padding: 15,
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    incorrectAnswer: {
        backgroundColor: '#C62828',
        padding: 15,
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    result: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
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
    quizImage: {
        width: 300,
        height: 150,
        marginVertical: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    italic: {
        fontStyle: 'italic',
        color: '#5543A5',
    },
    examples: {
        alignItems: 'flex-start'
    },
    playButton: {
        backgroundColor: '#7E57C2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    pauseButton: {
        backgroundColor: '#9575CD',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});