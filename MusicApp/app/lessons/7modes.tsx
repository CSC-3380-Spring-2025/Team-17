import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Modes(){
    return(
        <ScrollView>
            <Text>
                Modes
            </Text>
            <Link href='./6'>
                Previous: Scales
            </Link>
            <Link href='./8'>
                Next: Intervals
            </Link>
        </ScrollView>
    );
}