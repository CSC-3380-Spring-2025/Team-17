import React, { createContext, useContext, useState } from 'react';

interface AudioRecording {
  uri: string;
  name: string;
  isEditing?: boolean;
}

interface AudioContextType {
  recordings: AudioRecording[];
  addRecording: (recording: AudioRecording) => void;
  updateRecordings: (newRecordings: AudioRecording[]) => void;
}

const AudioContext = createContext<AudioContextType>({
  recordings: [],
  addRecording: () => {},
  updateRecordings: () => {},
});



export const AudioProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [recordings, setRecordings] = useState<AudioRecording[]>([]);

  const addRecording = (recording: AudioRecording) => {
    setRecordings(prev => [...prev, recording]);
  };
const updateRecordings = (newRecordings: AudioRecording[]) => {
  setRecordings(newRecordings);
};
  return (
    <AudioContext.Provider value={{ recordings, addRecording, updateRecordings }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);