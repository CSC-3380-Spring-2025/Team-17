import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Texture() {
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

    const [quiz1Answer, setQ1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQ2Answer] = useState<string | null>(null);
    const [quiz3Answer, setQ3Answer] = useState<string | null>(null);
    const answer1 = "Polyphony";
    const answer2 = "Heterophony";
    const answer3 = "True";

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
                                        if(!userData.lessonProgress.includes(12)){
                                            if(count === 3){
                                                await updateDoc(userDocRef, {
                                                    lessonProgress: arrayUnion(12),
                                                });
                                                handleTaskCompletion("Complete 2 lessons");
                                                handleTaskCompletion("Complete all lessons");
                                            }
                                        }
                                      }else{
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
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            Cello Suite No. 1 in G Major - Johann Sebastian Bach
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => bach.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Monophony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => bach.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Monophony</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Text style={styles.text}>
                        The third movement of Olivier Messiaen's Quartet for the End of Time features a solo oboe that carries a melodic line
                        without any accompaniment. This is another good example of a monophonic texture.
                    </Text>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            Quartet for the End of Time: III. Abime des Oiseaux - Olivier Messiaen
                        </Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                                style={styles.playButton}
                                onPress={() => oboe.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Monophony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => oboe.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Monophony</Text>
                            </Pressable>
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
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            Song of Seikilos
                        </Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                                style={styles.playButton}
                                onPress={() => seikilos.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Heterophony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => seikilos.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Heterophony</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Urfaliyam Ezelden is a Turkish classical song. In the beginning, there is a melodic line performed by a plucked string
                        instrument & a wind instrument. While both instruments play the same melody, the wind instrument performs slight embellishments
                        to create variation & distinction between the instruments. This is another good example of a heterophonic texture.
                    </Text>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            Urfaliyam Ezelden
                        </Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                                style={styles.playButton}
                                onPress={() => turkey.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Heterophony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => turkey.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Heterophony</Text>
                            </Pressable>
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
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            "Hallelujah" Chorus from the Messiah - George Frederic Handel
                        </Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                                style={styles.playButton}
                                onPress={() => handel.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Homophony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => handel.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Homophony</Text>
                            </Pressable>
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
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            Love is Here to Stay - Louis Armstrong & Ella Fitzgerald
                        </Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                                style={styles.playButton}
                                onPress={() => jazz.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Homophony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => jazz.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Homophony</Text>
                            </Pressable>
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
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            Canon in D - Johann Pachelbel
                        </Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                                style={styles.playButton}
                                onPress={() => canon.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Polyphony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => canon.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Polyphony</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Chakrulo is a Georgian folk choral song that appeared in the Kakheti region. It consists of two individual vocalists
                        singing against the background of a slow chorus. The two vocalists and the chorus are singing independent melodic lines
                        at different rhythms. This is another good example of a polyphonic texture.
                    </Text>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 30, color: '#5543A5', textAlign: 'center' }}>
                            Chakrulo
                        </Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                                style={styles.playButton}
                                onPress={() => chakrulo.current.playAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Play Polyphony</Text>
                            </Pressable>
                            <Pressable
                                style={styles.playButton}
                                onPress={() => chakrulo.current.pauseAsync()}
                            >
                                <Text style={styles.buttonText} textBreakStrategy="simple">Pause Polyphony</Text>
                            </Pressable>
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
                            2. The Song of Seikilos has what kind of texture?
                        </Text>
                        {["Monophony", "Heterophony", "Homophony", "Polyphony"].map((option, index) => {
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
                            3. Homorhythm is a type of homophonic texture in which all voices move in a similar or
                            completely unison rhythm.
                        </Text>
                        {["True", "False"].map((option, index) => {
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
        paddingHorizontal: 10,
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
        wordWrap: 'break-word',
        overflow: 'hidden',
    },
});