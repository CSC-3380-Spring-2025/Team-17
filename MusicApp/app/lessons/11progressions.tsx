import React, { useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import { auth } from '@/firebaseConfig';

export default function Progressions() {
    const major = useRef(new Audio.Sound());
    const minor = useRef(new Audio.Sound());
    const dominant = useRef(new Audio.Sound());
    const subdominant = useRef(new Audio.Sound());
    const subdominant2 = useRef(new Audio.Sound());
    const vi_chord = useRef(new Audio.Sound());
    const iii_chord = useRef(new Audio.Sound());
    const half_cadence = useRef(new Audio.Sound());
    const authentic_cadence = useRef(new Audio.Sound());
    const plagal_cadence = useRef(new Audio.Sound());
    const deceptive_cadence = useRef(new Audio.Sound());

    useEffect(() => {
        const loadSounds = async () => {
            await major.current.loadAsync(require('@/assets/sounds/major_triads.mp3'));
            await minor.current.loadAsync(require('@/assets/sounds/minortriads.mp3'));
            await dominant.current.loadAsync(require('@/assets/sounds/dominant.mp3'));
            await subdominant.current.loadAsync(require('@/assets/sounds/subdominant.mp3'));
            await subdominant2.current.loadAsync(require('@/assets/sounds/subdominant2.mp3'));
            await vi_chord.current.loadAsync(require('@/assets/sounds/vi_chord.mp3'));
            await iii_chord.current.loadAsync(require('@/assets/sounds/iii_chord.mp3'));
            await half_cadence.current.loadAsync(require('@/assets/sounds/half_cadence.mp3'));
            await authentic_cadence.current.loadAsync(require('@/assets/sounds/authentic_cadence.mp3'));
            await plagal_cadence.current.loadAsync(require('@/assets/sounds/plagal_cadence.mp3'));
            await deceptive_cadence.current.loadAsync(require('@/assets/sounds/deceptive_cadence.mp3'));
        };

        loadSounds();

        return () => {
            major.current.unloadAsync();
            minor.current.unloadAsync();
            dominant.current.unloadAsync();
            subdominant.current.unloadAsync();
            subdominant2.current.unloadAsync();
            vi_chord.current.unloadAsync();
            iii_chord.current.unloadAsync();
            half_cadence.current.unloadAsync();
            authentic_cadence.current.unloadAsync();
            plagal_cadence.current.unloadAsync();
            deceptive_cadence.current.unloadAsync();
        };
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Harmonic Progressions
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        Chords are the basis of harmony in music. A song or composition moves from one chord to another in a <Text style={styles.bold}>harmonic progression</Text>.
                        In a progression, certain chords have important functions that are instrumental in creating stable and effective harmonic progressions.
                        These will be discussed in more detail later. However, to understand the functions of chords, one must learn to identify them
                        using Roman numerals.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Roman Numerals
                    </Text>
                    <Text style={styles.text}>
                        Roman numerals are used by musicians to identify chords within the context of key signatures. Roman numerals identify the scale
                        degree of the chord's root. Because they are based on scale degrees rather than specific pitches, Roman numerals are useful for
                        understanding how harmonies function similarly in different keys.
                    </Text>
                    <Image
                        source={require('@/assets/images/Rnumerals.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Besides indicating the root of the chord, Roman numerals also indicate the quality of the chord. Uppercase Roman
                        numerals indicate major triads & lowercase Roman numerals indicate minor triads. Lowercase Roman numerals followed
                        by a superscript "o" represent diminished triads. Uppercase Roman numerals followed by a + sign represent augmented
                        triads.
                    </Text>
                    <Image
                        source={require('@/assets/images/Rqualities.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Just as scale degrees & solfege are the same across keys, so are Roman numerals. The examples below show the
                        Roman numerals for G major & G minor, but the same Roman numerals would be used regardless of which pitch is the
                        tonic. Remember that if the leading tone is raised in minor, the chord quality changes, and thus, the Roman numerals
                        change. The minor v chord becomes a major V chord, and the subtonic VII chord becomes a diminished viio chord. This
                        means that a Roman numeral sometimes implies a raised leading tone, so remember that when there is a V or viio in a
                        minor key, the leading tone will be raised.
                    </Text>
                    <Image
                        source={require('@/assets/images/major_numerals.png')}
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
                    <Image
                        source={require('@/assets/images/minor_numerals.png')}
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
                        I: Tonic Chords
                    </Text>
                    <Text style={styles.text}>
                        The <Text style={styles.bold}>tonic chord</Text> is the chord built on the tonic note, which is the first note of a scale, and it is represented by I in
                        major keys and i in minor keys. For example, in the key of C major, the tonic chord would be the C major chord. Likewise, in the key of C minor,
                        the tonic chord would be the C minor chord. The tonic chord represents stability and serves as the center of a key and a point of resolution in most musical works.
                        Music will often begin and end on the tonic chord I. The tonic chord will either appear in root position or 1st inversion as I6.
                        It will rarely appear in 2nd inversion as I 6/4 because of the dissonant 4th.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        V & viio: Dominant Chords
                    </Text>
                    <Text style={styles.text}>
                        The <Text style={styles.bold}>dominant chord</Text> is the chord build on the dominant note, which is the fifth note of a scale, and it is represented by V in
                        major keys. In minor keys, the leading tone is raised, so the dominant chord is represented by V. For example, in the key of C major, the dominant chord would be
                        the G major chord. Likewise, in the key of C minor, the dominant chord would also be the G major chord instead of G minor because of the raised leading tone. The
                        dominant chord represents instability and always seeks to resolve to the tonic for stability. This is why the leading tone is raised in minor. A raised leading tone
                        in a major V chord allows for better resolution to i than the subtonic in a minor v chord. A V chord can appear in root position or 1st inversion as V6, which always
                        resolves to root-position I since the leading tone is in the bass.
                    </Text>
                    <Text style={styles.text}>
                        Additionally, the viio chord can also serve a dominant function and resolve to the tonic. However, it is a much weaker dominant chord than the V chord and is not
                        commonly used. It must always be in 1st inversion because in root position, the diminished 5th creates a dissonance. In minor keys, VII is built on the subtonic major
                        chord. Because it does not have a raised leading tone, it does not have a dominant function. It is often used to change key from minor to the relative major. It can also
                        lead directly to the dominant V6 chord.
                    </Text>
                    <Image
                        source={require('@/assets/images/dominant.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => dominant.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Dominant</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => dominant.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Dominant</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        IV & ii: Subdominant Chords
                    </Text>
                    <Text style={styles.text}>
                        The <Text style={styles.bold}>subdominant chord</Text> is the chord built upon the subdominant note, which is the fourth note of a scale, and it is represented by IV in
                        major keys and iv in minor keys. For example in the key of C major, the subdominant chord would be the F major chord. Likewise in the key of C minor, the subdominant chord
                        would be the F minor chord. The subdominant chord has a tendency to move to the dominant chord and usually leads to the V chord. However, the subdominant chord can also be
                        used to embellish the tonic. Instead of moving to V, the IV chord can lead to I or I6 to prolong the tonic. The IV chord usually appears in root position, but it can also be
                        used in 1st inversion as IV6, which moves to the V chord in root position.
                    </Text>
                    <Image
                        source={require('@/assets/images/subdominant.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => subdominant.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Subdominant</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => subdominant.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Subdominant</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        Additionally, the ii chord can also serve a subdominant function and lead to the dominant. Usually, the ii chord appears in 1st inversion as ii6 so that scale degree 4 will be
                        in the bass, thus giving it a strong subdominant function. However, a root position ii chord can also serve this purpose in major keys. In minor keys, a root position iio chord is
                        diminished, thus creating a dissonance. Therefore, the root position iio chord should never be used in minor. Only a 1st inversion iio6 chord can be used for subdominant function in minor.
                    </Text>
                    <Image
                        source={require('@/assets/images/subdominant2.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => subdominant2.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Subdominant</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => subdominant2.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Subdominant</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        vi & iii: Other Chords
                    </Text>
                    <Text style={styles.text}>
                        The vi chord & the iii chord do not have any real functions. They mainly act as intermediaries between functions and can briefly adopt certain functions in a particular context.
                        The vi chord can lead from the tonic to the subdominant with a pattern of descending 3rds in the bass. It can also lead to other subdominant chords like ii & IV6. Plus, vi can lead
                        to I6 before moving to a subdominant harmony, thus embellishing the tonic. It is less common for vi to lead directly to a dominant chord like V or V6.
                    </Text>
                    <Image
                        source={require('@/assets/images/vi_chord.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => vi_chord.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play VI</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => vi_chord.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause VI</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        The iii chord can be used to move between functions. It shares the same bass & also has two tones in common with I6, so it can briefly adopt a tonic function & replace I6.
                        By carrying a tonic function, the iii chord can lead to subdominant or dominant harmonies. In a III chord in minor keys, the scale degree 7 is not raised and thus does not need to resolve to the tonic,
                        so III is used to harmonic melodies where 7 descends to 6. The iii chord can be used in 1st inversion as iii6 & III6+, both of which have scale degree 5 in the bass & are thus treated
                        as a root-position V chord with an embellishing 6th. They carry a dominant function & can substitute for V.
                    </Text>
                    <Image
                        source={require('@/assets/images/iii_chord.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => iii_chord.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play III</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => iii_chord.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause III</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Cadences
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>cadence</Text> is the end of a musical phrase. It is like the punctuation at the end of a
                        sentence or clause. Cadences consist of one or two chords that complete the musical thought. All chords in a cadence must be
                        in root position.
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>half cadence</Text> occurs when a phrase ends on an unresolved dominant V chord. Since dominant chords
                        are unstable, ending a phrase on an unresolved V chord creates a lack of harmonic closure. The phrase feels incomplete, as
                        if the music ends at a cliffhanger, and there is yet more to come. Half cadences are mostly used in the middle of a musical work
                        to build suspense & anticipation for the music that will come next. A <Text style={styles.bold}>Phrygian cadence</Text> is a
                        special type of half cadence that occurs in minor keys. It consists of a iv6 chord resolving to a V chord.
                    </Text>
                    <Image
                        source={require('@/assets/images/half_cadence.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => half_cadence.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Cadence</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => half_cadence.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Cadence</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        An <Text style={styles.bold}>authentic cadence</Text> occurs when a phrase ends on a dominant V chord followed by a tonic I chord.
                        Because the unstable dominant is able to resolve to the stable tonic, there is a sense of harmonic closure and completeness as the
                        phrase comes to a satisfying end. There are two types of authentic cadences. A <Text style={styles.bold}>perfect authentic cadence </Text>
                        consists of not only the V-I harmonic resolution, but also satisfies a melodic condition where the melody or the highest note in the tonic
                        chord ends on scale degree 1. An <Text style={styles.bold}>imperfect authentic cadence</Text> does not meet the melodic condition, but it
                        still has the V-I harmonic resolution.
                    </Text>
                    <Image
                        source={require('@/assets/images/authentic_cadence.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => authentic_cadence.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Cadence</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => authentic_cadence.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Cadence</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>plagal cadence</Text> occurs when a phrase ends on a subdominant IV chord followed by a tonic I chord.
                        This cadence is used as a post-cadential appendix. It usually comes after an authentic cadence to confirm the end of a phrase. The
                        IV chord balances the V chord since V is a fifth above I, and IV is a fifth below I.
                    </Text>
                    <Image
                        source={require('@/assets/images/plagal_cadence.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => plagal_cadence.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Cadence</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => plagal_cadence.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Cadence</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>deceptive cadence</Text> occurs when a phrase ends on a dominant V chord followed by a vi chord substituting for the tonic.
                        Because the unstable V chord usually resolves to the I chord, the unexpected resolution to the vi chord creates a sense of deception in the music. It
                        also prevents the harmony from resolving properly, which means the music needs continue and eventually end with an authentic cadence to provide proper harmonic closure.
                    </Text>
                    <Image
                        source={require('@/assets/images/deceptive_cadence.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable
                            style={styles.playButton}
                            onPress={() => deceptive_cadence.current.playAsync()}
                        >
                            <Text style={styles.buttonText}>Play Cadence</Text>
                        </Pressable>
                        <Pressable
                            style={styles.playButton}
                            onPress={() => deceptive_cadence.current.pauseAsync()}
                        >
                            <Text style={styles.buttonText}>Pause Cadence</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./10chords' style={styles.secondaryLink}>
                            ← Previous: Chords
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./12texture' style={styles.link}>
                            Next: Musical Textures →
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