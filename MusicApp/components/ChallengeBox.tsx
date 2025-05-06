import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link} from 'expo-router';
import ProgressBar from '@/components/ProgressBar'
import Reward from '@/components/Reward'
import {useChallenges} from '../app/context/ChallengesContext';

type ChallengeProps={
    title: string;
    progress: number;
    goal: number;
    reward: number;
}

const ChallengeBox=({title, progress, goal, reward}: ChallengeProps)=>
{
    
    return(
        <View style={styles.challengeItem}>
            <Link href="/lessons/0contents" style={styles.title}>
                {title}
            </Link>
            <Text style={styles.progressText}>
                {progress}/{goal}
            </Text>
            <ProgressBar progress={(progress/goal)*100}/>
            <Reward reward={reward}/>
        </View>
    );
};

const styles=StyleSheet.create({
    challengeItem:{
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor:"#000",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Inter_700Bold",
    },
    progressText: {
        fontSize: 14,
        color: "#555",
        fontFamily: "Inter_400Regular",
        marginTop: 5,
    },
});

export default ChallengeBox;