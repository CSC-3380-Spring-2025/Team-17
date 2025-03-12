import { Text, View, StyleSheet } from 'react-native';

export default function ChallengesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Challenges go here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2D2D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#3333333',
  },
});