import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Modes() {
    const lydian = useAudioPlayer(require('@/assets/sounds/lydian.mp3'));
    const ionian = useAudioPlayer(require('@/assets/sounds/ionian.mp3'));
    const mixolydian = useAudioPlayer(require('@/assets/sounds/mixolydian.mp3'));
    const dorian = useAudioPlayer(require('@/assets/sounds/dorian.mp3'));
    const aeolian = useAudioPlayer(require('@/assets/sounds/aeolian.mp3'));
    const phrygian = useAudioPlayer(require('@/assets/sounds/phrygian.mp3'));
    const locrian = useAudioPlayer(require('@/assets/sounds/locrian.mp3'));
    const [quiz1Answer, setQ1Answer] = useState(null);
    const [quiz2Answer, setQ2Answer] = useState(null);
    const [quiz3Answer, setQ3Answer] = useState(null);
    const [quiz4Answer, setQ4Answer] = useState(null);
    const [quiz5Answer, setQ5Answer] = useState(null);
    const [quiz6Answer, setQ6Answer] = useState(null);
    const answer1 = "Ionian";
    const answer2 = "Aeolian";
    const answer3 = "Lydian";
    const answer4 = "Phrygian";
    const answer5 = "Mixolydian";
    const answer6 = "Locrian";
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
                        W, W, W, H, W, W, H. You can think of this mode as a major scale with a raised 4 (<i>fi</i>). You can also find this mode if you
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
                            onPress={() => lydian.play()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Lydian"
                            onPress={() => lydian.pause()}
                        />
                    </View>
                </View>




                <Text style={styles.text}>
                    The next bright mode is the <b>ionian mode</b>. In this mode, the ascending pattern of whole steps and half steps is
                    the exact same as in the major scale: W, W, H, W, W, W, H. You can find this mode if you play all the white keys on a
                    piano keyboard starting from C.
                </Text>
                <Image source={require('@/assets/images/c_ionian.png')} />
                <Image source={require('@/assets/images/ionian.png')} />
                <View style={styles.buttons}>
                    <Button color='green' title="Play Ionian" onPress={() => ionian.play()} />
                    <Button color='red' title="Pause Ionian" onPress={() => ionian.pause()} />
                </View>
                <Text style={styles.text}>
                    The next bright mode is the <b>mixolydian mode</b>. In this mode, the ascending pattern of whole steps and half steps is
                    W, W, H, W, W, H, W. You can think of this mode as a major scale with a lowered 7 (<i>te</i>). You can also find this mode
                    if you play all the white keys on a piano keyboard starting from G.
                </Text>
                <Image source={require('@/assets/images/g_mixolydian.png')} />
                <Image source={require('@/assets/images/mixolydian.png')} />
                <View style={styles.buttons}>
                    <Button color='green' title="Play Mixolydian" onPress={() => mixolydian.play()} />
                    <Button color='red' title="Pause Mixolydian" onPress={() => mixolydian.pause()} />
                </View>
                <Text style={styles.text}>
                    The lydian, ionian, and mixolydian modes are considered the brighter modes because they contain an unaltered 3 instead of
                    a lowered 3 (<i>mi</i> instead of <i>me</i>). The dorian, aeolian, phrygian, and locrian modes are considered darker because
                    they contain a lowered 3 instead of an unaltered 3 (<i>me</i> instead of <i>mi</i>).
                </Text>
                <Text style={styles.text}>
                    The first dark mode is the <b>dorian mode</b>. In this mode, the ascending pattern of whole steps and half steps is
                    W, H, W, W, W, H, W. You can think of this mode as a minor scale with a raised 6 (<i>la</i>). You can also find this mode if
                    you play all the white keys on a piano keyboard starting from D.
                </Text>
                <Image source={require('@/assets/images/d_dorian.png')} />
                <Image source={require('@/assets/images/dorian.png')} />
                <View style={styles.buttons}>
                    <Button color='green' title="Play Dorian" onPress={() => dorian.play()} />
                    <Button color='red' title="Pause Dorian" onPress={() => dorian.pause()} />
                </View>
                <Text style={styles.text}>
                    The next dark mode is the <b>aeolian mode</b>. In this mode, the ascending pattern of whole steps and half steps is the
                    exact same as in the minor scale: W, H, W, W, H, W, W. You can also find this mode if you play all the white keys on a
                    piano keyboard starting from A.
                </Text>
                <Image source={require('@/assets/images/a_aeolian.png')} />
                <Image source={require('@/assets/images/aeolian.png')} />
                <View style={styles.buttons}>
                    <Button color='green' title="Play Aeolian" onPress={() => aeolian.play()} />
                    <Button color='red' title="Pause Aeolian" onPress={() => aeolian.pause()} />
                </View>
                <Text style={styles.text}>
                    The next dark mode is the <b>phrygian mode</b>. In this mode, the ascending pattern of whole steps and half steps is
                    H, W, W, W, H, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>). You can also find this mode
                    if you play all the white keys on a piano keyboard starting from E.
                </Text>
                <Image source={require('@/assets/images/e_phrygian.png')} />
                <Image source={require('@/assets/images/phrygian.png')} />
                <View style={styles.buttons}>
                    <Button color='green' title="Play Phrygian" onPress={() => phrygian.play()} />
                    <Button color='red' title="Pause Phrygian" onPress={() => phrygian.pause()} />
                </View>
                <Text style={styles.text}>
                    The darkest mode is the <b>locrian mode</b>. In this mode, the ascending pattern of whole steps and half steps is
                    H, W, W, H, W, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>) & a lowered 5 (<i>se</i>).
                    You can also find this mode if you play all the white keys on a piano keyboard starting from B.
                </Text>
                <Image source={require('@/assets/images/b_locrian.png')} />
                <Image source={require('@/assets/images/locrian.png')} />
                <View style={styles.buttons}>
                    <Button color='green' title="Play Locrian" onPress={() => locrian.play()} />
                    <Button color='red' title="Pause Locrian" onPress={() => locrian.pause()} />
                </View>
                <div>
                    <Text style={styles.quizTitle}>Quiz{"\n"}</Text>

                    <view style={styles.quizContainer}>
                        <Text style={styles.quizText}>
                            1. Which of the following modes is just like the major scale?
                        </Text>
                        {["Lydian", "Ionian", "Mixolydian", "Aeolian"].map((option, index) => {
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
                            2. Which of the following modes is just like the minor scale?
                        </Text>
                        {["Lydian", "Ionian", "Mixolydian", "Aeolian"].map((option, index) => {
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
                            3. Which of the following modes is just like a major scale with a raised 4?
                        </Text>


                        {["Lydian", "Ionian", "Mixolydian", "Locrian"].map((option, index) => {
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
                            4. Which of the following modes is just like a minor scale with a lowered 2?
                        </Text>

                        {["Dorian", "Aeolian", "Phrygian", "Locrian"].map((option, index) => {
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
                            5. Which of the following modes is just like a major scale with a lowered 7?
                        </Text>


                        {["Lydian", "Ionian", "Mixolydian", "Dorian"].map((option, index) => {
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
                            6. Which of the following modes is just like a minor scale with a lowered 2 & a lowered 5?
                        </Text>


                        {["Dorian", "Aeolian", "Phrygian", "Locrian"].map((option, index) => {
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