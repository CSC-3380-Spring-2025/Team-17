import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Link} from 'expo-router';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Intro() {
    const [userId, setUserId]= useState('');
    const {handleTaskCompletion} = useChallenges();

    useEffect(()=>{
        if (auth.currentUser){
          setUserId(auth.currentUser.uid);
        }
      }, []);
    
      useEffect(()=>{
          const fetchUserData= async()=>{
            if(userId){
              console.log('Fetching data for userId:', userId);
      
              try{
                const userDocRef= doc(db, 'users', userId);
                const userDoc = await getDoc(userDocRef)
                
                if (userDoc.exists()) {
                  console.log('Document data:', userDoc.data());
                  const userData = userDoc.data();
                  if(userData.lessonProgress){
                    if(!userData.lessonProgress.includes(1)){
                        await updateDoc(userDocRef, {
                            lessonProgress: arrayUnion(1),
                        });
                        handleTaskCompletion("Complete 2 lessons");
                        handleTaskCompletion("Complete all lessons");
                    }
                  }else{
                    await setDoc(userDocRef, {
                        lessonProgress:[1],
                    }, {merge: true});
                  }
                } else {
                  await setDoc(userDocRef, {
                    lessonProgress: [1],
                  });
                }
        
              }catch(error){
                console.error('Error fetching user data:', error);
              }
            }
          };
          fetchUserData();
        }, [userId]);
    

    return(
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
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
                        <Link href='./2notation' style={styles.link}>
                            Next: Music Notation →
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', 
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 20,
    },
    title: {
        color: '#5543A5',
        fontSize: 32, 
        fontFamily: 'Inter_700Bold',
        fontWeight: 'bold',
        marginVertical: 24,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16, 
        padding: 24,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#5543A5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1, 
        borderColor: 'rgba(85, 67, 165, 0.1)',
        elevation: 2,
    },
    text: {
        color: '#333',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left',
        letterSpacing: 0.2,
    },
    ctaContainer: {
        marginVertical: 24,
        padding: 16,
        backgroundColor: 'rgba(164, 157, 196, 0.2)', 
        borderRadius: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(85, 67, 165, 0.1)',
    },
    ctaText: {
        color: '#5543A5',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.3,
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
        color: 'white',
        fontSize: 18,
        padding: 18,
        textAlign: 'center',
        backgroundColor: '#5543A5',
        borderRadius: 12,
        fontWeight: '600',
        letterSpacing: 0.3,
        overflow: 'hidden',
    },
    secondaryLink: {
        color: '#5543A5',
        fontSize: 16,
        padding: 16,
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#5543A5',
        borderRadius: 12,
        fontWeight: '600',
    },
});