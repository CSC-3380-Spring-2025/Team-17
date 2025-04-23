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
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import { Audio } from 'expo-av';
import { useAudioContext } from './AudioContext';
import { MaterialIcons } from '@expo/vector-icons';

type SoundSource = 'voice' | 'virtual-instrument' | 'local-file';

interface AudioTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
  sourceType: SoundSource;
}

const LiveMixingPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showRecordingsModal, setShowRecordingsModal] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundObjects, setSoundObjects] = useState<Audio.Sound[]>([]);
  const { recordings } = useAudioContext();
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    return () => {
      soundObjects.forEach(sound => {
        sound.unloadAsync().catch(error => console.warn('Failed to unload sound', error));
      });
      if (recording) {
        recording.stopAndUnloadAsync().catch(error => console.warn('Failed to stop recording', error));
      }
    };
  }, [soundObjects, recording]);

  useEffect(() => {
    soundObjects.forEach(sound => {
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish && isLooping) {
          sound.replayAsync();
        }
      });
    });
  }, [soundObjects, isLooping]);

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
          })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

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

  const playAllTracks = async () => {
    if (isPlayingAll) {
      await stopAllPlayback();
      setIsPlayingAll(false);
      setIsLooping(false);
      return;
    }

    setIsPlayingAll(true);

    try {
      await stopAllPlayback();

      const newSoundObjects: Audio.Sound[] = [];

      for (const track of tracks) {
        if (track.url) {
          const { sound } = await Audio.Sound.createAsync(
            { uri: track.url },
            { shouldPlay: true, isLooping: isLooping }
          );
          newSoundObjects.push(sound);
          await sound.playAsync();
        }
      }

      setSoundObjects(newSoundObjects);
    } catch (error) {
      console.error('Failed to play all tracks', error);
      setIsPlayingAll(false);
    }
  };

  const toggleLooping = () => {
    const newLoopingState = !isLooping;
    setIsLooping(newLoopingState);

    soundObjects.forEach(sound => {
      sound.setIsLoopingAsync(newLoopingState);
    });

    if (newLoopingState && !isPlayingAll) {
      playAllTracks();
    }
  };

  const stopAllPlayback = async () => {
    try {
      await Promise.all(soundObjects.map(sound => sound.stopAsync()));
      setSoundObjects([]);
    } catch (error) {
      console.error('Failed to stop playback', error);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
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
        <Text style={styles.trackTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
        <View style={styles.trackMeta}>
          <View style={[
            styles.sourceBadge, 
            item.sourceType === 'voice' ? styles.voiceBadge :
            item.sourceType === 'virtual-instrument' ? styles['virtual-instrumentBadge'] :
            styles['local-fileBadge']
          ]}>
            <Text style={styles.sourceBadgeText}>{item.sourceType.replace('-', ' ')}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteTrack(item.id)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Track</Text>
        </TouchableOpacity>
      </View>

      {tracks.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="queue-music" size={64} color="#4243FF" />
          <Text style={styles.emptyStateText}>No tracks added yet</Text>
          <Text style={styles.emptyStateSubtext}>Add your first track to begin mixing</Text>
        </View>
      ) : (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.trackList}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.controls}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={[styles.controlButton, styles.recordButton]} 
            onPress={toggleRecording}
            activeOpacity={0.7}
          >
            <MaterialIcons name={isRecording ? "stop" : "fiber-manual-record"} size={28} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          style={[styles.controlButton, styles.playAllButton]} 
          onPress={playAllTracks}
          activeOpacity={0.7}
        >
          <MaterialIcons name={isPlayingAll ? "stop" : "play-arrow"} size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isLooping ? styles.loopButtonActive : styles.loopButton]}
          onPress={toggleLooping}
          activeOpacity={0.7}
        >
          <MaterialIcons name="loop" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Track</Text>

            <TouchableOpacity style={styles.modalOption} onPress={() => addTrack('voice')}>
              <Text style={styles.modalOptionText}>Import Track</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={() => addTrack('virtual-instrument')}>
              <Text style={styles.modalOptionText}>Virtual Instrument</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={showRecordingsModal} onRequestClose={() => setShowRecordingsModal(false)}>
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

            <TouchableOpacity style={styles.modalClose} onPress={() => setShowRecordingsModal(false)}>
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
    backgroundColor: '#D2D2D2',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2B2D',
    backgroundColor: '#1C1D1F',
  },
  addButton: {
    backgroundColor: '#5A5A5A',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  emptyState: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 40,
  },  
  emptyStateText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateSubtext: {
    color: '#000',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  trackList: {
    paddingBottom: 120,
    paddingHorizontal: 12,
  },
  trackItem: {
    backgroundColor: '#1E1F21',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  trackInfo: {
    flex: 1,
    marginRight: 12,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  trackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  sourceBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  'voiceBadge': {
    backgroundColor: '#D32F2F',
  },
  'virtual-instrumentBadge': {
    backgroundColor: '#388E3C',
  },
  'local-fileBadge': {
    backgroundColor: '#F57C00',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1D1F',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2B2D',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recordButton: {
    backgroundColor: '#D32F2F',
  },
  playAllButton: {
    backgroundColor: '#388E3C',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  loopButton: {
    backgroundColor: '#4243FF',
  },
  loopButtonActive: {
    backgroundColor: '#F57C00',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#1C1D1F',
    width: '85%',
    borderRadius: 16,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  modalOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#252628',
    marginBottom: 12,
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
  },
  modalClose: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#252628',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#4243FF',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default LiveMixingPage;