import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  FlatList,
  SafeAreaView,
} from 'react-native';
import TrackPlayer, {
  State as TrackPlayerState,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

type SoundSource = 'voice' | 'virtual-instrument' | 'local-file';

interface AudioTrack extends Track {
  sourceType: SoundSource;
  recording?: boolean;
}

const LiveMixingPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const playbackState = usePlaybackState();


  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
      });
    };

    setupPlayer();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  useEffect(() => {
    const checkIsPlaying = async () => {
      const state = await TrackPlayer.getState();
      setIsPlaying(state === TrackPlayerState.Playing);
    };

    checkIsPlaying();
  }, [playbackState]);


  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Permission error:', err);
        return false;
      }
    }
    return true; 
  };

  const startRecording = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      console.log('Microphone permission denied');
      return;
    }

    try {
      const path = Platform.select({
        ios: undefined, 
        android: `${sdcardDir}/sound_${Date.now()}.mp3`,
      });

      const uri = await audioRecorderPlayer.startRecorder(path);
      setIsRecording(true);

      
      const newTrack: AudioTrack = {
        id: `recording_${Date.now()}`,
        url: uri,
        title: 'Recording in progress',
        artist: '',
        sourceType: 'voice',
        recording: true,
      };

      setTracks(prev => [...prev, newTrack]);
    } catch (error) {
      console.error('Recording failed:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);


      setTracks(prev =>
        prev.map(track =>
          track.recording
            ? {
                ...track,
                url: result,
                title: `Recording ${new Date().toLocaleTimeString()}`,
                recording: false,
              }
            : track
        )
      );
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAllTracks = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {

      const playableTracks = tracks.filter(t => !t.recording);
      
      if (playableTracks.length > 0) {
        await TrackPlayer.reset();
        await TrackPlayer.add(playableTracks);
        await TrackPlayer.play();
      }
    }
  };

  const rewindAllTracks = async () => {
    await TrackPlayer.seekTo(0);
    if (isPlaying) {
      await TrackPlayer.play();
    }
  };

  const addTrack = (sourceType: SoundSource) => {
    setModalVisible(false);
    

    
    let newTrack: AudioTrack;
    switch (sourceType) {
      case 'voice':
        newTrack = {
          id: `voice_${Date.now()}`,
          url: '', 
          title: 'Voice Track',
          artist: '',
          sourceType: 'voice',
        };
        break;
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
      <Text style={styles.trackTitle}>{item.title}</Text>
      <Text style={styles.trackType}>{item.sourceType}</Text>
      {item.recording && <Text style={styles.recordingLabel}>Recording...</Text>}
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
          style={styles.controlButton}
          onPress={rewindAllTracks}>
          <Text style={styles.controlButtonText}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.recordButton]}
          onPress={toggleRecording}>
          <Text style={styles.controlButtonText}>
            {isRecording ? '⏹' : '⏺'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={playAllTracks}>
          <Text style={styles.controlButtonText}>
            {isPlaying ? '⏸' : '⏵'}
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
              style={styles.modalOption}
              onPress={() => addTrack('local-file')}>
              <Text style={styles.modalOptionText}>Import from Local Files</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}>
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
