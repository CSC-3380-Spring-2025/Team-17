import React from 'react';
import {ScrollView, Text} from 'react-native';
import {Link} from 'expo-router';

export default function Notation(){
    return(
        <ScrollView>
            <Text>
                Notation
            </Text>
            <Link href='./1intro'>
                Previous: Introduction
            </Link>
            <Link href='./3pitch'>
                Next: Pitch
            </Link>
        </ScrollView>
    );
}