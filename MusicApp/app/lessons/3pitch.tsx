import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Pitch(){
    const flute1 = useAudioPlayer(require('@/assets/sounds/flute1.mp3'));
    const flute2 = useAudioPlayer(require('@/assets/sounds/flute2.mp3'));
    const trombone1 = useAudioPlayer(require('@/assets/sounds/trombone1.mp3'));
    const trombone2 = useAudioPlayer(require('@/assets/sounds/trombone2.mp3'));
    const viola1 = useAudioPlayer(require('@/assets/sounds/viola1.mp3'));
    const viola2 = useAudioPlayer(require('@/assets/sounds/viola2.mp3'));
    const cello1 = useAudioPlayer(require('@/assets/sounds/cello1.mp3'));
    const cello2 = useAudioPlayer(require('@/assets/sounds/cello2.mp3'));
    const piano1 = useAudioPlayer(require('@/assets/sounds/piano1.mp3'));
    const piano2 = useAudioPlayer(require('@/assets/sounds/piano2.mp3'));

    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Pitch
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        In music, a pitch is a distinct tone with an individual frequency. Western music is built around 7 tones named after 
                        the first seven letters of the alphabet: A, B, C, D, E, F, G. These pitches are repeated in a loop after G.
                    </Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.header}>
                        Clefs
                    </Text>
                    <Text style={styles.text}>
                        To notate pitches on a staff, there must be a way to assign them to the different lines and spaces of the staff. This 
                        is the purpose of clefs. A <Text style={styles.bold}>clef</Text> is a symbol at the beginning of a staff that indicates the layout of the pitches
                        on the lines and spaces. Different clefs make reading different ranges easier. 
                    </Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Treble Clef: </Text> The treble clef is one of the most widely used clefs in Western music. It is typically used 
                        for higher-range voices and instruments, such as flute, violin, trumpet, or soprano voice. Because this clef is curled
                        around the G line (second line from the bottom) and looks like the letter G, it is also called the G clef. The lines in 
                        the treble clef are used to notate the pitches E, G, B, D, F. This pattern can be remembered with the mnemonic device 
                        "Every Good Boy Does Fine". 
                    </Text>
                    <Image 
                        source={require('@/assets/images/egbdf.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play flute" 
                            onPress={() => flute1.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause flute" 
                            onPress={() => flute1.pause()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        The spaces in the treble clef are used to notate the pitches F, A, C, E. This pattern can be remembered by the fact 
                        that they spell the word "face". 
                    </Text>
                    <Image 
                        source={require('@/assets/images/face.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play flute" 
                            onPress={() => flute2.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause flute" 
                            onPress={() => flute2.pause()} 
                        />
                    </View>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Bass Clef: </Text> The bass clef is the other most widely used clefs in Western music. It is typically used for 
                        lower-range voices and instruments, such as bassoon, cello, trombone, or bass voice. Because this clef curls around the 
                        F line (second line from the top) and has two lines surrounding the F line and looks like the letter F, it is also 
                        called the F clef. The lines in the bass clef are used to notate the pitches G, B, D, F, A. This pattern can be 
                        remembered by the mnemonic device "Good Bikes Don't Fall Apart".
                    </Text>
                    <Image 
                        source={require('@/assets/images/gbdfa.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play trombone" 
                            onPress={() => trombone1.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause trombone" 
                            onPress={() => trombone1.pause()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        The spaces in the bass clef are used to notate the pitches A, C, E, G. This pattern can be remembered by the 
                        mnemonic device "All Cows Eat Grass". 
                    </Text>
                    <Image 
                        source={require('@/assets/images/aceg.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play trombone" 
                            onPress={() => trombone2.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause trombone" 
                            onPress={() => trombone2.pause()} 
                        />
                    </View>
                </View>                
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./2notation' style={styles.secondaryLink}>
                            ← Previous: Music Notation
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./4rhythm' style={styles.link}>
                            Next: Rhythm →
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
    subHeader: {
        color: '#5543A5',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 8,
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