import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { auth, db, addCoins } from '@/firebaseConfig';
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
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
  loading: boolean;
};

type ChallengesProviderprops = {
  children: ReactNode;
};

const ChallengesContext = createContext<ChallengesContextType>({ challenges: [], handleTaskCompletion: () => { }, loading:true,});

export const ChallengesProvider = ({ children }: ChallengesProviderprops) => {

  const [userId, setUserId] = useState<string>('');

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const [loading, setLoading]=useState<boolean>(true);

  useEffect(()=>{
            if (auth.currentUser){
              setUserId(auth.currentUser.uid);
              fetchChallenges(auth.currentUser.uid);
            }
          }, []);
          
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchChallenges(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchChallenges = async (userId: string) => {
    setLoading(true);
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if(userDoc.exists()){
      const userData=userDoc.data();
      if(userData.challenges){
        setChallenges(userDoc.data().challenges);
      }else{
        const defaultChallenges: Challenge[]=[
          {title:"Complete 2 quizzes", progress:0, goal:2, reward:10},
          {title:"Save 2 new songs", progress:0, goal:2, reward:10},
         
          {title:"Import 2 new tracks", progress:0, goal:2, reward:10},
          {title:"Login three days in a row", progress:0, goal:3, reward:15},
          {title:"Complete all quizzes", progress:0, goal:13, reward:35},
        ];
        await updateDoc(userRef, {challenges: defaultChallenges});
        setChallenges(defaultChallenges);
      }
      
    }else{
      const defaultChallenges: Challenge[]=[
        {title:"Complete 2 quizzes", progress:0, goal:2, reward:10},
        {title:"Save 2 new songs", progress:0, goal:2, reward:10},
        
        {title:"Import 2 new tracks", progress:0, goal:2, reward:10},
        {title:"Login three days in a row", progress:0, goal:3, reward:15},
        {title:"Complete all quizzes", progress:0, goal:13, reward:35},
      ];
      await setDoc(userRef, {challenges: defaultChallenges});
      setChallenges(defaultChallenges);
    }
    setLoading(false);
  };
  const updateChallengeProgress= async (userId: string, challenges: Challenge[])=>{
    const userRef=doc(db, "users", userId);
    await updateDoc(userRef, {challenges});
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
              alert(`Congrats! You completed the challenge "${challenge.title}"! You earned ${challenge.reward} coins!`);
            }).catch((error) => {
              console.error(`Error adding coins: ${error.message}`);
            });
          }
          const updatedChallenges = prevChallenges.map((ch)=>
          ch.title===challengeTitle?{...ch, progress: updatedProgress}: ch);
          updateChallengeProgress(userId, updatedChallenges);

          return { ...challenge, progress: updatedProgress };
        }
        return challenge;
      })
    );
  };




  return (
    <ChallengesContext.Provider value={{ challenges, handleTaskCompletion, loading }}>
      {children}



    </ChallengesContext.Provider>
  );
};

export const useChallenges = () =>
  useContext(ChallengesContext);