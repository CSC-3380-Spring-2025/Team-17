import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../home';

describe('<HomeScreen />', () => {

    test('renders correctly', () => {
        const tree = renderer.create(<HomeScreen/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});