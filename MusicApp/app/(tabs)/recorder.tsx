import { StyleSheet, View, Pressable, Text } from "react-native";

type Props = {
    label: string;
};

export default function Button({ label }: Props) {
    return (
        <View style={styles.container}>
            {/* Circular Button */}
            <Pressable style={styles.circularButton} onPress={() => alert("You pressed the circular button!")}>
                <Text style={styles.circularButtonText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#D2D2D2',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#000", // Keeping background consistent (color wasn't provided in original)
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16,
    },
    circularButton: {
        position: "absolute",
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#000", // Same as original button
        alignItems: "center",
        justifyContent: "center",
        bottom: "45%", // Centered vertically
    },
    circularButtonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
});

