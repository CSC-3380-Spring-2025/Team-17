import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define the grid size (e.g., 50x50 pixels)
const GRID_SIZE = 50;

// Sensitivity factor (adjust this to control how fast the block moves)
const SENSITIVITY = 0.25;

const MovableBlock = () => {
  // Shared values for the block's position
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Function to snap the block to the nearest grid point
  const snapToGrid = (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  // Create a pan gesture
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Store the current position when the gesture starts
      translateX.value = translateX.value;
      translateY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Update the position based on the gesture's translation, scaled by sensitivity
      translateX.value = translateX.value + event.translationX * SENSITIVITY;
      translateY.value = translateY.value + event.translationY * SENSITIVITY;
    })
    .onEnd(() => {
      // Snap the block to the nearest grid point
      translateX.value = withSpring(snapToGrid(translateX.value));
      translateY.value = withSpring(snapToGrid(translateY.value));
    });

  // Animated style for the block
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.block, animatedStyle]} />
    </GestureDetector>
  );
};

const Recorder = () => {
  // Function to render the visual grid
  const renderGrid = () => {
    const rows = Math.floor(screenHeight / GRID_SIZE);
    const cols = Math.floor(screenWidth / GRID_SIZE);

    return (
      <View style={StyleSheet.absoluteFill}>
        {/* Render horizontal grid lines */}
        {Array.from({ length: rows }).map((_, row) => (
          <View
            key={`row-${row}`}
            style={{
              position: 'absolute',
              top: row * GRID_SIZE,
              left: 0,
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          />
        ))}
        {/* Render vertical grid lines */}
        {Array.from({ length: cols }).map((_, col) => (
          <View
            key={`col-${col}`}
            style={{
              position: 'absolute',
              top: 0,
              left: col * GRID_SIZE,
              width: 1,
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Render the visual grid */}
      {renderGrid()}
      {/* Render the movable block */}
      <GestureHandlerRootView style={{ flex: 1 }}>
      <MovableBlock />
      </GestureHandlerRootView>
      {/* Add more MovableBlock components if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export default Recorder;