import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, Stack } from 'expo-router';
import ImageViewer from '@/components/ImageViewer';
import Streak from'../../components/streak';
import React, {useState} from 'react';
const PlaceholderImage = require('@/assets/images/dog.jpg');
//be ahead

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: () => (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Home</Text>
              <View style={styles.account}>
                <Link href="/account" style={styles.accountText}>
                  oVo
                </Link>
                <View style={styles.streakContainer}>
          <Text style={styles.streak}>🔥: 0</Text>
        </View>
        <View style={styles.gemContainer}>
          <Link href="/challenges" style={styles.gem}>💎: 0</Link>
        </View>
              </View>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        <Link href='../lessons/0contents'>
          Lessons
        </Link>
       <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} />
        </View>

        <View style={styles.streakContainer}>
        <Streak/>
          
        </View>
        <View style={styles.gemContainer}>
          <Text style={styles.gem}>💎: 0</Text>
        </View>

        <View style={styles.lessonContainer}>
          <Link href="/lessons/1intro" style={styles.text}>
            Lesson 1
          </Link>
        </View>
        <View style={styles.draft1Container}>
        <Link href="/recordertest" style={styles.text}>
            Draft #1
          </Link>
        </View>
        <View style={styles.draft2Container}>
        <Link href="/recordertest" style={styles.text}>
            Draft #2
          </Link>
        </View>
        <View style={styles.draft3Container}>
        <Link href="/recordertest" style={styles.text}>
            Draft #3
          </Link>
        </View>
        <View style={styles.moreContainer}>
          <Link href="/recordertest" style={styles.seeText}>
            See More
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    top: 30,
  },
  streakContainer: {
    bottom:10,
    right: 300,
  },
  gemContainer: {
    bottom:10,
    right: 300,
  },
  account: {
    width: 45,
    height: 45,
    borderRadius: 35,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    left: 170,
    bottom: 50,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  streak: {
    fontSize: 14,
    color: "#fff",
    right: 10,
  },
  gem: {
    fontSize: 14,
    color: "#fff",
    right: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#D2D2D2',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  lessonContainer: {
    width: 350,
    height: 100,
    bottom: 300,
    borderRadius: 25,
    backgroundColor: "#484848",
    alignItems: "center",
    justifyContent: "center",
  },
  draft1Container: {
    width: 350,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#484848',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    bottom: 250,
  },
  draft2Container: {
    width: 350,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#484848',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    bottom: 200,
  },
  draft3Container: {
    width: 350,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#484848',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    bottom: 150,
  },
  moreContainer: {
    width: 175,
    height: 50,
    bottom: 100,
    borderRadius: 15,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  accountText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    top:15,
  },
  seeText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});