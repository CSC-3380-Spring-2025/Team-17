import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Scales(){
    const cmajor = useAudioPlayer(require('@/assets/sounds/cmajor.mp3'));
    const natminor = useAudioPlayer(require('@/assets/sounds/natural_minor.mp3'));
    const harminor = useAudioPlayer(require('@/assets/sounds/harmonic_minor.mp3'));
    const melminor = useAudioPlayer(require('@/assets/sounds/melodic_minor.mp3'));

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
                This pattern of whole steps and half steps is always the same in every major scale. Music written with major scales is often
                characterized as sounding happy or light. 
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