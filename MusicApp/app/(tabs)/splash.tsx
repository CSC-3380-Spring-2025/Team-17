import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import Button from '@/components/Button';

export default function Splash() {
    return (
        <>
            
            <View style={styles.container}>
            <Button style={styles.buttonDesign} label="Sign In" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333232',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    
    buttonDesign: {
        backgroundColor: '#ffd33d',
        padding: 10,
        borderRadius: 5,
    },
});