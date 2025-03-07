import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Intervals(){
    return(
        <ScrollView>
            <Text>
                Intervals
            </Text>
            <Link href='./7modes'>
                Previous: Modes
            </Link>
            <Link href='./9melody'>
                Next: Melody
            </Link>
        </ScrollView>
    );
}