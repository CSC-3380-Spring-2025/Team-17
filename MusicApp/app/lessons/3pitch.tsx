import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Pitch() {
    const flute1 = useRef(new Audio.Sound());
    const flute2 = useRef(new Audio.Sound());
    const trombone1 = useRef(new Audio.Sound());
    const trombone2 = useRef(new Audio.Sound());
    const viola1 = useRef(new Audio.Sound());
    const viola2 = useRef(new Audio.Sound());
    const cello1 = useRef(new Audio.Sound());
    const cello2 = useRef(new Audio.Sound());
    const piano1 = useRef(new Audio.Sound());
    const piano2 = useRef(new Audio.Sound());

    const [quiz1Answer, setQ1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQ2Answer] = useState<string | null>(null);
    const [quiz3Answer, setQ3Answer] = useState<string | null>(null);
    const answer1 = "G,A,B,C,D,E,F,G,A";
    const answer2 = "Raises the Note by a 1/2 Step";
    const answer3 = "True";

    useEffect(() => {
        const loadSounds = async () => {
            await flute1.current.loadAsync(require('@/assets/sounds/flute1.mp3'));
            await flute2.current.loadAsync(require('@/assets/sounds/flute2.mp3'));
            await trombone1.current.loadAsync(require('@/assets/sounds/trombone1.mp3'));
            await trombone2.current.loadAsync(require('@/assets/sounds/trombone2.mp3'));
            await viola1.current.loadAsync(require('@/assets/sounds/viola1.mp3'));
            await viola2.current.loadAsync(require('@/assets/sounds/viola2.mp3'));
            await cello1.current.loadAsync(require('@/assets/sounds/cello1.mp3'));
            await cello2.current.loadAsync(require('@/assets/sounds/cello2.mp3'));
            await piano1.current.loadAsync(require('@/assets/sounds/piano1.mp3'));
            await piano2.current.loadAsync(require('@/assets/sounds/piano2.mp3'));
        };

        loadSounds();

        return () => {
            flute1.current.unloadAsync();
            flute2.current.unloadAsync();
            trombone1.current.unloadAsync();
            trombone2.current.unloadAsync();
            viola1.current.unloadAsync();
            viola2.current.unloadAsync();
            cello1.current.unloadAsync();
            cello2.current.unloadAsync();
            piano1.current.unloadAsync();
            piano2.current.unloadAsync();
        };
    }, []);

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
                            if(!userData.lessonProgress.includes(3)){
                                if(count === 3){
                                    await updateDoc(userDocRef, {
                                        lessonProgress: arrayUnion(3),
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
                    Pitch
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        In music, a pitch is a distinct tone with an individual frequency. Western music is built around 7 tones named after
                        the first seven letters of the alphabet: A, B, C, D, E, F, G. These pitches are repeated in a loop after G.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Clefs
                    </Text>
                    <Text style={styles.text}>
                        To notate pitches on a staff, there must be a way to assign them to the different lines and spaces of the staff. This
                        is the purpose of clefs. A <Text style={styles.bold}>clef</Text> is a symbol at the beginning of a staff that indicates the layout of the pitches
                        on the lines and spaces. Different clefs make reading different ranges easier.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Treble Clef: </Text> The treble clef is one of the most widely used clefs in Western music. It is typically used
                        for higher-range voices and instruments, such as flute, violin, trumpet, or soprano voice. Because this clef is curled
                        around the G line (second line from the bottom) and looks like the letter G, it is also called the G clef. The lines in
                        the treble clef are used to notate the pitches E, G, B, D, F. This pattern can be remembered with the mnemonic device
                        "Every Good Boy Does Fine".
                    </Text>
                    <Image
                        source={require('@/assets/images/egbdf.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play flute"
                            onPress={() => flute1.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause flute"
                            onPress={() => flute1.current.pauseAsync()}
                        />
                    </View>
                    <Text style={styles.text}>
                        The spaces in the treble clef are used to notate the pitches F, A, C, E. This pattern can be remembered by the fact
                        that they spell the word "face".
                    </Text>
                    <Image
                        source={require('@/assets/images/face.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play flute"
                            onPress={() => flute2.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause flute"
                            onPress={() => flute2.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Bass Clef: </Text> The bass clef is the other most widely used clefs in Western music. It is typically used for
                        lower-range voices and instruments, such as bassoon, cello, trombone, or bass voice. Because this clef curls around the
                        F line (second line from the top) and has two lines surrounding the F line and looks like the letter F, it is also
                        called the F clef. The lines in the bass clef are used to notate the pitches G, B, D, F, A. This pattern can be
                        remembered by the mnemonic device "Good Bikes Don't Fall Apart".
                    </Text>
                    <Image
                        source={require('@/assets/images/gbdfa.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play trombone"
                            onPress={() => trombone1.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause trombone"
                            onPress={() => trombone1.current.pauseAsync()}
                        />
                    </View>
                    <Text style={styles.text}>
                        The spaces in the bass clef are used to notate the pitches A, C, E, G. This pattern can be remembered by the
                        mnemonic device "All Cows Eat Grass".
                    </Text>
                    <Image
                        source={require('@/assets/images/aceg.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play trombone"
                            onPress={() => trombone2.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause trombone"
                            onPress={() => trombone2.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        Alto Clef:   The alto clef is a less widely used clef in Western music. It is typically used for the viola, which is a
                        middle-range instrument. Because this clef is centered around the C line (the middle line), it is also called the
                        C clef. The lines in the alto clef are used to notate the pitches F, A, C, E, G. This pattern can be
                        remembered by the mnemonic device "Fat Alley Cats Eat Garbage".
                    </Text>
                    <Image
                        source={require('@/assets/images/faceg.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play viola"
                            onPress={() => viola1.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause viola"
                            onPress={() => viola1.current.pauseAsync()}
                        />
                    </View>
                    <Text style={styles.text}>
                        The spaces in the alto clef are used to notate the pitches G, B, D, F. This pattern can be remembered by the
                        mnemonic device "Grand Boats Drift Flamboyantly".
                    </Text>
                    <Image
                        source={require('@/assets/images/gbdf.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play viola"
                            onPress={() => viola2.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause viola"
                            onPress={() => viola2.current.pauseAsync()} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        Tenor Clef:   The tenor clef is another less widely used clef in Western music. It is typically used for
                        lower-range instruments, like the cello, bassoon, and trombone, but their main clef is the bass clef.
                        This clef looks just like the alto clef and is also called the C clef, but it is centered around the second line
                        from the top. The lines in the alto clef are used to notate the pitches D, F, A, C, E. This pattern can be
                        remembered by the mnemonic device "Dodges, Fords, and Chevys Everywhere".
                    </Text>
                    <Image
                        source={require('@/assets/images/dface.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play cello"
                            onPress={() => cello1.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause cello"
                            onPress={() => cello1.current.pauseAsync()}
                        />
                    </View>
                    <Text style={styles.text}>
                        The spaces in the tenor clef are used to notate the pitches E, G, B, D. This pattern can be remembered by the
                        mnemonic device "Elvis' Guitar Broke Down".
                    </Text>
                    <Image
                        source={require('@/assets/images/egbd.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play cello"
                            onPress={() => cello2.current.playAsync()}
                        />
                        <Button
                            color='#9575CD'
                            title="Pause cello"
                            onPress={() => cello2.current.pauseAsync()} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Piano & the Grand Staff
                    </Text>
                    <Text style={styles.text}>
                        The best way to learn music theory is to learn it kinesthetically. That means to physically create sounds on an
                        instrument, such as the piano, to better visualize and audiate the music you are writing or studying. Playing the
                        piano is the best way to learn music theory kinesthetically. The piano keyboard has both white keys and black keys.
                        Sets of three and two black keys alternate throughout the entire length of the keyboard, repeating the pitch pattern.
                    </Text>
                    <Image
                        source={require('@/assets/images/piano.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        The image below shows the piano keyboard with the white keys labeled with the different pitches. The same letter
                        names appear on different keys of the keyboard as the pitch pattern repeats. The distance between two keys or pitches
                        of the same name is called an  octave .
                    </Text>
                    <Image
                        source={require('@/assets/images/keyboard.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Music for the piano is written on a grand staff. A  grand staff  is a combination of the treble and bass clefs.
                        The treble clef is on top of the bass clef, and both clefs are connected by a brace and a line. Typically, the pianist
                        plays the notes in the treble clef with the right hand and the notes in the bass clef with the left hand. In between
                        the treble and bass clefs, there exists a C note known as  middle C , not only because it is in the middle of the
                        grand staff, but also because it lies in the middle of the piano keyboard.
                    </Text>
                    <Image
                        source={require('@/assets/images/grand_staff.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play piano"
                            onPress={() => piano1.current.playAsync()} />
                        <Button
                            color='#9575CD'
                            title="Pause piano"
                            onPress={() => piano1.current.pauseAsync()} />
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.header}>
                        Half Steps, Whole Steps, & Accidentals
                    </Text>
                    <Text style={styles.text}>
                        A  half step  is considered to be the smallest interval (distance between two notes) in Western music.
                        For most of the white keys on the piano keyboard, the black keys to the right and left of a white key will be the
                        half-steps above and below that note. However, two pairs of white keys do not have black keys between them. The note
                        pairs E-F & B-C are both half steps.
                    </Text>
                    <Image
                        source={require('@/assets/images/half_step.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        A  whole step  is equal to two half steps. Counting two keys to the right or the left of any note on the piano
                        keyboard will get a whole step above or below that note. Pairs of white keys with a black key between them or pairs of
                        black keys with a white key between them are a whole step apart.
                    </Text>
                    <Image
                        source={require('@/assets/images/whole_step.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        An  accidental  changes the pitch of a note. A  sharp  raises a note by a half step. A  flat  lowers a note
                        by a half step. A  double sharp raises a note by a whole step. A  double flat  lowers a note by a whole step.
                        A  natural  cancels out any previous accidental. Accidentals are always written to the left of a note, regardless of
                        stem direction, and they are written directly across the line or space on which a note appears.
                    </Text>
                    <Image
                        source={require('@/assets/images/accidentals.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        On the piano keyboard, black keys to the right of a white key take the name of that white key and add the word "sharp", and
                        black keys to the left of a white key take the name of that white key and add the word "flat". For example, the black key to
                        the right of C is called "C-sharp" and is written as C#, and the black key to the left of D is called "D-flat" and is written
                        as Db. White keys can also be accidentals of other white keys. For example, F is also known as E#, and E is also known
                        as Fb. C is also known as B#, and B is also known as Cb.
                    </Text>
                    <Image
                        source={require('@/assets/images/keys.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#7E57C2'
                            title="Play piano"
                            onPress={() => piano2.current.playAsync()} />
                        <Button
                            color='#9575CD'
                            title="Pause piano"
                            onPress={() => piano2.current.pauseAsync()} />
                    </View>
                    <Text style={styles.text}>
                        Each key on the keyboard has more than one name.  Enharmonic equivalence  is when two notes have different names,
                        but they have the same sound. C# & Db are enharmonically equivalent, so playing either of those notes will result in the
                        same pitch. D is enharmonically equivalent with Cx & Ebb, so playing D, Cx, or Ebb will result in the same pitch.
                    </Text>
                </View>

                <View>
                    <Text style={styles.quizTitle}>Quiz</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            1. In what order are pitches notated with a bass clef?
                        </Text>
                        {["F,G,A,B,C,D,E,F,G", "E,F,G,A,B,C,D,E,F", "D,E,F,G,A,B,C,D,E", "G,A,B,C,D,E,F,G,A"].map((option, index) => {
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
                            2. What does a sharp do to a note?
                        </Text>
                        {["Raises the Note by a 1/2 Step", "Raises the note by a Whole Step", "Lowers the note by a 1/2 Step", "Lowers the note by a Whole Step"].map((option, index) => {
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
                            3. An enharmonic equivalence can also occur when two notes have the same name but different sounds.
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
                        <Link href='./2notation' style={styles.secondaryLink}>
                            ← Previous: Music Notation
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./4rhythm' style={styles.link}>
                            Next: Rhythm →
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
        fontWeight: 'bold',
        color: '#5543A5',
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