import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { AudioProvider } from './AudioContext';

export default function TabLayout() {
    return (
        <AudioProvider>
            <Tabs initialRouteName="home"
                screenOptions={{
                    tabBarActiveTintColor: '#ffd33d',
                    headerStyle: {
                        backgroundColor: '#333232',
                        height: 60,
                    },
                    headerBackground: () => (
                        <View style={{
                            backgroundColor: '#333232', 
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            flex: 1
                        }} />
                    ),
                    headerShadowVisible: false,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        marginTop: 10,
                    },
                    tabBarStyle: {
                        backgroundColor: '#333232',
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
                        title: 'Mixing',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'musical-notes' : 'musical-notes-outline'} color={color} size={24} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Recording"
                    options={{
                        title: 'Recorder',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'mic' : 'mic-outline'} color={color} size={24} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="challenges"
                    options={{
                        title: 'Challenges',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'trophy' : 'trophy-outline'} color={color} size={24} />
                        ),
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
                    name="account"
                    options={{
                        title: 'Account',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
                        ),
                    }}
                />
            </Tabs>
        </AudioProvider>
    );
}