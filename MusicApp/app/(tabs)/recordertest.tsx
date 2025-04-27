// recordertest.tsx
import { useState } from 'react';
import { View, StyleSheet, Button, FlatList, Text, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import { useAudioContext } from './AudioContext';

export default function App() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const { recordings, addRecording, updateRecordings } = useAudioContext();

  if (permissionResponse === null){
    return <Text>Loading...</Text>;
  }

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();

    // Add the new recording to the context
    addRecording({
      uri: uri,
      name: `Recording ${recordings.length + 1}`,
      isEditing: false,
    });
    console.log('Recording stopped and stored at', uri);
  }

  async function playSound(uri) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  }

  function toggleEditing(index: number) {
    const updatedRecordings = [...recordings];
    updatedRecordings[index].isEditing = !updatedRecordings[index].isEditing;
    updateRecordings(updatedRecordings);
  }
  
  function updateRecordingName(index: number, newName: string) {
    const updatedRecordings = [...recordings];
    updatedRecordings[index].name = newName;
    updateRecordings(updatedRecordings);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.recordingItem}>
    {item.isEditing ? (
      <TextInput
        style={styles.recordingNameInput}
        value={item.name}
        onChangeText={(text) => updateRecordingName(index, text)}
        onBlur={() => toggleEditing(index)}
      />
    ) : (
      <Pressable onLongPress={() => toggleEditing(index)}>
        <Text style={styles.recordingName}>{item.name}</Text>
      </Pressable>
    )}
            <Pressable style={styles.playButton} onPress={() => playSound(item.uri)}>
              <Text style={styles.playText}> Play </Text>
            </Pressable>
          </View>
        )}
      />
      
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={recording ? stopRecording : startRecording}
        >
          <Text style={styles.recordingText}>{recording ? '◼' : '⬤'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ... keep the existing styles ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4f5252',
    padding: 10,
  },
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 45,
    left: 160,
    backgroundColor: "#333636",
    alignItems: "center",
    justifyContent: "center",
    
  },
  recordingText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 75,
    color: 'red',
    bottom: 5,
  },
  playButton: {
    
    backgroundColor: 'red',
    
  },
  playText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    color: 'white',
   
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#292b2b',
    borderBottomWidth: 1,
    borderBottomColor: '#4f5252',
  },
  recordingName: {
    color: 'white',
    fontSize: 16,
  },
  recordingNameInput: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    padding: 5,
    width: 150,
  },
});