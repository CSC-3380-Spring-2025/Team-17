import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';



const { width, height } = Dimensions.get('window');

export default function Splash() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <ImageViewer
                    imgSource={require('@/assets/images/adobestock.jpg')}
                    style={styles.image}
                />
                <Svg height={height * 0.5} width={width} style={styles.slantedOverlay}>
                    <Polygon
                        points={`0,${height * 0.45 - 2} ${width},${height * 0.35 - 2} ${width},${height * 0.5} 0,${height * 0.6}`}
                        fill="white"
                    />
                    <Polygon
                        points={`0,${height * 0.45} ${width},${height * 0.35} ${width},${height * 0.5} 0,${height * 0.6}`}
                        fill="#333232"
                    />
                </Svg>
            </View>

            <View style={styles.buttonWrapper}>
                <Button label="Sign In" textStyle={{ fontFamily: 'Inter_700Bold' }} />
            </View>
            <Text style={styles.createOrText}>or</Text>
            <Text style={styles.createAccountText}>Create Account</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333232',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    imageWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: height * 0.5,
        overflow: 'hidden',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },

    slantedOverlay: {
        position: 'absolute',
        top: 20,
        left: 0,
    },

    buttonWrapper: {
        backgroundColor: '#D9D9D9',
        width: 100,
        height: 31,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 80,
    },

    createAccountText: {
        color: '#FFFFFF',
        fontSize: 16,
        position: 'absolute',
        bottom: 20,
        fontFamily: 'Inter_700Bold',
        textDecorationLine: 'underline',
    },

    createOrText: {
        color: '#FFFFFF',
        fontSize: 16,
        position: 'absolute',
        bottom: 50,
        fontFamily: 'Inter_700Bold',
    },
});
