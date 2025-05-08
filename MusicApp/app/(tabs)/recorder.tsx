import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  PermissionsAndroid,
  FlatList,
  ,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioContext } from './AudioContext';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import FileUploader from '@/components/fileUploader';
import { useChallenges } from '../context/ChallengesContext';

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
  isPlaying?: boolean;
  drumSequence?: DrumHit[];
}

interface UploadedDocument {
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
    drumBeats?: DrumHit[];
  }) => void;
}

interface DrumPad {
  id: string;
  sound: Audio.Sound | null;
  label: string;
  uri: any;
  color: string;
}

interface DrumHit {
  time: number;
  padId: string;
}

const SoundSettingsModal: React.FC<SoundSettingsModalProps> = ({ visible, track, onClose, onSave }) => {
  const [volume, setVolume] = useState(track?.volume || 1.0);
  const [rate, setRate] = useState(track?.rate || 1.0);
  const [reverb, setReverb] = useState(track?.reverb || false);
  const [drumBeats, setDrumBeats] = useState<DrumHit[]>(track?.drumSequence || []);

  useEffect(() => {
    if (track) {
      setVolume(track.volume || 1.0);
      setRate(track.rate || 1.0);
      setReverb(track.reverb || false);
      setDrumBeats(track.drumSequence || []);
    }
  }, [track]);

  const handleSave = () => {
    const settings = {
      volume,
      rate,
      reverb
    };

    if (track?.sourceType === 'virtual-instrument') {
      onSave({
        ...settings,
        drumBeats: adjustBeatsForRate(drumBeats, rate)
      });
    } else {
      onSave(settings);
    }
    onClose();
  };

  const adjustBeatsForRate = (beats: DrumHit[], newRate: number): DrumHit[] => {
    if (!track?.rate) return beats;
    const rateRatio = track.rate / newRate;
    return beats.map(beat => ({
      ...beat,
      time: beat.time * rateRatio
    }));
  };

  const updateBeatTime = (index: number, newTime: number) => {
    setDrumBeats(prev => prev.map((beat, i) =>
      i === index ? { ...beat, time: Math.max(0, newTime) } : beat
    ));
  };

  const removeDrumBeat = (index: number) => {
    setDrumBeats(prev => prev.filter((_, i) => i !== index));
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
            <Text style={styles.modalOptionText}>Volume: {volume.toFixed(1)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              value={volume}
              onValueChange={setVolume}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
            />
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.modalOptionText}>Speed: {rate.toFixed(1)}x</Text>
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

          <TouchableOpacity
            style={[styles.modalOption, reverb ? styles.reverbActive : styles.reverbInactive]}
            onPress={() => setReverb(!reverb)}>
            <Text style={styles.modalOptionText}>Reverb: {reverb ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>

          {track?.sourceType === 'virtual-instrument' && (
            <View style={styles.drumBeatSection}>
              <Text style={styles.sectionTitle}>Drum Beats ({drumBeats.length})</Text>
              <ScrollView style={styles.drumBeatList}>
                {drumBeats.map((beat, index) => (
                  <View key={index} style={styles.drumBeatItem}>
                    <Text style={styles.drumBeatText}>{beat.padId}</Text>

                    <TextInput
                      style={styles.timeInput}
                      value={(beat.time / 1000).toFixed(2)}
                      onChangeText={(text) => {
                        const seconds = parseFloat(text) || 0;
                        updateBeatTime(index, seconds * 1000);
                      }}
                      keyboardType="numeric"
                      returnKeyType="done"
                    />

                    <Text style={styles.timeLabel}>seconds</Text>

                    <Slider
                      style={styles.beatTimeSlider}
                      minimumValue={0}
                      maximumValue={5000}
                      step={50}
                      value={beat.time}
                      onValueChange={(value) => updateBeatTime(index, value)}
                      minimumTrackTintColor="#6200ee"
                      maximumTrackTintColor="#000000"
                    />

                    <TouchableOpacity
                      style={styles.removeBeatButton}
                      onPress={() => removeDrumBeat(index)}>
                      <MaterialIcons name="delete" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

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

const LiveMixingPage = () => {
  // central state vars
  const [modalVisible, setModalVisible] = useState(false);
  const [showRecordingsModal, setShowRecordingsModal] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundObjects, setSoundObjects] = useState<Audio.Sound[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack | null>(null);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // song states
  const [songName, setSongName] = useState('');
  const [songNameModalVisible, setSongNameModalVisible] = useState(false);
  const { recordings } = useAudioContext();
  const params = useLocalSearchParams();
  const song = Array.isArray(params.song) ? params.song[0] : params.song;

  // drum states
  const [drumKitModalVisible, setDrumKitModalVisible] = useState(false);
  const [drumTimeouts, setDrumTimeouts] = useState<NodeJS.Timeout[]>([]);
  const [isRecordingDrums, setIsRecordingDrums] = useState(false);
  const [recordedDrums, setRecordedDrums] = useState<DrumHit[]>([]);
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const [drumPads, setDrumPads] = useState<DrumPad[]>([
    {
      id: 'kick',
      sound: null,
      label: 'Kick',
      uri: require('../../assets/sounds/kick.mp3'),
      color: '#4A148C'
    },
    {
      id: 'snare',
      sound: null,
      label: 'Snare',
      uri: require('../../assets/sounds/snare.mp3'),
      color: '#1E3A8A'
    },
    {
      id: 'hihat',
      sound: null,
      label: 'Hi-Hat',
      uri: require('../../assets/sounds/hihat.mp3'),
      color: '#B71C1C'
    },
    {
      id: 'crash',
      sound: null,
      label: 'Crash',
      uri: require('../../assets/sounds/crash.mp3'),
      color: '#2C6B2F'
    },
  ]);


  useEffect(() => {
    const loadDrumSounds = async () => {
      const loadedPads = await Promise.all(
        drumPads.map(async pad => {
          const { sound } = await Audio.Sound.createAsync(pad.uri);
          return { ...pad, sound };
        })
      );
      setDrumPads(loadedPads);
    };

    loadDrumSounds();

    return () => {
      drumPads.forEach(pad => {
        if (pad.sound) {
          pad.sound.unloadAsync();
        }
      });
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      if (soundObjects.length > 0 && isPlayingAll) {
        soundObjects.forEach(async (sound, index) => {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              setTracks(prev => prev.map((track, i) =>
                i === index ? {
                  ...track,
                  positionMillis: status.positionMillis,
                  durationMillis: status.durationMillis
                } : track
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

  // the song persists (hallelujah)
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
    const fileUri = `${FileSystem.documentDirectory}liveMixingPageState_${name}.json`;
    if (Platform.OS === 'web') {
      console.log("File system operations are not directly supported on the web.");
    }
    else {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(state));
    }
  };

  const loadState = async (name: string) => {
    const fileUri = `${FileSystem.documentDirectory}liveMixingPageState_${name}.json`;
    try {
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
    } catch (error) {
      console.warn('Error loading state:', error);
    }
  };

  useEffect(() => {
    if (song) {
      loadState(song);
    }
  }, [song]);

  //recording functions
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
        reverb: false
      };

      setTracks(prev => [...prev, newTrack]);
      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  //playback functions
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
        if (track.sourceType === 'virtual-instrument' && track.drumSequence) {

          playDrumSequence(track, isLooping);
        } else if (track.url) {
          const { sound } = await Audio.Sound.createAsync(
            { uri: track.url },
            {
              shouldPlay: true,
              isLooping: isLooping,
              volume: track.volume || 1.0,
              rate: track.rate || 1.0
            }
          );
          newSoundObjects.push(sound);
        }
      }

      setSoundObjects(newSoundObjects);
      setTracks(prev => prev.map(track => ({ ...track, isPlaying: true })));
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

    if (isPlayingAll) {
      tracks.forEach(track => {
        if (track.sourceType === 'virtual-instrument' && track.drumSequence) {
          playDrumSequence(track, newLoopingState);
        }
      });
    }
  };

  const stopAllPlayback = async () => {
    try {

      await Promise.all(soundObjects.map(sound => sound.stopAsync()));
      setSoundObjects([]);

      drumTimeouts.forEach(timeout => clearTimeout(timeout));
      setDrumTimeouts([]);

      setTracks(prev => prev.map(track => ({ ...track, isPlaying: false })));
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

  //track functions
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
    drumBeats?: DrumHit[];
  }) => {
    if (!selectedTrack) return;

    const updatedTrack = {
      ...selectedTrack,
      volume: settings.volume,
      rate: settings.rate,
      reverb: settings.reverb
    };

    if (selectedTrack.sourceType === 'virtual-instrument' && settings.drumBeats) {
      updatedTrack.drumSequence = settings.drumBeats;
    }

    setTracks(prev => prev.map(track =>
      track.id === selectedTrack.id ? updatedTrack : track
    ));

    const soundIndex = tracks.findIndex(t => t.id === selectedTrack.id);
    if (soundIndex >= 0 && soundIndex < soundObjects.length) {
      const sound = soundObjects[soundIndex];
      sound.setVolumeAsync(settings.volume);
      sound.setRateAsync(settings.rate, true);
    }
  };

  //drum functions
  const playDrumSound = async (pad: DrumPad) => {
    if (pad.sound) {
      await pad.sound.replayAsync();

      if (isRecordingDrums) {
        const currentTime = Date.now();
        const timeFromStart = currentTime - recordingStartTime;
        setRecordedDrums(prev => [...prev, { time: timeFromStart, padId: pad.id }]);
      }
    }
  };

  const startDrumRecording = async () => {
    setIsRecordingDrums(true);
    setRecordedDrums([]);
    setRecordingStartTime(Date.now());
  };

  const stopDrumRecording = async () => {
    if (!isRecordingDrums) return;

    setIsRecordingDrums(false);

    try {
      const newTrack: AudioTrack = {
        id: `drums_${Date.now()}`,
        url: '',
        title: `Drum Loop ${new Date().toLocaleTimeString()}`,
        artist: '',
        sourceType: 'virtual-instrument',
        volume: 1.0,
        rate: 1.0,
        reverb: false,
        drumSequence: [...recordedDrums]
      };

      setTracks(prev => [...prev, newTrack]);
      setDrumKitModalVisible(false);
    } catch (error) {
      console.error('Failed to create drum sequence', error);
    }
  };

  const toggleDrumRecording = () => {
    if (isRecordingDrums) {
      stopDrumRecording();
    } else {
      startDrumRecording();
    }
  };

  const playDrumSequence = async (track: AudioTrack, loop = false) => {
    if (!track.drumSequence) return;


    drumTimeouts.forEach(timeout => clearTimeout(timeout));
    setDrumTimeouts([]);

    try {
      const playBeats = () => {
        const newTimeouts: NodeJS.Timeout[] = [];

        track.drumSequence.forEach(hit => {
          const pad = drumPads.find(p => p.id === hit.padId);
          if (pad && pad.sound) {
            const timeout = setTimeout(() => {
              pad.sound?.replayAsync();
            }, hit.time / (track.rate || 1.0));
            newTimeouts.push(timeout);
          }
        });

        setDrumTimeouts(newTimeouts);

        //loopy d loop
        if (loop) {
          const duration = Math.max(...track.drumSequence.map(b => b.time)) / (track.rate || 1.0);
          const loopTimeout = setTimeout(() => playBeats(), duration);
          setDrumTimeouts(prev => [...prev, loopTimeout]);
        }
      };

      playBeats();
    } catch (error) {
      console.error('Error playing drum sequence:', error);
    }
  };

  //track creation functions
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

    if (sourceType === 'virtual-instrument') {
      setDrumKitModalVisible(true);
      return;
    }

    let newTrack: AudioTrack;
    switch (sourceType) {
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
          reverb: false
        };
    }

    setTracks(prev => [...prev, newTrack]);
  };

  const handleFileUpload = (document: UploadedDocument) => {
    const newTrack: AudioTrack = {
      id: `file_${Date.now()}`,
      url: document.uri,
      title: document.name,
      artist: '',
      sourceType: 'local-file',
      volume: 1.0,
      rate: 1.0,
      reverb: false
    };
    setTracks(prev => [...prev, newTrack]);
  };

  //single track playback
  const playTrack = async (track: AudioTrack) => {
    if (track.sourceType === 'virtual-instrument' && track.drumSequence) {
      await playDrumSequence(track);
      setTracks(prev => prev.map(t =>
        t.id === track.id ? { ...t, isPlaying: true } : t
      ));
      return;
    }

    try {
      const sound = await Audio.Sound.createAsync(
        { uri: track.url },
        { shouldPlay: true, volume: track.volume || 1.0, rate: track.rate || 1.0 }
      );

      setTracks(prev => prev.map(t =>
        t.id === track.id ? { ...t, isPlaying: true } : t
      ));

      sound.sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          setTracks(prev => prev.map(t =>
            t.id === track.id ? { ...t, isPlaying: false } : t
          ));
        }
      });

      setSoundObjects(prev => [...prev, sound.sound]);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const stopTrack = (track: AudioTrack) => {
    const soundObject = soundObjects.find(sound => sound._loaded && sound._loading === false);
    if (soundObject) {
      soundObject.stopAsync();
    }

    setTracks(prev => prev.map(t =>
      t.id === track.id ? { ...t, isPlaying: false } : t
    ));
  };

  //the managers
  const handleSaveSong = () => {
    setSongNameModalVisible(true);
  };

  const handleSaveSongName = () => {
    if (songName) {
      saveState(songName);
      Alert.alert(`Song "${songName}" saved successfully!`);
      setSongNameModalVisible(false);
      setSongName('');
    }
  };

  const { handleTaskCompletion } = useChallenges();

  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [editingTrackName, setEditingTrackName] = useState('');

  const startEditingTrack = (track: AudioTrack) => {
    setEditingTrackId(track.id);
    setEditingTrackName(track.title);
  };

  const saveTrackName = () => {
    if (editingTrackId) {
      setTracks(prev => prev.map(track =>
        track.id === editingTrackId ? { ...track, title: editingTrackName } : track
      ));
      setEditingTrackId(null);
    }
  };

  const cancelEditing = () => {
    setEditingTrackId(null);
  };


  const renderTrackItem = ({ item }: { item: AudioTrack }) => (
    <View style={styles.trackItem}>
      <View style={styles.trackInfo}>
        {editingTrackId === item.id ? (
          <View style={styles.recordingInfo}>
            <TextInput
              style={[styles.recordingName, styles.recordingNameInput]}
              value={editingTrackName}
              onChangeText={setEditingTrackName}
              onBlur={saveTrackName}
              onSubmitEditing={saveTrackName}
              autoFocus
            />
            <TouchableOpacity
              onPress={cancelEditing}
              style={styles.editButton}
            >
              <MaterialIcons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.recordingInfo}>
            <Text style={styles.recordingName}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => startEditingTrack(item)}
              style={styles.editButton}
            >
              <MaterialIcons name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.trackType}>{item.sourceType}</Text>

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

      <View style={styles.trackButtons}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => item.isPlaying ? stopTrack(item) : playTrack(item)}>
          <MaterialIcons
            name={item.isPlaying ? 'stop' : 'play-arrow'}
            size={20}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => openSettingsModal(item)}>
          <MaterialIcons name="settings" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTrack(item.id)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Track</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleSaveSong}>
          <MaterialIcons name="save" size={24} color="white" />
          <Text style={styles.addButtonText}>Save Song</Text>
        </TouchableOpacity>
      </View>

      {tracks.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="queue-music" size={64} color="#5543A5" />
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
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.modalTitle}>Add New Track</Text>

              <TouchableOpacity style={styles.modalOption} onPress={() => addTrack('voice')}>
                <MaterialIcons name="mic" size={24} color="white" />
                <Text style={styles.modalOptionText}>Voice Recording</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => addTrack('virtual-instrument')}>
                <MaterialIcons name="piano" size={24} color="white" />
                <Text style={styles.modalOptionText}>Virtual Instrument</Text>
              </TouchableOpacity>

              <FileUploader onFileUpload={handleFileUpload} setModalVisible={setModalVisible} />

              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
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
                      volume: 1.0,
                      rate: 1.0,
                      reverb: false
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={songNameModalVisible}
        onRequestClose={() => setSongNameModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Song Name</Text>
            <TextInput
              placeholder="Song Name"
              placeholderTextColor="#999"
              value={songName}
              onChangeText={setSongName}
              style={styles.songNameInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => {
                  handleSaveSongName();
                  handleTaskCompletion("Save 2 new songs");
                }}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setSongNameModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={drumKitModalVisible}
        onRequestClose={() => setDrumKitModalVisible(false)}
        supportedOrientations={['landscape']}
      >
        <View style={styles.drumKitContainer}>
          <Text style={styles.drumKitTitle}>Virtual Drum Kit</Text>

          <View style={styles.drumPadGrid}>
            {drumPads.map(pad => (
              <TouchableOpacity
                key={pad.id}
                style={[styles.drumPad, { backgroundColor: pad.color }]}
                onPress={() => playDrumSound(pad)}
              >
                <Text style={styles.drumPadLabel}>{pad.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.drumRecordButton, isRecordingDrums && styles.drumRecordButtonActive]}
            onPress={toggleDrumRecording}
          >
            <MaterialIcons
              name={isRecordingDrums ? 'stop' : 'fiber-manual-record'}
              size={24}
              color="white"
            />
            <Text style={styles.drumRecordButtonText}>
              {isRecordingDrums ? 'Stop Recording' : 'Record Drum Loop'}
            </Text>
          </TouchableOpacity>

          {isRecordingDrums && (
            <Text style={styles.recordingStatusText}>
              Recording... {recordedDrums.length} hits
            </Text>
          )}

          <TouchableOpacity
            style={styles.drumKitCloseButton}
            onPress={() => setDrumKitModalVisible(false)}
          >
            <Text style={styles.drumKitCloseButtonText}>Close Drum Kit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <SoundSettingsModal
        visible={settingsModalVisible}
        track={selectedTrack}
        onClose={() => setSettingsModalVisible(false)}
        onSave={saveTrackSettings}
      />
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1D1F',
    paddingBottom: 50
  },
  timeInput: {
    width: 60,
    height: 30,
    backgroundColor: '#1C1D1F',
    color: 'white',
    borderWidth: 1,
    borderColor: '#4243FF',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  timeLabel: {
    color: 'white',
    fontSize: 12,
    width: 60,
  },
  drumBeatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  beatTimeSlider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  drumBeatSection: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  drumBeatList: {
    maxHeight: 150,
    backgroundColor: '#1C1D1F',
    borderRadius: 8,
    padding: 8,
  },
  drumBeatText: {
    color: 'white',
    fontSize: 14,
  },
  removeBeatButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#E53935',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#252628',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2B2D',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#5543A5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateSubtext: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  trackList: {
    paddingBottom: 120,
    paddingHorizontal: 12,
  },
  trackItem: {
    backgroundColor: '#252628',
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
  trackType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  trackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
  trackButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  recordingName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    flexShrink: 1,
  },
  recordingNameInput: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    padding: 5,
    width: 150,
    borderRadius: 4,
  },
  editButton: {
    marginLeft: 12,
    padding: 4,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00BFA6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252628',
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
    paddingBottom: 70,
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
    backgroundColor: '#E53935',
  },
  playAllButton: {
    backgroundColor: '#5543A5',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  loopButton: {
    backgroundColor: '#00BFA6',
  },
  loopButtonActive: {
    backgroundColor: '#FFD54F',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#252628',
    width: '85%',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#1C1D1F',
    marginBottom: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 12,
  },
  modalClose: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#1C1D1F',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#4243FF',
    textAlign: 'center',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#5543A5',
  },
  cancelButton: {
    backgroundColor: '#1C1D1F',
    borderWidth: 1,
    borderColor: '#4243FF',
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  reverbActive: {
    backgroundColor: '#00BFA6',
  },
  reverbInactive: {
    backgroundColor: '#1C1D1F',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  songNameInput: {
    height: 50,
    borderColor: '#4243FF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: 'white',
    marginBottom: 20,
    backgroundColor: '#1C1D1F',
  },
  drumKitContainer: {
    flex: 1,
    backgroundColor: '#1C1D1F',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drumKitTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  drumPadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  drumPad: {
    width: Dimensions.get('window').width / 4 - 30,
    height: Dimensions.get('window').width / 4 - 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 4,
  },
  drumPadLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drumRecordButton: {
    flexDirection: 'row',
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drumRecordButtonActive: {
    backgroundColor: '#E64A19',
  },
  drumRecordButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  recordingStatusText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  drumKitCloseButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#616161',
    borderRadius: 8,
  },
  drumKitCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LiveMixingPage;