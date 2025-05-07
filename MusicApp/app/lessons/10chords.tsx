import React, { useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';

export default function Chords() {
    const triads = useRef(new Audio.Sound());
    const qualities = useRef(new Audio.Sound());
    const symbols = useRef(new Audio.Sound());
    const major = useRef(new Audio.Sound());
    const minor = useRef(new Audio.Sound());
    const big = useRef(new Audio.Sound());

    useEffect(() => {
        const loadSounds = async () => {
            await triads.current.loadAsync(require('@/assets/sounds/triads.mp3'));
            await qualities.current.loadAsync(require('@/assets/sounds/qualities.mp3'));
            await symbols.current.loadAsync(require('@/assets/sounds/chord_symbols.mp3'));
            await major.current.loadAsync(require('@/assets/sounds/major_triads.mp3'));
            await minor.current.loadAsync(require('@/assets/sounds/minor_triads.mp3'));
            await big.current.loadAsync(require('@/assets/sounds/big_triads.mp3'));
        };

        loadSounds();

        return () => {
            triads.current.unloadAsync();
            qualities.current.unloadAsync();
            symbols.current.unloadAsync();
            major.current.unloadAsync();
            minor.current.unloadAsync();
            big.current.unloadAsync();
        };
    }, [])

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Chords
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        In music, it is often not enough to just have a melody. Songs and compositions often accompany a melody with
                        some form of harmony. <Text style={styles.bold}>Harmony</Text> is the vertical structure of a piece, which
                        consists of multiple notes being played at the same time. Harmony is based on <Text style={styles.bold}>chords</Text>,
                        which are combinations of three or more notes that sound simultaneously. The most common chords are
                        <Text style={styles.bold}> triads</Text>, which are chords made of three notes that are stacked in thirds. A
                        triad can always be stacked so that its notes are either on all lines or all spaces. When a triad is stacked
                        in its most compact form, it looks like a snowperson. Just as a snowperson consists of a bottom, middle, & head,
                        a triad consists of bottom, middle, & upper notes.
                    </Text>
                    <Image source={require('@/assets/images/triads.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => triads.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Triads</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => triads.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Triads</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        When a triad is stacked in thirds like a snowperson, this is referred to as root position. The lowest note of
                        the triad is called the root. The middle note of the triad is called the third (a generic third above the root).
                        The top note of the triad is called the fifth (a generic fifth above the root).
                    </Text>
                    <Image
                        source={require('@/assets/images/triad.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Qualities
                    </Text>
                    <Text style={styles.text}>
                        There are four qualities of triads: Major, Minor, Diminished, & Augmented. These qualities are
                        determined by the intervals from the root to the third & from the root to the fifth. <Text style={styles.bold}>Major </Text>
                        & <Text style={styles.bold}>minor</Text> triads have perfect fifths and are named for the quality of their third.
                        A <Text style={styles.bold}>diminished</Text> triad has a minor third and a diminished fifth. An <Text style={styles.bold}>augmented </Text>
                        triad has a major triad and an augmented fifth. Major triads tend to sound happy. Minor triads tend to sound sad.
                        Diminished triads tend to sound scary. Augmented triads tend to sound mystical.
                    </Text>
                    <Image
                        source={require('@/assets/images/triad_qualities.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => qualities.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Triads</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => qualities.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Triads</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Chord Symbols
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Chord symbols</Text> for triads include the name of the root and an indication of the
                        chord's quality, and sometimes the pitch of the lowest note. The chord symbol begins with a capital letter
                        denoting the name of the root (and an accidental, if necessary). This is followed by the chord's quality,
                        which is indicated using abbreviations. A major triad is indicated with no abbreviation at all. A minor triad
                        is indicated by a lowercase "m". A diminished triad is indicated by a superscript circle (o). An augmented
                        triad is indicated by a plus sign (+). If a triad's lowest note is any other note besides the root, then a slash
                        is added, followed by a capital letter denoting the pitch in the lowest voice.
                    </Text>
                    <Image
                        source={require('@/assets/images/chord_symbols.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => symbols.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Triads</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => symbols.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Triads</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Triads in Scales
                    </Text>
                    <Text style={styles.text}>
                        Any note in a major or minor scale can be the root of a triad. In a major scale, triads built on scale degrees
                        1, 4, & 5 are major. Triads built on scale degrees 2, 3, & 6 are minor. Triads built on scale degree 7 are
                        diminished. This pattern of triads remains the same in all major scales, no matter what the key is.
                    </Text>
                    <Image
                        source={require('@/assets/images/triads_major.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => major.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Triads</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => major.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Triads</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        In a minor scale, the qualities of triads can be complicated by the existence of multiple minor scales. The
                        triads built on scale degrees 5 & 7 can be created with or without a raised leading tone. Triads built on
                        scale degrees 1, 4, & 5 without a raised leading tone are minor. Triads built on scale degrees 3, 6, & 7
                        without a raised leading tone are major. A triad built on scale degree 5 with a raised leading tone is also major.
                        Triads built on scale degrees 2 & 7 with a raised leading tone are diminished.
                    </Text>
                    <Image
                        source={require('@/assets/images/triads_minor.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => minor.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Triads</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => minor.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Triads</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Spelling & Identifying Triads
                    </Text>
                    <Text style={styles.text}>
                        To build a triad from a chord symbol, it is important to be aware of the triad's root & quality.
                    </Text>
                    <View style={styles.examples}>
                        <Text style={styles.text}>
                            1. Draw the root on the staff.
                        </Text>
                        <Text style={styles.text}>
                            2. Draw the third & fifth above the root on the staff (draw a snowperson).
                        </Text>
                        <Text style={styles.text}>
                            3. Remember the major key signature of the root.
                        </Text>
                        <Text style={styles.text}>
                            4. To spell a major triad, write any accidentals from the key signature that apply to the notes of the triad.
                        </Text>
                        <Text style={styles.text}>
                            5. For a minor, diminished, or augmented triad, add additional accidentals to alter the third or fifth when
                            appropriate.
                        </Text>
                    </View>
                    <Image
                        source={require('@/assets/images/D-triad.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        The chord's root, D, is drawn on the staff. The notes F & A are drawn as the generic third & fifth above D.
                        The key signature of D major has been recalled. D major has two sharps: F# & C#. Because F# is in the key
                        signature, a sharp has been added to F in the triad. No C# is necessary because C is not present in the triad.
                    </Text>
                    <Image
                        source={require('@/assets/images/Ab_triad.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        To draw an Ab minor chord, we start by drawing the root of the chord, Ab, on the staff. The notes C & E are
                        drawn as the generic third & fifth above Ab. The key signature of Ab major is recalled. Ab major has 4 flats:
                        Bb, Eb, Ab, & Db. Eb is added because it is in the key signature of Ab. Bb & Db are not needed since they
                        are not in the triad. We now have an Ab major triad. To make it minor, we need to give it a minor third, which
                        is one half-step smaller than a major third. The last step is to lower the chord's third, C, by a half-step
                        to Cb. We now have an Ab minor triad.
                    </Text>
                    <Text style={styles.text}>
                        Diminished triads have a minor third & diminished fifth, so both the third & the fifth have to be lowered by
                        a half-step from the major triad. An augmented triad has a major third & an augmented fifth, so its fifth
                        must be raised by a half-step from the major triad.
                    </Text>
                    <Text style={styles.text}>
                        Triads are identified according to their root & quality. First, the root must be identified. Then the major key
                        signature of the root must be imagined. Finally, the quality must be identified.
                    </Text>
                    <Image
                        source={require('@/assets/images/DM_triad.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        This triad is written in its most compact form, so the root is its lowest note, D. The key signature of D major has
                        two sharps: F# & C#. In this triad, the F is sharp, thus matching the major key signature. Therefore, this
                        is a D major triad.
                    </Text>
                    <Image
                        source={require('@/assets/images/Cs_triad.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        The root of this triad is its lowest note, C#. The key signature of C# major has 7 sharps (every note is sharp).
                        Thus, E & G would be sharp in a C# major chord. However, they are both natural in the triad. Since both the
                        third & the fifth have been lowered by a half-step, the quality of this triad is diminished. This is a
                        C# diminished triad.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Doubling & Spacing
                    </Text>
                    <Text style={styles.text}>
                        Because of the principle of octave equivalence, the doubling & spacing of notes in a triad does not affect the
                        triad's identification. Triads will remain the same regardless of octave doublings or the use of open spacing
                        with wide intervals. To identify triads with doublings & open spacing, one must simply imagine or write the notes
                        of the triad in closed spacing without any doublings.
                    </Text>
                    <Image
                        source={require('@/assets/images/big_triads.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => big.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Triads</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => big.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Triads</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Triad Inversion & Figured Bass
                    </Text>
                    <Text style={styles.text}>
                        Musicians often prioritize the lowest note in a harmony, which is called the bass.An <Text style={styles.bold}>inversion </Text>
                        is a change in the bass note of a harmony. When a triad is stacked in such a way that the bass note is the root of the triad, then
                        the triad is in root position. If the triad is stacked in such a way that the bass note is the third of the triad, then the triad is
                        in 1st inversion. If the triad is stacked in such a way that the bass note is the fifth of the triad, then the triad is in 2nd inversion.
                        It is important to note that the bass note and the root of the triad are NOT the same thing. The root of a triad always remains the same,
                        no matter what inversion it is in. The bass note will change depending on the triad's inversion.
                    </Text>
                    <Image
                        source={require('@/assets/images/inversions.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Musicians can use chord symbols to indicate inversions with a slash, as discussed earlier. However, musicians
                        also use figured bass to indicate inversion. <Text style={styles.bold}>Figured bass</Text> uses numbers to indicate
                        invervals above the bass note (NOT the root). These numbers are then interpreted as chords by musicians.
                    </Text>
                    <Image
                        source={require('@/assets/images/figured_bass.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        A root-position triad has a fifth & a third above the bass. A 1st inversion triad has a sixth & a third above the
                        bass. A 2nd inversion triad has a sixth & a fourth above the bass. The larger numbers always appear above smaller
                        numbers. However, there are abbreviations for figured bass that were meant to save time and resources in writing
                        music. These abbreviations are more commonly used today in notating figured bass.
                    </Text>
                    <Image
                        source={require('@/assets/images/abbreviations.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        No figure appears at all for root position. It is simply assumed that the triad will be in its default position.
                        1st inversion triads are abbreviated with the number "6" while 2nd inversion triads keep their full figures to
                        distinguish them from 1st inversion triads.
                    </Text>
                    <Text style={styles.text}>
                        Triads are identified by their root, quality, & inversion. First, identify the root. Next, identify the quality.
                        Then, identify the inversion. Last, write the appropriate figured bass, if applicable.
                    </Text>
                    <Image
                        source={require('@/assets/images/D_1st.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Putting the chord into root position reveals that the root of the triad is D. The quality of the triad is minor.
                        The third of the triad is in the bass, so the triad is in 1st inversion. Using figured bass, this triad would be
                        identified as Dm6. Using chord symbols, this triad would be identified as Dm/F.
                    </Text>
                    <Image
                        source={require('@/assets/images/A_2nd.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Putting the chord into root position reveals that the root of the triad is A. The quality of the triad is major.
                        The fifth of the triad is in the bass, so the triad is in 2nd inversion. Using figured bass, this triad would be
                        identified as A 6/4. Using chord symbols, this triad would be identified as A/E.
                    </Text>
                </View>

                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./9melody' style={styles.secondaryLink}>
                            ← Previous: Melody
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./11progressions' style={styles.link}>
                            Next: Harmonic Progressions →
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