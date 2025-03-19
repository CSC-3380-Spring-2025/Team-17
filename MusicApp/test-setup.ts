import '@testing-library/jest-native/extend-expect';

jest.mock('@react-navigation/native', () => {
    return{
        useNavigation: () => ({
            navigate: jest.fn(),
            dispatch: jest.fn(),
            setOption: jest.fn(),
        }),
        useRoute: () => ({
            params: {
                id: '123',
            },
        }),
    };
});