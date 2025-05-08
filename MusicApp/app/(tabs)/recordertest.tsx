import { useState } from 'react';

import { View, StyleSheet, FlatList, Text, TouchableOpacity, Pressable, TextInput } from 'react-native';


import { Audio } from 'expo-av';
import { useAudioContext } from './AudioContext';
import { MaterialIcons } from '@expo/vector-icons';


export default function App() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const { recordings, addRecording, updateRecordings } = useAudioContext();

  if (permissionResponse === null) {
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
    <>
      <View style={styles.container}>
        <FlatList
          data={recordings}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.recordingItem}>
              {item.isEditing ? (
                <TextInput
                  style={[styles.recordingName, styles.recordingNameInput]}
                  value={item.name}
                  onChangeText={(text) => updateRecordingName(index, text)}
                  onBlur={() => toggleEditing(index)}
                  autoFocus
                />
              ) : (
                <View style={styles.recordingInfo}>
                  <Text style={styles.recordingName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => toggleEditing(index)} style={styles.editButton}>
                    <MaterialIcons name="edit" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
              <Pressable
                style={styles.playButton}
                onPress={() => playSound(item.uri)}
                android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
              >
                <MaterialIcons name="play-arrow" size={24} color="white" />

              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="queue-music" size={64} color="#5543A5" />
              <Text style={styles.emptyText}>No recordings yet</Text>
              <Text style={styles.emptySubtext}>Press the mic button to start recording</Text>
            </View>
          }
        />
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            style={[styles.recordButton, recording && styles.recordingActive]}
            onPress={recording ? stopRecording : startRecording}
            activeOpacity={0.8}
          >
            <View style={styles.recordButtonInner}>
              {recording ? (
                <MaterialIcons name="stop" size={36} color="white" />
              ) : (
                <MaterialIcons name="mic" size={36} color="white" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  recordingName: {
    color: '#E0E0E0',
    fontSize: 16,
    marginLeft: 12,
    flexShrink: 1,
  },
  recordingNameInput: {
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    fontSize: 16,
    padding: 5,
    borderRadius: 6,
    width: 160,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00BFA6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5543A5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  recordingActive: {
    backgroundColor: '#FFD54F',
  },
  recordButtonInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50%',
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
  },
  editButton: {
    marginLeft: 12,
    padding: 4,
  },
});
