import React from 'react';
import renderer from 'react-test-renderer';
import ProgressBar from '@/components/ProgressBar';

describe('progress bar', () => {
    test('renders successfully', () => {
        const tree = renderer.create(<ProgressBar progress={100} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});