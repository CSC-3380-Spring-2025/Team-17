import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const { width, height } = Dimensions.get('window');

export default function Splash() {
    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <ImageViewer
                    imgSource={require('@/assets/images/adobestock.jpeg')}
                    style={styles.image}
                />
                <Svg
                    height={height * 0.5}
                    width={width}
                    style={styles.slantedOverlay}
                >
                    {/* White border */}
                    <Polygon
                        points={`0,${height * 0.4 - 5} ${width},${height * 0.3 - 5} ${width},${height * 0.5} 0,${height * 0.6}`}
                        fill="white"
                    />
                    {/* Slanted background overlay */}
                    <Polygon
                        points={`0,${height * 0.4} ${width},${height * 0.3} ${width},${height * 0.5} 0,${height * 0.6}`}
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
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    slantedOverlay: {
        position: 'absolute',
        top: 20,
        left: 0,
    },

    buttonWrapper: {
        backgroundColor: '#D9D9D9',
        width: 100,
        height: 30,
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
