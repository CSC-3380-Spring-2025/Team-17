import React from 'react';
import renderer from 'react-test-renderer';
import MovableBlock from '@/components/movableBlock';

describe('moving block', () => {
    test('renders successfully', () => {
        const tree = renderer.create(<MovableBlock />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});