import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Meter(){
    const sd = useAudioPlayer(require('@/assets/sounds/simple_duple.mp3'));
    const st = useAudioPlayer(require('@/assets/sounds/simple_triple.mp3'));
    const sq = useAudioPlayer(require('@/assets/sounds/simple_quadruple.mp3'));
    const cd = useAudioPlayer(require('@/assets/sounds/compound_duple.mp3'));
    const ct = useAudioPlayer(require('@/assets/sounds/compound_triple.mp3'));
    const cq = useAudioPlayer(require('@/assets/sounds/compound_quadruple.mp3'));
    const b1 = useAudioPlayer(require('@/assets/sounds/beams1.mp3'));
    const b2 = useAudioPlayer(require('@/assets/sounds/beams2.mp3'));

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Meter
            </Text>
            <Text style={styles.text}>
                Rhythm is a major component in music, and it is defined by the beat in a song or composition. A <b>beat</b> is 
                a recurring pulse in music to which one can tap or clap along. A <b>meter</b> is a recurring pattern of beats in a song
                or composition. The rhythmic values of notes and rests discussed in the previous lesson are arranged by musicians 
                to create different meters in their music. 
            </Text>
            <Text style={styles.header}>
                Simple Meter
            </Text>
            <Text style={styles.text}>
                <b>Simple Meter</b> is a meter in which the beat can be divided into two and then further subdivided in half. This can 
                be thought of as dividing the beat into two smaller beats or tapping the beat twice as fast. 
            </Text>
            <Text style={styles.text}>
                Different numbers of beats group into different meters. <b>Duple meters</b> are meters that contain groups of two beats.
                <b>Triple meters</b> are meters that contain groups of three beats. <b>Quadruple meters</b> are meters that contain 
                groups of four beats. 
            </Text>
            <Text style={styles.text}>
                In Western musical notation, beat groupings are indicated by barlines, which divide music into measures. Each measure
                equivalent to one beat grouping.
            </Text>
            <Image source={require('@/assets/images/bars.png')} />
            <Text style={styles.text}> 
                <b>Time signatures</b> look like fractions and are placed at the beginning of music to indicate two things to the 
                musician: The top number indicates the number of beats in every measure. In simple meter, the top number is always 
                2, 3, or 4, representing duple, triple, or quadruple meter. The bottom number indicates which note value gets the beat.
                For example, 1 represents whole notes, 2, represents half notes, 4 represents quarter notes, 8 represents eighth notes, 
                and so on.
            </Text>
            <Text style={styles.text}>
                There are two additional time signatures in simple meter. 𝄴 represents <b>common time</b>, which is equivalent to the simple 
                quadruple time signature 4/4, meaning four quarter notes in every measure. 𝄵 represents <b>cut time</b>, which is equivalent 
                to the simple duple time signature 2/2, meaning two half notes in every measure.  
            </Text>
            <Text style={styles.header}>
                Counting Simple Meter
            </Text>
            <Text style={styles.text}>
                Counting rhythms is incredibly important for any singer or instrumentalist. It will help you to perform music in the 
                right rhythms at a steady tempo. When counting beats in a measure of music, the note that gets the beat is counted with 
                numbers "1, 2, 3, 4". When a note lasts longer than a beat, the count is held over multiple beats. Beats that are not
                counted are written in parentheses. When a beat in simple meter is divided in half, the divisions are counted aloud 
                with the syllable "and", which is notated by the + sign. So if a quarter note gets the beat, the second eighth note on 
                each beat will be counted as "and". Further subdivisions at the sixteenth note level are counted as "e" (pronounced "ee")
                and "a" (pronounced "uh").
            </Text>
            <Text style={styles.text}>
                Try counting the rhythm below. This example is in simple duple meter. The time signature 2/4 means that there are 2 beats
                in every measure, and the quarter note gets the beat. 
            </Text>
            <Image source={require('@/assets/images/simple_duple.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => sd.play()} />
                <Button color='red' title="Pause piano" onPress={() => sd.pause()} />
            </View>
            <Text style={styles.text}>
                Try counting the rhythm below. This example is in simple triple meter. The time signature 3/4 means that there are 3 beats
                in every measure, and the quarter note gets the beat. 
            </Text>
            <Image source={require('@/assets/images/simple_triple.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => st.play()} />
                <Button color='red' title="Pause piano" onPress={() => st.pause()} />
            </View>
            <Text style={styles.text}>
                Try counting the rhythm below. This example is in simple quadruple meter. The time signature 4/4 means that there are 4 beats
                in every measure, and the quarter note gets the beat. 
            </Text>
            <Image source={require('@/assets/images/simple_quadruple.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => sq.play()} />
                <Button color='red' title="Pause piano" onPress={() => sq.pause()} />
            </View>
            <Text style={styles.text}>
                In simple meters with other beat units, like the half note, eighth note, or sixteenth note, the same counting pattern 
                is used to count beats and subdivisions. The only difference is they correspond to different note values. But the rhythms
                sound the same and are counted the same. 
            </Text>
            <Text style={styles.text}>
                When notating rhythms, it is important to beam notes together to show where the beat is. Quarter notes, half notes, and
                whole notes do not need to be beamed, but eighth notes, sixteenth notes, and so on should be beamed together. In groups of 
                beamed notes, the stem direction is determined by the position of notes in the staff. For notes above the middle line, stems 
                point downward on the left side of the note, and for notes below the middle line, stems point upward on the right side of the note. 
                Stems on notes on the middle line can point in either direction, depending on the surrounding notes. In groups of two 
                beamed notes, the stem direction of both notes is determined by the note farthest from the middle line of the staff. 
            </Text>
            <Image source={require('@/assets/images/beams.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => b1.play()} />
                <Button color='red' title="Pause piano" onPress={() => b1.pause()} />
            </View>
            <Text style={styles.header}>
                Compound Meter
            </Text>
            <Text style={styles.text}>
                <b>Compound Meter</b> is a meter where the beat can be divided into three and then further subdivided in half. These 
                meters can be duple, triple, or quadruple, just like simple meters. The beats can be grouped into sets of two, three, 
                or four. The difference is that each beat divides into three divisions instead of two. 
            </Text>
            <Text style={styles.text}>
                Measures in compound meter are equivalent to one group of beats, just like in simple meter. However, the two numbers 
                in the time signature have different meanings in compound meter. The top number represents the number of beat divisions
                in a measure, and the bottom number represents which note value gets the division. The emphasis is on the beat divisions
                rather than the beat itself. 
            </Text>
            <Text style={styles.text}>
                Since the beat is divided into three in compound meter, the top number in the time signature is always a multiple of three.
                Dividing this number by three yields the number of beats in the measure. The numbers 6, 9, & 12 correspond to duple, triple, 
                and quadruple meter respectively. The bottom number is usually 4 (meaning the quarter note gets the division), 8 (meaning the 
                eighth note gets the division), or 16 (meaning the sixteenth note gets the division).
            </Text>
            <Text style={styles.header}>
                Counting Compound Meter
            </Text>
            <Text style={styles.text}>
                Because the beats in compound meter divide into three, the beats are always represented by dotted notes. If 4 is the bottom 
                number, the beat is a dotted half note (three quarter notes). If 8 is the bottom number, the beat is a dotted quarter note (three
                eighth notes). If 16 is the bottom number, the beat is a dotted eighth note (three sixteenth notes).
            </Text>
            <Text style={styles.text}>
                Just like in simple meter, the beat is counted in numbers "1, 2, 3, 4". When a note lasts longer than a beat, the count is still
                held over and the beats not counted aloud are written in parentheses. Divisions are counted as "la" on the second division and 
                "li" on the third division. Further subdivisions at the sixteenth note level are counted as "ta" with the "la" & "li" syllables
                staying consistent on the eighth note divisions.
            </Text>
            <Text style={styles.text}>
                Try counting the rhythm below. This example is in compound duple meter. The time signature 6/8 means that there are 2 beats
                in every measure, and the dotted quarter note gets the beat while the eighth note gets the division. 
            </Text>
            <Image source={require('@/assets/images/compound_duple.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => cd.play()} />
                <Button color='red' title="Pause piano" onPress={() => cd.pause()} />
            </View>
            <Text style={styles.text}>
                Try counting the rhythm below. This example is in compound triple meter. The time signature 9/8 means that there are 3 beats
                in every measure, and the dotted quarter note gets the beat while the eighth note gets the division. 
            </Text>
            <Image source={require('@/assets/images/compound_triple.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => ct.play()} />
                <Button color='red' title="Pause piano" onPress={() => ct.pause()} />
            </View>
            <Text style={styles.text}>
                Try counting the rhythm below. This example is in compound quadruple meter. The time signature 12/8 means that there are 4 beats
                in every measure, and the dotted quarter note gets the beat while the eighth note gets the division. 
            </Text>
            <Image source={require('@/assets/images/compound_quadruple.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => cq.play()} />
                <Button color='red' title="Pause piano" onPress={() => cq.pause()} />
            </View>
            <Text style={styles.text}>
                In compound meters with other beat units, like the dotted half note or dotted eighth note the same counting pattern 
                is used to count beats and subdivisions. The only difference is they correspond to different note values. But the rhythms
                sound the same and are counted the same.
            </Text>
            <Text style={styles.text}>
                When notating compound meter, it is still important to beam notes together to show where the beat is. Just like in simple 
                meter, only eighth notes, sixteenth notes, and so on should be beamed together. In groups of beamed notes, the rules for stem
                direction are the same as in simple meter. 
            </Text>
            <Image source={require('@/assets/images/beams2.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play piano" onPress={() => b2.play()} />
                <Button color='red' title="Pause piano" onPress={() => b2.pause()} />
            </View>
            <View style={styles.links}>
                <Link href='./4rhythm' style={styles.edgelinks}>
                    Previous: Rhythm
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./6scales' style={styles.edgelinks}>
                    Next: Scales
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