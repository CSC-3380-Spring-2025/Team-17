import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/home';

describe('HomeScreen', () => {
    test('renders correctly', () => {
      render(<NavigationContainer><HomeScreen /></NavigationContainer>);
    });
});