import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Meter(){
    return(
        <ScrollView>
            <Text>
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