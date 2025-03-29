import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Modes(){
    const lydian = useAudioPlayer(require('@/assets/sounds/lydian.mp3'));
    const ionian = useAudioPlayer(require('@/assets/sounds/ionian.mp3'));
    const mixolydian = useAudioPlayer(require('@/assets/sounds/mixolydian.mp3'));
    const dorian = useAudioPlayer(require('@/assets/sounds/dorian.mp3'));
    const aeolian = useAudioPlayer(require('@/assets/sounds/aeolian.mp3'));
    const phrygian = useAudioPlayer(require('@/assets/sounds/phrygian.mp3'));
    const locrian = useAudioPlayer(require('@/assets/sounds/locrian.mp3'));

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Modes
            </Text>
            <Text style={styles.text}>
                <b>Modes</b> are an extension of scales. They are ordered collections of whole steps and half steps that can be described
                within a continuum of <b>modal brightness</b>: brighter modes sound more like a major scale while darker modes sound more 
                like a minor scale. 
            </Text>
            <Image source={require('@/assets/images/mode_range.png')} />
            <Text style={styles.text}>
                The brightest mode is the <b>lydian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                W, W, W, H, W, W, H. You can think of this mode as a major scale with a raised 4 (<i>fi</i>). You can also find this mode if you 
                play all the white keys on a piano keyboard starting from F. 
            </Text>
            <Image source={require('@/assets/images/f_lydian.png')} />
            <Image source={require('@/assets/images/lydian.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Lydian" onPress={() => lydian.play()} />
                <Button color='red' title="Pause Lydian" onPress={() => lydian.pause()} />
            </View>
            <Text style={styles.text}>
                The next bright mode is the <b>ionian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                the exact same as in the major scale: W, W, H, W, W, W, H. You can find this mode if you play all the white keys on a 
                piano keyboard starting from C. 
            </Text>
            <Image source={require('@/assets/images/c_ionian.png')} />
            <Image source={require('@/assets/images/ionian.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Ionian" onPress={() => ionian.play()} />
                <Button color='red' title="Pause Ionian" onPress={() => ionian.pause()} />
            </View>
            <Text style={styles.text}>
                The next bright mode is the <b>mixolydian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                W, W, H, W, W, H, W. You can think of this mode as a major scale with a lowered 7 (<i>te</i>). You can also find this mode
                if you play all the white keys on a piano keyboard starting from G.
            </Text>
            <Image source={require('@/assets/images/g_mixolydian.png')} />
            <Image source={require('@/assets/images/mixolydian.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Mixolydian" onPress={() => mixolydian.play()} />
                <Button color='red' title="Pause Mixolydian" onPress={() => mixolydian.pause()} />
            </View>
            <Text style={styles.text}>
                The lydian, ionian, and mixolydian modes are considered the brighter modes because they contain an unaltered 3 instead of 
                a lowered 3 (<i>mi</i> instead of <i>me</i>). The dorian, aeolian, phrygian, and locrian modes are considered darker because 
                they contain a lowered 3 instead of an unaltered 3 (<i>me</i> instead of <i>mi</i>).
            </Text>
            <Text style={styles.text}>
                The first dark mode is the <b>dorian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                W, H, W, W, W, H, W. You can think of this mode as a minor scale with a raised 6 (<i>la</i>). You can also find this mode if 
                you play all the white keys on a piano keyboard starting from D.
            </Text>
            <Image source={require('@/assets/images/d_dorian.png')} />
            <Image source={require('@/assets/images/dorian.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Dorian" onPress={() => dorian.play()} />
                <Button color='red' title="Pause Dorian" onPress={() => dorian.pause()} />
            </View>
            <Text style={styles.text}>
                The next dark mode is the <b>aeolian mode</b>. In this mode, the ascending pattern of whole steps and half steps is the 
                exact same as in the minor scale: W, H, W, W, H, W, W. You can also find this mode if you play all the white keys on a 
                piano keyboard starting from A.
            </Text>
            <Image source={require('@/assets/images/a_aeolian.png')} />
            <Image source={require('@/assets/images/aeolian.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Aeolian" onPress={() => aeolian.play()} />
                <Button color='red' title="Pause Aeolian" onPress={() => aeolian.pause()} />
            </View>
            <Text style={styles.text}>
                The next dark mode is the <b>phrygian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                H, W, W, W, H, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>). You can also find this mode 
                if you play all the white keys on a piano keyboard starting from E.
            </Text>
            <Image source={require('@/assets/images/e_phrygian.png')} />
            <Image source={require('@/assets/images/phrygian.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Phrygian" onPress={() => phrygian.play()} />
                <Button color='red' title="Pause Phrygian" onPress={() => phrygian.pause()} />
            </View>
            <Text style={styles.text}>
                The darkest mode is the <b>locrian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                H, W, W, H, W, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>) & a lowered 5 (<i>se</i>). 
                You can also find this mode if you play all the white keys on a piano keyboard starting from B.
            </Text>
            <Image source={require('@/assets/images/b_locrian.png')} />
            <Image source={require('@/assets/images/locrian.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play Locrian" onPress={() => locrian.play()} />
                <Button color='red' title="Pause Locrian" onPress={() => locrian.pause()} />
            </View>
            <View style={styles.links}>
                <Link href='./6scales' style={styles.edgelinks}>
                    Previous: Scales
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./8intervals' style={styles.edgelinks}>
                    Next: Intervals
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