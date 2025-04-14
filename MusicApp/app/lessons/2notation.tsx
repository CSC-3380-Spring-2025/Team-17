import React, { useState } from 'react';
import {ScrollView, View, Text, StyleSheet, Image, Button, Pressable} from 'react-native';
import {Link} from 'expo-router';
import { useAudioPlayer } from 'expo-audio';

export default function Notation(){
    const slurPlayer = useAudioPlayer(require('@/assets/sounds/a-slur.mp3'));
    const staccatoPlayer = useAudioPlayer(require('@/assets/sounds/c-staccato.mp3'));
    const accentPlayer = useAudioPlayer(require('@/assets/sounds/d-accent.mp3'));

    const [quiz1Answer, setQ1Answer] = useState(null);
    const [quiz2Answer, setQ2Answer] = useState(null);
    const [quiz3Answer, setQ3Answer] = useState(null);
    const answer1 = "Pitch and Rhythm";
    const answer2 = "False";
    const answer3 = "Mezzo Forte";

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Music Notation
            </Text>
            <Text style={styles.text}>
                Music is an auditory art form that can be represented visually with notation.
            </Text>
            <Text style={styles.text}> 
                A musical note indicates both pitch and rhythm. The pitch of the note is determined
                based on its location on a staff. A <b>staff</b> is a series of five horizontal lines like
                the one seen below.
            </Text>
            <Image source={require('@/assets/images/staff.png')}/>
            <Text style={styles.text}>
                Notes with a higher pitch are written higher on the staff than notes with a lower pitch. 
                Essentially, higher notes are placed above lower ones. 
            </Text>
            <Text style={styles.header}>
                Music Notes
            </Text>
            <Text style={styles.text}>
                A note is shaped like an oval and can be filled in or left empty depending on its rhythmic value. 
                The size of a note should be such that if it is located on a line, it should occupy half of each space
                above and below the line. If it is located on a space, it should occupy the whole area of the space between 
                the lines, but not go beyond the lines. Notes also have stems that can point up or down depending on its location 
                on the staff. If a note is above the middle line of a staff, its stem points down. If a note is below the middle 
                line of a staff, its stem points up. If a note is located on the middle line, its stem can point up or down 
                depending on the context of the surrounding notes. 
            </Text>
            <Image source={require('@/assets/images/notes.png')} />
            <Text style={styles.header}>
                Ledger Lines
            </Text>
            <Text style={styles.text}>
                If notes are too high or too low to be written on a staff, one can use <b>ledger lines</b> to extend the staff
                and write higher & lower notes. 
            </Text>
            <Image source={require('@/assets/images/ledger.png')} />
            <Text style={styles.header}>
                Dynamics
            </Text>
            <Text style={styles.text}>
                One important aspect of music notation is dynamics. <b>Dynamics</b> indicate the loudness or volume of 
                certain notes. Since Western music theory originated in Italy, musicians use italicized Italian words to denote
                dynamics. They are usually written above or below the staff. 
            </Text>
            <Text style={styles.text}>
                The two main Italian words used in dynamics are <b>piano</b> meaning soft, and <b>forte</b> meaning loud. These two 
                words can be further modified to create more dynamics. The word "mezzo" means moderately, so <b>mezzo piano</b> means 
                moderately soft, and <b>mezzo forte</b> means moderately loud. Additionally, the Italian suffix "issimo" indicates 
                extremes. Therefore, <b>pianissimo</b> means very soft, and <b>fortissimo</b> means very loud. 
            </Text>
            <Text style={styles.text}>
                There are also ways to notate gradual changes in dynamic levels. The word <b>crescendo</b> (<i>cresc.</i>) means 
                to get louder, and the words <b>decrescendo</b> (<i>decresc.</i>) and <b>diminuendo</b> (<i>dim.</i>) both mean to 
                get softer. One can either write out <i>cresc.</i> and <i>decresc.</i>, or they can use hairpin symbols to notate
                dynamic changes, like the ones seen in the chart below. 
            </Text>
            <Image source={require('@/assets/images/dynamics.png')} />
            <Text style={styles.header}>
                Tempo
            </Text>
            <Text style={styles.text}>
                Another important aspect of notation is tempo. <b>Tempo</b> is the speed of the composition and determines 
                how fast or how slow the notes are played. Tempo is usually marked specifically, with metronome markings or 
                unspecifically, with textual indications. Metronome markings are notated in beats per minute (bpm). A metronome marking 
                of 60 bpm means the musician must play 60 notes in one minute, or 1 note per second. There are free metronome 
                applications available on the Internet or to download on your phone that you can use to check the tempo of your music. 
            </Text>
            <Text style={styles.text}>
                Like dynamics, most tempo markings are written in Italian. They often appear at the beginning of a work, movement, or 
                section.  
            </Text>
            <Image source={require('@/assets/images/tempo.png')} />
            <Text style={styles.header}>
                Articulation
            </Text>
            <Text style={styles.text}>
                One more important aspect of notation is articulation. <b>Articulation</b> is the connection or separation between 
                notes and the accent level at the beginning of the note (the attack). Different instruments have different methods of
                carrying out various articulations, but there are a few common articulations seen in a lot of music. 
            </Text>
            <Text style={styles.text}>
                <b>Legato:</b> play or sing notes smoothly and connected. This articulation is indicated by a curved slur over the 
                notes. 
            </Text>
            <Image source={require('@/assets/images/slur.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play slur" onPress={() => slurPlayer.play()} />
                <Button color='red' title="Pause slur" onPress={() => slurPlayer.pause()} />
            </View>
            <Text style={styles.text}>
                <b>Staccato:</b> play or sing notes separately, leaving space in between. This articulation is indicated by 
                placing dots above or below each of the notes.  
            </Text>
            <Image source={require('@/assets/images/stacatto.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play staccato" onPress={() => staccatoPlayer.play()} />
                <Button color='red' title="Pause staccato" onPress={() => staccatoPlayer.pause()} />
            </View>
            <Text style={styles.text}>
                <b>Accent:</b> play or sing a note with extra emphasis. This articulation is indicated by a sideways V over the 
                notes. 
            </Text>
            <Image source={require('@/assets/images/accent.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play accent" onPress={() => accentPlayer.play()} />
                <Button color='red' title="Pause accent" onPress={() => accentPlayer.pause()} />
            </View>

            <div>
                <Text style = {styles.quizTitle}>Quiz</Text>
                <br></br>
            <view style = {styles.quizContainer}>
                    <Text style={styles.quizText}>
                        A musical note represents what?
                    </Text>
                    {["Tone and Rhythm", "Pitch and Rhythm", "Tempo and Harmony", "Timbre and Melody"].map((option, index) =>{
                        const selected = quiz1Answer === option;
                        const correct = option === answer1;
                        const buttonStyle = selected
                        ? correct
                            ? styles.correctAnswer
                            :styles.incorrectAnswer
                        :styles.quizButton;

                        return(
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => setQ1Answer(option)}
                            >
                                <Text style={styles.quizButtonText}>{option}</Text>
                            </Pressable>
                        );
                    })}
                    {quiz1Answer && (
                        <Text style={styles.result}>
                            {quiz1Answer === answer1 ? "Correct!" : "Try Again"}
                        </Text>
                    )}
                </view>
                <br></br>
                <view style = {styles.quizContainer}>
                    <Text style={styles.quizText}>
                        If a note is in a space, it can go beyond the lines.
                    </Text>
                    {["True", "False"].map((option, index) =>{
                        const selected = quiz2Answer === option;
                        const correct = option === answer2;
                        const buttonStyle = selected
                        ? correct
                            ? styles.correctAnswer
                            :styles.incorrectAnswer
                        :styles.quizButton;

                        return(
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => setQ2Answer(option)}
                            >
                                <Text style={styles.quizButtonText}>{option}</Text>
                            </Pressable>
                        );
                    })}
                    {quiz2Answer && (
                        <Text style={styles.result}>
                            {quiz2Answer === answer2 ? "Correct!" : "Try Again"}
                        </Text>
                    )}
                </view>
                <br></br>
                <view style = {styles.quizContainer}>
                    <Text style={styles.quizText}>
                        What term means <b>moderately loud</b>?
                    </Text>
                    {["Pianissimo", "Crescendo", "Mezzo Forte", "Fortissimo"].map((option, index) =>{
                        const selected = quiz3Answer === option;
                        const correct = option === answer3;
                        const buttonStyle = selected
                        ? correct
                            ? styles.correctAnswer
                            :styles.incorrectAnswer
                        :styles.quizButton;

                        return(
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => setQ3Answer(option)}
                            >
                                <Text style={styles.quizButtonText}>{option}</Text>
                            </Pressable>
                        );
                    })}
                    {quiz3Answer && (
                        <Text style={styles.result}>
                            {quiz3Answer === answer3 ? "Correct!" : "Try Again"}
                        </Text>
                    )}
                </view>
            </div>

            <View style={styles.links}>
                <Link href='./1intro' style={styles.edgelinks}>
                    Previous: Introduction
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./3pitch' style={styles.edgelinks}>
                    Next: Pitch
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
    },
    quizContainer: {
        height: 100,
        width: 200,
        
        alignItems: 'center',
        padding:7,
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
        alignSelf:'center',
    },
    quizButton: {
        height: 45,
        width:150,
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 5,
    },
    quizButtonText: {
        color: 'white',
        fontSize: 15,
        alignSelf:'center',
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
      }
})