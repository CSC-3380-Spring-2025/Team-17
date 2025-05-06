import React from 'react';
import renderer from 'react-test-renderer';
import Button from '@/components/Button';

describe('button', () => {
    test('renders successfully', () => {
        const tree = renderer.create(<Button label='button'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});