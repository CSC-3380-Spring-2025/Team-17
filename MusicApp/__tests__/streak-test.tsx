import React from 'react';
import {render} from '@testing-library/react-native';
import Streak from '@/components/streak';

describe('streak', () => {
    test('renders successfully', () => {
        render(<Streak label='lessons' streak={3} />);
    });
});