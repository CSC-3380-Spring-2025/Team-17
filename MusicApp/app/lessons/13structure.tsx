import React, {useEffect, useRef} from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { Audio } from 'expo-av';

export default function Structure(){
    const field = useRef(new Audio.Sound());
    const melody = useRef(new Audio.Sound());

    useEffect(() => {
        const loadSounds = async () => {
            await field.current.loadAsync(require('@/assets/sounds/field.mp3'));
            await melody.current.loadAsync(require('@/assets/sounds/melody.mp3'));
        };

        loadSounds();

        return() => {
            field.current.unloadAsync();
            melody.current.unloadAsync();
        };

    }, []);

    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Musical Form
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        Musical works can be broken down into smaller sections. These sections are defined by certain melodic & harmonic 
                        ideas as well as other attributes such as tempo, dynamics, & rhythm. The combination of these different sections of 
                        a piece or song into a certain structure is known as the music's <Text style={styles.bold}>form</Text>. 
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Formal Sections
                    </Text>
                    <Text style={styles.text}>
                        The sections of a musical form can be divided into two categories: core & auxiliary. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Core sections</Text> typically introduce and repeat the primary musical content of a piece or song. 
                        They contain the main theme and present a sense of musical stability. They also tend to repeat later on, thus making them the most 
                        memorable parts of the musical work. The terms for core sections vary depending on the genre & form, but when thinking about form in 
                        general, the main section is called A. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Contrasting sections</Text> are core sections that introduce new musical material that contrasts with the main theme. In some cases, the contrasting 
                        section is perfectly stable & provides a contrast simply because it comes second instead of first. It provides a new melodic idea, maintains 
                        consistent dynamics & tempo, and does not create much musical change. In other cases, the contrasting sections is the most unstable part of the work.
                        It is characterized by a change in key, increased dynamics & tempo, increased rhythmic activity, or harmonic instability. Contrasting sections have 
                        many different terms depending on the genre & form and are generally referred to by other letters B, C, D, etc. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Auxiliary sections</Text> are located at the beginning or end of a phrase or piece, or between the core sections. They can be divided 
                        into two categories: external & connective. External auxiliary sections either introduce a musical work or follow its general conclusion. 
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>prefix</Text> is some music that comes before the generic start of a phrase or piece and expresses a formal sense of "before the beginning".
                        A prefix can be large or small depending on whether or not it contains a complete phrase. Large prefixes contain at least one phrase while 
                        small phrases do not have complete phrases & are less noticeable as they are often merely accompaniment for a section starting before the melody begins. 
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>suffix</Text> is some music that comes after the generic end of a phrase or piece and expresses a formal sense of "after the end".
                        Suffixes can also be large or small depending on whether or not it contains a complete phrase. Small suffixes can be found after the close of any phrase, but their 
                        effect depends on the cadence they follow. After an authentic cadence, a small suffix creates a sense of stability & closure. After a half cadence, a small suffix 
                        creates a sense of instability in preparation for the upcoming section. Large suffixes typically appear as a coda at the very end of a piece. 
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>transition</Text> is a section of music that connects two core sections. Transitions usually lead the music away from the main section 
                        towards a contrasting section, but it never leads back to the main section (A to B, never B to A). A transition also plays a role in the balance of stability & instability 
                        in a musical work. A core section will usually contain stable thematic elements, but a transition will typically introduce instability that will be countered by the stability 
                        of the core section that follows. Like prefixes & suffixes, a transition can be large or small depending on whether it contains a complete phrase. Large transitions contain at 
                        least one phrase while small transitions do not have a complete phrase and are less noticeable. A <Text style={styles.bold}>retransition</Text> is similar to a transition, but its 
                        location & function differ in that a retransition follows a contrasting section and leads back to the main section (B to A). In both transitions & retransitions, the music will move 
                        towards the dominant chord of the key in the upcoming section. This will allow the transition to smoothly resolve to the new section. Sometimes the transition or retransition will end 
                        on a clear half cadence to signal the beginning of the new section. In other cases, the transition may have an elided ending, consisting of overlapping phrases that function as the 
                        end of one phrase & the start of the next. 
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Binary Form
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Binary form</Text> contains two core sections. The first section is the main section that establishes the thematic musical material, and the second core section 
                        is the contrasting section that introduces new melodic material. The sections are sometimes called reprises because they are usually repeated. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/binary.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        There are two types of binary form: rounded & simple. 
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Rounded binary form</Text> consists of two reprises where the beginning of A returns somewhere in the middle of the second reprise. 
                        It is not necessary for all of A to reappear, just the beginning. The returning material may be exactly the same, but it may also contain some sort of variation, such as 
                        a change in octave or melodic embellishments. However, the harmony should remain the same as in the first reprise and provide a sense of stability. The second reprise 
                        will start with the B section, which is typically less stable than the A section, but it can also remain stable while introducing new thematic material into the music. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/rounded_binary.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Robert Schumann's "Melody", from his Album for the Young, is written in rounded binary form. The first reprise consists of a simple melody in C major that ends on a half cadence. 
                        This leads into the second reprise, which introduces new melodic material that is written in G major & sounds rather unstable. In the middle of the second reprise, the original melody 
                        returns with some variations and eventually ends in the key of C major.
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Melody - Robert Schumann
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Binary"
                                onPress={() => melody.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Binary"
                                onPress={() => melody.current.pauseAsync()}
                            />
                        </View>
                    </View>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Simple binary form</Text> differs from rounded binary in that there is no substantial return of the opening thematic material in the second reprise. 
                        Instead, the second reprise will contain a contrasting B section or a slightly varied A section. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/simple_binary.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Evgeny Grinko's "Field" is written in simple binary form. The first reprise contains a melodic idea in A minor that is repeated three times with changing instrumentation. 
                        In the second reprise, the music remains in A minor and explores new melodic material. It does not return to the thematic material in the first reprise. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Field - Evgeny Grinko
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Binary"
                                onPress={() => field.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Binary"
                                onPress={() => field.current.pauseAsync()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Ternary Form
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Rondo Form
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Verse & Chorus
                    </Text>
                </View>
                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./12texture' style={styles.secondaryLink}>
                            ← Previous: Musical Textures
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
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
        padding: 10
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
    header: {
        color: '#5543A5',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'left',
    },
    bold: {
        fontWeight: 'bold',
        color: '#5543A5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 8,
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