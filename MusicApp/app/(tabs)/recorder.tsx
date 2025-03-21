import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const MovableBlock = () => {
  // Shared values for the block's position
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Create a pan gesture
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // No need to store initial values explicitly
    })
    .onUpdate((event) => {
      // Update the position based on the gesture's translation
      translateX.value += event.translationX;
      translateY.value += event.translationY;
    })
    .onEnd(() => {
      // Optionally, add a spring effect when the gesture ends
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
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
  return (
    <View style={styles.container}>
      <MovableBlock />
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
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export default Recorder;