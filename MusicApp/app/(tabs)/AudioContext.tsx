import React, { createContext, useContext, useState } from 'react';

interface AudioRecording {
  uri: string;
  name: string;
}

interface AudioContextType {
  recordings: AudioRecording[];
  addRecording: (recording: AudioRecording) => void;
}

const AudioContext = createContext<AudioContextType>({
  recordings: [],
  addRecording: () => {},
});

export const AudioProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [recordings, setRecordings] = useState<AudioRecording[]>([]);

  const addRecording = (recording: AudioRecording) => {
    setRecordings(prev => [...prev, recording]);
  };

  return (
    <AudioContext.Provider value={{ recordings, addRecording }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);