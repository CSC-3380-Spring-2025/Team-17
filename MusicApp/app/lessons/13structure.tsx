import React, {useEffect, useRef} from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Structure(){
    const field = useRef(new Audio.Sound());
    const melody = useRef(new Audio.Sound());
    const prelude = useRef(new Audio.Sound());
    const polonaise = useRef(new Audio.Sound());
    const turkish_march = useRef(new Audio.Sound());
    const fur_elise = useRef(new Audio.Sound());
    const variations = useRef(new Audio.Sound());
    const wonderful_world = useRef(new Audio.Sound());
    const piano_man = useRef(new Audio.Sound());
    const hundredyears = useRef(new Audio.Sound());
    const raging_fire = useRef(new Audio.Sound());

    useEffect(() => {
        const loadSounds = async () => {
            await field.current.loadAsync(require('@/assets/sounds/field.mp3'));
            await melody.current.loadAsync(require('@/assets/sounds/melody.mp3'));
            await prelude.current.loadAsync(require('@/assets/sounds/prelude.mp3'));
            await polonaise.current.loadAsync(require('@/assets/sounds/polonaise.mp3'));
            await turkish_march.current.loadAsync(require('@/assets/sounds/turkish_march.mp3'));
            await fur_elise.current.loadAsync(require('@/assets/sounds/fur_elise.mp3'));
            await variations.current.loadAsync(require('@/assets/sounds/variations.mp3'));
            await wonderful_world.current.loadAsync(require('@/assets/sounds/wonderful_world.mp3'));
            await piano_man.current.loadAsync(require('@/assets/sounds/piano_man.mp3'));
            await hundredyears.current.loadAsync(require('@/assets/sounds/100years.mp3'));
            await raging_fire.current.loadAsync(require('@/assets/sounds/raging_fire.mp3'));
        };

        loadSounds();

        return() => {
            field.current.unloadAsync();
            melody.current.unloadAsync();
            prelude.current.unloadAsync();
            polonaise.current.unloadAsync();
            turkish_march.current.unloadAsync();
            fur_elise.current.unloadAsync();
            variations.current.unloadAsync();
            wonderful_world.current.unloadAsync();
            piano_man.current.unloadAsync();
            hundredyears.current.unloadAsync();
            raging_fire.current.unloadAsync();
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
                        is the contrasting section that introduces new melodic material. The sections are sometimes called reprises because they are usually repeated. There can be auxiliary sections such as prefixes 
                        & suffixes or a transition between the two sections.
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
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Ternary form</Text> contains three core sections in a pattern of ABA. The music starts with an opening section (A), moves to 
                        a contrasting section (B), and returns to the material from the opening section (A). The B section serves as a contrasting section that deviates from the 
                        thematic material in the A section that preceded it. There can be variation in key, texture, meter, rhythm, register, melodic ideas, & more. However, the 
                        length of the B section is expected to be generally proportional to the length of the A section. It can also be stable or unstable. Each section in 
                        ternary form may immediately repeat. However, A & B do not repeat together, and neither do B & A. Each core section is distinct and independent from the others. 
                        There can be auxiliary sections such as prefixes & suffixes or a transition between any two core sections. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/ternary.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Sometimes there can be a form within a form. Each section of a form contains multiple phrases, and sometimes those phrases can combine into a complete form within a section. 
                        A ternary form is considered to be compound if at least one of its sections contains a complete musical form (usually binary). If there are no sections that contain a complete 
                        musical form, then the ternary form is described as simple. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/compound_ternary.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Sergei Rachmaninoff's "Prelude in C# Minor" is written in simple ternary form. The piece begins with a dramatic small prefix consisting of three chords. The first section introduces a 
                        thematic melodic idea. The second section deviates from that idea and becomes more rhythmically active & unstable as it approaches the climactic return to the thematic material. The third 
                        section is a louder & more dramatic restatement of the main theme in the first section. The piece ends with a small suffix consisting of multiple chords.
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Prelude in C# Minor - Sergei Rachmaninoff
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Ternary"
                                onPress={() => prelude.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Ternary"
                                onPress={() => prelude.current.pauseAsync()}
                            />
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Frederic Chopin's "Military Polonaise" is written in compound ternary form. The first section introduces a thematic melodic idea, but then the music moves to another idea briefly before 
                        restating the main theme. The first section is in rounded binary form. From there, the music proceeds into the second section and changes to the key of D major. The rhythmic and melodic ideas 
                        of the previous are moved to the left hand while the right hand introduces completely new melodic ideas. Then the music moves into the third section, which is an exact restatement of the first section. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Polonaise in A Minor (Military Polonaise) - Frederic Chopin
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Ternary"
                                onPress={() => polonaise.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Ternary"
                                onPress={() => polonaise.current.pauseAsync()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Rondo Form
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Rondo form</Text> features a main A section (also called a refrain) that returns throughout a musical work & is interspersed with contrasting sections 
                        labeled as B, C, etc. (also called episodes). The refrain material is essentially the same throughout the course of the work, allowing for some embellishment or variation. 
                        Episodes contrast with the refrain by changing keys and by introducing new thematic material. A given episode can occur multiple times in the work or only once. Refrains are 
                        constructed as a combination of one or more phrases and could even contain an entire form. They will sound relatively stable and will have a clear ending punctuated with a 
                        perfect authentic cadence. Episodes can be constructed like that as well, but with contrasting keys and new musical material, or they can include destabilizing features like 
                        harmonic instability, increased rhythmic activity, or phrase expansion. Episodes may end with a clear cadence, or the ending may be more ambiguous, such as having no cadence at 
                        all and simply merging into the retransition section. Like other forms, rondo form can have auxiliary sections. The most common are retransitions that build anticipation for the 
                        return of the refrain. Codas are also quite common, but introductions are not.  
                    </Text>
                    <Text style={styles.text}>
                        Wolfgang Amadeus Mozart's "Turkish March" is written in rondo form. The pattern is rather complicated: ABACDEDCABAC-Coda. The piece starts with a repeated main theme in A major that 
                        goes into the B section in C major before returning to the main theme in A major. Then the music moves to a C section featuring loud dynamics and fast rhythmic activity. Afterward comes 
                        a softer D section in F# minor that ends on a half cadence. There is a brief E section afterward that is in A major and sounds relatively unstable and leads back into the D section in 
                        F# minor which is more developed. Then comes the loud & energetic C section that leads back to the refrain. The A section brings the music back to a stable position, followed by the B 
                        section in C major and returning to the main theme again. Finally, the C section returns in a more developed form and leads into the coda to end the piece on a high note. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Rondo Alla Turca (Turkish March) - Wolfgang Amadeus Mozart
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Rondo"
                                onPress={() => turkish_march.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Rondo"
                                onPress={() => turkish_march.current.pauseAsync()}
                            />
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Ludwig van Beethoven's "Fur Elise" is written in rondo form with the pattern ABACA. The piece begins with a very famous refrain that is written in A minor. The main theme is repeated 
                        twice and moves into a brief development section before being restated once again. The refrain is thus written in rounded binary form. From there, the piece moves into the B section, which is 
                        written in F major & sounds relatively unstable. The piece then transitions back to the refrain, which is restated exactly the same with no variation. From there, the piece moves into the 
                        C section, which sounds very dark and incredibly unstable due to the use of chromatic harmony (notes outside the main key). The piece then moves through a fast passage that serves as a 
                        retransition back to the refrain, which is restated one more time before ending on a perfect authentic cadence. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Fur Elise - Ludwig van Beethoven
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Rondo"
                                onPress={() => fur_elise.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Rondo"
                                onPress={() => fur_elise.current.pauseAsync()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Theme & Variations
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Theme & variations form</Text> is a common form where a main musical theme is presented and then repeated several times while undergoing various changes. 
                        These variations explore different aspects of the original theme while retaining some resemblance to it. The theme is typically a short, recognizable melody that can be a 
                        short phrase or a longer section. The variations are created by altering the melody, harmony, rhythm, instrumentation, or other musical elements of the theme. Theme & variations form allows 
                        a musician to explore different facets of a single musical idea and create variety & interest.
                    </Text>
                    <Text style={styles.text}>
                        Probably the most famous example of theme & variations form is Wolfgang Amadeus Mozart's "Twinkle, Twinkle, Little Star". The main theme is the melody that we now recognize as the tune 
                        "Twinkle, Twinkle, Little Star". After the main theme is established, the music goes through twelve different variations on the theme that change certain elements, such as adding melodic 
                        embellishments, putting the melody in the left hand, increasing rhythmic activity, building heavy chords, and adding new melodic ideas. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            12 Variations on 'Ah vous dirai-je, Maman' (Twinkle, Twinkle, Little Star) - Wolfgang Amadeus Mozart
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Variations"
                                onPress={() => variations.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Variations"
                                onPress={() => variations.current.pauseAsync()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Strophic Form
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Strophic form</Text> consists of a main core section called a strophe that is repeated multiple times. It was a common form for folk songs, hymns, and early pop music. 
                        The strophe establishes a set melody & harmony that is repeated throughout the song with different lyrics each time. This creates a pattern AAA, where the strophe is the only core section in the 
                        entire song. The strophe can also feature a refrain, which is a recurring lyrical & musical theme that often contains the title lyric of the song and is usually located at the end of the strophe.
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>32-bar song form</Text> is a particular type of strophic form featuring 32 measures divided into four sections of 8 measures each. The sections are organized in the pattern AABA. 
                        The song begins and ends with the strophe, which contains the primary theme & title lyrics and is the most memorable part of the song, but there is also a contrasting B section (called a bridge) 
                        that plays a transitional role where it heightens anticipation for the return of the strophe by constrasting with the strophe & temporarily withholding it. The bridge section must be followed by 
                        the strophe for its function to be fully satisfied. 
                    </Text>
                    <Text style={styles.text}>
                        Like other forms, strophic form & 32-bar song form can include auxiliary sections. The most common are intros, outros, codas, & interludes. Intros and outros are auxiliary sections at the very beginning 
                        and end of a song. An <Text style={styles.bold}>intro</Text> is a short, usually instrumental section of music that leads from silence into the strophe by introducing musical material from the strophe and 
                        building anticipation for the music to come. This is often achieved by layering (introducing instruments on at a time) or by a more generic building of energy. An <Text style={styles.bold}>outro</Text> is a short,
                        usually instrumental section of music that leads from the strophe into silence by decreasing energy. Recording studios often use a fadeout to achieve this. The outro is created using musical material from the 
                        last core section that preceded it. Otherwise, the outro uses material from the intro. This allows the intro and outro to create a "bookend" effect by resembling the front & back covers of a book. 
                        A <Text style={styles.bold}>coda</Text> differs from an outro in that a coda presents new musical material. It is essentially an outro not based on music that was previously heard. An <Text style={styles.bold}>interlude </Text> 
                        is a short, instrumental section that serves to link and provide contrast between two core sections. 
                    </Text>
                    <Text style={styles.text}>
                        Louis Armstrong's "What a Wonderful World" is written in 32-bar song form (AABA). This song starts with a short intro and is divided into four sections. Each section is separated by a short instrumental interlude. 
                        The first two sections are strophes that feature the same melody & harmony but with different verses. Each strophe ends with the refrain, "And I think to myself, what a wonderful world!" After the first two strophes, 
                        there comes a contrasting bridge section that features a new melody on the flute and does not have the refrain. The bridge section leads back into the strophe, which repeats the main theme and refrain one last time 
                        before leading into a coda with Armstrong singing, "As I think to myself, what a wonderful world . . . Oh, yes!"
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            What a Wonderful World - Louis Armstrong
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Strophe"
                                onPress={() => wonderful_world.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Strophe"
                                onPress={() => wonderful_world.current.pauseAsync()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Verse & Chorus
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Verse & chorus form</Text> is the most common form for modern music. The form is named after the two most important sections: the verse & the chorus. 
                        A <Text style={styles.bold}>verse</Text> is a core section that advances the narrative of the song with lyrics that change as the song progresses. Verses tend to begin on the tonic 
                        chord, and until the 1960s verses usually harmonically closed (ended on the tonic chord). Beginning in the 1960s, verses became more harmonically open (ended on chords other than tonic chord).
                        A <Text style={styles.bold}>chorus</Text> is a core section that contains the primary lyrical material for the song. The lyrics do not change as the chorus is repeated throughout the song. 
                        The function of the chorus is characterized by a greater musical intensity compared to the verses, including features such as a more dense or active instrumental texture, prominent background 
                        vocals, or a melody in the higher register. The chorus usually begins and ends on the tonic chord. A <Text style={styles.bold}>prechorus</Text> is a short section of music similar to a retransition 
                        that gains energy in anticipation of the chorus. A <Text style={styles.bold}>postchorus</Text> is a short section of music similar to a transition follows a chorus and decreases energy before leading 
                        to the next verse. A <Text style={styles.bold}>bridge</Text> is a flexible section in verse & chorus form that may be included in a song to provide contrast to the verses & chorus. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/chorus.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>
                        Billy Joel's classic hit song "Piano Man" is written in verse & chorus form. The pattern of this song is 'Intro-Postchorus-Verse-Prechorus-Chorus-Postchorus-Verse-Prechorus-Verse-Bridge-Chorus-Postchorus-Verse-Prechorus-Chorus-Postchorus'.
                        The song starts with an introductory piano riff before moving to the postchorus featuring the harmonica & piano. Then Billy Joel starts singing the first verse "It's nine o'clock on a Saturday . . ." At its conclusion, he sings syllables 
                        "la-la la de-de dah" in the prechorus leading up to the chorus, where he sings the title lyric "Sing us a song, you're the piano man!" At the end of the chorus, the postchorus is performed before moving on to the next verse about John the 
                        bartender. After this verse, the prechorus featuring the sung syllables is heard, but instead of leading to the chorus, the music moves on to another verse "Now Paul is a real estate novelist . . ." After this verse, Billy Joel plays 
                        through a bridge section featuring solo piano, which then leads straight to the chorus. Afterwards, the postchorus is played and leads to the final verse "It's a pretty good crowd for a Saturday . . ." Then comes the prechorus of sung 
                        syllables leading to the climactic final chorus, which is then followed by postchorus which ends the song.
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Piano Man - Billy Joel
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Song"
                                onPress={() => piano_man.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Song"
                                onPress={() => piano_man.current.pauseAsync()}
                            />
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Five for Fighting's song "100 Years" is written in verse & chorus form. The pattern of this song is 'Intro-Verse-Prechorus-Chorus-Interlude-Verse-Verse-Prechorus-Chorus-Bridge-Verse-Prechorus-Interlude-Chorus-Outro'.
                        The song starts with an intro featuring the main melody played on the piano. Then the first verse is sung "I'm 15 for a moment . . ." Then the prechorus is sung "15 there's still time for you . . ."
                        The music leads to the chorus, which states the title lyric "There's never a wish better than this, when you've got a hundred years to live!" Then there is a brief piano interlude before the next verse 
                        begins "I'm 33 for a moment . . ." Then the next verse is sung immediately after "I'm 45 for a moment . . ." This is followed by the prechorus, with the lyrics slightly changed, leading up to the chorus 
                        again. After the chorus comes the bridge section "As time goes by . . ." This is followed by the final verse "I'm 99 for a moment . . ." Afterwards comes an extended prechorus with added lyrics & and an instrumental 
                        interlude followed by the chorus one last time. The song ends with an outro restating the song's main melody. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            100 Years - Five for Fighting
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Song"
                                onPress={() => hundredyears.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Song"
                                onPress={() => hundredyears.current.pauseAsync()}
                            />
                        </View>
                    </View>
                    <Text style={styles.text}>
                        Phillip Phillips' song "Raging Fire" is written in verse & chorus form. The pattern of this song is 'Postchorus-Verse-Prechorus-Chorus-Postchorus-Verse-Prechorus-Chorus-Postchorus-Prechrous-Chorus'.
                        The song begins on the postchorus in the guitar that leads into the first verse "We are dead to rights, born & raised . . ." This is followed by the prechorus "Before the flame goes out tonight, we 
                        can live before we die." This leads straight into the highly energetic chorus "So come out come out come out, won't you turn my soul into a raging fire?" The chorus gives way to the postchorus in the 
                        guitar, which leads to the second verse "You know time will give and time will take . . ." This verse is also followed by the prechorus, which leads to the chorus again. Then comes the postchorus on the 
                        guitar, which then leads to the prechorus again. The prechorus is slightly extended with extra lyrics and a short instrumental interlude before it leads to the climactic final chorus, which is where the song ends. 
                    </Text>
                    <View style={styles.card}>
                        <Text style={{fontSize: 24, color: '#5543A5', textAlign: 'center'}}>
                            Raging Fire - Phillip Phillips
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#4CAF50'
                                title="Play Song"
                                onPress={() => raging_fire.current.playAsync()}
                            />
                            <Button
                                color='#F44336'
                                title="Pause Song"
                                onPress={() => raging_fire.current.pauseAsync()}
                            />
                        </View>
                    </View>
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