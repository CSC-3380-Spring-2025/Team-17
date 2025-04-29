import Button from '@/components/Button';
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';

const AccountPage = () => {
    const fakeEmail = "user@example.com";
    const fakePassword = "********";
    const profilePictureUrl = "/assets/images/dog.jpg";

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
            style={styles.textBox}
            value={fakeEmail}
            editable={false}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
            style={styles.textBox}
            value={fakePassword}
            editable={false}
            secureTextEntry
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    textBox: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: '#fff',
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

export default AccountPage;