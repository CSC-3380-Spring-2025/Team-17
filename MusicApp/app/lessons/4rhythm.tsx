import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Rhythm(){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Rhythm
            </Text>
            <Link href='./3pitch'>
                Previous: Pitch
            </Link>
            <Link href='./5meter'>
                Next: Meter
            </Link>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 14
    }
})