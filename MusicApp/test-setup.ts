import '@testing-library/jest-native/extend-expect';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return{
        ...actualNav,
        userNavigation: () => ({
            navigate: jest.fn(), 
            dispatch: jest.fn(),
        }),
    };
});