import React, { useRef } from 'react';
import { View, PanResponder, Animated, StyleSheet } from 'react-native';

const MovableBlock = () => {
    const pan = useRef(new Animated.ValueXY()).current;
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
          pan.extractOffset();
        },
      })
    ).current;
  
    return (
      <Animated.View
        style={[
          styles.block,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      />
    );
  };


  const styles = StyleSheet.create({
    block: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default MovableBlock;