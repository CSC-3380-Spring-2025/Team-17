import { Text, View, StyleSheet, Pressable, ScrollView, Image, Platform } from "react-native";

import { Link, Stack, useRouter, useNavigation } from 'expo-router';

import Coins from '../../components/coins'
import Streak from'../../components/streak';


import {useChallenges} from '../context/ChallengesContext';

import React, {useState, useEffect, useRef} from 'react';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {auth, db} from '../../firebaseConfig';
import LiveMixingPage from './recorder';
import * as FileSystem from 'expo-file-system';


const PlaceholderImage = require('@/assets/images/dog.jpg');
type LessonLink=
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

  const [userId, setUserId]= useState('');
  const [lessonNumber, setLessonNumber]= useState(1);
  const [lessonTitle, setLessonTitle]= useState('');
  const [lessonImage, setLessonImage]= useState(PlaceholderImage);
  const [lessonLink, setLessonLink]= useState<LessonLink>('/lessons/1intro')

  const {handleTaskCompletion}=useChallenges();    

  const [savedSongs, setSavedSongs] = useState<string[]>([]);
  const router=useRouter();

  useEffect(()=>{
          if (auth.currentUser){
            setUserId(auth.currentUser.uid);
          }
        }, []);

  useEffect(()=>{
  const fetchLessonProgress= async()=>{
    if (!userId) return;
    try{
      const docRef= doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        const data = docSnap.data()
        if(data.lessonProgress && data.lessonProgress.length>0){
          const highestLesson = Math.max(...data.lessonProgress);
          setLessonNumber(highestLesson); 
        }else{
          setLessonNumber(1);
        }
      }else{
        console.log("No such document");
        setLessonNumber(1);
      }
    }catch(error){
      console.error("Error fetching document: ", error);
      setLessonNumber(1);
    }
  };
  fetchLessonProgress();
}, [userId]);

useEffect(()=>{
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


useEffect(()=>{
  const checkAndUpdateLoginDates = async()=>{
    if(!userId) return;
    const currentDate = new Date().toISOString().split('T')[0];

    try{
      const docRef= doc(db, 'users', userId);
      const docSnap= await getDoc(docRef);
      if(docSnap.exists()){
        const data = docSnap.data();
        const homeAccessDates=data.homeAccessDates||[];
        if(!homeAccessDates.includes(currentDate)){
          await updateDoc(docRef, {
            homeAccessDates: arrayUnion(currentDate)
          });
          handleTaskCompletion("Login three days in a row")
        }
      }else{
        console.log("No such document");
      }
    }catch(error){
      console.error("Error fetching document: ", error);
    }
  };
  checkAndUpdateLoginDates();
}, [userId]);



useEffect(() => {
  if(Platform.OS === 'web'){
    console.log('File system operations are not directly supported on the web.')
  }
  else{
      const loadSavedSongs = async () => {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory||'');
        const songFiles = files.filter(file => file.startsWith('liveMixingPageState_'));
        return songFiles.map(file => file.replace('liveMixingPageState_', '').replace('.json', ''));
      };
  
      const fetchSavedSongs = async () => {
        const songs = await loadSavedSongs();
        setSavedSongs(songs);
      };
      fetchSavedSongs();
  }
}, []);

const handleLoadSong=(name:string)=>{
  router.push(`/recorder?song=${name}`);
};


  return (
    <>
      <Stack.Screen
        options={{
          
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <View style={styles.headerRow}>
       
                <View>
                  <Text style={styles.headerTitle}>Home</Text>
                </View>
                
              </View>
            </View>
          ),
          headerLeft: () => (
           <Streak/>
          ),
          headerRight: () => (
            <Coins/>
          ),
          headerTitleAlign: "center",
        }}
      />

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

        
        {savedSongs.map((song, index)=>(
          <Pressable
            key={index}
            style={styles.recordingBox}
            onPress={()=>handleLoadSong(song)}
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