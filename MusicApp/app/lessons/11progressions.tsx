import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Progressions(){
    return(
        <ScrollView>
            <Text>
                Harmonic Progressions
            </Text>
            <Link href='./10chords'>
                Previous: Chords
            </Link>
            <Link href='./12texture'>
                Next: Musical Textures
            </Link>
        </ScrollView>
    );
}