import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Scales(){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Scales
            </Text>
            <Link href='./5meter'>
                Previous: Meter
            </Link>
            <Link href='./7modes'>
                Next: Modes
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