import React from 'react';
import { View, StyleSheet } from 'react-native';
import Register from '../components/Register';

const registrationPage = () => {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333232',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default registrationPage;
