import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Modes() {
    const lydian = useRef(new Audio.Sound());
    const ionian = useRef(new Audio.Sound());
    const mixolydian = useRef(new Audio.Sound());
    const dorian = useRef(new Audio.Sound());
    const aeolian = useRef(new Audio.Sound());
    const phrygian = useRef(new Audio.Sound());
    const locrian = useRef(new Audio.Sound());


    useEffect(() => {
        const loadSounds = async () => {
            await lydian.current.loadAsync(require('@/assets/sounds/lydian.mp3'));
            await ionian.current.loadAsync(require('@/assets/sounds/ionian.mp3'));
            await mixolydian.current.loadAsync(require('@/assets/sounds/mixolydian.mp3'));
            await dorian.current.loadAsync(require('@/assets/sounds/dorian.mp3'));
            await aeolian.current.loadAsync(require('@/assets/sounds/aeolian.mp3'));
            await phrygian.current.loadAsync(require('@/assets/sounds/phrygian.mp3'));
            await locrian.current.loadAsync(require('@/assets/sounds/locrian.mp3'));
        };

        loadSounds();

        return () => {
            lydian.current.unloadAsync();
            ionian.current.unloadAsync();
            mixolydian.current.unloadAsync();
            dorian.current.unloadAsync();
            aeolian.current.unloadAsync();
            phrygian.current.unloadAsync();
            locrian.current.unloadAsync();
        };
    }, []);

    const [quiz1Answer, setQ1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQ2Answer] = useState<string | null>(null);
    const [quiz3Answer, setQ3Answer] = useState<string | null>(null);
    const [quiz4Answer, setQ4Answer] = useState<string | null>(null);
    const [quiz5Answer, setQ5Answer] = useState<string | null>(null);
    const [quiz6Answer, setQ6Answer] = useState<string | null>(null);
    const answer1 = "Ionian";
    const answer2 = "Aeolian";
    const answer3 = "Lydian";
    const answer4 = "Phrygian";
    const answer5 = "Mixolydian";
    const answer6 = "Locrian";

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
                                            if(!userData.lessonProgress.includes(7)){
                                                if(count === 6){
                                                    await updateDoc(userDocRef, {
                                                        lessonProgress: arrayUnion(7),
                                                    });
                                                    handleTaskCompletion("Complete 2 lessons");
                                                    handleTaskCompletion("Complete all lessons");
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
                    Modes
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Modes</Text> are an extension of scales. They are ordered collections of whole steps and half steps that can be described
                        within a continuum of <Text style={styles.bold}>modal brightness</Text>: brighter modes sound more like a major scale while darker modes sound more
                        like a minor scale.
                    </Text>
                    <Image
                        source={require('@/assets/images/mode_range.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Lydian Mode
                    </Text>
                    <Text style={styles.text}>
                        The brightest mode is the <Text style={styles.bold}>lydian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        W, W, W, H, W, W, H. You can think of this mode as a major scale with a raised 4 (<Text style={styles.italic}>fi</Text>). You can also find this mode if you
                        play all the white keys on a piano keyboard starting from F.
                    </Text>
                    <Image
                        source={require('@/assets/images/f_lydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/lydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Lydian"
                            onPress={() => lydian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Lydian"
                            onPress={() => lydian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Ionian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next bright mode is the <Text style={styles.bold}>ionian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        the exact same as in the major scale: W, W, H, W, W, W, H. You can find this mode if you play all the white keys on a
                        piano keyboard starting from C.
                    </Text>
                    <Image
                        source={require('@/assets/images/c_ionian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/ionian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Ionian"
                            onPress={() => ionian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Ionian"
                            onPress={() => ionian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Mixolydian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next bright mode is the <Text style={styles.bold}>mixolydian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        W, W, H, W, W, H, W. You can think of this mode as a major scale with a lowered 7 (<Text style={styles.italic}>te</Text>). You can also find this mode
                        if you play all the white keys on a piano keyboard starting from G.
                    </Text>
                    <Image
                        source={require('@/assets/images/g_mixolydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/mixolydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Mixolydian"
                            onPress={() => mixolydian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Mixolydian"
                            onPress={() => mixolydian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        The lydian, ionian, and mixolydian modes are considered the brighter modes because they contain an unaltered 3 instead of
                        a lowered 3 (<Text style={styles.italic}>mi</Text> instead of <Text style={styles.italic}>me</Text>). The dorian, aeolian, phrygian, and locrian modes are considered darker because
                        they contain a lowered 3 instead of an unaltered 3 (<Text style={styles.italic}>me</Text> instead of <Text style={styles.italic}>mi</Text>).
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Dorian Mode
                    </Text>
                    <Text style={styles.text}>
                        The first dark mode is the <Text style={styles.bold}>dorian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        W, H, W, W, W, H, W. You can think of this mode as a minor scale with a raised 6 (<Text style={styles.italic}>la</Text>). You can also find this mode if
                        you play all the white keys on a piano keyboard starting from D.
                    </Text>
                    <Image
                        source={require('@/assets/images/d_dorian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/dorian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Dorian"
                            onPress={() => dorian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Dorian"
                            onPress={() => dorian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Aeolian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next dark mode is the <Text style={styles.bold}>aeolian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is the
                        exact same as in the minor scale: W, H, W, W, H, W, W. You can also find this mode if you play all the white keys on a
                        piano keyboard starting from A.
                    </Text>
                    <Image
                        source={require('@/assets/images/a_aeolian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/aeolian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Aeolian"
                            onPress={() => aeolian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Aeolian"
                            onPress={() => aeolian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Phrygian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next dark mode is the <Text style={styles.bold}>phrygian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        H, W, W, W, H, W, W. You can think of this mode as a minor scale with a lowered 2 (<Text style={styles.italic}>ra</Text>). You can also find this mode
                        if you play all the white keys on a piano keyboard starting from E.
                    </Text>
                    <Image
                        source={require('@/assets/images/e_phrygian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/phrygian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Phrygian"
                            onPress={() => phrygian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Phrygian"
                            onPress={() => phrygian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Locrian Mode
                    </Text>
                    <Text style={styles.text}>
                        The darkest mode is the <Text style={styles.bold}>locrian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        H, W, W, H, W, W, W. You can think of this mode as a minor scale with a lowered 2 (<Text style={styles.italic}>ra</Text>) & a lowered 5 (<Text style={styles.italic}>se</Text>).
                        You can also find this mode if you play all the white keys on a piano keyboard starting from B.
                    </Text>
                    <Image
                        source={require('@/assets/images/b_locrian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/locrian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Locrian"
                            onPress={() => locrian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Locrian"
                            onPress={() => locrian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.quizTitle}>Quiz</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            1. Which of the following modes is just like the major scale?
                        </Text>
                        {["Lydian", "Ionian", "Mixolydian", "Aeolian"].map((option, index) => {
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
                            2. Which of the following modes is just like the minor scale?
                        </Text>
                        {["Lydian", "Ionian", "Mixolydian", "Aeolian"].map((option, index) => {
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
                            3. Which of the following modes is just like a major scale with a raised 4?
                        </Text>
                        {["Lydian", "Ionian", "Mixolydian", "Locrian"].map((option, index) => {
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
                            4. Which of the following modes is just like a minor scale with a lowered 2?
                        </Text>
                        {["Dorian", "Aeolian", "Phrygian", "Locrian"].map((option, index) => {
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
                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            5. Which of the following modes is just like a major scale with a lowered 7?
                        </Text>
                        {["Lydian", "Ionian", "Mixolydian", "Dorian"].map((option, index) => {
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
                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            6. Which of the following modes is just like a minor scale with a lowered 2 & a lowered 5?
                        </Text>
                        {["Dorian", "Aeolian", "Phrygian", "Locrian"].map((option, index) => {
                            const selected = quiz6Answer === option;
                            const correct = option === answer6;

                            return (
                                <Pressable
                                    key={index}
                                    style={getButtonStyle(option, selected, correct)}
                                    disabled={!!quiz6Answer}
                                    onPress={() => {
                                        handlePress(option, setQ6Answer, answer6);
                                    }}
                                >
                                    <Text style={styles.quizButtonText}>{option}</Text>
                                </Pressable>
                            );
                        })}
                        {quiz6Answer && (
                            <Text style={styles.result}>
                                {quiz6Answer === answer6 ? "Correct!" : "Try Again"}
                            </Text>
                        )}
                    </View>
                </View>


                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./6scales' style={styles.secondaryLink}>
                            ← Previous: Scales
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./8intervals' style={styles.link}>
                            Next: Intervals →
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
    italic: {
        fontStyle: 'italic',
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
    quizImage: {
        width: 300,
        height: 150,
        marginVertical: 10,
        resizeMode: 'contain',
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