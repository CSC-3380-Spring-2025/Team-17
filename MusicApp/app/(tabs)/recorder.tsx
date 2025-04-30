import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import FileUploader from '@/components/fileUploader'
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
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useAudioContext } from './AudioContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';

type SoundSource = 'voice' | 'virtual-instrument' | 'local-file';

interface AudioTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
  sourceType: SoundSource;
  positionMillis?: number;
  durationMillis?: number;
  volume?: number;
  rate?: number;
  reverb?: boolean;
  fadeIn?: number;
  fadeOut?: number;
}

interface uploadedDocument{
  name: string;
  mimeType: string;
  size: number;
  uri: string;
}

interface SoundSettingsModalProps {
  visible: boolean;
  track: AudioTrack | null;
  onClose: () => void;
  onSave: (settings: {
    volume: number;
    rate: number;
    reverb: boolean;
    fadeIn: number;
    fadeOut: number;
  }) => void;
}

const SoundSettingsModal: React.FC<SoundSettingsModalProps> = ({ visible, track, onClose, onSave }) => {
  const [volume, setVolume] = useState(track?.volume || 1.0);
  const [rate, setRate] = useState(track?.rate || 1.0);
  const [reverb, setReverb] = useState(track?.reverb || false);
  const [fadeIn, setFadeIn] = useState(track?.fadeIn || 0);
  const [fadeOut, setFadeOut] = useState(track?.fadeOut || 0);

  useEffect(() => {
    if (track) {
      setVolume(track.volume || 1.0);
      setRate(track.rate || 1.0);
      setReverb(track.reverb || false);
      setFadeIn(track.fadeIn || 0);
      setFadeOut(track.fadeOut || 0);
    }
  }, [track]);

  const handleSave = () => {
    onSave({
      volume,
      rate,
      reverb,
      fadeIn,
      fadeOut
    });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sound Settings: {track?.title}</Text>
          
          <View style={styles.sliderContainer}>
            <Text>Volume: {volume.toFixed(1)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={2}
              step={0.1}
              value={volume}
              onValueChange={setVolume}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
            />
          </View>
          
          <View style={styles.sliderContainer}>
            <Text>Speed: {rate.toFixed(1)}x</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2}
              step={0.1}
              value={rate}
              onValueChange={setRate}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
            />
          </View>
          
          <View style={styles.sliderContainer}>
            <Text>Fade In: {fadeIn}s</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={0.5}
              value={fadeIn}
              onValueChange={setFadeIn}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
            />
          </View>
          
          <View style={styles.sliderContainer}>
            <Text>Fade Out: {fadeOut}s</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={0.5}
              value={fadeOut}
              onValueChange={setFadeOut}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
            />
          </View>
          
          <TouchableOpacity
            style={[styles.modalOption, reverb ? styles.reverbActive : styles.reverbInactive]}
            onPress={() => setReverb(!reverb)}>
            <Text style={styles.modalOptionText}>Reverb: {reverb ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>
  );
};

const LiveMixingPage = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showRecordingsModal, setShowRecordingsModal] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundObjects, setSoundObjects] = useState<Audio.Sound[]>([]);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack | null>(null);
  const [songName, setSongName]= useState('');
  const [songNameModalVisible, setSongNameModalVisible]= useState(false);
  const { recordings } = useAudioContext();
  const params = useLocalSearchParams();
  const song=Array.isArray(params.song)? params.song[0]:params.song;
  

  const saveState = async (name: string) => {
    const state = {
      tracks,
      isRecording,
      isPlayingAll,
      isLooping,
      selectedTrack,
      settingsModalVisible,
      modalVisible,
      showRecordingsModal,
    };
    const fileUri = 
    `${FileSystem.documentDirectory}liveMixingPageState_${name}.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(state));
  };

  const loadState = async (name: string) => {
    const fileUri=
    `${FileSystem.documentDirectory}liveMixingPageState_${name}.json`;
    const savedState = await FileSystem.readAsStringAsync(fileUri);
    if (savedState) {
      const state = JSON.parse(savedState);
      setTracks(state.tracks);
      setIsRecording(state.isRecording);
      setIsPlayingAll(state.isPlayingAll);
      setIsLooping(state.isLooping);
      setSelectedTrack(state.selectedTrack);
      setSettingsModalVisible(state.settingsModalVisible);
      setModalVisible(state.modalVisible);
      setShowRecordingsModal(state.showRecordingsModal);
    }
  };
  useEffect(()=>{
    if(song){
      loadState(song);
    }
  }, [song]);
  const handleSaveSong=()=>{
    setSongNameModalVisible(true);
  };
  const handleSaveSongName=()=>{
    if(songName){
      saveState(songName);
      Alert.alert(`Song "${songName}" saved successfully!`);
      setSongNameModalVisible(false);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundObjects.length > 0 && isPlayingAll) {
        soundObjects.forEach(async (sound, index) => {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              setTracks(prev => prev.map((track, i) => 
                i === index ? { ...track, positionMillis: status.positionMillis, durationMillis: status.durationMillis } : track
              ));
            }
          } catch (error) {
            console.warn('Failed to get sound status', error);
          }
        });
      }
    }, 175); 

    return () => clearInterval(interval);
  }, [soundObjects, isPlayingAll]);

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
        volume: 1.0,
        rate: 1.0,
        reverb: false,
        fadeIn: 0,
        fadeOut: 0
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
            { 
              shouldPlay: true,
              isLooping: isLooping,
              volume: track.volume || 1.0,
              rate: track.rate || 1.0
            }
          );

          
          if (track.fadeIn && track.fadeIn > 0) {
            await sound.setVolumeAsync(0);
            sound.setVolumeAsync(track.volume || 1.0, { duration: track.fadeIn * 1000 });
          }

          newSoundObjects.push(sound);
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

  const openSettingsModal = (track: AudioTrack) => {
    setSelectedTrack(track);
    setSettingsModalVisible(true);
  };

  const saveTrackSettings = (settings: {
    volume: number;
    rate: number;
    reverb: boolean;
    fadeIn: number;
    fadeOut: number;
  }) => {
    if (!selectedTrack) return;
    
    setTracks(prev => prev.map(track => 
      track.id === selectedTrack.id ? { ...track, ...settings } : track
    ));

    
    const soundIndex = tracks.findIndex(t => t.id === selectedTrack.id);
    if (soundIndex >= 0 && soundIndex < soundObjects.length) {
      const sound = soundObjects[soundIndex];
      sound.setVolumeAsync(settings.volume);
      sound.setRateAsync(settings.rate, true);
      
    }
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
          volume: 1.0,
          rate: 1.0,
          reverb: false,
          fadeIn: 0,
          fadeOut: 0
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
          volume: 1.0,
          rate: 1.0,
          reverb: false,
          fadeIn: 0,
          fadeOut: 0
        };
    }

    setTracks(prev => [...prev, newTrack]);
  };

  const handleFileUpload = (document: uploadedDocument)=>{
    const newTrack:AudioTrack={
      id:`file_${Date.now()}`,
      url: document.uri,
      title: document.name,
      artist: '',
      sourceType: 'local-file',
    };
    setTracks(prev=>[...prev, newTrack]);
  };
  const renderTrackItem = ({ item }: { item: AudioTrack }) => (
    <View style={styles.trackItem}>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackType}>{item.sourceType}</Text>
        
        {/* Progress bar */}
        {item.durationMillis && item.positionMillis !== undefined && (
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar,
                { width: `${(item.positionMillis / item.durationMillis) * 100}%` }
              ]} 
            />
          </View>
        )}
      </View>
      
      <View style={styles.trackButtons}>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => openSettingsModal(item)}>
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => deleteTrack(item.id)}>
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleSaveSong}>
          <Text style={styles.addButtonText}>Save Song</Text>
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

        <TouchableOpacity
          style={[styles.controlButton, styles.playAllButton]}
          onPress={playAllTracks}>
          <Text style={styles.controlButtonText}>
            {isPlayingAll ? '⏹' : '▶️'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isLooping ? styles.loopButtonActive : styles.loopButton]}
          onPress={toggleLooping}>
          <Text style={styles.controlButtonText}>
            {isLooping ? '🔁' : '↻'}
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
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            
            <FileUploader onFileUpload={handleFileUpload}
             setModalVisible={setModalVisible}/>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
            </ScrollView>
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
                      volume: 1.0,
                      rate: 1.0,
                      reverb: false,
                      fadeIn: 0,
                      fadeOut: 0
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={songNameModalVisible}
        onRequestClose={()=>setSongNameModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Song Name</Text>
            <TextInput
              placeholder="Song Name"
              value={songName}
              onChangeText={setSongName}
              style={{height:40, borderColor:'gray', borderWidth:1, marginBottom:20}}/>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveSongName}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={()=> setSongNameModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <SoundSettingsModal
        visible={settingsModalVisible}
        track={selectedTrack}
        onClose={() => setSettingsModalVisible(false)}
        onSave={saveTrackSettings}
      />
    </SafeAreaView>
  );
});

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
  trackButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200ee',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  recordButton: {
    backgroundColor: 'red',
  },
  playAllButton: {
    backgroundColor: '#4CAF50',
  },
  loopButton: {
    backgroundColor: '#6200ee',
  },
  loopButtonActive: {
    backgroundColor: '#FF9800',
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
  reverbActive: {
    backgroundColor: '#4CAF50',
  },
  reverbInactive: {
    backgroundColor: '#f5f5f5',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#6200ee',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
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
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  
scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default LiveMixingPage;