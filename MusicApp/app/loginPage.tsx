import React, {useState} from 'react';
import Register from '../components/Register';
import Login from '@/components/Login';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

const App = () => {
  const [streak, setStreak]= useState(0);
  return (
    <div>
      <View style={styles.container}>
       <Pressable style={styles.circularButton} onPress={() => alert("Change Profile Pic")}>
                        <Text style={styles.circularButtonText}>oVo</Text>
                    </Pressable>
      </View>
      <View style={styles.Acontainer}>
      <Login/>
      </View>
      <br></br>
      
      <View style={styles.Acontainer}>
      <Link href="/registration" >
                           <Text style={styles.linkText}>Not registered? Click here</Text>
                      </Link>
                      </View>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      top: 36,
      
      justifyContent: 'center',
      alignItems: 'center',
  },
  Acontainer: {
    flex: 1,
    top: 40,

    justifyContent: 'center',
    alignItems: 'center',
},
  circularButton:{
    width: 90,
    height: 90,
    borderRadius: 35,
    backgroundColor: "#000", // Same as original button
    alignItems: "center",
    justifyContent: "center",
    bottom: 30, // Centered vertically
},
linkText: {
  color: "#0000FF",
  fontSize: 16,
},
circularButtonText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
},
})

export default App;