import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'

export default function Intro() {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (auth.currentUser) {
            setUserId(auth.currentUser.uid);
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                console.log('Fetching data for userId:', userId);

                try {
                    const userDocRef = doc(db, 'users', userId);
                    const userDoc = await getDoc(userDocRef)

                    if (userDoc.exists()) {
                        console.log('Document data:', userDoc.data());
                        const userData = userDoc.data();
                        if (userData.lessonProgress) {
                            if (!userData.lessonProgress.includes(1)) {
                                await updateDoc(userDocRef, {
                                    lessonProgress: arrayUnion(1),
                                });
                            }
                        } else {
                            await setDoc(userDocRef, {
                                lessonProgress: [1],
                            }, { merge: true });
                        }
                    } else {
                        await setDoc(userDocRef, {
                            lessonProgress: [1],
                        });
                    }

                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [userId]);


    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        Introduction
                    </Text>

                    <View style={styles.card}>
                        <Text style={styles.text}>
                            Hello there, and welcome to the Music Theory Lessons! Are you trying to write an original song
                            but have no idea where to start? Well, you have come to the right place!
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.text}>
                            In these lessons, you will learn everything you need to know about writing original melodies,
                            building strong harmonies, and creating your own music. These lessons will allow you to dive
                            deep into topics like music notation, pitch & rhythm, scales & modes, chords & progressions,
                            textures & structures.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.text}>
                            At the end of it all, you will be well-educated in music theory and will be able to create
                            your own music and share it with the world. Well, what are you waiting for? Let's get started!
                        </Text>
                    </View>

                    <View style={styles.ctaContainer}>
                        <Text style={styles.ctaText}>Click below to begin your journey</Text>
                    </View>

                    <View style={styles.linksContainer}>
                        <View style={styles.linkWrapper}>
                            <Link href='./2notation' asChild>
                                <Pressable style={styles.link}>
                                    <Text style={styles.linkText}>Next: Music Notation →</Text>
                                </Pressable>
                            </Link>
                        </View>
                        <View style={styles.linkWrapper}>
                            <Link href='../(tabs)/home' asChild>
                                <Pressable style={styles.secondaryLink}>
                                    <Text style={styles.secondaryLinkText}>← Back to Home</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1D1F',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 15,
        paddingBottom: 30,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 20,
        paddingTop: 10,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 24,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        width: '100%',
        borderColor: '#5543A5',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: '#D2D2D2',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left',
    },
    ctaContainer: {
        marginVertical: 24,
        padding: 16,
        backgroundColor: 'rgba(85, 67, 165, 0.2)',
        borderRadius: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: '#5543A5',
    },
    ctaText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    linksContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
        gap: 12,
    },
    linkWrapper: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    link: {
        padding: 18,
        backgroundColor: '#5543A5',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#5543A5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    linkText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    secondaryLink: {
        padding: 16,
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#5543A5',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryLinkText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});