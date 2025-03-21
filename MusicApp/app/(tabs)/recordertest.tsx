import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recordings, setRecordings] = useState([]);

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

    setRecordings((prevRecordings) => [
      ...prevRecordings,
      {
        uri: uri,
        name: `Recording ${prevRecordings.length + 1}`,
      },
    ]);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        inverted={true}
        renderItem={({ item }) => (
          <View style={styles.recordingItem}>
            <Text style={styles.recordingName}>{item.name}</Text>
            <Button title="Play" onPress={() => playSound(item.uri)} />
          </View>
        )}
      />
      <View style={styles.recordButtonContainer}>
        <View style={styles.recordButtonOuter}>
          <TouchableOpacity
            style={[styles.recordButton, recording && styles.recordingActive]}
            onPress={recording ? stopRecording : startRecording}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    padding: 0,
  },
  recordButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  recordButtonOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  recordingActive: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  recordingName: {
    color: 'white',
    fontSize: 16,
  },
});
