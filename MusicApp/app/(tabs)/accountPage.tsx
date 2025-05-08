import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, ImageSourcePropType } from 'react-native';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const profilePictureKeys = [
  'aesthetic',
  'bluemusic',
  'blues',
  'brain',
  'grass',
  'guitarplayer',
  'musichead',
  'musicmedley',
  'piano',
  'purpleheadphone',
  'red',
  'rock',
] as const;

type ProfilePictureKey = typeof profilePictureKeys[number];

type ProfileImages = {
  [key in ProfilePictureKey]: ImageSourcePropType;
};

const profileImages: ProfileImages = {
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

const AccountPage = () => {
  const [selectedProfilePic, setSelectedProfilePic] = useState<ProfilePictureKey | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPictureSelector, setShowPictureSelector] = useState(false);
  const [displayName, setDisplayName] = useState<string>('');

  const auth = getAuth();
  const db = getFirestore();

  const isProfilePictureKey = (key: string): key is ProfilePictureKey => {
    return profilePictureKeys.includes(key as ProfilePictureKey);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email || '');
        setDisplayName(user.displayName || '');
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().profilePicture) {
          const picKey = userDoc.data().profilePicture.replace('.jpg', '');
          if (isProfilePictureKey(picKey)) {
            setSelectedProfilePic(picKey);
          }
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      if (selectedProfilePic) {
        await updateDoc(doc(db, 'users', user.uid), {
          profilePicture: `${selectedProfilePic}.jpg`,
        });
      }

      if (displayName && displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: displayName
        });
      }

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (newPassword.length < 6) {
          throw new Error('Password should be at least 6 characters');
        }

        const credential = EmailAuthProvider.credential(
          user.email || '',
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }

      setIsEditing(false);
      setShowPictureSelector(false);
      Alert.alert('Success', 'Your changes have been saved');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfilePicture = () => {
    return (
      <View style={styles.profileContainer}>
        {!selectedProfilePic ? (
          <View style={[styles.profilePicture, styles.emptyProfile]}>
            <Text style={styles.initials}>
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        ) : (
          <Image source={profileImages[selectedProfilePic]} style={styles.profilePicture} />
        )}
        <Text style={styles.displayName}>
          {displayName || 'User'}
        </Text>
      </View>
    );
  };

  const renderProfilePictureSelector = () => {
    return (
      <View style={styles.profilePictureContainer}>
        <Text style={styles.selectorTitle}>Choose a New Profile Picture</Text>
        <ScrollView contentContainerStyle={styles.profilePictureLayout}>
          {profilePictureKeys.map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                setSelectedProfilePic(key);
                setShowPictureSelector(false);
              }}
            >
              <Image
                source={profileImages[key]}
                style={[
                  styles.thumbnail,
                  selectedProfilePic === key && styles.selectedThumbnail
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => isEditing && setShowPictureSelector(true)}
            disabled={!isEditing}
          >
            {renderProfilePicture()}
            {isEditing && (
              <Text style={styles.changePhotoText}>Change Profile Picture</Text>
            )}
          </TouchableOpacity>
        </View>

        {showPictureSelector ? (
          renderProfilePictureSelector()
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.textBox}
                  value={userEmail}
                  editable={false}
                />
              </View>

              {isEditing ? (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Display Name</Text>
                    <TextInput
                      style={styles.textBox}
                      value={displayName}
                      onChangeText={setDisplayName}
                      placeholder="Enter your display name"
                      autoCapitalize="words"
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Current Password</Text>
                    <TextInput
                      style={styles.textBox}
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                      secureTextEntry
                      placeholder="Enter current password"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                      style={styles.textBox}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry
                      placeholder="Leave empty to keep current"
                      autoCapitalize="none"
                    />
                  </View>

                  {newPassword ? (
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Confirm New Password</Text>
                      <TextInput
                        style={styles.textBox}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholder="Confirm new password"
                        autoCapitalize="none"
                      />
                    </View>
                  ) : null}
                </>
              ) : (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.textBox}
                    value="*********"
                    editable={false}
                    secureTextEntry
                  />
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              {isEditing ? (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton, isLoading && styles.disabledButton]}
                    onPress={handleSaveChanges}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Save Changes</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => {
                      setIsEditing(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setShowPictureSelector(false);
                    }}
                    disabled={isLoading}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1C1D1F',
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#333232',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    marginBottom: 20,
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 25,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  emptyProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  initials: {
    fontSize: 48,
    fontWeight: '600',
    color: '#777',
  },
  changePhotoText: {
    color: '#B39DDB',
    marginBottom: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#555',
  },
  textBox: {
    width: '100%',
    height: 48,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fafafa',
    fontSize: 15,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#5543A5',
  },
  saveButton: {
    backgroundColor: '#5543A5',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 15,
  },
  profilePictureContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFF',
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  profilePictureLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#5543A5',
  },
  profileContainer: {
    alignItems: 'center',
  },
  displayName: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AccountPage;