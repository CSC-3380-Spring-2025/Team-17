import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import Button from "@/components/Button";
import ImageViewer from '@/components/ImageViewer';

const profilepic = require('@/assets/images/output-onlinepngtools.png');

export default function AccountScreen() {
    return (
        <View style={styles.container}>


        <Pressable style={styles.circularButton} onPress={() => alert("Change Profile Pic")}>
                        <Text style={styles.circularButtonText}>oVo</Text>
                    </Pressable>
      

    <View style={styles.Ucontainer}>
    <Text style={styles.Btext}>User Name</Text>
          </View>

    <View style={styles.Econtainer}>
        <Text style={styles.Btext}>Email@email.com</Text>
            </View>

    <View style={styles.Pcontainer}>
    <Text style={styles.Btext}>Password</Text>
          </View>

    <View style={styles.Bcontainer}>
    <Text style={styles.Btext}>12/31/1999</Text>
          </View>

    <View style={styles.footerContainer}>
            <Button label="Save Changes" />
            </View>
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
    Ucontainer: {
        height:25,
        width:175,
        backgroundColor: '#8f8e86',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#000000',
        bottom:20,
      },
      Econtainer: {
        height:25,
        width:175,
        backgroundColor: '#8f8e86',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#000000',
        bottom:10,
      },
      Pcontainer: {
        height:25,
        width:175,
        backgroundColor: '#8f8e86',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#000000',
        bottom:0,
      },
      Bcontainer: {
        height:25,
        width:175,
        backgroundColor: '#8f8e86',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#000000',
        bottom:-10,
      },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    circularButton:{
        width: 90,
        height: 90,
        borderRadius: 35,
        backgroundColor: "#000", // Same as original button
        alignItems: "center",
        justifyContent: "center",
        bottom: 30, // Centered vertically
    },
    circularButtonText: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold",
    },
    footerContainer: {
        height:25,
        width:120,
        backgroundColor: '#1b479e',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#000000',
        bottom:-25,
      },
    imageContainer: {
        flex: 1,
      },
    text: {
        color: '#fff',
    },
    Btext: {
        color: '#fff',
    },
});
