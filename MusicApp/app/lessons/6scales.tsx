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
                            onPress={() => cmajor.play()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause C Major" 
                            onPress={() => cmajor.pause()} 
                        />
                    </View>
                </View>                
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