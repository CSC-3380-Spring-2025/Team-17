import React from 'react';
import { render } from '@testing-library/react-native';
import Register from '@/components/Register';

describe('register', () => {
    test('renders successfully', () => {
        render(<Register />);
    });
});