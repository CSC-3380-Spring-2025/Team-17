import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, PermissionsAndroid, Platform } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";

export default function RecordButton() {
    const [isRecording, setIsRecording] = useState(false);
    const audioRecorderPlayer = useRef<AudioRecorderPlayer | null>(null);

    useEffect(() => {
        audioRecorderPlayer.current = new AudioRecorderPlayer();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);
            return (
                granted["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED &&
                granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
            );
        }
        return true; // iOS handles permissions in Info.plist
    };

    const startRecording = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            alert("Permissions denied!");
            return;
        }

        setIsRecording(true);
        try {
            if (audioRecorderPlayer.current) {
                await audioRecorderPlayer.current.startRecorder();
            } else {
                console.error("AudioRecorderPlayer is not initialized.");
            }
        } catch (error) {
            console.error("Recording error:", error);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            if (audioRecorderPlayer.current) {
                await audioRecorderPlayer.current.stopRecorder();
            }
        } catch (error) {
            console.error("Stopping error:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Circular Recording Button */}
            <Pressable
                style={styles.circularButton}
                onPress={isRecording ? stopRecording : startRecording}
            >
                <Text style={styles.circularButtonText}>{isRecording ? "■" : "●"}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D2D2D2", // Updated background color
    },
    circularButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#000", // Keeping button consistent
        alignItems: "center",
        justifyContent: "center",
    },
    circularButtonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
});

