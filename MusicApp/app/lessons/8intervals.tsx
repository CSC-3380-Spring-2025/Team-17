import React from 'react';

import {Text, ScrollView, StyleSheet, Image, View, Button} from 'react-native';

import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Intervals(){
    const intervals = useAudioPlayer(require('@/assets/sounds/intervals.mp3'));
    const sizes = useAudioPlayer(require('@/assets/sounds/sizes.mp3'));
    const augmented = useAudioPlayer(require('@/assets/sounds/augmented.mp3'));
    const diminished = useAudioPlayer(require('@/assets/sounds/diminished.mp3'));
    return(

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
                        <Button 
                            color='#4CAF50' 
                            title="Play intervals" 
                            onPress={() => intervals.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause intevals" 
                            onPress={() => intervals.pause()} 
                        />
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
                        <Button 
                            color='#4CAF50' 
                            title="Play sizes" 
                            onPress={() => sizes.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause sizes" 
                            onPress={() => sizes.pause()} 
                        />
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
                        First, the interval is a generic 6th (1: E, 2: F, 3: G, 4: A, 5: B, 6: C). Second, Cb is <i>not</i> in the major scale 
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
                        <Button 
                            color='#4CAF50' 
                            title="Play augmented" 
                            onPress={() => augmented.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause augmented" 
                            onPress={() => augmented.pause()} 
                        />
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
                        <Button 
                            color='#4CAF50' 
                            title="Play diminished" 
                            onPress={() => diminished.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause diminished" 
                            onPress={() => diminished.pause()} 
                        />
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
        textShadowOffset: {width: 1, height: 1},
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
    buttons: {
        flexDirection: 'row'
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
    }
});

