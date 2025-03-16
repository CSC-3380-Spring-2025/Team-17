import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Modes(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                Modes
            </Text>
            <Link href='./6scales'>
                Previous: Scales
            </Link>
            <Link href='./8intervals'>
                Next: Intervals
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