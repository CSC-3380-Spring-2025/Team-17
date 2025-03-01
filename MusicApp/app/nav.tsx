import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '.';

const Stack = createNativeStackNavigator();

export default function Navigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={Index} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};