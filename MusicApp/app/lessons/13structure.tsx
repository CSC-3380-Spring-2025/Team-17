import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Link} from 'expo-router';

export default function Structure(){
    return(
        <ScrollView>
            <Text>
                Song Structures
            </Text>
            <Link href='./12texture'>
                Previous: Musical Textures
            </Link>
        </ScrollView>
    );
}