import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Intervals() {
    const intervals = useRef(new Audio.Sound());
    const sizes = useRef(new Audio.Sound());
    const augmented = useRef(new Audio.Sound());
    const diminished = useRef(new Audio.Sound());


    useEffect(() => {
        const loadSounds = async () => {
            await intervals.current.loadAsync(require('@/assets/sounds/intervals.mp3'));
            await sizes.current.loadAsync(require('@/assets/sounds/sizes.mp3'));
            await augmented.current.loadAsync(require('@/assets/sounds/augmented.mp3'));
            await diminished.current.loadAsync(require('@/assets/sounds/diminished.mp3'));
        };

        loadSounds();

        return () => {
            intervals.current.unloadAsync();
            sizes.current.unloadAsync();
            augmented.current.unloadAsync();
            diminished.current.unloadAsync();
        };
    }, []);

    const [quiz1Answer, setQ1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQ2Answer] = useState<string | null>(null);
    const [quiz3Answer, setQ3Answer] = useState<string | null>(null);
    const [quiz4Answer, setQ4Answer] = useState<string | null>(null);
    const [quiz5Answer, setQ5Answer] = useState<string | null>(null);
    const answer1 = "Simultaneously";
    const answer2 = "Flat";
    const answer3 = "9";
    const answer4 = "False";
    const answer5 = "True";
    const resetQuiz1 = () => setQ1Answer(null);
    const resetQuiz2 = () => setQ2Answer(null);
    const resetQuiz3 = () => setQ3Answer(null);
    const resetQuiz4 = () => setQ4Answer(null);
    const resetQuiz5 = () => setQ5Answer(null);

    const [count, setCount] = useState<number>(0);
    const [userId, setUserId]= useState<string>('');
    const {handleTaskCompletion} = useChallenges();
                            
                                useEffect(()=>{
                                    if (auth.currentUser){
                                      setUserId(auth.currentUser.uid);
                                    }
                                  }, [auth.currentUser]);
                                
                                  useEffect(()=>{
                                      const fetchUserData= async()=>{
                                        if(userId){
                                          console.log('Fetching data for userId:', userId);
                                  
                                          try{
                                            const userDocRef= doc(db, 'users', userId);
                                            const userDoc = await getDoc(userDocRef)
                                            
                                            if (userDoc.exists()) {
                                              console.log('Document data:', userDoc.data());
                                              const userData = userDoc.data();
                                              if(userData.lessonProgress){
                                                if(!userData.lessonProgress.includes(8)){
                                                    if(count === 5){
                                                        await updateDoc(userDocRef, {
                                                            lessonProgress: arrayUnion(8),
                                                        });
                                                        handleTaskCompletion("Complete 2 quizzes");
                                                        handleTaskCompletion("Complete all quizzes");
                                                    }
                                                }
                                              }
                                              else{
                                                await setDoc(userDocRef, {
                                                    lessonProgress:[1],
                                                }, {merge: true});
                                              }
                                            } else {
                                              await setDoc(userDocRef, {
                                                lessonProgress: [1],
                                              });
                                            }
                                    
                                          }catch(error){
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
                    Intervals
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        An <Text style={styles.bold}>interval</Text> is defined as the distance in pitch between two notes. An interval primarily measures two things:
                        the written distance between two notes on a staff, and the aural distance between the pitches of two notes. Intervals
                        can be melodic (played or sung separately) or harmonic (played or sung simultaneously). In the image below, the first
                        measure show a melodic interval between C & E while the second measure show a harmonic interval between the same pitches.
                    </Text>
                    <Image
                        source={require('@/assets/images/intervals.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => intervals.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Intervals</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => intervals.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Intervals</Text>
                        </Pressable>
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.header}>
                        Size & Quality
                    </Text>
                    <Text style={styles.text}>
                        Every interval has a size & quality. A size is the distance between two notes on a staff, measured by the number of lines
                        & spaces between them. Sizes are written as numbers & are spoken as ordinal numbers (second, third, fourth, fifth, sixth,
                        seventh, etc.). Size must always be counted starting from 1. When two notes are on the same line or space, their interval
                        is called a unison. When two notes are eight lines & spaces apart, their interval is called an octave. Size is considered
                        generic. That means no matter what accidentals are applied to the notes of an interval, the size is always the same.
                    </Text>
                    <Image
                        source={require('@/assets/images/sizes.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => sizes.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Sizes</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => sizes.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Sizes</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        A quality makes an interval more specific when combined with size. Quality measures the distance between two notes more
                        specifically, and when combined with an interval's size, it describes the aural sound of the interval. There are five
                        possible qualities: <Text style={styles.bold}>Augmented</Text> (A), <Text style={styles.bold}>Major</Text> (M),
                        <Text style={styles.bold}>Perfect</Text> (P), <Text style={styles.bold}>Minor</Text> (m), <Text style={styles.bold}>Diminished</Text> (d).
                        The quality comes before the size when defining an interval. For example, an interval could be described as a "perfect
                        fourth" (P4), a "minor third" (m3), or an "augmented second" (A2). 2nds, 3rd, 6ths, & 7ths are major or minor intervals.
                        Unisons, 4ths, 5ths, & octaves are perfect intervals.
                    </Text>
                    <Image
                        source={require('@/assets/images/qualities.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Determining Intervals
                    </Text>
                    <Text style={styles.text}>
                        To determine the interval between two notes on a staff, you can use your knowledge of major & minor scales to find its
                        size & quality.
                    </Text>
                    <Text style={styles.text}>
                        1. Determine the size of the interval by counting the lines and spaces between the notes.
                    </Text>
                    <Text style={styles.text}>
                        2. Imagine that the bottom note is the tonic of a major scale.
                    </Text>
                    <Text style={styles.text}>
                        3. Determine whether or not the top note is in the bottom note's major scale and assign the corresponding quality.
                    </Text>
                    <Text style={styles.text}>
                        4. If the top note is in the bottom note's minor scale, it will either be a perfect or major interval. If not, it might be
                        a minor interval, like a lowered 2nd, 3rd, 6th, or 7th. Otherwise, it would be an augmented or diminished interval.
                    </Text>
                    <Image
                        source={require('@/assets/images/interval_examples.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        In the first example, the notes are F & C. First, the interval is a generic 5th (1: F, 2: G, 3: A, 4: B, 5: C). Second,
                        C is in the major scale of F. Therefore, this interval is a perfect 5th. In the second example, the notes are Eb & Cb.
                        First, the interval is a generic 6th (1: E, 2: F, 3: G, 4: A, 5: B, 6: C). Second, Cb is <Text style={styles.italic}>not</Text> in the major scale
                        of Eb, which has only 3 flats (Bb, Eb, Ab). Cb is a half-step below C, which is in the Eb major scale. Therefore, this
                        interval is a minor sixth.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Augmented & Diminished Intervals
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Augmented intervals</Text> are a half-step larger than perfect or major intervals. An augmented interval can be created
                        by taking a perfect or major interval and raising the top note by one half-step, or by lowering the bottom note by one
                        half-step. In the example below, the first measure shows a perfect 5th between F & C, which is then altered by raising
                        C by a half-step to C#, thus creating an augmented 5th. The second measure shows the same perfect 5th between F & C,
                        but this time F is lowered by a half-step to Fb, thus creating an augmented 5th. The third measure shows a major 6th
                        between G & E, which is then altered by raising E by a half-step to E#, thus creating and augmented 5th. The fourth
                        measure shows the same major 6th between G & E, but this time G is lowered by a half-step to Gb, thus creating an
                        augmented 5th.
                    </Text>
                    <Image
                        source={require('@/assets/images/augmented.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => augmented.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Augmented</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => augmented.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Augmented</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Diminished intervals</Text> are a half-step smaller than perfect or minor intervals. A diminished interval can be created by
                        taking a perfect or minor interval and lowering the top note by one half-step, or by raising the bottom note by one
                        half-step. In the example below, the first measure shows a perfect 5th between D & A, which is then altered by lowering
                        A by a half-step to Ab, thus creating a diminished 5th. The second measure shows the same perfect 5th between D & A, but
                        this time D is raised by a half-step to D#, thus creating a diminished 5th. The third measure shows a minor 6th between
                        E & C, which is then altered by lowering C by a half-step to Cb, thus creating a diminished 5th. The fourth measure shows
                        the same minor 6th between E & C, but this time E is raised by a half-step to E#, thus creating a diminished 6th.
                    </Text>
                    <Image
                        source={require('@/assets/images/diminished.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => diminished.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Diminished</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => diminished.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Diminished</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Consonance & Dissonance
                    </Text>
                    <Text style={styles.text}>
                        Intervals are categorized as consonant or dissonant. <Text style={styles.bold}>Consonant intervals</Text> are considered more stable, as if they
                        do not need to resolve. <Text style={styles.bold}>Dissonant intervals</Text> are considered less stable, as if they do need to resolve. Intervals
                        can be consonant or dissonant in different contexts, depending on whether they are melodic or harmonic intervals.
                    </Text>
                    <Image
                        source={require('@/assets/images/melodic.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/harmonic.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Compound Intervals
                    </Text>
                    <Text style={styles.text}>
                        The intervals previously discussed are <Text style={styles.bold}>simple intervals</Text>, which have a size of an octave or less. Any interval
                        larger than an octave is called a <Text style={styles.bold}>compound interval</Text>. In the example below, the notes A & C form a simple
                        interval of a minor third. When C is raised by an octave, the interval becomes a minor 10th, which is a compound interval.
                        Quality remains the same for simple intervals & their corresponding compound intervals.
                    </Text>
                    <Image
                        source={require('@/assets/images/compound.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        To transform a simple interval into a compound interval, simply add 7 to its size. Unisons will become octaves (1 + 7 = 8).
                        2nds become 9ths (2 + 7 = 9). 3rds become 10ths (3 + 7 = 10). 4ths become 11ths (4 + 7 = 11). 5ths become 12ths (5 + 7 = 12).
                        6ths become 13ths (6 + 7 = 13). 7ths become 14ths (7 + 7 = 14). Octaves become 15ths (8 + 7 = 15).
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Intervallic Inversion
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Intervallic inversion</Text> occurs when two notes of an interval are flipped. For instance, an interval with C at the
                        bottom and E at the top can be inverted by moving the C up an octave. This is important because inverted intervals
                        share many interesting properties that can be useful to musicians, and intervallic inversion can be useful in determining
                        difficult intervals.
                    </Text>
                    <Image
                        source={require('@/assets/images/inversion.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        The sizes of inverted pairs always add up to 9. Unisons invert to octaves & octaves invert to unisons (1 + 8 = 9).
                        2nds invert to 7ths & 7ths invert to 2nds (2 + 7 = 9). 3rds invert to 6ths & 6ths invert to 3rds (3 + 6 = 9). 4ths
                        invert to 5ths & 5ths invert to 4ths (4 + 5 = 9).
                    </Text>
                    <Text style={styles.text}>
                        The qualities of inverted pairs are opposites of each other. Perfect intervals invert to perfect intervals. Major
                        intervals invert to minor intervals & minor intervals invert to major intervals. Augmented intervals invert to diminished
                        intervals & diminished intervals invert to augmented intervals.
                    </Text>
                    <Text style={styles.text}>
                        With that information, it is possible to calculate intervallic inversions without even looking at staff paper. A minor 7th
                        inverts to a major 2nd, an augmented 6th inverts to a diminished 3rd, and a perfect 4th inverts to a perfect 5th.
                    </Text>
                    <Text style={styles.text}>
                        Intervallic inversion is also useful in determining difficult intervals. In the example below, identifying the interval
                        using the "Major Scale" method will not work since the bottom note is Ebb, which does not have a key signature. To determine
                        this interval, it would be useful to invert the interval to have Ab on the bottom and Ebb on the top. Ab does have a key
                        signature consisting of 4 flats (Bb, Eb, Ab, Db). An Eb above Ab would be a perfect 5th, but Ebb is a half-step smaller than
                        Eb, which means the interval between Ab & Ebb is a diminished 5th. With that in mind, we can simple invert this interval back
                        to the original interval using the properties of intervallic inversion. A diminished 5th inverts to an augmented 4th. Thus,
                        the interval between Ebb & Ab is an augmented 4th.
                    </Text>
                    <Image
                        source={require('@/assets/images/hard_interval.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View>
                    <Text style={styles.quizTitle}>Quiz{"\n"}</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            1. An interval is harmonic when sung or played.
                        </Text>
                        {["Separately", "Simultaneously", "One after the Other", "Twice"].map((option, index) => {
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
                            2. Which one of these is NOT a quality of intervals?
                        </Text>
                        {["Augmented", "Major", "Perfect", "Flat", "Diminished"].map((option, index) => {
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
                            The sizes of inverted pairs always add up to what?
                        </Text>
                        {["3", "6", "7", "9"].map((option, index) => {
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
                            4. Dissonant intervals are more stable.
                        </Text>
                        {["True", "False"].map((option, index) => {
                            const selected = quiz4Answer === option;
                            const correct = option === answer4;

                            return (
                                <Pressable
                                    key={index}
                                    style={getButtonStyle(option, selected, correct)}
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
                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            5. Any interval larger than an octave is a compound interval.
                        </Text>
                        {["True", "False"].map((option, index) => {
                            const selected = quiz5Answer === option;
                            const correct = option === answer5;

                            return (
                                <Pressable
                                    key={index}
                                    style={getButtonStyle(option, selected, correct)}
                                    disabled={!!quiz5Answer}
                                    onPress={() => {
                                        handlePress(option, setQ5Answer, answer5);
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz5Answer && (
                            <Text style={styles.result}>
                                {quiz5Answer === answer5 ? "Correct!" : "Try Again"}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={styles.linksContainer}>

                    <View style={styles.linkWrapper}>
                        <Link href='./7modes' style={styles.secondaryLink}>
                            ← Previous: Modes
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./9melody' style={styles.link}>
                            Next: Melody →
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