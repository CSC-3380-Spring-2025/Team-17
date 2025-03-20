import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/home';

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => {
      return mockNavigation;
    },
  }));

describe('<HomeScreen />', () => {
    test('renders correctly', () => {
        const tree = render(<HomeScreen/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});