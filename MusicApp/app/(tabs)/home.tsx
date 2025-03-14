import { Text, View, StyleSheet } from "react-native";
import ImageViewer from '@/components/ImageViewer';
import {Link} from 'expo-router';

import Button from "@/components/Button";
const PlaceholderImage = require('@/assets/images/dog.jpg');
//be ahead
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href='../lessons/0contents'>
          Lessons
        </Link>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2D2D2',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
