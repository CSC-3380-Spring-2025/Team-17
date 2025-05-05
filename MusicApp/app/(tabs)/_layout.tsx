import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AudioProvider } from './AudioContext';
import { Svg, Path } from 'react-native-svg';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Streak from '@/components/streak';
import Coins from '@/components/coins';
import { ChallengesProvider } from '../context/ChallengesContext';
import { AuthProvider } from '../context/AuthContext';

const profileImages = {
  'aesthetic': require('../../assets/profilePictures/aesthetic.jpg'),
  'bluemusic': require('../../assets/profilePictures/bluemusic.jpg'),
  'blues': require('../../assets/profilePictures/blues.jpg'),
  'brain': require('../../assets/profilePictures/brain.jpg'),
  'grass': require('../../assets/profilePictures/grass.jpg'),
  'guitarplayer': require('../../assets/profilePictures/guitarplayer.jpg'),
  'musichead': require('../../assets/profilePictures/musichead.jpg'),
  'musicmedley': require('../../assets/profilePictures/musicmedley.jpg'),
  'piano': require('../../assets/profilePictures/piano.jpg'),
  'purpleheadphone': require('../../assets/profilePictures/purpleheadphone.jpg'),
  'red': require('../../assets/profilePictures/red.jpg'),
  'rock': require('../../assets/profilePictures/rock.jpg'),
};

const ProfileHeaderButton = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().profilePicture) {
          const picName = userDoc.data().profilePicture.replace('.jpg', '');
          setProfilePicture(picName);
        }
      }
    };

    fetchProfilePicture();
  }, []);

  if (!profilePicture) return null;

  return (
    <TouchableOpacity
      onPress={() => router.push('/accountPage')}
      style={styles.profileButton}
    >
      <Image
        source={profileImages[profilePicture as keyof typeof profileImages]}
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
};

const FloatingMiddleButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isRecordingPage = pathname.includes('recorder') || pathname.includes('Recording');

  if (isRecordingPage) return null;

  return (
    <TouchableOpacity
      style={[styles.middleButton]}
      onPress={() => router.push('/recorder')}
    >
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const TabBarBackground = () => {
  const { width } = Dimensions.get('window');
  const height = 50;
  const pathname = usePathname();

  const isRecordingPage = pathname.includes('recorder') || pathname.includes('Recording');

  if (isRecordingPage) {
    return (
      <Svg width={width} height={height} style={{ position: 'absolute', bottom: 0 }}>
        <Path d={`M0,0 H${width} V${height} H0 Z`} fill="#333232" />
      </Svg>
    );
  }

  const dipWidth = 80;
  const dipDepth = 30;
  const left = (width - dipWidth) / 2;

  const path = `
      M0,0 
      H${left}
      C${left + 15},0 ${left + 25},${dipDepth} ${left + dipWidth / 2},${dipDepth}
      C${left + dipWidth - 25},${dipDepth} ${left + dipWidth - 15},0 ${left + dipWidth},0
      H${width} 
      V${height} 
      H0 
      Z
    `;

  return (
    <Svg width={width} height={height} style={{ position: 'absolute', bottom: 0 }}>
      <Path d={path} fill="#333232" />
    </Svg>
  );
};


export default function TabLayout() {
  return (
    <ChallengesProvider>

      <AudioProvider>
        <>
          <Tabs
            initialRouteName="home"
            screenOptions={{
              tabBarActiveTintColor: '#fff',
              tabBarStyle: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                height: 50,
                position: 'absolute',
              },
              tabBarBackground: () => <TabBarBackground />,
              headerStyle: {
                backgroundColor: '#333232',
                height: 75,
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 22,
                color: '#fff',
              },
              headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                  <Streak />
                </View>
              ),
              headerRight: () => (
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  maxWidth: '40%',
                  paddingRight: 8,
                }}>
                  <View style={{
                    marginRight: 10,
                    transform: [{ translateY: 5.5 }],
                   }}>
                    <Coins />
                  </View>
                  <ProfileHeaderButton />
                </View>
              ),
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name="recorder"
              options={{
                title: 'Mixing',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name="challenges"
              options={{
                title: 'Challenges',
                href: null,
              }}
            />
            <Tabs.Screen
              name="lessons"
              options={{
                title: 'Lessons',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'school' : 'school-outline'} color={color} size={24} />
                ),
                tabBarItemStyle: {
                  marginLeft: 20
                }
              }}
            />
            <Tabs.Screen
              name="accountPage"
              options={{
                headerShown: false,
                href: null,
              }}
            />
            <Tabs.Screen
              name="recordertest"
              options={{
                title: 'Recorder',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'mic-circle' : 'mic-circle-outline'} color={color} size={24} />
                ),
              }}
            />
          </Tabs>
          <FloatingMiddleButton />
        </>
      </AudioProvider>

    </ChallengesProvider>

  );
}

const styles = StyleSheet.create({
  middleButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#333232',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 2,
  },
  plus: {
    color: 'white',
    fontSize: 25,
    lineHeight: 34,
    marginTop: -2,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 12,
    paddingVertical: 8,
  },
});
