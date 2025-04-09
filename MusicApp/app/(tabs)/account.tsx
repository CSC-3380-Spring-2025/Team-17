import React, {useState} from 'react';
import Register from '../../components/Register';
import Login from '@/components/Login';
import streak from '@/components/streak'
import { Text, View, StyleSheet, Pressable } from 'react-native';

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
      <Register />
      <Login streak={streak} setStreak={setStreak} />
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
circularButtonText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
},
})

export default App;