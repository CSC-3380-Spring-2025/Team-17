# Melodify (or iBeat) : Team 17
# Members
Project Manager: Cash Cooper (Rcoop31)\
Communications Lead: Micah Broussard (MicahBroussard)\
Git Master: Bella Frederick (bells)\
Design Lead: Alexander Hollier (Alexander Hollier)\
Quality Assurance Tester: Vasu Arora (va2324)

# About Our Software

A mobile music synthesizer/beat recording app with Duolingo style learning incentives and challenges. This will differ from other music creation apps by incorporating a reward system for consistent use. 

## Platforms Tested on
- Expo Go
- Android Studio

# Important Links
Kanban Board: https://objorient2025.atlassian.net/jira/software/projects/SCRUM/boards/1

Designs: https://www.figma.com/design/p7Us4zqbBWOuInS3xgW2oi/Synth-Draft-1%2F30?node-id=20-78&p=f&t=BQzAb3eBOK7TijSp-0]\

# How to Run Dev and Test Environment

## Dependencies
- NodeJS
- Expo-cli

```sh
    "@expo-google-fonts/inter": "^0.2.3",
    "@expo/vector-icons": "^14.0.2",
    "@react-native-community/slider": "^4.5.6",
    "@react-navigation/bottom-tabs": "^7.2.0",
    "@react-navigation/native": "^7.0.14",
    "expo": "~52.0.46",
    "expo-audio": "~0.3.5",
    "expo-av": "~15.0.2",
    "expo-blur": "~14.0.3",
    "expo-constants": "~17.0.6",
    "expo-document-picker": "~13.0.3",
    "expo-file-system": "~18.0.12",
    "expo-font": "~13.0.4",
    "expo-haptics": "~14.0.1",
    "expo-image": "~2.0.6",
    "expo-linking": "~7.0.5",
    "expo-router": "~4.0.20",
    "expo-splash-screen": "~0.29.24",
    "expo-status-bar": "~2.0.1",
    "expo-symbols": "~0.2.2",
    "expo-system-ui": "~4.0.9",
    "expo-web-browser": "~14.0.2",
    "firebase": "^11.4.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.76.9",
    "react-native-audio-recorder-player": "^3.6.12",
    "react-native-dotenv": "^3.4.11",
    "react-native-gesture-handler": "~2.20.2",
    "react-native-reanimated": "~3.16.1",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.4.0",
    "react-native-slider": "^0.11.0",
    "react-native-svg": "15.8.0",
    "react-native-track-player": "^4.1.1",
    "react-native-web": "~0.19.13",
    "react-native-webview": "13.12.5",
    "shaka-player": "^4.14.4"
```

### Downloading Dependencies

Verify you have Node.js installed

```sh
node -v #v22.15.0
```

```sh
npm -v #v10.9.2
```

Install Expo-cli

```sh
npm install expo-cli
```

## Install Expo Go App
!!! ENSURE YOU ARE USING SDK 52 !!!

https://expo.dev/go

Go to this site to download SDK 52 for android simulator or normal android device, IOS will not let you use anything but the newest version unfortunately.

# Execution
!!! Ensure you are in the ./MusicApp/ Directory before running these commands. !!!

Create a new file in the ./MusicApp/ Directory titled ".env". In this file paste the code containing the Firebase API key shared via email.

Last check for any missing dependencies:
```sh
\Team17\MusicApp\npx expo install --check
```

Running the server:
```sh
\Team17\MusicApp\npx expo start
```
## Android
Ensure you have an android simulator device open.
press a after the metro bundler compiles.

## Expo Go
Scan the QR code and it should link directly to the app.
Let the app load and enjoy!
