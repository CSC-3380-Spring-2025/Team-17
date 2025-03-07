import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Melody(){
    return(
        <ScrollView>
            <Text>
                Melody
            </Text>
            <Link href='./8intervals'>
                Previous: Intervals
            </Link>
            <Link href='./10chords'>
                Next: Chords
            </Link>
        </ScrollView>
    );
}