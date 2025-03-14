import { Stack } from "expo-router";
import { SessionProvider } from "../store/auth/authContext";
export default function RootLayout() {
  return (
    <SessionProvider>
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
    </Stack>
    </SessionProvider>
  );
}
