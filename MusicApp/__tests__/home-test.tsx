import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/home';

describe('HomeScreen', () => {
    test('renders correctly', () => {
      render(<HomeScreen />);
    });
});