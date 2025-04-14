import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs initialRouteName="home"
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#333232',
                height: 75,
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
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color = {color} size = {24} />

            ),
        }}
    />
   
    <Tabs.Screen
        name="recorder"
        options={{
            title: 'Mixing',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color = {color} size = {24} />

            ),
        }}
    />
    <Tabs.Screen
        name="challenges"
        options={{
            href:null
        }}
    />
    <Tabs.Screen
        name="lessons"
        options={{
            title: 'Lessons',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color = {color} size = {24} />

            ),
        }}
    />
     <Tabs.Screen
        name="account"
        options={{
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color = {color} size = {24} />

            ),
        }}
    />
    <Tabs.Screen
        name="Recording"
        options={{
            title: 'RecorderTest',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color = {color} size = {24} />

            ),
        }}
    />
    </Tabs>
    );
}