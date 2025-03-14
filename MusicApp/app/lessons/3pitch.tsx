import React from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Link} from 'expo-router';

export default function Pitch(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Pitch
            </Text>
            <Text style={styles.text}>
                In music, a pitch is a distinct tone with an individual frequency. Western music is built around 7 tones named after 
                the first seven letters of the alphabet: A, B, C, D, E, F, G. These pitches are repeated in a loop after G.
            </Text>
            <Text style={styles.header}>
                Clefs
            </Text>
            <Text style={styles.text}>
                To notate pitches on a staff, there must be a way to assign them to the different lines and spaces of the staff. This 
                is the purpose of clefs. A <b>clef</b> is a symbol at the beginning of a staff that indicates the layout of the pitches
                on the lines and spaces. Different clefs make reading different ranges easier. 
            </Text>
            <Text style={styles.text}>
                <b>Treble Clef: </b> The treble clef is one of the most widely used clefs in Western music. It is typically used 
                for higher-range voices and instruments, such as flute, violin, trumpet, or soprano voice. Because this clef is curled
                around the G line (second line from the bottom) and looks like the letter G, it is also called the G clef. The lines in 
                the treble clef are used to notate the pitches E, G, B, D, F. This pattern can be remembered with the mnemonic device 
                "Every Good Boy Does Fine". 
            </Text>
            <Image source={require('@/assets/images/egbdf.png')} />
            <Text style={styles.text}>
                The spaces in the treble clef are used to notate the pitches F, A, C, E. This pattern can be remembered by the fact 
                that they spell the word "face". 
            </Text>
            <Image source={require('@/assets/images/face.png')} />
            <Text style={styles.text}>
                <b>Bass Clef: </b> The bass clef is the other most widely used clefs in Western music. It is typically used for 
                lower-range voices and instruments, such as bassoon, cello, trombone, or bass voice. Because this clef curls around the 
                F line (second line from the top) and has two lines surrounding the F line and looks like the letter F, it is also 
                called the F clef. The lines in the bass clef are used to notate the pitches G, B, D, F, A. This pattern can be 
                remembered by the mnemonic device "Good Bikes Don't Fall Apart".
            </Text>
            <Image source={require('@/assets/images/gbdfa.png')} />
            <Text style={styles.text}>
                The spaces in the bass clef are used to notate the pitches A, C, E, G. This pattern can be remembered by the 
                mnemonic device "All Cows Eat Grass". 
            </Text>
            <Image source={require('@/assets/images/aceg.png')} />
            <Text style={styles.text}>
                <b>Alto Clef: </b> The alto clef is a less widely used clef in Western music. It is typically used for the viola, which is a 
                middle-range instrument. Because this clef is centered around the C line (the middle line), it is also called the 
                C clef. The lines in the alto clef are used to notate the pitches F, A, C, E, G. This pattern can be 
                remembered by the mnemonic device "Fat Alley Cats Eat Garbage".
            </Text>
            <Image source={require('@/assets/images/faceg.png')} />
            <Text style={styles.text}>
                The spaces in the alto clef are used to notate the pitches G, B, D, F. This pattern can be remembered by the 
                mnemonic device "Grand Boats Drift Flamboyantly".
            </Text>   
            <Image source={require('@/assets/images/gbdf.png')} />
            <Text style={styles.text}>
                <b>Tenor Clef: </b> The tenor clef is another less widely used clef in Western music. It is typically used for 
                lower-range instruments, like the cello, bassoon, and trombone, but their main clef is the bass clef. 
                This clef looks just like the alto clef and is also called the C clef, but it is centered around the second line 
                from the top. The lines in the alto clef are used to notate the pitches D, F, A, C, E. This pattern can be 
                remembered by the mnemonic device "Dodges, Fords, and Chevys Everywhere".
            </Text>
            <Image source={require('@/assets/images/dface.png')} />
            <Text style={styles.text}>
                The spaces in the tenor clef are used to notate the pitches E, G, B, D. This pattern can be remembered by the 
                mnemonic device "Elvis' Guitar Broke Down".
            </Text>
            <Image source={require('@/assets/images/egbd.png')} />
            <Text style={styles.header}>
                Piano & the Grand Staff
            </Text>
            <Text style={styles.text}>
                The best way to learn music theory is to learn it kinesthetically. That means to physically create sounds on an 
                instrument, such as the piano, to better visualize and audiate the music you are writing or studying. Playing the 
                piano is the best way to learn music theory kinesthetically. The piano keyboard has both white keys and black keys. 
                Sets of three and two black keys alternate throughout the entire length of the keyboard, repeating the pitch pattern. 
            </Text>
            <Image source={require('@/assets/images/piano.png')} />
            <Text style={styles.text}>
                The image below shows the piano keyboard with the white keys labeled with the different pitches. The same letter 
                names appear on different keys of the keyboard as the pitch pattern repeats. The distance between two keys or pitches 
                of the same name is called an <b>octave</b>.
            </Text>
            <Image source={require('@/assets/images/keyboard.png')} />
            <Text style={styles.text}>
                Music for the piano is written on a grand staff. A <b>grand staff</b> is a combination of the treble and bass clefs. 
                The treble clef is on top of the bass clef, and both clefs are connected by a brace and a line. Typically, the pianist 
                plays the notes in the treble clef with the right hand and the notes in the bass clef with the left hand. In between 
                the treble and bass clefs, there exists a C note known as <b>middle C</b>, not only because it is in the middle of the 
                grand staff, but also because it lies in the middle of the piano keyboard. 
            </Text>
            <Image source={require('@/assets/images/grand_staff.png')} />
            <Text style={styles.header}>
                Half Steps, Whole Steps, & Accidentals
            </Text>
            <Text style={styles.text}>
                A <b>half step</b> is considered to be the smallest interval (distance between two notes) in Western music. 
                For most of the white keys on the piano keyboard, the black keys to the right and left of a white key will be the 
                half-steps above and below that note. However, two pairs of white keys do not have black keys between them. The note 
                pairs E-F & B-C are both half steps. 
            </Text>
            <Image source={require('@/assets/images/half_step.png')} />
            <Text style={styles.text}>
                A <b>whole step</b> is equal to two half steps. Counting two keys to the right or the left of any note on the piano 
                keyboard will get a whole step above or below that note. Pairs of white keys with a black key between them or pairs of
                black keys with a white key between them are a whole step apart. 
            </Text>
            <Image source={require('@/assets/images/whole_step.png')} />
            <Text style={styles.text}>
                An <b>accidental</b> changes the pitch of a note. A <b>sharp</b> raises a note by a half step. A <b>flat</b> lowers a note 
                by a half step. A <b>double sharp</b>raises a note by a whole step. A <b>double flat</b> lowers a note by a whole step. 
                A <b>natural</b> cancels out any previous accidental. Accidentals are always written to the left of a note, regardless of 
                stem direction, and they are written directly across the line or space on which a note appears. 
            </Text>
            <Image source={require('@/assets/images/accidentals.png')} />
            <Text style={styles.text}>
                On the piano keyboard, black keys to the right of a white key take the name of that white key and add the word "sharp", and 
                black keys to the left of a white key take the name of that white key and add the word "flat". For example, the black key to 
                the right of C is called "C-sharp" and is written as C#, and the black key to the left of D is called "D-flat" and is written
                as Db. White keys can also be accidentals of other white keys. For example, F is also known as E#, and E is also known 
                as Fb. C is also known as B#, and B is also known as Cb. 
            </Text>
            <Image source={require('@/assets/images/keys.png')} />
            <Text style={styles.text}>
                Each key on the keyboard has more than one name. <b>Enharmonic equivalence</b> is when two notes have different names, 
                but they have the same sound. C# & Db are enharmonically equivalent, so playing either of those notes will result in the 
                same pitch. D is enharmonically equivalent with Cx & Ebb, so playing D, Cx, or Ebb will result in the same pitch. 
            </Text>
            <View style={styles.links}>
                <Link href='./2notation' style={styles.edgelinks}>
                    Previous: Music Notation
                </Link>
                <Link href='../(tabs)/home' style={styles.homelink}>
                    MusicApp
                </Link>
                <Link href='./4rhythm' style={styles.edgelinks}>
                    Next: Rhythm
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