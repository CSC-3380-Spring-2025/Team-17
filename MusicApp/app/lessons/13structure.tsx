import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function Structure(){
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                Song Structures
            </Text>
            <Link href='./12texture'>
                Previous: Musical Textures
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