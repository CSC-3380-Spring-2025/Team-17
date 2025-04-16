import React, {useState} from 'react';
import Register from '../components/Register';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

const App = () => {
  return (
    <div>
      <View style={styles.Acontainer}>
      <Register />
      </View>
      <View style={styles.Acontainer}>
      <br></br>
      <Link href="/loginPage" >
                                 <Text style={styles.linkText}>Return to Login page.</Text>
                            </Link></View>
    </div>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: "#0000FF",
    fontSize: 16,
    alignItems:'center',
    justifyContent:'center'
  },
  Acontainer: {
    flex: 1,
    top: 40,

    justifyContent: 'center',
    alignItems: 'center',
}
})

export default App;