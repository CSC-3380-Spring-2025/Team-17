import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Scales(){
    return(
        <ScrollView>
            <Text>
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