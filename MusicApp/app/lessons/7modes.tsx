import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Link} from 'expo-router';

export default function Modes(){
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
            <Text style={styles.text}>
                The next bright mode is the <b>ionian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                the exact same as in the major scale: W, W, H, W, W, W, H. You can find this mode if you play all the white keys on a 
                piano keyboard starting from C. 
            </Text>
            <Image source={require('@/assets/images/c_ionian.png')} />
            <Image source={require('@/assets/images/ionian.png')} />
            <Text style={styles.text}>
                The next bright mode is the <b>mixolydian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                W, W, H, W, W, H, W. You can think of this mode as a major scale with a lowered 7 (<i>te</i>). You can also find this mode
                if you play all the white keys on a piano keyboard starting from G.
            </Text>
            <Image source={require('@/assets/images/g_mixolydian.png')} />
            <Image source={require('@/assets/images/mixolydian.png')} />
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
            <Text style={styles.text}>
                The next dark mode is the <b>aeolian mode</b>. In this mode, the ascending pattern of whole steps and half steps is the 
                exact same as in the minor scale: W, H, W, W, H, W, W. You can also find this mode if you play all the white keys on a 
                piano keyboard starting from A.
            </Text>
            <Image source={require('@/assets/images/a_aeolian.png')} />
            <Image source={require('@/assets/images/aeolian.png')} />
            <Text style={styles.text}>
                The next dark mode is the <b>phrygian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                H, W, W, W, H, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>). You can also find this mode 
                if you play all the white keys on a piano keyboard starting from E.
            </Text>
            <Image source={require('@/assets/images/e_phrygian.png')} />
            <Image source={require('@/assets/images/phrygian.png')} />
            <Text style={styles.text}>
                The darkest mode is the <b>locrian mode</b>. In this mode, the ascending pattern of whole steps and half steps is 
                H, W, W, H, W, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>) & a lowered 5 (<i>se</i>). 
                You can also find this mode if you play all the white keys on a piano keyboard starting from B.
            </Text>
            <Image source={require('@/assets/images/b_locrian.png')} />
            <Image source={require('@/assets/images/locrian.png')} />
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