import React, {useState, useEffect, useRef} from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { Audio } from 'expo-av';

export default function Scales(){
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
                
                        return() => {
                            cmajor.current.unloadAsync();
                            natminor.current.unloadAsync();
                            harminor.current.unloadAsync();
                            melminor.current.unloadAsync();
                        };
                    }, []);

    const correct1 = () => {
        let correct : any = document.getElementById('true1');
        let incorrect : any = document.getElementById('false1');
        let p : any = document.getElementById('correct1');

        correct.style.color = 'red';
        correct.disabled = true;
        incorrect.style.color = 'green';
        incorrect.disabled = true;
        p.hidden = false;
    }

    const wrong1 = () => {
        let correct : any = document.getElementById('true1');
        let incorrect : any = document.getElementById('false1');
        let p : any = document.getElementById('wrong1');

        correct.style.color = 'red';
        correct.disabled = true;
        incorrect.style.color = 'green';
        incorrect.disabled = true;
        p.hidden = false;
    }

    const correct2 = () => {
        let correct : any = document.getElementById('true2');
        let incorrect : any = document.getElementById('false2');
        let p : any = document.getElementById('correct2');

        correct.style.color = 'green';
        correct.disabled = true;
        incorrect.style.color = 'red';
        incorrect.disabled = true;
        p.hidden = false;
    }

    const wrong2 = () => {
        let correct : any = document.getElementById('true2');
        let incorrect : any = document.getElementById('false2');
        let p : any = document.getElementById('wrong2');

        correct.style.color = 'green';
        correct.disabled = true;
        incorrect.style.color = 'red';
        incorrect.disabled = true;
        p.hidden = false;
    }

    const correct3 = () => {
        let f : any = document.getElementById('f3');
        let e : any = document.getElementById('e3');
        let b : any = document.getElementById('b3');
        let g : any = document.getElementById('g3');
        let p : any = document.getElementById('correct3');

        f.style.color = 'red';
        f.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        b.style.color = 'green';
        b.disabled = true;
        g.style.color = 'red';
        g.disabled = true;
        p.hidden = false;
    }

    const wrong3 = () => {
        let f : any = document.getElementById('f3');
        let e : any = document.getElementById('e3');
        let b : any = document.getElementById('b3');
        let g : any = document.getElementById('g3');
        let p : any = document.getElementById('wrong3');

        f.style.color = 'red';
        f.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        b.style.color = 'green';
        b.disabled = true;
        g.style.color = 'red';
        g.disabled = true;
        p.hidden = false;
    }

    const correct4 = () => {
        let g : any = document.getElementById('g4');
        let b : any = document.getElementById('b4');
        let e : any = document.getElementById('e4');
        let f : any = document.getElementById('f4');
        let p : any = document.getElementById('correct4');

        g.style.color = 'red';
        g.disabled = true;
        b.style.color = 'red';
        b.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        f.style.color = 'green';
        f.disabled = true;
        p.hidden = false;
    }

    const wrong4 = () => {
        let g : any = document.getElementById('g4');
        let b : any = document.getElementById('b4');
        let e : any = document.getElementById('e4');
        let f : any = document.getElementById('f4');
        let p : any = document.getElementById('wrong4');

        g.style.color = 'red';
        g.disabled = true;
        b.style.color = 'red';
        b.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        f.style.color = 'green';
        f.disabled = true;
        p.hidden = false;
    }

    const correct5 = () => {
        let a : any = document.getElementById('a5');
        let e : any = document.getElementById('e5');
        let b : any = document.getElementById('b5');
        let d : any = document.getElementById('d5');
        let p : any = document.getElementById('correct5');

        a.style.color = 'red';
        a.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        b.style.color = 'green';
        b.disabled = true;
        d.style.color = 'red';
        d.disabled = true;
        p.hidden = false;
    }

    const wrong5 = () => {
        let a : any = document.getElementById('a5');
        let e : any = document.getElementById('e5');
        let b : any = document.getElementById('b5');
        let d : any = document.getElementById('d5');
        let p : any = document.getElementById('wrong5');

        a.style.color = 'red';
        a.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        b.style.color = 'green';
        b.disabled = true;
        d.style.color = 'red';
        d.disabled = true;
        p.hidden = false;
    }
    
    const correct6 = () => {
        let a : any = document.getElementById('a6');
        let g : any = document.getElementById('g6');
        let e : any = document.getElementById('e6');
        let d : any = document.getElementById('d6');
        let p : any = document.getElementById('correct6');

        a.style.color = 'red';
        a.disabled = true;
        g.style.color = 'green';
        g.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        d.style.color = 'red';
        d.disabled = true;
        p.hidden = false;
    }

    const wrong6 = () => {
        let a : any = document.getElementById('a6');
        let g : any = document.getElementById('g6');
        let e : any = document.getElementById('e6');
        let d : any = document.getElementById('d6');
        let p : any = document.getElementById('wrong6');

        a.style.color = 'red';
        a.disabled = true;
        g.style.color = 'green';
        g.disabled = true;
        e.style.color = 'red';
        e.disabled = true;
        d.style.color = 'red';
        d.disabled = true;
        p.hidden = false;
    }

    return(
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
                        by singers. The syllables <i>do, re, mi, fa, so, la</i> & <i>ti</i> correspond to the scale degrees 1, 2, 3, 4, 5, 6, & 7.
                        The last note is <i>do</i> again because it is a repetition of the first note. Solfege is often practiced in two distinct
                        form. <Text style={styles.bold}>Movable <i>do</i></Text> is the more common form of solfege, where the pitch of <i>do</i> changes depending on what
                        the first note of the scale is. <Text style={styles.bold}>Fixed <i>do</i></Text> is the less common form of solfege, where <i>do</i> always 
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
                        of the tonic and dominant pitches. The Latin prefix <i>super</i> means 'above', so that means the supertonic is one step 
                        above the tonic. The Latin prefix <i>sub</i> means 'below', so the subdominant, submediant, and subtonic are the inverted
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
                        scale degrees of 3, 6, & 7. In natural minor, the syllable for lowered 3 is <i>me</i> (pronounced "may"), the syllable 
                        for lowered 6 is <i>le</i> (pronounced "lay"), and the syllable for lowered 7 is <i>te</i> (pronounced "tay"). In 
                        harmonic minor, scale degree 7 is raised, so its solfege syllable becomes <i>ti</i>, just like in a major scale. In 
                        melodic minor, both scale degrees 6 & 7 are raised, so their solfege syllables become <i>la</i> & <i>ti</i>, respectively.
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
            <Text style={styles.header}>
                Pop Quiz
            </Text>
            <Text style={styles.text}>
                1. True or False: The natural minor scale features a raised 7. 
            </Text>
            <form>
                <button id='true1' style={{fontSize: '24px'}} onClick={wrong1}>True</button>
                <button id='false1' style={{fontSize: '24px'}} onClick={correct1}>False</button>
                <p id='correct1' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong1' color='red' style={{textAlign: 'center'}} hidden>Wrong! The raised 7 appears in harmonic minor.</p>
            </form>
            <Text style={styles.text}>
                2. True or False: The melodic minor scale features a raised 6 & 7.
            </Text>
            <form>
                <button id='true2' style={{fontSize: '24px'}} onClick={correct2}>True</button>
                <button id='false2' style={{fontSize: '24px'}} onClick={wrong2}>False</button>
                <p id='correct2' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong2' color='red' style={{textAlign: 'center'}} hidden>Wrong! Melodic minor does feature a raised 6 & 7.</p>
            </form>
            <Text style={styles.text}>
                3. What major scale has the following key signature?
            </Text>
            <Image source={require('@/assets/images/bmajor.png')} />
            <form>
                <button id='f3' style={{fontSize: '24px'}} onClick={wrong3}>F major</button>
                <button id='e3' style={{fontSize: '24px'}} onClick={wrong3}>E major</button>
                <button id='b3' style={{fontSize: '24px'}} onClick={correct3}>B major</button>
                <button id='g3' style={{fontSize: '24px'}} onClick={wrong3}>G major</button>
                <p id='correct3' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong3' color='red' style={{textAlign: 'center'}} hidden>Wrong! This is the key signature of B major.</p>
            </form>
            <Text style={styles.text}>
                4. What minor scale has the following key signature?
            </Text>
            <Image source={require('@/assets/images/fminor.png')} />
            <form>
                <button id='g4' style={{fontSize: '24px'}} onClick={wrong4}>G minor</button>
                <button id='b4' style={{fontSize: '24px'}} onClick={wrong4}>Bb minor</button>
                <button id='e4' style={{fontSize: '24px'}} onClick={wrong4}>Eb minor</button>
                <button id='f4' style={{fontSize: '24px'}} onClick={correct4}>F minor</button>
                <p id='correct4' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong4' color='red' style={{textAlign: 'center'}} hidden>Wrong! This is the key signature of F minor.</p>
            </form>
            <Text style={styles.text}>
                5. What is the relative minor of D major?
            </Text>
            <form>
                <button id='a5' style={{fontSize: '24px'}} onClick={wrong5}>A minor</button>
                <button id='e5' style={{fontSize: '24px'}} onClick={wrong5}>E minor</button>
                <button id='b5' style={{fontSize: '24px'}} onClick={correct5}>B minor</button>
                <button id='d5' style={{fontSize: '24px'}} onClick={wrong5}>D minor</button>
                <p id='correct5' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong5' color='red' style={{textAlign: 'center'}} hidden>Wrong! B minor is the relative minor of D major.</p>
            </form>
            <Text style={styles.text}>
                6. What is the relative major of Eb minor?
            </Text>
            <form>
                <button id='a6' style={{fontSize: '24px'}} onClick={wrong6}>Ab major</button>
                <button id='g6' style={{fontSize: '24px'}} onClick={correct6}>Gb major</button>
                <button id='e6' style={{fontSize: '24px'}} onClick={wrong6}>Eb major</button>
                <button id='d6' style={{fontSize: '24px'}} onClick={wrong6}>Db major</button>
                <p id='correct6' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong6' color='red' style={{textAlign: 'center'}} hidden>Wrong! Gb major is the relative minor of Eb minor.</p>
            </form>
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
});