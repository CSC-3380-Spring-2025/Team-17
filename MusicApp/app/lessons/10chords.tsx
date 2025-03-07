import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Chords(){
    return(
        <ScrollView>
            <Text>
                Chords
            </Text>
            <Link href='./9melody'>
                Previous: Melody
            </Link>
            <Link href='./11progressions'>
                Next: Harmonic Progressions
            </Link>
        </ScrollView>
    );
}