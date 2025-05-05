import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import Login from '../components/Login';
import Register from '../components/Register';
import { Link, Stack } from 'expo-router';
import { ChallengesProvider } from './context/ChallengesContext';

const account = () => {
  return (
    <ChallengesProvider>
    <>
      
      <View style={styles.container}>
        
        <Login />
        

      </View>
      
    </>
    </ChallengesProvider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#333232',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
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
    height: 30,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
  },
  createLink: {
    marginTop: 20,
    alignSelf: 'center',
  }, 
  createLinkText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default account;
