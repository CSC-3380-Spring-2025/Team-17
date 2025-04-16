import React from 'react';

import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';

import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Melody(){
    const conjunct = useAudioPlayer(require('@/assets/sounds/conjunct.mp3'));
    const disjunct = useAudioPlayer(require('@/assets/sounds/disjunct.mp3'));
    const condis = useAudioPlayer(require('@/assets/sounds/condis.mp3'));
    const phrases = useAudioPlayer(require('@/assets/sounds/phrases.mp3'));

    return(

        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Melody
                </Text>
                
                <Text style={styles.text}>
                With the knowledge of pitch, rhythm, meter, scales, & intervals, it is now possible to create original melodies. A 
                <b>melody</b> is a sequence of singular notes organized in a rhythmic manner, forming the main tune of a song or
                composition. Ideally, a good melody should be catchy, singable, and easy to remember.
            </Text>
            <Text style={styles.header}>
                Melodic Characteristics
            </Text>
            <Text style={styles.text}>
                A melody is primarily defined by pitches, rhythms, and intervals. Melodies are created from a series of notes, each 
                with a specific pitch & duration. These notes are arranged in a pattern of rhythm, which adds to its overall musical
                character. A melody follows a <b>contour</b>, which is a direction determined by how the melody rises & falls in pitch. 
                Usually, a melody will reach a <b>focal point</b>, which is the highest or lowest note in a melody that serves as a 
                climactic moment and leads to a change in the direction of the contour.
            </Text>
            <Text style={styles.text}>
                A melody can be conjunct or disjunct depending on the prominence of certain melodic intervals. <b>Conjunct melodies</b>
                move primarily through stepwise motion. This means that conjunct melodies have mostly intervals of 2nds, keeping the notes
                close together and creating a sense of smoothness throughout the melody. 
            </Text>
            <Image source={require('@/assets/images/conjunct.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play conjunct" onPress={() => conjunct.play()} />
                <Button color='red' title="Pause conjunct" onPress={() => conjunct.pause()} />
            </View>
            <Text style={styles.text}>
                <b>Disjunct melodies</b> move primarily through leaps, which are intervals larger than a 2nd. This keeps the notes apart 
                and creates a sense of separation throughout the melody.
            </Text>
            <Image source={require('@/assets/images/disjunct.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play disjunct" onPress={() => disjunct.play()} />
                <Button color='red' title="Pause disjunct" onPress={() => disjunct.pause()} />
            </View>
            <Text style={styles.text}>
                Usually, a melody will consist mostly of stepwise motion and occasional leaps of a 3rd or more, which often serve as 
                the most memorable parts of a melody. 
            </Text>
            <Image source={require('@/assets/images/condis.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play melody" onPress={() => condis.play()} />
                <Button color='red' title="Pause melody" onPress={() => condis.pause()} />
            </View>
            <Text style={styles.header}>
                Melodic Structure
            </Text>
            <Text style={styles.text}>
                A melody is structured in phrases. A <b>melodic phrase</b> encompasses a complete musical statement, similar to a 
                sentence or a clause in spoken language. A melodic phrase usually defines itself by resting, holding, or coming to 
                some point of rhythmic or tonal resolution. Short phrases can be grouped together to form a longer phrase. In most 
                melodies, phrases will start the same way, but the melodic ideas they contain will be developed differently.
            </Text>
            <Image source={require('@/assets/images/phrases.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play melody" onPress={() => phrases.play()} />
                <Button color='red' title="Pause melody" onPress={() => phrases.pause()} />
            </View>
            <Text style={styles.text}>
                In general, great melodies are memorable because they utilize short, clear phrases as well as repetition of melodic ideas.
                Popular tunes like "Twinkle, Twinkle, Little Star" & "Happy Birthday" are ingrained into our minds because their combination
                of simplicity & repetition makes them easy to recall and sing along with.
            </Text> 
                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./8intervals' style={styles.secondaryLink}>
                            ← Previous: Intervals
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./10chords' style={styles.link}>
                            Next: Chords →
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
    title: {
        color: 'black',
        fontSize: 80,
        fontFamily: 'TIMES_NEW_ROMAN',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: 20
    },
    text: {

       color: '#333',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
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

