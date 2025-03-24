import React from 'react';
import { render } from '@testing-library/react-native';
import Register from '@/components/Register';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

jest.mock('firebase/auth', () => {
    const auth = {
        createUserWithEmailAndPassword: jest.fn(),
        updateProfile: jest.fn()
    };
    return {
        getAuth: jest.fn(() => auth),
        ...auth
    };
});

describe('register', () => {
    test('renders successfully', () => {
        render(<Register />);
    });
});