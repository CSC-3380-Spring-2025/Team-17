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
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        With the knowledge of pitch, rhythm, meter, scales, & intervals, it is now possible to create original melodies. A 
                        <Text style={styles.bold}> melody</Text> is a sequence of singular notes organized in a rhythmic manner, forming the main tune of a song or
                        composition. Ideally, a good melody should be catchy, singable, and easy to remember.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Melodic Characteristics
                    </Text>
                    <Text style={styles.text}>
                        A melody is primarily defined by pitches, rhythms, and intervals. Melodies are created from a series of notes, each 
                        with a specific pitch & duration. These notes are arranged in a pattern of rhythm, which adds to its overall musical
                        character. A melody follows a <Text style={styles.bold}>contour</Text>, which is a direction determined by how the melody rises & falls in pitch. 
                        Usually, a melody will reach a <Text style={styles.bold}>focal point</Text>, which is the highest or lowest note in a melody that serves as a 
                        climactic moment and leads to a change in the direction of the contour.
                    </Text>
                    <Text style={styles.text}>
                        A melody can be conjunct or disjunct depending on the prominence of certain melodic intervals. <Text style={styles.bold}>Conjunct melodies </Text>
                        move primarily through stepwise motion. This means that conjunct melodies have mostly intervals of 2nds, keeping the notes
                        close together and creating a sense of smoothness throughout the melody. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/conjunct.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color="#4CAF50" 
                            title="Play conjunct" 
                            onPress={() => conjunct.play()} 
                        />
                        <Button 
                            color="#F44336" 
                            title="Pause conjunct" 
                            onPress={() => conjunct.pause()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Disjunct melodies</Text> move primarily through leaps, which are intervals larger than a 2nd. This keeps the notes apart 
                        and creates a sense of separation throughout the melody.
                    </Text>
                    <Image 
                        source={require('@/assets/images/disjunct.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color="#4CAF50" 
                            title="Play disjunct" 
                            onPress={() => disjunct.play()} 
                        />
                        <Button 
                            color="#F44336" 
                            title="Pause disjunct" 
                            onPress={() => disjunct.pause()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        Usually, a melody will consist mostly of stepwise motion and occasional leaps of a 3rd or more, which often serve as 
                        the most memorable parts of a melody. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/condis.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color="#4CAF50" 
                            title="Play melody" 
                            onPress={() => condis.play()} 
                        />
                        <Button 
                            color="#F44336" 
                            title="Pause melody" 
                            onPress={() => condis.pause()} 
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Melodic Structure
                    </Text>
                    <Text style={styles.text}>
                        A melody is structured in phrases. A <Text style={styles.bold}>melodic phrase</Text> encompasses a complete musical statement, similar to a 
                        sentence or a clause in spoken language. A melodic phrase usually defines itself by resting, holding, or coming to 
                        some point of rhythmic or tonal resolution. Short phrases can be grouped together to form a longer phrase. In most 
                        melodies, phrases will start the same way, but the melodic ideas they contain will be developed differently.
                    </Text>
                    <Image 
                        source={require('@/assets/images/phrases.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color="#4CAF50" 
                            title="Play melody" 
                            onPress={() => phrases.play()} 
                        />
                        <Button 
                            color="#F44336" 
                            title="Pause melody" 
                            onPress={() => phrases.pause()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        In general, great melodies are memorable because they utilize short, clear phrases as well as repetition of melodic ideas.
                        Popular tunes like "Twinkle, Twinkle, Little Star" & "Happy Birthday" are ingrained into our minds because their combination
                        of simplicity & repetition makes them easy to recall and sing along with.
                    </Text> 
                </View>
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
    text: {
        color: '#333',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
    },
    bold: {
        fontWeight: 'bold',
        color: '#5543A5',
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
    image: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 8,
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