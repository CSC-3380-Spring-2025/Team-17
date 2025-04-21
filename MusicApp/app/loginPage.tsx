import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import Login from '../components/Login';
import Register from '../components/Register';
import { Link, Stack } from 'expo-router';

const account = () => {
  return (
    <>
      
      <View style={styles.container}>
        <Login />
        
<Link href="/registrationPage" style={styles.createButton}>
          <Text style={styles.createButtonText}>Create New Account</Text>
        </Link>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#D2D2D2',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  linkText: {
    color: "#0000FF",
    fontSize: 16,
    alignItems:'center',
    justifyContent:'center'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  imageButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'none',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default account;
