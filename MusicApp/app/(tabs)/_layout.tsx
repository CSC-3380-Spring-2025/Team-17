import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AudioProvider } from './AudioContext';

import { Svg, Path } from 'react-native-svg';
import { usePathname, useRouter } from 'expo-router';

import Streak from '@/components/streak';
import Coins from '@/components/coins';
import { ChallengesProvider } from '../context/ChallengesContext';


const FloatingMiddleButton = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isRecordingPage = pathname.includes('recorder') || pathname.includes('Recording');
  
    if (isRecordingPage) return null;

    return (
      <TouchableOpacity 
      style={[styles.fab]}
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
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor: '#333232',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    flex: 1,
                  }}
                />
              ),
              headerShadowVisible: false,
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 22,
                marginTop: 10,
              },
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
                headerShown: false,
                title: 'Mixing',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name="challenges"
              options={{
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
              name="account"
              options={{
                title: 'Account',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'mic-circle' : 'mic-circle-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name="recordertest"
              options={{
                headerShown: false,
                title: 'RecorderTest',
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
    fab: {
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
    recordingFab: {
        backgroundColor: '#B20000',
        borderWidth: 4,
        borderColor: 'white',
      },
      innerRedDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
      },
});
