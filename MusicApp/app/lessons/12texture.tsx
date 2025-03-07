import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Texture(){
    return(
        <ScrollView>
            <Text>
                Musical Textures
            </Text>
            <Link href='./11progressions'>
                Previous: Harmonic Progressions
            </Link>
            <Link href='./13structure'>
                Next: Song Structures
            </Link>
        </ScrollView>
    );
}