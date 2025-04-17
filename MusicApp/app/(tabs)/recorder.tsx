import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  PermissionsAndroid,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator, 
  StyleSheet
} from 'react-native';
import { Audio } from 'expo-av';
import { useAudioContext } from './AudioContext';
import * as FileSystem from 'expo-file-system';

type SoundSource = 'voice' | 'virtual-instrument' | 'local-file';

interface AudioTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
  sourceType: SoundSource;
  recording?: boolean;
}

const LiveMixingPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showRecordingsModal, setShowRecordingsModal] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { recordings } = useAudioContext();

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (sound) {
        sound.unloadAsync();
      }
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [sound, recording]);

  const startRecording = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Cannot record without microphone access');
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
      Alert.alert('Recording Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      if (!uri) {
        throw new Error('Recording URI is null');
      }

      const newTrack: AudioTrack = {
        id: `recording_${Date.now()}`,
        url: uri,
        title: `Recording ${new Date().toLocaleTimeString()}`,
        artist: '',
        sourceType: 'voice',
      };

      setTracks(prev => [...prev, newTrack]);
      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const playTrack = async (uri: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(newSound);

      await newSound.playAsync();
    } catch (error) {
      console.error('Failed to play sound', error);
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const togglePlayback = async (uri: string) => {
    if (isPlaying) {
      await stopPlayback();
    } else {
      await playTrack(uri);
      setIsPlaying(true);
    }
  };

  const deleteTrack = (trackId: string) => {
    setTracks(prev => prev.filter(track => track.id !== trackId));
  };

  const addTrack = (sourceType: SoundSource) => {
    setModalVisible(false);
    
    if (sourceType === 'voice') {
      if (recordings.length === 0) {
        Alert.alert('No Recordings', 'Please create recordings in the Recorder tab first.');
        return;
      }
      setShowRecordingsModal(true);
      return;
    }

    let newTrack: AudioTrack;
    switch (sourceType) {
      case 'virtual-instrument':
        newTrack = {
          id: `instrument_${Date.now()}`,
          url: '',
          title: 'Virtual Instrument',
          artist: '',
          sourceType: 'virtual-instrument',
        };
        break;
      case 'local-file':
      default:
        newTrack = {
          id: `file_${Date.now()}`,
          url: '',
          title: 'Imported Sound',
          artist: '',
          sourceType: 'local-file',
        };
    }

    setTracks(prev => [...prev, newTrack]);
  };

  const renderTrackItem = ({ item }: { item: AudioTrack }) => (
    <View style={styles.trackItem}>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackType}>{item.sourceType}</Text>
      </View>
      <TouchableOpacity 
        style={styles.playButton}
        onPress={() => togglePlayback(item.url)}>
        <Text style={styles.playButtonText}>
          {isPlaying ? '⏸' : '⏵'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteTrack(item.id)}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Mixing</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Track</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tracks}
        renderItem={renderTrackItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.trackList}
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.recordButton]}
          onPress={toggleRecording}>
          <Text style={styles.controlButtonText}>
            {isRecording ? '⏹' : '⏺'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Track</Text>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => addTrack('voice')}>
              <Text style={styles.modalOptionText}>Voice / Audio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => addTrack('virtual-instrument')}>
              <Text style={styles.modalOptionText}>Virtual Instrument</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showRecordingsModal}
        onRequestClose={() => setShowRecordingsModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Recording</Text>
            
            <FlatList
              data={recordings}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    const newTrack: AudioTrack = {
                      id: `voice_${Date.now()}`,
                      url: item.uri,
                      title: item.name,
                      artist: '',
                      sourceType: 'voice',
                    };
                    setTracks(prev => [...prev, newTrack]);
                    setShowRecordingsModal(false);
                  }}>
                  <Text style={styles.modalOptionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowRecordingsModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  trackList: {
    paddingBottom: 80,
  },
  trackItem: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recordingLabel: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  controlButton: {
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: 'red',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 8,
    padding: 16,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalClose: {
    marginTop: 16,
    padding: 16,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#6200ee',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LiveMixingPage;