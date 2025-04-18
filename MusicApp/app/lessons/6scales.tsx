import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Scales() {
    const cmajor = useAudioPlayer(require('@/assets/sounds/cmajor.mp3'));
    const natminor = useAudioPlayer(require('@/assets/sounds/natural_minor.mp3'));
    const harminor = useAudioPlayer(require('@/assets/sounds/harmonic_minor.mp3'));
    const melminor = useAudioPlayer(require('@/assets/sounds/melodic_minor.mp3'));
    const [quiz1Answer, setQ1Answer] = useState(null);
    const [quiz2Answer, setQ2Answer] = useState(null);
    const [quiz3Answer, setQ3Answer] = useState(null);
    const [quiz4Answer, setQ4Answer] = useState(null);
    const [quiz5Answer, setQ5Answer] = useState(null);
    const [quiz6Answer, setQ6Answer] = useState(null);
    const answer1 = "False";
    const answer2 = "True";
    const answer3 = "B Major";
    const answer4 = "F Minor";
    const answer5 = "B Minor";
    const answer6 = "Gb Major";
    const resetQuiz1 = () => setQ1Answer(null);
    const resetQuiz2 = () => setQ2Answer(null);
    const resetQuiz3 = () => setQ3Answer(null);
    const resetQuiz4 = () => setQ4Answer(null);
    const resetQuiz5 = () => setQ5Answer(null);
    const resetQuiz6 = () => setQ6Answer(null);



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
                            onPress={() => cmajor.play()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause C Major"
                            onPress={() => cmajor.pause()}
                        />
                    </View>
                </View>


                <Text style={styles.text}>
                    3. The second-to-last flat is Gb. Therefore, this is the key signature of Gb major.
                </Text>
            </View>
            <Text style={styles.text}>
                There are two key signatures that need to be memorized as they have no easy tricks. C major has absolutely nothing in
                its key signature (no sharps or flats). F major has one flat in its key signature.
            </Text>
            <Image source={require('@/assets/images/c_f.png')} />
            <Text style={styles.header}>
                Minor Scales
            </Text>
            <Text style={styles.text}>
                There are three types of minor scales: natural, harmonic, and melodic minor. The one thing all minor scales have in common
                is that the third note of a minor scale is a half step lower than the third note of a major scale with the same tonic note.
                Music written with minor scales is often characterized as sounding sad or dark.
            </Text>
            <Text style={styles.text}>
                A <b>natural minor</b> scale is an ordered collection of whole steps (W) & half steps (H) in the following pattern:
                W, H, W, W, H, W, W. This pattern is the same ascending and descending. Compared to a major scale starting on the same
                tonic note, the scale degrees 3, 6, & 7 are all lowered by a half step in the natural minor scale. The lowered 7 is
                especially important because it no longer resolves to the tonic like the leading tone in the major scale. Thus,
                scale degree 7 is called the subtonic in natural minor.
            </Text>
            <Image source={require('@/assets/images/natural_minor.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Natural Minor" onPress={() => natminor.play()} />
                <Button color='red' title="Pause Natural Minor" onPress={() => natminor.pause()} />
            </View>
            <Text style={styles.text}>
                A <b>harmonic minor</b> scale is an ordered collection of whole steps (W) & half steps (H) in the following pattern:
                W, H, W, W, H, 3H, H. This pattern is the same ascending and descending. The 3H interval indicates 3 half steps, or a
                whole step & a half step. This raises scale degree 7 and allows it to become a leading tone that resolves to the tonic
                just like in minor. The lowered scale degrees 3 & 6 remain the same as in natural minor. The raised 7 is good for harmony
                since it resolves to the tonic again, but it is not good for melody because of the awkward interval of 3 half steps.
            </Text>
            <Image source={require('@/assets/images/harmonic_minor.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Harmonic Minor" onPress={() => harminor.play()} />
                <Button color='red' title="Pause Harmonic Minor" onPress={() => harminor.pause()} />
            </View>
            <Text style={styles.text}>
                A <b>melodic minor</b> scale is an ordered collection of whole steps (W) & half steps (H) in the following pattern:
                W, H, W, W, W, W, H. This pattern only appears in an ascending melodic minor scale. When descending, the pattern reverts
                back to the natural minor scale. Ascending melodic minor raises scale degrees 6 & 7, which not only allows for 7 to resolve
                to the tonic as a leading tone, but the raised 6 also preserves consonant melodic intervals. Scale degrees 6 & 7 are lowered
                again when descending down the melodic minor scale.
            </Text>
            <Image source={require('@/assets/images/melodic_minor.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Melodic Minor" onPress={() => melminor.play()} />
                <Button color='red' title="Pause Melodic Minor" onPress={() => melminor.pause()} />
            </View>
            <Text style={styles.text}>
                The solfege syllables of minor scales differ slightly from the solfege syllables of major scales because of the lowered
                scale degrees of 3, 6, & 7. In natural minor, the syllable for lowered 3 is <i>me</i> (pronounced "may"), the syllable
                for lowered 6 is <i>le</i> (pronounced "lay"), and the syllable for lowered 7 is <i>te</i> (pronounced "tay"). In
                harmonic minor, scale degree 7 is raised, so its solfege syllable becomes <i>ti</i>, just like in a major scale. In
                melodic minor, both scale degrees 6 & 7 are raised, so their solfege syllables become <i>la</i> & <i>ti</i>, respectively.
            </Text>
            <Image source={require('@/assets/images/minor_solfege.png')} />
            <Text style={styles.header}>
                Parallel & Relative Relationships
            </Text>
            <Text style={styles.text}>
                When comparing major & minor keys, there are two important relationships to remember. The <b>parallel relationship</b>
                is when a major key and a minor key share the same tonic note. For example, C major & C minor are parallel keys. C major
                is the parallel major of C minor, and C minor is the parallel minor of C major. The <b>relative relationship</b> is when
                a major key and a minor key share the same key signature. For example, C major does not have any sharps or flats in its
                key signature, and neither does A minor. C major is the relative major of A minor, and A minor is the relative minor of
                C major. The tonic of a minor key is always located three half steps below the tonic of its relative major key. Starting
                on C, you would count B, Bb, A to find that A minor is the relative minor of C major. Likewise, to find the relative
                major of a minor key, count three half steps up.
            </Text>
            <Text style={styles.header}>
                The Circle of Fifths
            </Text>
            <Text style={styles.text}>
                The <b>Circle of Fifths</b> is a convenient visual that lays out all of the major and minor keys in a simple and easily
                digestible manner. All of the major and minor keys are placed on a circle in order of the number of accidentals in their
                key signatures. It is called the Circle of Fifths because each key is a fifth away from the keys on either side of it.
                At the top of the circle, there is the key of C major/A minor, which has no sharps or flats in its key signature. Going
                clockwise, each subsequent key signature adds one more sharp to the key signature. Going counterclockwise, each subsequent
                key signature adds one more flat to the key signature. The bottom three key signatures are enharmonically equivalent. For
                example, the keys of F# major & Gb major have different key signatures (6 sharps & 6 flats), but they sound the same because
                F# & Gb are enharmonically equivalent.
            </Text>
            <Image source={require('@/assets/images/circle_fifths.png')} />
            <div>
                <Text style={styles.quizTitle}>Quiz{"\n"}</Text>

                <view style={styles.quizContainer}>
                    <Text style={styles.quizText}>
                        1. True or False: The natural minor scale features a raised 7.
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
                        2. True or False: The melodic minor scale features a raised 6 & 7.
                    </Text>
                    {["True", "False"].map((option, index) => {
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
                        3. What major scale has the following key signature?
                    </Text>
                    <Image source={require('@/assets/images/bmajor.png')} />

                    {["F Major", "E Major", "B Major", "G Major"].map((option, index) => {
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
                        4. What minor scale has the following key signature?
                    </Text>
                    <Image source={require('@/assets/images/fminor.png')} />
                    {["G Minor", "Bb Minor", "Eb Minor", "F Minor"].map((option, index) => {
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
                <view style={styles.quizContainer}>
                    <Text style={styles.quizText}>
                        5. What is the relative minor of D major?
                    </Text>


                    {["A Minor", "E Minor", "B Minor", "D Minor"].map((option, index) => {
                        const selected = quiz5Answer === option;
                        let buttonStyle = styles.quizButton;

                        if (quiz5Answer !== null) {
                            if (option === answer5) {
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
                                    if (!quiz5Answer) setQ5Answer(option); // only once
                                }}
                            >
                                <Text style={styles.quizButtonText}>{option}</Text>
                            </Pressable>
                        );
                    })}
                    {quiz5Answer && (
                        <Text style={styles.result}>
                            {quiz5Answer === answer5 ? "Correct!" : "Wrong"}
                            {"\n"}
                        </Text>
                    )}
                    {quiz5Answer && quiz5Answer !== answer5 && (
                        <Text style={styles.result}>
                            Correct Answer: {answer5}
                            {"\n"}
                        </Text>
                    )}
                    <Pressable
                        style={styles.resetButton}
                        onPress={resetQuiz5}
                    >
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </Pressable>
                </view>
                <view style={styles.quizContainer}>
                    <Text style={styles.quizText}>
                        6. What is the relative major of Eb minor?
                    </Text>


                    {["Ab Major", "Gb Major", "Eb Major", "Db Major"].map((option, index) => {
                        const selected = quiz6Answer === option;
                        let buttonStyle = styles.quizButton;

                        if (quiz6Answer !== null) {
                            if (option === answer6) {
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
                                    if (!quiz6Answer) setQ6Answer(option); // only once
                                }}
                            >
                                <Text style={styles.quizButtonText}>{option}</Text>
                            </Pressable>
                        );
                    })}
                    {quiz6Answer && (
                        <Text style={styles.result}>
                            {quiz6Answer === answer6 ? "Correct!" : "Wrong"}
                            {"\n"}
                        </Text>
                    )}
                    {quiz6Answer && quiz6Answer !== answer6 && (
                        <Text style={styles.result}>
                            Correct Answer: {answer6}
                            {"\n"}
                        </Text>
                    )}
                    <Pressable
                        style={styles.resetButton}
                        onPress={resetQuiz6}
                    >
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </Pressable>
                </view>
            </div>

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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
    },
    buttons: {
        flexDirection: 'row'
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
});