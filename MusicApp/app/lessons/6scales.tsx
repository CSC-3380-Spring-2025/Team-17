import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Scales() {
    const cmajor = useRef(new Audio.Sound());
    const natminor = useRef(new Audio.Sound());
    const harminor = useRef(new Audio.Sound());
    const melminor = useRef(new Audio.Sound());


    useEffect(() => {
        const loadSounds = async () => {
            await cmajor.current.loadAsync(require('@/assets/sounds/cmajor.mp3'));
            await natminor.current.loadAsync(require('@/assets/sounds/natural_minor.mp3'));
            await harminor.current.loadAsync(require('@/assets/sounds/harmonic_minor.mp3'));
            await melminor.current.loadAsync(require('@/assets/sounds/melodic_minor.mp3'));
        };

        loadSounds();

        return () => {
            cmajor.current.unloadAsync();
            natminor.current.unloadAsync();
            harminor.current.unloadAsync();
            melminor.current.unloadAsync();
        };
    }, []);

    const [quiz1Answer, setQ1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQ2Answer] = useState<string | null>(null);
    const [quiz3Answer, setQ3Answer] = useState<string | null>(null);
    const [quiz4Answer, setQ4Answer] = useState<string | null>(null);
    const [quiz5Answer, setQ5Answer] = useState<string | null>(null);
    const [quiz6Answer, setQ6Answer] = useState<string | null>(null);
    const answer1 = "False";
    const answer2 = "True";
    const answer3 = "B major";
    const answer4 = "F minor";
    const answer5 = "B minor";
    const answer6 = "Gb major";

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
                                        if(!userData.lessonProgress.includes(6)){
                                            if(count === 6){
                                                await updateDoc(userDocRef, {
                                                    lessonProgress: arrayUnion(6),
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
                    Major & Minor Scales
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>scale</Text> is an ordered collection of notes centered around a tonic note. A scale starts on a tonic note and
                        proceeds upwards in a pattern of whole steps and half steps until it reaches the tonic note again. Scales are always
                        named after their tonic note.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Major Scales
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>major scale</Text> is an ordered collection of whole steps (W) & half steps (H) in the following pattern: W, W, H, W, W, W, H.
                        This pattern of whole steps and half steps is always the same in every major scale. Music written with major scales is often
                        characterized as sounding happy or light.
                    </Text>
                    <Image
                        source={require('@/assets/images/major_scale.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play C Major"
                            onPress={() => cmajor.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause C Major"
                            onPress={() => cmajor.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Scale Degrees
                    </Text>
                    <Text style={styles.text}>
                        Musicians can name the notes of major scales in a few different ways. The first method is <Text style={styles.bold}>scale degrees</Text>, which are
                        numbers starting at 1 for the first note of the scale, and the numbers ascend until the last note of the scale, which
                        is also 1 (or 8). Another method of naming notes is <Text style={styles.bold}>solfege</Text>, which is a system of syllables that is mostly used
                        by singers. The syllables <Text style={styles.italic}>do, re, mi, fa, so, la</Text> & <Text style={styles.italic}>ti</Text> correspond to the scale degrees 1, 2, 3, 4, 5, 6, & 7.
                        The last note is <Text style={styles.italic}>do</Text> again because it is a repetition of the first note. Solfege is often practiced in two distinct
                        form. <Text style={styles.bold}>Movable <Text style={styles.italic}>do</Text></Text> is the more common form of solfege, where the pitch of <Text style={styles.italic}>do</Text> changes depending on what
                        the first note of the scale is. <Text style={styles.bold}>Fixed <Text style={styles.italic}>do</Text></Text> is the less common form of solfege, where <Text style={styles.italic}>do</Text> always
                        corresponds with the pitch of C, and the other syllables likewise correspond to specific pitches. The final method
                        of naming notes is with <Text style={styles.bold}>scale degree names</Text>. Every scale degree has a specific name: tonic, supertonic, mediant,
                        subdominant, dominant, submediant, leading tone, and then tonic again.
                    </Text>
                    <Image
                        source={require('@/assets/images/scale_degrees.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        The word <Text style={styles.bold}>dominant</Text> is inherited from medieval music theory and refers to the importance of the fifth above the
                        tonic in Western music. The word <Text style={styles.bold}>mediant</Text> means 'middle', and refers to the fact that the mediant is in the middle
                        of the tonic and dominant pitches. The Latin prefix <Text style={styles.italic}>super</Text> means 'above', so that means the supertonic is one step
                        above the tonic. The Latin prefix <Text style={styles.italic}>sub</Text> means 'below', so the subdominant, submediant, and subtonic are the inverted
                        versions of the dominant, mediant, and supertonic as they are located below the tonic. The subtonic refers to the note
                        below the tonic, but in major scales, it is called the leading tone because it is one half step away from the tonic.
                        This gives the leading tone a tendency to resolve to the tonic note; thus, it leads to the tonic.
                    </Text>
                    <Image
                        source={require('@/assets/images/degree_names.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.header}>
                        Key Signatures
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>key signature</Text> is a group of sharps or flats that appears at the beginning of a composition (after a clef but
                        before a time signature) and indicates to the musician what scale the music is in. Key signatures collect the accidentals
                        in a scale and place them at the beginning of the music to make it easier to track which notes have accidentals applied
                        to them. No matter what octave the notes are in, the accidentals will always be applied to them.
                    </Text>
                    <Image
                        source={require('@/assets/images/key_signature.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Sharp key signatures & flat key signatures always have a specific order in which sharps or flats are added, regardless
                        of the clef. The order of sharps is F, C, G, D, A, E, B. This can be remembered by the mnemonic "Fat Cats Go Down Alleys
                        to Eat Birds". The sharps form a zig-zag pattern, alternating in going up & down. In the treble, bass, and alto clefs,
                        the pattern breaks after D# & then resumes. In the tenor clef, there is no break in the pattern, but F# & G# appear in
                        the lower octave instead of the upper octave.
                    </Text>
                    <Image
                        source={require('@/assets/images/sharps.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        The order of flats is the opposite of the order of sharps: B, E, A, D, G, C, F. This makes the order of flats & sharps
                        palindromes. The order of flats can be remembered with the mnemonic "Birds Eat And Dive Going Crazy Far". The flats
                        always make a perfect zig-zag pattern without breaks in all clefs.
                    </Text>
                    <Image
                        source={require('@/assets/images/flats.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        There are a few easy tricks to remember which key signature belongs to which major scale. In sharp key signatures,
                        the last sharp is a half step below the tonic. It represents the leading tone, and based on that information, one can
                        easily deduce the tonic note of the scale by simply moving a half step up from the last sharp.
                    </Text>
                    <Image
                        source={require('@/assets/images/sharp_examples.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.examples}>
                        <Text style={styles.text}>
                            1. The last sharp (in this case the only sharp) is F#, which is a half step below the note G. Therefore, this is the
                            key signature of G major.
                        </Text>
                        <Text style={styles.text}>
                            2. The last sharp is G#, which is a half step below the note A. Therefore, this is the key signature of A major.
                        </Text>
                        <Text style={styles.text}>
                            3. The last sharp is E#, which is a half step below the note F#. Therefore, this is the key signature of F# major.
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        In flat key signatures, the second-to-last flat is the tonic note. One can immediately deduce the major scale just by
                        identifying the second-to-last flat.
                    </Text>
                    <Image
                        source={require('@/assets/images/flat_examples.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.examples}>
                        <Text style={styles.text}>
                            1. The second-to-last flat is Bb. Therefore, this is the key signature of Bb major.
                        </Text>
                        <Text style={styles.text}>
                            2. The second-to-last flat is Ab. Therefore, this is the key signature of Ab major.
                        </Text>
                        <Text style={styles.text}>
                            3. The second-to-last flat is Gb. Therefore, this is the key signature of Gb major.
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        There are two key signatures that need to be memorized as they have no easy tricks. C major has absolutely nothing in
                        its key signature (no sharps or flats). F major has one flat in its key signature.
                    </Text>
                    <Image
                        source={require('@/assets/images/c_f.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Minor Scales
                    </Text>
                    <Text style={styles.text}>
                        There are three types of minor scales: natural, harmonic, and melodic minor. The one thing all minor scales have in common
                        is that the third note of a minor scale is a half step lower than the third note of a major scale with the same tonic note.
                        Music written with minor scales is often characterized as sounding sad or dark.
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>natural minor</Text> scale is an ordered collection of whole steps (W) & half steps (H) in the following pattern:
                        W, H, W, W, H, W, W. This pattern is the same ascending and descending. Compared to a major scale starting on the same
                        tonic note, the scale degrees 3, 6, & 7 are all lowered by a half step in the natural minor scale. The lowered 7 is
                        especially important because it no longer resolves to the tonic like the leading tone in the major scale. Thus,
                        scale degree 7 is called the subtonic in natural minor.
                    </Text>
                    <Image
                        source={require('@/assets/images/natural_minor.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Natural Minor"
                            onPress={() => natminor.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Natural Minor"
                            onPress={() => natminor.current.pauseAsync()}
                        />
                    </View>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>harmonic minor</Text> scale is an ordered collection of whole steps (W) & half steps (H) in the following pattern:
                        W, H, W, W, H, 3H, H. This pattern is the same ascending and descending. The 3H interval indicates 3 half steps, or a
                        whole step & a half step. This raises scale degree 7 and allows it to become a leading tone that resolves to the tonic
                        just like in minor. The lowered scale degrees 3 & 6 remain the same as in natural minor. The raised 7 is good for harmony
                        since it resolves to the tonic again, but it is not good for melody because of the awkward interval of 3 half steps.
                    </Text>
                    <Image
                        source={require('@/assets/images/harmonic_minor.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Harmonic Minor"
                            onPress={() => harminor.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Harmonic Minor"
                            onPress={() => harminor.current.pauseAsync()}
                        />
                    </View>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>melodic minor</Text> scale is an ordered collection of whole steps (W) & half steps (H) in the following pattern:
                        W, H, W, W, W, W, H. This pattern only appears in an ascending melodic minor scale. When descending, the pattern reverts
                        back to the natural minor scale. Ascending melodic minor raises scale degrees 6 & 7, which not only allows for 7 to resolve
                        to the tonic as a leading tone, but the raised 6 also preserves consonant melodic intervals. Scale degrees 6 & 7 are lowered
                        again when descending down the melodic minor scale.
                    </Text>
                    <Image
                        source={require('@/assets/images/melodic_minor.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Melodic Minor"
                            onPress={() => melminor.current.playAsync()} />
                        <Button
                            color='#F44336'
                            title="Pause Melodic Minor"
                            onPress={() => melminor.current.pauseAsync()}
                        />
                    </View>
                    <Text style={styles.text}>
                        The solfege syllables of minor scales differ slightly from the solfege syllables of major scales because of the lowered
                        scale degrees of 3, 6, & 7. In natural minor, the syllable for lowered 3 is <Text style={styles.italic}>me</Text> (pronounced "may"), the syllable
                        for lowered 6 is <Text style={styles.italic}>le</Text> (pronounced "lay"), and the syllable for lowered 7 is <Text style={styles.italic}>te</Text> (pronounced "tay"). In
                        harmonic minor, scale degree 7 is raised, so its solfege syllable becomes <Text style={styles.italic}>ti</Text>, just like in a major scale. In
                        melodic minor, both scale degrees 6 & 7 are raised, so their solfege syllables become <Text style={styles.italic}>la</Text> & <Text style={styles.italic}>ti</Text>, respectively.
                    </Text>
                    <Image
                        source={require('@/assets/images/minor_solfege.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Parallel & Relative Relationships
                    </Text>
                    <Text style={styles.text}>
                        When comparing major & minor keys, there are two important relationships to remember. The <Text style={styles.bold}>parallel relationship </Text>
                        is when a major key and a minor key share the same tonic note. For example, C major & C minor are parallel keys. C major
                        is the parallel major of C minor, and C minor is the parallel minor of C major. The <Text style={styles.bold}>relative relationship</Text> is when
                        a major key and a minor key share the same key signature. For example, C major does not have any sharps or flats in its
                        key signature, and neither does A minor. C major is the relative major of A minor, and A minor is the relative minor of
                        C major. The tonic of a minor key is always located three half steps below the tonic of its relative major key. Starting
                        on C, you would count B, Bb, A to find that A minor is the relative minor of C major. Likewise, to find the relative
                        major of a minor key, count three half steps up.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        The Circle of Fifths
                    </Text>
                    <Text style={styles.text}>
                        The <Text style={styles.bold}>Circle of Fifths</Text> is a convenient visual that lays out all of the major and minor keys in a simple and easily
                        digestible manner. All of the major and minor keys are placed on a circle in order of the number of accidentals in their
                        key signatures. It is called the Circle of Fifths because each key is a fifth away from the keys on either side of it.
                        At the top of the circle, there is the key of C major/A minor, which has no sharps or flats in its key signature. Going
                        clockwise, each subsequent key signature adds one more sharp to the key signature. Going counterclockwise, each subsequent
                        key signature adds one more flat to the key signature. The bottom three key signatures are enharmonically equivalent. For
                        example, the keys of F# major & Gb major have different key signatures (6 sharps & 6 flats), but they sound the same because
                        F# & Gb are enharmonically equivalent.
                    </Text>
                    <Image
                        source={require('@/assets/images/circle_fifths.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <Text style={styles.quizTitle}>Quiz</Text>

                    <View style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                        1. The natural minor scale features a raised 7.
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
                        2. The melodic minor scale features a raised 6 & 7.
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
                        3. What major scale has the following key signature?
                        </Text>
                        <Image source={require('@/assets/images/bmajor.png')} 
                               style={styles.quizImage}
                               resizeMode="contain"
                        />
                        {["F major", "E major", "B major", "G major"].map((option, index) => {
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
                        4. What minor scale has the following key signature?
                        </Text>
                        <Image source={require('@/assets/images/fminor.png')} 
                               style={styles.quizImage}
                               resizeMode="contain"
                        />
                        {["G Minor", "Bb minor", "Eb minor", "F minor"].map((option, index) => {
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
                        5. What is the relative minor of D major?
                        </Text>
                        {["A minor", "E minor", "B minor", "D minor"].map((option, index) => {
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
                        6. What is the relative major of Eb minor?
                        </Text>
                        {["Ab major", "Gb major", "Eb major", "Db major"].map((option, index) => {
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
                        <Link href='./5meter' style={styles.secondaryLink}>
                            ← Previous: Meter
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./7modes' style={styles.link}>
                            Next: Modes →
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
    examples: {
        alignItems: 'flex-start'
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