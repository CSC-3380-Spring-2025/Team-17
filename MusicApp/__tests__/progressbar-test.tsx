import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from '@/components/ProgressBar';

describe('progress bar', () => {
    test('renders successfully', () => {
        render(<ProgressBar progress={100} />);
    });
});