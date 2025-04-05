import React from 'react';
import {render} from '@testing-library/react-native';
import Button from '@/components/Button';

describe('button', () => {
    test('renders successfully', () => {
        render(<Button label='button'/>);
    });
});