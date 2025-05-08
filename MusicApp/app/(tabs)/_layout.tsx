import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AudioProvider } from './AudioContext';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Streak from '@/components/streak';
import Coins from '@/components/coins';
import { ChallengesProvider } from '../context/ChallengesContext';


const profileImages = {
  'aesthetic': require('../../assets/profilepictures/aesthetic.jpg'),
  'bluemusic': require('../../assets/profilepictures/bluemusic.jpg'),
  'blues': require('../../assets/profilepictures/blues.jpg'),
  'brain': require('../../assets/profilepictures/brain.jpg'),
  'grass': require('../../assets/profilepictures/grass.jpg'),
  'guitarplayer': require('../../assets/profilepictures/guitarplayer.jpg'),
  'musichead': require('../../assets/profilepictures/musichead.jpg'),
  'musicmedley': require('../../assets/profilepictures/musicmedley.jpg'),
  'piano': require('../../assets/profilepictures/piano.jpg'),
  'purpleheadphone': require('../../assets/profilepictures/purpleheadphone.jpg'),
  'red': require('../../assets/profilepictures/red.jpg'),
  'rock': require('../../assets/profilepictures/rock.jpg'),
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

const TabBarBackground = () => {
  return null;
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
              tabBarInactiveTintColor: '#888',
              tabBarStyle: {
                backgroundColor: '#333232',
                borderTopWidth: 1,
                borderTopColor: '#554A35',
                height: 60,
                position: 'absolute',
                elevation: 0,
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
        </>
      </AudioProvider>

    </ChallengesProvider>

  );
}

const styles = StyleSheet.create({
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
});
