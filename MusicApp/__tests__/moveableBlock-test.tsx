import React from 'react';
import {render} from '@testing-library/react-native';
import MovableBlock from '@/components/movableBlock';

describe('moving block', () => {
    test('renders successfully', () => {
        render(<MovableBlock />);
    });
});