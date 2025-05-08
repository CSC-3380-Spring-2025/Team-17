import { Text, View, StyleSheet, Pressable, ScrollView, Image, Platform } from "react-native";

import { Link, Stack, useRouter, useNavigation } from 'expo-router';
import ProfilePictureButton from '../../components/profilePictureButton';
import Coins from '../../components/coins'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Streak from '../../components/streak';
import { useChallenges } from '../context/ChallengesContext';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import LiveMixingPage from './recorder';
import * as FileSystem from 'expo-file-system';


const PlaceholderImage = require('@/assets/images/dog.jpg');
type LessonLink =
  | "/lessons/1intro"
  | "/lessons/2notation"
  | "/lessons/3pitch"
  | "/lessons/4rhythm"
  | "/lessons/5meter"
  | "/lessons/6scales"
  | "/lessons/7modes"
  | "/lessons/8intervals"
  | "/lessons/9melody"
  | "/lessons/10chords"
  | "/lessons/11progressions"
  | "/lessons/12texture"
  | "/lessons/13structure";


export default function HomeScreen() {

  const navigation = useNavigation();

  const [userId, setUserId] = useState('');
  const [lessonNumber, setLessonNumber] = useState(1);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonImage, setLessonImage] = useState(PlaceholderImage);
  const [lessonLink, setLessonLink] = useState<LessonLink>('/lessons/1intro')
  const [refresh, setRefresh] = useState(false);
  const { handleTaskCompletion, loading } = useChallenges();

  const [savedSongs, setSavedSongs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      setUserId(auth.currentUser.uid);
    }
  }, []);


  useEffect(() => {
    const fetchLessonProgress = async () => {
      if (!userId) return;
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data.lessonProgress && data.lessonProgress.length > 0) {
            const highestLesson = Math.max(...data.lessonProgress);
            setLessonNumber(highestLesson);
          } else {
            setLessonNumber(1);
          }
        } else {
          console.log("No such document");
          setLessonNumber(1);
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        setLessonNumber(1);
      }
    };
    fetchLessonProgress();
  }, [userId]);

  useEffect(() => {
    switch (lessonNumber) {
      case 1:
        setLessonTitle("Intro");
        setLessonImage(require('@/assets/lessonPics/intro.jpeg'));
        setLessonLink('/lessons/1intro');
        break;
      case 2:
        setLessonTitle("Notation");
        setLessonImage(require('@/assets/lessonPics/notation.jpg'));
        setLessonLink('/lessons/2notation');
        break;
      case 3:
        setLessonTitle("Pitch");
        setLessonImage(require('@/assets/lessonPics/pitch.jpg'));
        setLessonLink('/lessons/3pitch');
        break;
      case 4:
        setLessonTitle("Rhythm");
        setLessonImage(require('@/assets/lessonPics/rhythm.jpg'));
        setLessonLink('/lessons/4rhythm');
        break;
      case 5:
        setLessonTitle("Meter");
        setLessonImage(require('@/assets/lessonPics/meter.jpg'));
        setLessonLink('/lessons/5meter');
        break;
      case 6:
        setLessonTitle("Scales");
        setLessonImage(require('@/assets/lessonPics/scales.jpg'));
        setLessonLink('/lessons/6scales');
        break;
      case 7:
        setLessonTitle("Modes");
        setLessonImage(require('@/assets/lessonPics/modes.jpg'));
        setLessonLink('/lessons/7modes');
        break;
      case 8:
        setLessonTitle("Intervals");
        setLessonImage(require('@/assets/lessonPics/intervals.jpg'));
        setLessonLink('/lessons/8intervals');
        break;
      case 9:
        setLessonTitle("Melody");
        setLessonImage(require('@/assets/lessonPics/melody.jpg'));
        setLessonLink('/lessons/9melody');
        break;
      case 10:
        setLessonTitle("Chords");
        setLessonImage(require('@/assets/lessonPics/chords.jpg'));
        setLessonLink('/lessons/10chords');
        break;
      case 11:
        setLessonTitle("Progressions");
        setLessonImage(require('@/assets/lessonPics/progressions.jpg'));
        setLessonLink('/lessons/11progressions');
        break;
      case 12:
        setLessonTitle("Texture");
        setLessonImage(require('@/assets/lessonPics/texture.jpg'));
        setLessonLink('/lessons/12texture');
        break;
      case 13:
        setLessonTitle("Structure");
        setLessonImage(require('@/assets/lessonPics/structure.jpg'));
        setLessonLink('/lessons/13structure');
        break;
      default:
        setLessonTitle("Intro");
        setLessonImage(require('@/assets/lessonPics/intro.jpeg'));
        setLessonLink('/lessons/1intro');
        break;
    }
  }, [lessonNumber]);




  useEffect(() => {
    const checkAndUpdateLoginDates = async () => {
      if (!userId || loading) return;
      const currentDate = new Date().toISOString().split('T')[0];

      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const homeAccessDates = data.homeAccessDates || [];
          if (!homeAccessDates.includes(currentDate)) {
            await updateDoc(docRef, {
              homeAccessDates: arrayUnion(currentDate)
            });
            await
              handleTaskCompletion("Login three days in a row")


          }
        } else {
          console.log("No such document");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    checkAndUpdateLoginDates();
  }, [userId, loading]);



  useEffect(() => {
    if (Platform.OS === 'web') {
      console.log('File system operations are not directly supported on the web.')
    }
    else {
      const loadSavedSongs = async () => {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
        const songFiles = files.filter(file => file.startsWith('liveMixingPageState_'));
        return songFiles.map(file => file.replace('liveMixingPageState_', '').replace('.json', ''));
      };

      const fetchSavedSongs = async () => {
        const songs = await loadSavedSongs();
        setSavedSongs(songs);
      };
      fetchSavedSongs();
    }
  }, [refresh]);

  const handleRefresh=()=>{
    setRefresh(prev=>!prev);
  };


  const handleLoadSong = (name: string) => {
    router.push(`/recorder?song=${name}`);
  };


  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Link href={lessonLink} asChild>
          <Pressable style={styles.lessonBox}>

            <View style={styles.lessonTextContainer}>
              <Text style={styles.sectionTitle}>Lesson {lessonNumber}</Text>
              <Text style={styles.sectionSubtitle}>{lessonTitle}</Text>
            </View>
            <View style={styles.dividerLine} />
            <View style={styles.lessonImageContainer}>
              <Image
                source={lessonImage}
                style={styles.lessonImage}
                resizeMode="cover"
              />
            </View>
          </Pressable>
        </Link>


        {savedSongs.map((song, index) => (
          <Pressable
            key={index}
            style={styles.recordingBox}
            onPress={() => handleLoadSong(song)}
          >
            <Text style={styles.recordingTitle}>{song}</Text>
            <View style={styles.recordingDetails}>
              <Text style={styles.recordingDate}>Date Unknown</Text>
              <Text style={styles.recordingDuration}>Duration Unknown</Text>
            </View>
          </Pressable>

        ))}



        <Pressable style={styles.createButton}>
          <Link href="/recorder" asChild>
            <Text style={styles.createButtonText}>Create New Track</Text>
          </Link>
        </Pressable>

        <Pressable style={styles.createButton} onPress={handleRefresh}>
            <Text style={styles.createButtonText}>Refresh</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1D1F',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  lessonBox: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    height: 120,
    overflow: 'hidden',
    borderColor: '#5543A5',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordingBox: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#5543A5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 20,
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
    backgroundColor: '#5543A5',
    borderRadius: 25,
    paddingVertical: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#5543A5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 0,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 20,
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
});