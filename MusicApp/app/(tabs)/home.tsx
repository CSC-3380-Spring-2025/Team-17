import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, Stack } from 'expo-router';
import ImageViewer from '@/components/ImageViewer';
import Button from "@/components/Button";
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
                <Link href="/account" style={styles.text}>
                  oVo
                </Link>
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
        <Link href="/challenges" style={styles.streak}>
        🔥: 0
          </Link>
          
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
          <Button label="Draft #1" />
        </View>
        <View style={styles.draft2Container}>
          <Button label="Draft #2" />
        </View>
        <View style={styles.draft3Container}>
          <Button label="Draft #3" />
        </View>
        <View style={styles.moreContainer}>
          <Link href="/recorder" style={styles.seeText}>
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
    bottom: 70,
    right: 170,
  },
  gemContainer: {
    bottom: 70,
    right: 170,
  },
  account: {
    width: 45,
    height: 45,
    borderRadius: 35,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    left: 170,
    bottom: 30,
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
    width: 250,
    height: 70,
    top: 20,
    borderRadius: 25,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  draft1Container: {
    width: 250,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#1b479e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    top: 40,
  },
  draft2Container: {
    width: 250,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#1b479e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    top: 60,
  },
  draft3Container: {
    width: 250,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#1b479e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    top: 80,
  },
  moreContainer: {
    width: 175,
    height: 50,
    top: 100,
    borderRadius: 15,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  seeText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});