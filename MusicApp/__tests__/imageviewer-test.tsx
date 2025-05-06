import React from 'react';
import ImageViewer from '@/components/ImageViewer';
import renderer from 'react-test-renderer';

describe('image viewer', () => {
    test('renders dog pic', () => {
        const tree = renderer.create(<ImageViewer imgSource={require('@/assets/images/dog.jpg')} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});