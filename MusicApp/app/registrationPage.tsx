import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Register from '../components/Register';
import Svg, { Line, Polygon } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const registrationPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Svg height="100%" width="100%" style={styles.diagonalContainer}>
          <Polygon
            points={`0,0 ${width},0 ${width},${height * 0.3} 0,${height * 0.4}`}
            fill="#5543A5"
          />
          <Line
            x1="0"
            y1={height * 0.4}
            x2={width}
            y2={height * 0.3}
            stroke="#fff"
            strokeWidth="2"
          />
        </Svg>
        <View style={styles.headerContent}>
          <MaterialIcons name="queue-music" size={128} color="#fff" />
          <Text style={styles.melodifyLogo}>Melodify</Text>
        </View>
      </View>
      <View style={styles.registerContainer}>
        <Register />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333232',
  },
  topSection: {
    height: height * 0.4,
    width: '100%',
    position: 'relative',
  },
  diagonalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    alignItems: 'center',
    width: 200,
  },
  melodifyLogo: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Inter_700Bold',
  },
});

export default registrationPage;