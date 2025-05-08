import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio, PitchCorrectionQuality } from 'expo-av';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Meter() {
    const sd = useRef(new Audio.Sound());
    const st = useRef(new Audio.Sound());
    const sq = useRef(new Audio.Sound());
    const cd = useRef(new Audio.Sound());
    const ct = useRef(new Audio.Sound());
    const cq = useRef(new Audio.Sound());
    const b1 = useRef(new Audio.Sound());
    const b2 = useRef(new Audio.Sound());
    const e1 = useRef(new Audio.Sound());
    const e2 = useRef(new Audio.Sound());

    useEffect(() => {
        const loadSounds = async () => {
            await sd.current.loadAsync(require('@/assets/sounds/simple_duple.mp3'));
            await st.current.loadAsync(require('@/assets/sounds/simple_triple.mp3'));
            await sq.current.loadAsync(require('@/assets/sounds/simple_quadruple.mp3'));
            await cd.current.loadAsync(require('@/assets/sounds/compound_duple.mp3'));
            await ct.current.loadAsync(require('@/assets/sounds/compound_triple.mp3'));
            await cq.current.loadAsync(require('@/assets/sounds/compound_quadruple.mp3'));
            await b1.current.loadAsync(require('@/assets/sounds/beams1.mp3'));
            await b2.current.loadAsync(require('@/assets/sounds/beams2.mp3'));
            await e1.current.loadAsync(require('@/assets/sounds/example1.mp3'));
            await e2.current.loadAsync(require('@/assets/sounds/example2.mp3'));
        };

        loadSounds();

        return () => {
            sd.current.unloadAsync();
            st.current.unloadAsync();
            sq.current.unloadAsync();
            cd.current.unloadAsync();
            ct.current.unloadAsync();
            cq.current.unloadAsync();
            b1.current.unloadAsync();
            b2.current.unloadAsync();
            e1.current.unloadAsync();
            e2.current.unloadAsync();
        };
    }, []);

    const [quiz1Answer, setQ1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQ2Answer] = useState<string | null>(null);
    const [quiz3Answer, setQ3Answer] = useState<string | null>(null);
    const [quiz4Answer, setQ4Answer] = useState<string | null>(null);
    const answer1 = "True";
    const answer2 = "False";
    const answer3 = "4/4";
    const answer4 = "9/8";

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
                            if (!userData.lessonProgress.includes(5)) {
                                if (count === 4) {
                                    await updateDoc(userDocRef, {
                                        lessonProgress: arrayUnion(5),
                                    });
                                    handleTaskCompletion("Complete 2 lessons");
                                    handleTaskCompletion("Complete all lessons");
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
                        <Text style={styles.bold}> Triple meters</Text> are meters that contain groups of three beats. <Text style={styles.bold}>Quadruple meters</Text> are meters that contain
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
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Time Signatures</Text> look like fractions and are placed at the beginning of music to indicate two things to the
                        musician: The top number indicates the number of beats in every measure. In simple meter, the top number is always
                        2, 3, or 4, representing duple, triple, or quadruple meter. The bottom number indicates which note value gets the beat.
                        For example, 1 represents whole notes, 2, represents half notes, 4 represents quarter notes, 8 represents eighth notes,
                        and so on.
                    </Text>
                    <Text style={styles.text}>
                        There are two additional time signatures in simple meter. 𝄴 represents <Text style={styles.bold}>common time</Text>, which is equivalent to the simple
                        quadruple time signature 4/4, meaning four quarter notes in every measure. 𝄵 represents <Text style={styles.bold}>cut time</Text>, which is equivalent
                        to the simple duple time signature 2/2, meaning two half notes in every measure.
                    </Text>
                    <Text style={styles.header}>
                        Counting Simple Meter
                    </Text>
                    <Text style={styles.text}>
                        Counting rhythms is incredibly important for any singer or instrumentalist. It will help you to perform music in the
                        right rhythms at a steady tempo. When counting beats in a measure of music, the note that gets the beat is counted with
                        numbers "1, 2, 3, 4". When a note lasts longer than a beat, the count is held over multiple beats. Beats that are not
                        counted are written in parentheses. When a beat in simple meter is divided in half, the divisions are counted aloud
                        with the syllable "and", which is notated by the + sign. So if a quarter note gets the beat, the second eighth note on
                        each beat will be counted as "and". Further subdivisions at the sixteenth note level are counted as "e" (pronounced "ee")
                        and "a" (pronounced "uh").
                    </Text>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in simple duple meter. The time signature 2/4 means that there are 2 beats
                        in every measure, and the quarter note gets the beat.
                    </Text>
                    <Image
                        source={require('@/assets/images/simple_duple.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => sd.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => sd.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in simple triple meter. The time signature 3/4 means that there are 3 beats
                        in every measure, and the quarter note gets the beat.
                    </Text>
                    <Image
                        source={require('@/assets/images/simple_triple.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => st.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => st.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in simple quadruple meter. The time signature 4/4 means that there are 4 beats
                        in every measure, and the quarter note gets the beat.
                    </Text>
                    <Image
                        source={require('@/assets/images/simple_quadruple.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => sq.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => sq.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        In simple meters with other beat units, like the half note, eighth note, or sixteenth note, the same counting pattern
                        is used to count beats and subdivisions. The only difference is they correspond to different note values. But the rhythms
                        sound the same and are counted the same.
                    </Text>
                    <Text style={styles.text}>
                        When notating rhythms, it is important to beam notes together to show where the beat is. Quarter notes, half notes, and
                        whole notes do not need to be beamed, but eighth notes, sixteenth notes, and so on should be beamed together. In groups of
                        beamed notes, the stem direction is determined by the position of notes in the staff. For notes above the middle line, stems
                        point downward on the left side of the note, and for notes below the middle line, stems point upward on the right side of the note.
                        Stems on notes on the middle line can point in either direction, depending on the surrounding notes. In groups of two
                        beamed notes, the stem direction of both notes is determined by the note farthest from the middle line of the staff.
                    </Text>
                    <Image
                        source={require('@/assets/images/beams.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => b1.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => b1.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Compound Meter
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Compound Meter</Text> is a meter where the beat can be divided into three and then further subdivided in half. These
                        meters can be duple, triple, or quadruple, just like simple meters. The beats can be grouped into sets of two, three,
                        or four. The difference is that each beat divides into three divisions instead of two.
                    </Text>
                    <Text style={styles.text}>
                        Measures in compound meter are equivalent to one group of beats, just like in simple meter. However, the two numbers
                        in the time signature have different meanings in compound meter. The top number represents the number of beat divisions
                        in a measure, and the bottom number represents which note value gets the division. The emphasis is on the beat divisions
                        rather than the beat itself.
                    </Text>
                    <Text style={styles.text}>
                        Since the beat is divided into three in compound meter, the top number in the time signature is always a multiple of three.
                        Dividing this number by three yields the number of beats in the measure. The numbers 6, 9, & 12 correspond to duple, triple,
                        and quadruple meter respectively. The bottom number is usually 4 (meaning the quarter note gets the division), 8 (meaning the
                        eighth note gets the division), or 16 (meaning the sixteenth note gets the division).
                    </Text>
                    <Text style={styles.header}>
                        Counting Compound Meter
                    </Text>
                    <Text style={styles.text}>
                        Because the beats in compound meter divide into three, the beats are always represented by dotted notes. If 4 is the bottom
                        number, the beat is a dotted half note (three quarter notes). If 8 is the bottom number, the beat is a dotted quarter note (three
                        eighth notes). If 16 is the bottom number, the beat is a dotted eighth note (three sixteenth notes).
                    </Text>
                    <Text style={styles.text}>
                        Just like in simple meter, the beat is counted in numbers "1, 2, 3, 4". When a note lasts longer than a beat, the count is still
                        held over and the beats not counted aloud are written in parentheses. Divisions are counted as "la" on the second division and
                        "li" on the third division. Further subdivisions at the sixteenth note level are counted as "ta" with the "la" & "li" syllables
                        staying consistent on the eighth note divisions.
                    </Text>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in compound duple meter. The time signature 6/8 means that there are 2 beats
                        in every measure, and the dotted quarter note gets the beat while the eighth note gets the division.
                    </Text>
                    <Image
                        source={require('@/assets/images/compound_duple.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => cd.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => cd.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in compound triple meter. The time signature 9/8 means that there are 3 beats
                        in every measure, and the dotted quarter note gets the beat while the eighth note gets the division.
                    </Text>
                    <Image
                        source={require('@/assets/images/compound_triple.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => ct.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => ct.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in compound quadruple meter. The time signature 12/8 means that there are 4 beats
                        in every measure, and the dotted quarter note gets the beat while the eighth note gets the division.
                    </Text>
                    <Image
                        source={require('@/assets/images/compound_quadruple.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => cq.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => cq.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        In compound meters with other beat units, like the dotted half note or dotted eighth note the same counting pattern
                        is used to count beats and subdivisions. The only difference is they correspond to different note values. But the rhythms
                        sound the same and are counted the same.
                    </Text>
                    <Text style={styles.text}>
                        When notating compound meter, it is still important to beam notes together to show where the beat is. Just like in simple
                        meter, only eighth notes, sixteenth notes, and so on should be beamed together. In groups of beamed notes, the rules for stem
                        direction are the same as in simple meter.
                    </Text>
                    <Image
                        source={require('@/assets/images/beams2.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => b2.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Piano</Text>
                        </Pressable>
                        <Pressable
                            style={styles.pauseButton}
                            onPress={() => b2.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Piano</Text>
                        </Pressable>
                    </View>
                </View>

                <View>
                    <Text style={styles.quizTitle}>Quiz</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            1. Simple meter is divided into two beats while compound meter is divided into three beats.
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
                            2. The beat is always represented by dotted notes in simple meter.
                        </Text>
                        {["True", "False"].map((option, index) => {
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
                            3. What is the time signature of the music below?
                        </Text>
                        <Image source={require('@/assets/images/example1.png')}
                            style={styles.quizImage}
                            resizeMode="contain"
                        />
                        {["2/2", "3/4", "4/4", "6/8"].map((option, index) => {
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
                            4. What is the time signature of the music below?
                        </Text>
                        <Image source={require('@/assets/images/example2.png')}
                            style={styles.quizImage}
                            resizeMode="contain"
                        />
                        {["4/4", "6/8", "9/8", "12/8"].map((option, index) => {
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
        fontWeight: '900',
        color: '#B39DDB',
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
        justifyContent: 'center',
        gap: 15,
        marginTop: 15,
        marginBottom: 15,
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