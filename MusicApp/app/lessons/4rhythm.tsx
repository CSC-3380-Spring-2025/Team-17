import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Rhythm() {
    const [quiz1Answer, setQ1Answer] = useState(null);
    const [quiz2Answer, setQ2Answer] = useState(null);
    const [quiz3Answer, setQ3Answer] = useState(null);
    const [quiz4Answer, setQ4Answer] = useState(null);
    const answer1 = "True";
    const answer2 = "4";
    const answer3 = "1/2";
    const answer4 = "False";

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Rhythm
            </Text>
            <Text style={styles.text}>
                Music is a temporal art, meaning that time is an essential component of music. Rhythm refers to the duration of
                musical sounds and rests in time.
            </Text>
            <Text style={styles.header}>
                Note Values
            </Text>
            <Text style={styles.text}>
                There are many different types of notes in Western music notation that carry different rhythmic values. Note values
                are hierarchical. Their lengths are relative to one another. Each note value can be divided in half, creating two
                notes that last half as long as the first note.
            </Text>
            <Image source={require('@/assets/images/note_values.png')} />
            <View style={styles.notes}>
                <Text style={styles.text}>
                    <b>Whole Note: </b> This note has a thick, unfilled oval shape and no stem. This is the longest note value used in
                    Western music.
                </Text>
                <Text style={styles.text}>
                    <b>Half Note: </b> This note has a thin, unfilled oval shape and does have a stem. It lasts half as long as a whole
                    note. 2 half notes = 1 whole note.
                </Text>
                <Text style={styles.text}>
                    <b>Quarter Note: </b> This note looks like a half note, except the oval notehead is filled in. It lasts half as long
                    as a half note. 2 quarter notes = 1 half note. 4 quarter notes = 1 whole note.
                </Text>
                <Text style={styles.text}>
                    <b>Eighth Note: </b> This note looks like a quarter note, except a flag is added to the stem. It lasts half as long
                    as a quarter note. 2 eighth notes = 1 quarter note. 4 eighth notes = 1 half note. 8 eighth notes = 1 whole note.
                </Text>
                <Text style={styles.text}>
                    <b>Sixteenth Note: </b> This note looks like a eighth note, except an extra flag is added to the stem. It lasts half as
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
                <Text style={styles.quizTitle}>Quiz</Text>
                <br></br>
                <view style={styles.quizContainer}>
                    <Text style={styles.quizText}>
                        2 Quarters and 1 Half Note Equals to 1 Whole Note
                    </Text>
                    {["True", "False"].map((option, index) => {
                        const selected = quiz1Answer === option;
                        const correct = option === answer1;
                        const buttonStyle = selected
                            ? correct
                                ? styles.correctAnswer
                                : styles.incorrectAnswer
                            : styles.quizButton;

                        return (
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => setQ1Answer(option)}
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
                </view>
                <br></br>
                <view style={styles.quizContainer}>
                    <Text style={styles.quizText}>
                        How many <b>Thirty-Second Notes</b> are in an Eigth Note?
                    </Text>
                    {["2", "4", "6", "8"].map((option, index) => {
                        const selected = quiz2Answer === option;
                        const correct = option === answer2;
                        const buttonStyle = selected
                            ? correct
                                ? styles.correctAnswer
                                : styles.incorrectAnswer
                            : styles.quizButton;

                        return (
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => setQ2Answer(option)}
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
                </view>
                <br></br>
                <view style={styles.quizContainer}>
                    <Text style={styles.quizText}>
                        A <b>Dot</b> increases the duration of a note by what?
                    </Text>
                    {["1/6", "1/4", "1/2", "1"].map((option, index) => {
                        const selected = quiz3Answer === option;
                        const correct = option === answer3;
                        const buttonStyle = selected
                            ? correct
                                ? styles.correctAnswer
                                : styles.incorrectAnswer
                            : styles.quizButton;

                        return (
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => setQ3Answer(option)}
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
                </view>
                <br></br>
                <view style={styles.quizContainer}>
                    <Text style={styles.quizText}>
                        A <b>Tie</b> is essentially the same as a <b>Slur</b>
                    </Text>
                    {["True", "False"].map((option, index) => {
                        const selected = quiz4Answer === option;
                        const correct = option === answer4;
                        const buttonStyle = selected
                            ? correct
                                ? styles.correctAnswer
                                : styles.incorrectAnswer
                            : styles.quizButton;

                        return (
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => setQ4Answer(option)}
                            >
                                <Text style={styles.quizButtonText}>{option}</Text>
                            </Pressable>
                        );
                    })}
                    {quiz4Answer && (
                        <Text style={styles.result}>
                            {quiz4Answer === answer4 ? "Correct!" : "Try Again"}
                        </Text>
                    )}
                </view>
            </div>
            <View style={styles.links}>
                <Link href='./3pitch' style={styles.edgelinks}>
                    Previous: Pitch
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./5meter' style={styles.edgelinks}>
                    Next: Meter
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontSize: 80,
        fontFamily: 'TIMES_NEW_ROMAN',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: 20
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'ARIAL',
        padding: 10
    },
    header: {
        color: 'black',
        fontSize: 36,
        fontFamily: 'ARIAL',
        fontWeight: 'bold',
        padding: 40,
        paddingTop: 60,
        textAlign: 'left',
    },
    notes: {
        alignItems: 'flex-start'
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
    }
})