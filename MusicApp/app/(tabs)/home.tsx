import { Text, View, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { Link, Stack } from 'expo-router';

import ImageViewer from '@/components/ImageViewer';
import Streak from'../../components/streak';
import React, {useState} from 'react';
const PlaceholderImage = require('@/assets/images/dog.jpg');


export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <View style={styles.headerRow}>
              
        <Streak/>
          
       
                <View style={styles.titleContainer}>
                  <Text style={styles.headerTitle}>Home</Text>
                </View>
                <Link href="/lessons" style={styles.imageButton}>
                  <Image
                    source={require('@/assets/images/coin.png')}
                    style={styles.buttonImage}
                    resizeMode="contain"
                  />
                </Link>

              </View>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.lessonBox}>
          <View style={styles.lessonTextContainer}>
            <Text style={styles.sectionTitle}>Lesson 2</Text>
            <Text style={styles.sectionSubtitle}>C Major Pentatonic</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={styles.lessonImageContainer}>
            <Image
              source={require('@/assets/lessonPics/intro.jpeg')}
              style={styles.lessonImage}
              resizeMode="cover"
            />
          </View>

        </View>
        <View style={styles.recordingBox}>
          <Text style={styles.recordingTitle}>Song Draft 2</Text>
          <View style={styles.recordingDetails}>
            <Text style={styles.recordingDate}>Oct 26, 2024</Text>
            <Text style={styles.recordingDuration}>03:27</Text>
          </View>
        </View>
        <View style={styles.recordingBox}>
          <Text style={styles.recordingTitle}>Voice Test</Text>
          <View style={styles.recordingDetails}>
            <Text style={styles.recordingDate}>Aug 17, 2024</Text>
            <Text style={styles.recordingDuration}>00:50</Text>
          </View>
        </View>
        <View style={styles.recordingBox}>
          <Text style={styles.recordingTitle}>Song Draft</Text>
          <View style={styles.recordingDetails}>
            <Text style={styles.recordingDate}>Jul 4, 2024</Text>
            <Text style={styles.recordingDuration}>02:12</Text>
          </View>
        </View>
        <Pressable style={styles.createButton}>
          <Text style={styles.createButtonText}>Create New Track</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {

    alignItems: "center",
    paddingTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#D2D2D2',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  lessonBox: {
    backgroundColor: '#484848',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    height: 100,
    overflow: 'hidden',
    borderColor: '#fff',
    borderWidth: 2,
  },
  recordingBox: {
    backgroundColor: '#484848',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderColor: '#fff',
    borderWidth: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#D2D2D2',
    marginTop: 5,
  },
  recordingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  recordingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  recordingDate: {
    fontSize: 14,
    color: '#D2D2D2',
  },
  recordingDuration: {
    fontSize: 14,
    color: '#D2D2D2',
  },
  createButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonTextContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  lessonImageContainer: {
    flex: 1.4,
    height: '100%',
  },
  lessonImage: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
  dividerLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  titleCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpacer: {
    width: 30,
    alignItems: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'none',
    opacity: 1,
  },
  buttonText: {
    color: '#484848',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  imageButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'none',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});