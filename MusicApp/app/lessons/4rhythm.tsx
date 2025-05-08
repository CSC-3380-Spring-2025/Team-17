import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Rhythm() {
    const [quiz1Answer, setQ1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQ2Answer] = useState<string | null>(null);
    const [quiz3Answer, setQ3Answer] = useState<string | null>(null);
    const [quiz4Answer, setQ4Answer] = useState<string | null>(null);
    const answer1 = "True";
    const answer2 = "4";
    const answer3 = "1/2";
    const answer4 = "False";

    const [count, setCount] = useState<number>(0);
    const [userId, setUserId] = useState<string>('');
    const { handleTaskCompletion } = useChallenges();

    useEffect(() => {
        if (auth.currentUser) {
            setUserId(auth.currentUser.uid);
        }
    }, [auth.currentUser]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                console.log('Fetching data for userId:', userId);

                try {
                    const userDocRef = doc(db, 'users', userId);
                    const userDoc = await getDoc(userDocRef)

                    if (userDoc.exists()) {
                        console.log('Document data:', userDoc.data());
                        const userData = userDoc.data();
                        if (userData.lessonProgress) {
                            if (!userData.lessonProgress.includes(4)) {
                                if (count === 4) {
                                    await updateDoc(userDocRef, {
                                        lessonProgress: arrayUnion(4),
                                    });
                                    handleTaskCompletion("Complete 2 quizzes");
                                    handleTaskCompletion("Complete all quizzes");
                                }
                            }
                        }
                        else {
                            await setDoc(userDocRef, {
                                lessonProgress: [1],
                            }, { merge: true });
                        }
                    } else {
                        await setDoc(userDocRef, {
                            lessonProgress: [1],
                        });
                    }

                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [userId, count]);

    const getButtonStyle = (option: string, selected: boolean, correct: boolean): object => {
        if (!selected) return styles.quizButton;
        return correct ? styles.correctAnswer : styles.incorrectAnswer;
    };

    const handlePress = (option: string, setAnswer: React.Dispatch<React.SetStateAction<string | null>>, correctAnswer: string): void => {
        setAnswer(option);
        if (option === correctAnswer) {
            setCount(prevCount => prevCount + 1);
        }
    };

    return (
        <SafeAreaView>
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

                    <View style={styles.card}>
                        <Text style={styles.header}>
                            Rest Values
                        </Text>
                        <Text style={styles.text}>
                            Rests refer to the durations of silence in music. Each hierarchical note value has a corresponding rest value. Just like
                            note values, each rest value can be divided in half, creating two rests that last half as long as the first rest.
                        </Text>
                        <Image
                            source={require('@/assets/images/rest_values.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.card}>
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
                        <Image
                            source={require('@/assets/images/dots.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.text}>
                            A tie is a curved line that connects two notes of the same pitch. They are never used with rests. Tied notes are
                            not re-articulated. Ties simply combine the durations of multiple notes. In the image below, when the half and quarter
                            notes are played or sung, the quarter note should not be articulated. The first note should be held for the duration
                            of three quarter notes instead of two.
                        </Text>
                        <Image
                            source={require('@/assets/images/tie.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.text}>
                            The tie does seem to look like a slur. The difference between the two is that slurs connect notes of different pitches
                            and indicate to the musician that they must be played legato, while ties connect only notes of the same pitch to create
                            a note with a longer duration.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.quizTitle}>Quiz</Text>

                        <View style={styles.quizContainer}>
                            <Text style={styles.quizText}>
                                1. 2 quarter notes and 1 half note are equivalent to 1 whole note.
                            </Text>
                            {["True", "False"].map((option, index) => {
                                const selected = quiz1Answer === option;
                                const correct = option === answer1;

                                return (
                                    <Pressable
                                        key={index}
                                        style={getButtonStyle(option, selected, correct)}
                                        disabled={!!quiz1Answer}
                                        onPress={() => {
                                            handlePress(option, setQ1Answer, answer1);
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
                                2. How many thirty-second notes are in an eighth note?
                            </Text>
                            {["2", "4", "6", "8"].map((option, index) => {
                                const selected = quiz2Answer === option;
                                const correct = option === answer2;

                                return (
                                    <Pressable
                                        key={index}
                                        style={getButtonStyle(option, selected, correct)}
                                        disabled={!!quiz2Answer}
                                        onPress={() => {
                                            handlePress(option, setQ2Answer, answer2);
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
                                3. A dot increases the duration of a note by what?
                            </Text>
                            {["1/6", "1/4", "1/2", "1"].map((option, index) => {
                                const selected = quiz3Answer === option;
                                const correct = option === answer3;

                                return (
                                    <Pressable
                                        key={index}
                                        style={getButtonStyle(option, selected, correct)}
                                        disabled={!!quiz3Answer}
                                        onPress={() => {
                                            handlePress(option, setQ3Answer, answer3);
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

                        <View style={styles.quizContainer}>
                            <Text style={styles.quizText}>
                                4. A tie is essentially the same as a slur.
                            </Text>
                            {["True", "False"].map((option, index) => {
                                const selected = quiz4Answer === option;
                                const correct = option === answer4;

                                return (
                                    <Pressable
                                        key={index}
                                        style={getButtonStyle(option, selected, correct)}
                                        disabled={!!quiz4Answer}
                                        onPress={() => {
                                            handlePress(option, setQ4Answer, answer4);
                                        }}
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
                        </View>
                    </View>
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
        </SafeAreaView>
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
        padding: 20,
        marginBottom: 20,
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
    },
    bold: {
        fontWeight: '900',
        color: '#B39DDB',
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'left',
    },
    subHeader: {
        color: '#fff',
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
        textAlign: 'center',
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
        padding: 20,
        marginBottom: 20,
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
});