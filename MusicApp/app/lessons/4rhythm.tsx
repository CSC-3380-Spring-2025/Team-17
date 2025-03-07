import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Rhythm(){
    return(
        <ScrollView>
            <Text>
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