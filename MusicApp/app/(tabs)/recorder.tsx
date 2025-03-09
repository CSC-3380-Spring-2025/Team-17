import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TrackPlayer from "react-native-track-player";

const tracks = [
  {
    id: "track1",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Track 1",
    artist: "Artist 1",
  },
  {
    //comment
    id: "track2",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Track 2",
    artist: "Artist 2",
  },
];

const MixingScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function loadTracks() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
    }
    loadTracks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mixing Page</Text>
      <Button title="Play" onPress={() => { TrackPlayer.play(); setIsPlaying(true); }} />
      <Button title="Pause" onPress={() => { TrackPlayer.pause(); setIsPlaying(false); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
});

export default MixingScreen;


