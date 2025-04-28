import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {Link} from 'expo-router';

export default function Structure(){
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
                        <Text style={styles.bold}>Auxiliary sections</Text> are located at the beginning or end of a piece, or between the core sections. They can be divided 
                        into two categories: external & connective. External auxiliary sections either introduce a musical work or follow its general conclusion. 
                    </Text>
                    <Text style={styles.text}>
                        A <Text style={styles.bold}>prefix</Text> is a bit of music that comes before the generic start of a piece and expresses a formal sense of "before the beginning".
                        A prefix can be large or small depending on whether or not it contains a complete phrase. Large prefixes contain at least one phrase while 
                        small phrases do not have complete phrases & are less noticeable as they are often merely accompaniment for a section starting before the melody begins. 
                    </Text>
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