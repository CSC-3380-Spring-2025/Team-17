import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Scales(){
    const cmajor = useAudioPlayer(require('@/assets/sounds/cmajor.mp3'));
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Major & Minor Scales
            </Text>
            <Text style={styles.text}>
                A <b>scale</b> is an ordered collection of notes centered around a tonic note. A scale starts on a tonic note and 
                proceeds upwards in a pattern of whole steps and half steps until it reaches the tonic note again. Scales are always 
                named after their tonic note.
            </Text>
            <Text style={styles.header}>
                Major Scales
            </Text>
            <Text style={styles.text}>
                A <b>major scale</b> is an ordered collection of whole steps (W) & half steps (H) in the following pattern: W, W, H, W, W, W, H.
                This pattern of whole steps and half steps is always the same in every major scale. 
            </Text>
            <Image source={require('@/assets/images/major_scale.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play C Major" onPress={() => cmajor.play()} />
                <Button color='red' title="Pause C Major" onPress={() => cmajor.pause()} />
            </View>
            <Text style={styles.header}>
                Scale Degrees
            </Text>
            <Text style={styles.text}>
                Musicians can name the notes of major scales in a few different ways. The first method is <b>scale degrees</b>, which are 
                numbers starting at 1 for the first note of the scale, and the numbers ascend until the last note of the scale, which 
                is also 1 (or 8). Another method of naming notes is <b>solfege</b>, which is a system of syllables that is mostly used 
                by singers. The syllables <i>do, re, mi, fa, so, la</i> & <i>ti</i> correspond to the scale degrees 1, 2, 3, 4, 5, 6, & 7.
                The last note is <i>do</i> again because it is a repetition of the first note. Solfege is often practiced in two distinct
                form. <b>Movable <i>do</i></b> is the more common form of solfege, where the pitch of <i>do</i> changes depending on what
                the first note of the scale is. <b>Fixed <i>do</i></b> is the less common form of solfege, where <i>do</i> always 
                corresponds with the pitch of C, and the other syllables likewise correspond to specific pitches. The final method 
                of naming notes is with <b>scale degree names</b>. Every scale degree has a specific name: tonic, supertonic, mediant, 
                subdominant, dominant, submediant, leading tone, and then tonic again.
            </Text>
            <Image source={require('@/assets/images/scale_degrees.png')} />
            <Text style={styles.text}>
                The word <b>dominant</b> is inherited from medieval music theory and refers to the importance of the fifth above the 
                tonic in Western music. The word <b>mediant</b> means 'middle', and refers to the fact that the mediant is in the middle
                of the tonic and dominant pitches. The Latin prefix <i>super</i> means 'above', so that means the supertonic is one step 
                above the tonic. The Latin prefix <i>sub</i> means 'below', so the subdominant, submediant, and subtonic are the inverted
                versions of the dominant, mediant, and supertonic as they are located below the tonic. The subtonic refers to the note 
                below the tonic, but in major scales, it is called the leading tone because it is one half step away from the tonic. 
                This gives the leading tone a tendency to resolve to the tonic note; thus, it leads to the tonic.
            </Text>
            <Image source={require('@/assets/images/degree_names.png')} />
            <Text style={styles.header}>
                Key Signatures
            </Text>
            <Text style={styles.text}>
                A <b>key signature</b> is a group of sharps or flats that appears at the beginning of a composition (after a clef but 
                before a time signature) and indicates to the musician what scale the music is in. Key signatures collect the accidentals
                in a scale and place them at the beginning of the music to make it easier to track which notes have accidentals applied 
                to them. No matter what octave the notes are in, the accidentals will always be applied to them. 
            </Text>
            <Image source={require('@/assets/images/key_signature.png')} />
            <Text style={styles.text}>
                Sharp key signatures & flat key signatures always have a specific order in which sharps or flats are added, regardless
                of the clef. The order of sharps is F, C, G, D, A, E, B. This can be remembered by the mnemonic "Fat Cats Go Down Alleys
                to Eat Birds". The sharps form a zig-zag pattern, alternating in going up & down. In the treble, bass, and alto clefs, 
                the pattern breaks after D# & then resumes. In the tenor clef, there is no break in the pattern, but F# & G# appear in 
                the lower octave instead of the upper octave.
            </Text>
            <Image source={require('@/assets/images/sharps.png')} />
            <Text style={styles.text}>
                The order of flats is the opposite of the order of sharps: B, E, A, D, G, C, F. This makes the order of flats & sharps
                palindromes. The order of flats can be remembered with the mnemonic "Birds Eat And Dive Going Crazy Far". The flats 
                always make a perfect zig-zag pattern without breaks in all clefs.
            </Text>
            <Image source={require('@/assets/images/flats.png')} />
            <Text style={styles.text}>
                There are a few easy tricks to remember which key signature belongs to which major scale. In sharp key signatures, 
                the last sharp is a half step below the tonic. It represents the leading tone, and based on that information, one can
                easily deduce the tonic note of the scale by simply moving a half step up from the last sharp.  
            </Text>
            <Image source={require('@/assets/images/sharp_examples.png')} />
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
            <Image source={require('@/assets/images/flat_examples.png')} />
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
            <Image source={require('@/assets/images/c_f.png')} />
            <Text style={styles.header}>
                Minor Scales
            </Text>
            <View style={styles.links}>
                <Link href='./5meter' style={styles.edgelinks}>
                    Previous: Meter
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./7modes' style={styles.edgelinks}>
                    Next: Modes
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontSize: 80,
        fontFamily: 'TIMES_NEW_ROMAN',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: 20
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'ARIAL',
        padding: 10
    },
    header: {
        color: 'black',
        fontSize: 36,
        fontFamily: 'ARIAL',
        fontWeight: 'bold',
        padding: 40,
        paddingTop: 60,
        textAlign: 'left',
    },
    buttons: {
        flexDirection: 'row'
    },
    examples: {
        alignItems: 'flex-start'
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
})