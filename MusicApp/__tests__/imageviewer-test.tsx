import React from 'react';
import {render} from '@testing-library/react-native';
import ImageViewer from '@/components/ImageViewer';

describe('image viewer', () => {
    test('renders dog pic', () => {
        render(<ImageViewer imgSource={require('@/assets/images/dog.jpg')} />);
    });
});