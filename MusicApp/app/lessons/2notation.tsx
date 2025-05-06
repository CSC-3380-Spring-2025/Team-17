import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';

export default function Notation() {
    const slurSound = useRef(new Audio.Sound());
    const staccatoSound = useRef(new Audio.Sound());
    const accentSound = useRef(new Audio.Sound());
    const [quiz1Answer, setQ1Answer] = useState(null);
    const [quiz2Answer, setQ2Answer] = useState(null);
    const [quiz3Answer, setQ3Answer] = useState(null);
    const answer1 = "Pitch and Rhythm";
    const answer2 = "False";
    const answer3 = "Mezzo Forte";

    useEffect(() => {
        const loadSounds = async () => {
            await slurSound.current.loadAsync(require('@/assets/sounds/a-slur.mp3'));
            await staccatoSound.current.loadAsync(require('@/assets/sounds/c-staccato.mp3'));
            await accentSound.current.loadAsync(require('@/assets/sounds/d-accent.mp3'));
        };

        loadSounds();

        return () => {
            slurSound.current.unloadAsync();
            staccatoSound.current.unloadAsync();
            accentSound.current.unloadAsync();
        };
    }, []);


    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Music Notation
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        Music is an auditory art form that can be represented visually with notation.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        A musical note indicates both pitch and rhythm. The pitch of the note is determined
                        based on its location on a staff. A <Text style={styles.bold}>staff</Text> is a series of five horizontal lines like
                        the one seen below.
                    </Text>
                    <Image
                        source={require('@/assets/images/staff.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        Notes with a higher pitch are written higher on the staff than notes with a lower pitch.
                        Essentially, higher notes are placed above lower ones.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Music Notes
                    </Text>
                    <Text style={styles.text}>
                        A note is shaped like an oval and can be filled in or left empty depending on its rhythmic value.
                        The size of a note should be such that if it is located on a line, it should occupy half of each space
                        above and below the line. If it is located on a space, it should occupy the whole area of the space between
                        the lines, but not go beyond the lines. Notes also have stems that can point up or down depending on its location
                        on the staff.
                    </Text>
                    <Image
                        source={require('@/assets/images/notes.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Ledger Lines
                    </Text>
                    <Text style={styles.text}>
                        If notes are too high or too low to be written on a staff, one can use <Text style={styles.bold}>ledger lines</Text> to extend the staff
                        and write higher & lower notes.
                    </Text>
                    <Image
                        source={require('@/assets/images/ledger.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Dynamics
                    </Text>
                    <Text style={styles.text}>
                        One important aspect of music notation is dynamics. <Text style={styles.bold}>Dynamics</Text> indicate the loudness or volume of
                        certain notes. Since Western music theory originated in Italy, musicians use italicized Italian words to denote
                        dynamics. They are usually written above or below the staff.
                    </Text>
                    <Image
                        source={require('@/assets/images/dynamics.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Tempo
                    </Text>
                    <Text style={styles.text}>
                        Another important aspect of notation is tempo. <Text style={styles.bold}>Tempo</Text> is the speed of the composition and determines
                        how fast or how slow the notes are played. Tempo is usually marked specifically, with metronome markings or
                        unspecifically, with textual indications.
                    </Text>
                    <Image
                        source={require('@/assets/images/tempo.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Articulation
                    </Text>
                    <Text style={styles.text}>
                        One more important aspect of notation is articulation. <Text style={styles.bold}>Articulation</Text> is the connection or separation between
                        notes and the accent level at the beginning of the note (the attack).
                    </Text>

                    <Text style={styles.subHeader}>
                        Legato
                    </Text>
                    <Text style={styles.text}>
                        Play or sing notes smoothly and connected. This articulation is indicated by a curved slur over the
                        notes.
                    </Text>
                    <Image
                        source={require('@/assets/images/slur.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Play Slur"
                            onPress={() => slurSound.current.playAsync()}
                            color="#4CAF50"
                        />
                        <Button
                            title="Pause Slur"
                            onPress={() => slurSound.current.pauseAsync()}
                            color="#F44336"
                        />
                    </View>

                    <Text style={styles.subHeader}>
                        Staccato
                    </Text>
                    <Text style={styles.text}>
                        Play or sing notes separately, leaving space in between. This articulation is indicated by
                        placing dots above or below each of the notes.
                    </Text>
                    <Image
                        source={require('@/assets/images/stacatto.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Play Staccato"
                            onPress={() => staccatoSound.current.playAsync()}
                            color="#4CAF50"
                        />
                        <Button
                            title="Pause Staccato"
                            onPress={() => staccatoSound.current.pauseAsync()}
                            color="#F44336"
                        />
                    </View>

                    <Text style={styles.subHeader}>
                        Accent
                    </Text>
                    <Text style={styles.text}>
                        Play or sing a note with extra emphasis. This articulation is indicated by a sideways V over the
                        notes.
                    </Text>
                    <Image
                        source={require('@/assets/images/accent.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Play Accent"
                            onPress={() => accentSound.current.playAsync()}
                            color="#4CAF50"
                        />
                        <Button
                            title="Pause Accent"
                            onPress={() => accentSound.current.pauseAsync()}
                            color="#F44336"
                        />
                    </View>
                </View>




                <View>
                    <Text style={styles.quizTitle}>Quiz</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            A musical note represents what?
                        </Text>
                        {["Tone and Rhythm", "Pitch and Rhythm", "Tempo and Harmony", "Timbre and Melody"].map((option, index) => {
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
                            If a note is in a space, it can go beyond the lines.
                        </Text>
                        {["True", "False"].map((option, index) => {
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
                            What term means  moderately loud ?
                        </Text>
                        {["Pianissimo", "Crescendo", "Mezzo Forte", "Fortissimo"].map((option, index) => {
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
                        <Link href='./1intro' style={styles.secondaryLink}>
                            ← Previous: Introduction
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./3pitch' style={styles.link}>
                            Next: Pitch →
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
        textShadowOffset: { width: 1, height: 1 },
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
    subHeader: {
        color: '#5543A5',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10,
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