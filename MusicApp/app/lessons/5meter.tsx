import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Meter(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                Meter
            </Text>
            <Link href='./4rhythm'>
                Previous: Rhythm
            </Link>
            <Link href='./6scales'>
                Next: Scales
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