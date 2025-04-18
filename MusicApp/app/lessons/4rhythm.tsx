import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';




export default function Rhythm() {
    const [quiz1Answer, setQ1Answer] = useState(null);
    const [quiz2Answer, setQ2Answer] = useState(null);
    const [quiz3Answer, setQ3Answer] = useState(null);
    const [quiz4Answer, setQ4Answer] = useState(null);
    const answer1 = "True";
    const answer2 = "4";
    const answer3 = "1/2";
    const answer4 = "False";
    const resetQuiz1 = () => setQ1Answer(null);
    const resetQuiz2 = () => setQ2Answer(null);
    const resetQuiz3 = () => setQ3Answer(null);
    const resetQuiz4 = () => setQ4Answer(null);
    return (
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



                <Text style={styles.header}>
                    Rest Values
                </Text>
                <Text style={styles.text}>
                    Rests refer to the durations of silence in music. Each hierarchical note value has a corresponding rest value. Just like
                    note values, each rest value can be divided in half, creating two rests that last half as long as the first rest.
                </Text>
                <Image source={require('@/assets/images/rest_values.png')} />
                <Text style={styles.header}>
                    Dots & Ties
                </Text>
                <Text style={styles.text}>
                    Dots and ties allow the durations of notes and rests to be extended. A dot is written immediately after a note or rest
                    and increases its value by half. For example, a half note is equivalent in duration to two quarter notes. Therefore,
                    a dotted half note is equivalent in duration to three quarter notes. Similarly, a quarter note is equivalent in duration
                    to two eighth notes. Therefore, a dotted quarter note is equivalent in duration to three eighth notes. Multiple dots
                    can be added to a duration with each subsequent dot adding half the duration of the previous one. For example, a
                    double-dotted quarter note is equivalent in duration to a quarter note, an eighth note, and a sixteenth note added
                    together. Essentially, a double-dotted note is 1 3/4 the duration of the original note.
                </Text>
                <Image source={require('@/assets/images/dots.png')} />
                <Text style={styles.text}>
                    A tie is a curved line that connects two notes of the same pitch. They are never used with rests. Tied notes are
                    not re-articulated. Ties simply combine the durations of multiple notes. In the image below, when the half and quarter
                    notes are played or sung, the quarter note should not be articulated. The first note should be held for the duration
                    of three quarter notes instead of two.
                </Text>
                <Image source={require('@/assets/images/tie.png')} />
                <Text style={styles.text}>
                    The tie does seem to look like a slur. The difference between the two is that slurs connect notes of different pitches
                    and indicate to the musician that they must be played legato, while ties connect only notes of the same pitch to create
                    a note with a longer duration.
                </Text>
                <div>
                    <Text style={styles.quizTitle}>Quiz{"\n"}</Text>

                    <view style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            2 Quarters and 1 Half Note Equals to 1 Whole Note
                        </Text>
                        {["True", "False"].map((option, index) => {
                            const selected = quiz1Answer === option;
                            let buttonStyle = styles.quizButton;

                            if (quiz1Answer !== null) {
                                if (option === answer1) {
                                    buttonStyle = styles.correctAnswer;
                                }
                                else if (selected) {
                                    buttonStyle = styles.incorrectAnswer;
                                }
                            }

                            return (
                                <Pressable
                                    key={index}
                                    style={buttonStyle}
                                    onPress={() => {
                                        if (!quiz1Answer) setQ1Answer(option); // only once
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz1Answer && (
                            <Text style={styles.result}>
                                {quiz1Answer === answer1 ? "Correct!" : "Wrong"}
                                {"\n"}
                            </Text>
                        )}
                        {quiz1Answer && quiz1Answer !== answer1 && (
                            <Text style={styles.result}>
                                Correct Answer: {answer1}
                                {"\n"}
                            </Text>
                        )}
                        <Pressable
                            style={styles.resetButton}
                            onPress={resetQuiz1}
                        >
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </Pressable>
                    </view>

                    <view style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            How many <b>Thirty-Second Notes</b> are in an Eigth Note?
                        </Text>
                        {["2", "4", "6", "8"].map((option, index) => {
                            const selected = quiz2Answer === option;
                            let buttonStyle = styles.quizButton;

                            if (quiz2Answer !== null) {
                                if (option === answer2) {
                                    buttonStyle = styles.correctAnswer;
                                }
                                else if (selected) {
                                    buttonStyle = styles.incorrectAnswer;
                                }
                            }

                            return (
                                <Pressable
                                    key={index}
                                    style={buttonStyle}
                                    onPress={() => {
                                        if (!quiz2Answer) setQ2Answer(option); // only once
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz2Answer && (
                            <Text style={styles.result}>
                                {quiz2Answer === answer2 ? "Correct!" : "Wrong"}
                                {"\n"}
                            </Text>
                        )}
                        {quiz2Answer && quiz2Answer !== answer2 && (
                            <Text style={styles.result}>
                                Correct Answer: {answer2}
                                {"\n"}
                            </Text>
                        )}
                        <Pressable
                            style={styles.resetButton}
                            onPress={resetQuiz2}
                        >
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </Pressable>
                    </view>

                    <view style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            A <b>Dot</b> increases the duration of a note by what?
                        </Text>
                        {["1/6", "1/4", "1/2", "1"].map((option, index) => {
                            const selected = quiz3Answer === option;
                            let buttonStyle = styles.quizButton;

                            if (quiz3Answer !== null) {
                                if (option === answer3) {
                                    buttonStyle = styles.correctAnswer;
                                }
                                else if (selected) {
                                    buttonStyle = styles.incorrectAnswer;
                                }
                            }

                            return (
                                <Pressable
                                    key={index}
                                    style={buttonStyle}
                                    onPress={() => {
                                        if (!quiz3Answer) setQ3Answer(option); // only once
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz3Answer && (
                            <Text style={styles.result}>
                                {quiz3Answer === answer3 ? "Correct!" : "Wrong"}
                                {"\n"}
                            </Text>
                        )}
                        {quiz3Answer && quiz3Answer !== answer3 && (
                            <Text style={styles.result}>
                                Correct Answer: {answer3}
                                {"\n"}
                            </Text>
                        )}
                        <Pressable
                            style={styles.resetButton}
                            onPress={resetQuiz3}
                        >
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </Pressable>
                    </view>

                    <view style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            A <b>Tie</b> is essentially the same as a <b>Slur</b>
                        </Text>
                        {["True", "False"].map((option, index) => {
                            const selected = quiz4Answer === option;
                            let buttonStyle = styles.quizButton;

                            if (quiz4Answer !== null) {
                                if (option === answer4) {
                                    buttonStyle = styles.correctAnswer;
                                }
                                else if (selected) {
                                    buttonStyle = styles.incorrectAnswer;
                                }
                            }

                            return (
                                <Pressable
                                    key={index}
                                    style={buttonStyle}
                                    onPress={() => {
                                        if (!quiz4Answer) setQ4Answer(option); // only once
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz4Answer && (
                            <Text style={styles.result}>
                                {quiz4Answer === answer4 ? "Correct!" : "Wrong"}
                                {"\n"}
                            </Text>
                        )}
                        {quiz4Answer && quiz4Answer !== answer4 && (
                            <Text style={styles.result}>
                                Correct Answer: {answer4}
                                {"\n"}
                            </Text>
                        )}
                        <Pressable
                            style={styles.resetButton}
                            onPress={resetQuiz4}
                        >
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </Pressable>
                    </view>
                </div>
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

    homelink: {
        color: 'purple',
        fontSize: 30,
        alignSelf: 'center'
    },
    quizContainer: {
        height: 100,
        width: 200,

        alignItems: 'center',
        padding: 7,
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
        alignSelf: 'center',
    },
    quizButton: {
        height: 45,
        width: 150,
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 5,
    },
    quizButtonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
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
})
