import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions, ImageBackground, ScrollView } from "react-native";
import { Link } from 'expo-router';

export default function LessonsScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.buttonsContainer}>
                <Link href="/lessons/1intro" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/intro.jpeg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>1 - Intro</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/2notation" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/notation.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>2 - Notation</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/3pitch" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/pitch.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>3 - Pitch</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/4rhythm" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/rhythm.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>4 - Rhythm</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/5meter" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/meter.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>5 - Meter</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/6scales" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/scales.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>6 - Scales</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/7modes" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/modes.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>7 - Modes</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/8intervals" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/intervals.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>8 - Intervals</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/9melody" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/melody.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>9 - Melody</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/10chords" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/chords.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>10 - Chords</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/11progressions" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/progressions.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>11 - Progressions</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/12texture" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/texture.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>12 - Texture</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                <Link href="/lessons/13structure" asChild>
                    <Pressable style={styles.squareButton}>
                        <View style={styles.buttonContent}>
                            <ImageBackground
                                source={require('@/assets/lessonPics/structure.jpg')}
                                style={styles.imageContainer}
                                imageStyle={styles.imageStyle}
                            />
                            <View style={styles.line} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.buttonText}>13 - Structure</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>


    );
}

const { width, height } = Dimensions.get('window');
const buttonSize = Math.min(width, height) * 0.9;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#D2D2D2",
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: { 
        flex: 1,
        justifyContent: 'center',
        gap: 20,
    },
    squareButton: {
        width: buttonSize,
        height: buttonSize - 80,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        borderWidth: 2,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    buttonContent: {
        flex: 1,
    },
    imageContainer: {
        flex: 3,
    },
    imageStyle: {
        flex: 1,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Inter_700Bold',
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
    },
});