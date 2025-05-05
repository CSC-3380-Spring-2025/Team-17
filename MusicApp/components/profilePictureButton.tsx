import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const profileImages = {
  'aesthetic': require('@/assets/profilepictures/aesthetic.jpg'),
  'bluemusic': require('@/assets/profilepictures/bluemusic.jpg'),
  'blues': require('@/assets/profilepictures/blues.jpg'),
  'brain': require('@/assets/profilepictures/brain.jpg'),
  'grass': require('@/assets/profilepictures/grass.jpg'),
  'guitarplayer': require('@/assets/profilepictures/guitarplayer.jpg'),
  'musichead': require('@/assets/profilepictures/musichead.jpg'),
  'musicmedley': require('@/assets/profilepictures/musicmedley.jpg'),
  'piano': require('@/assets/profilepictures/piano.jpg'),
  'purpleheadphone': require('@/assets/profilepictures/purpleheadphone.jpg'),
  'red': require('@/assets/profilepictures/red.jpg'),
  'rock': require('@/assets/profilepictures/rock.jpg'),
};

export default function ProfilePictureButton() {
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
}

const styles = StyleSheet.create({
  profileButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 30,
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
