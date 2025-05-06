import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { auth, db, addCoins } from '@/firebaseConfig';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


type Challenge = {
  title: string;
  progress: number;
  goal: number;
  reward: number;
};

type ChallengesContextType = {
  challenges: Challenge[];
  handleTaskCompletion: (challengeTitle: string) => void;
};

type ChallengesProviderprops = {
  children: ReactNode;
};

const ChallengesContext = createContext<ChallengesContextType>({ challenges: [], handleTaskCompletion: () => { }, });

export const ChallengesProvider = ({ children }: ChallengesProviderprops) => {

  const [userId, setUserId] = useState<string>('');

  const [challenges, setChallenges] = useState<Challenge[]>([
    { title: "Complete 2 lessons", progress: 1, goal: 2, reward: 10 }, // Change progress manually
    { title: "Create a new track", progress: 0, goal: 1, reward: 5 }, // Change here
    { title: "Use the acoustic guitar in a track", progress: 0, goal: 1, reward: 5 }, // Change here
    { title: "Import a new track", progress: 0, goal: 1, reward: 5 }, // Change here
    { title: "Login three days in a row", progress: 2, goal: 3, reward: 15 }, // Change here
    { title: "Complete all lessons", progress: 0, goal: 13, reward: 35 }, // Change here
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateChallengeProgress = async (userId: string, challenges: Challenge[]) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      challenges: challenges
    });
  };

  const handleTaskCompletion = async (challengeTitle: string) => {

    if (!userId) {
      console.error("User ID is required to add coins.");
      return;
    }

    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.title === challengeTitle) {
          const updatedProgress = challenge.progress + 1;
          console.log(`Updated progress for ${challengeTitle}: ${updatedProgress}`);

          if (updatedProgress === challenge.goal) {
            challenge.progress = 0;
            console.log(`Challenge completed: ${challengeTitle}`);

            addCoins(userId, challenge.reward).then(() => {
              console.log(`Coins added: ${challenge.reward}`);
            }).catch((error) => {
              console.error(`Error adding coins: ${error.message}`);
            });

            alert(`Congrats! You completed the challenge "${challenge.title}"! You earned ${challenge.reward} coins!`);
          }

          return { ...challenge, progress: updatedProgress };
        }
        return challenge;
      })
    );
  };




  return (
    <ChallengesContext.Provider value={{ challenges, handleTaskCompletion }}>
      {children}



    </ChallengesContext.Provider>
  );
};

export const useChallenges = () =>
  useContext(ChallengesContext);