import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Pitch(){
    return(
        <ScrollView>
            <Text>
                Pitch
            </Text>
            <Link href='./2notation'>
                Previous: Music Notation
            </Link>
            <Link href='./4rhythm'>
                Next: Rhythm
            </Link>
        </ScrollView>
    );
}