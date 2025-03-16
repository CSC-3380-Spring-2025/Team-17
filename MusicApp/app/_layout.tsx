import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
    </Stack>
  );
}
