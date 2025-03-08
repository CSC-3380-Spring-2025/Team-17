import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs initialRouteName="home"
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#333232',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
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
            title: 'Recorder',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color = {color} size = {24} />

            ),
        }}
    />
    <Tabs.Screen
        name="challenges"
        options={{
            title: 'Challenges',
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
        name="recordertest"
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