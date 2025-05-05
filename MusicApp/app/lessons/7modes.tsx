import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Modes() {
    const lydian = useRef(new Audio.Sound());
    const ionian = useRef(new Audio.Sound());
    const mixolydian = useRef(new Audio.Sound());
    const dorian = useRef(new Audio.Sound());
    const aeolian = useRef(new Audio.Sound());
    const phrygian = useRef(new Audio.Sound());
    const locrian = useRef(new Audio.Sound());


    useEffect(() => {
        const loadSounds = async () => {
            await lydian.current.loadAsync(require('@/assets/sounds/lydian.mp3'));
            await ionian.current.loadAsync(require('@/assets/sounds/ionian.mp3'));
            await mixolydian.current.loadAsync(require('@/assets/sounds/mixolydian.mp3'));
            await dorian.current.loadAsync(require('@/assets/sounds/dorian.mp3'));
            await aeolian.current.loadAsync(require('@/assets/sounds/aeolian.mp3'));
            await phrygian.current.loadAsync(require('@/assets/sounds/phrygian.mp3'));
            await locrian.current.loadAsync(require('@/assets/sounds/locrian.mp3'));
        };

        loadSounds();

        return () => {
            lydian.current.unloadAsync();
            ionian.current.unloadAsync();
            mixolydian.current.unloadAsync();
            dorian.current.unloadAsync();
            aeolian.current.unloadAsync();
            phrygian.current.unloadAsync();
            locrian.current.unloadAsync();
        };
    }, []);

    const [count, setCount] = useState(0);
    const [userId, setUserId]= useState('');
    const {handleTaskCompletion} = useChallenges();
                
                    useEffect(()=>{
                        if (auth.currentUser){
                          setUserId(auth.currentUser.uid);
                        }
                      }, []);
                    
                      useEffect(()=>{
                          const fetchUserData= async()=>{
                            if(userId){
                              console.log('Fetching data for userId:', userId);
                      
                              try{
                                const userDocRef= doc(db, 'users', userId);
                                const userDoc = await getDoc(userDocRef)
                                
                                if (userDoc.exists()) {
                                  console.log('Document data:', userDoc.data());
                                  const userData = userDoc.data();
                                  if(userData.lessonProgress){
                                    if(!userData.lessonProgress.includes(7)){
                                        if(count === 6){
                                            await updateDoc(userDocRef, {
                                                lessonProgress: arrayUnion(7),
                                            });
                                            handleTaskCompletion("Complete 2 lessons");
                                            handleTaskCompletion("Complete all lessons");
                                        }
                                    }
                                  }
                                  else{
                                    await setDoc(userDocRef, {
                                        lessonProgress:[7],
                                    }, {merge: true});
                                  }
                                } else {
                                  await setDoc(userDocRef, {
                                    lessonProgress: [7],
                                  });
                                }
                        
                              }catch(error){
                                console.error('Error fetching user data:', error);
                              }
                            }
                          };
                          fetchUserData();
                        }, [userId]);

    const correct1 = () => {
        let ionian: any = document.getElementById('ionian1');
        let lydian: any = document.getElementById('lydian1');
        let mixolydian: any = document.getElementById('mixolydian1');
        let aeolian: any = document.getElementById('aeolian1');
        let p: any = document.getElementById('correct1');

        ionian.style.color = 'green';
        ionian.disabled = true;
        lydian.style.color = 'red';
        lydian.disabled = true;
        mixolydian.style.color = 'red';
        mixolydian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong1 = () => {
        let ionian: any = document.getElementById('ionian1');
        let lydian: any = document.getElementById('lydian1');
        let mixolydian: any = document.getElementById('mixolydian1');
        let aeolian: any = document.getElementById('aeolian1');
        let p: any = document.getElementById('wrong1');

        ionian.style.color = 'green';
        ionian.disabled = true;
        lydian.style.color = 'red';
        lydian.disabled = true;
        mixolydian.style.color = 'red';
        mixolydian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        p.hidden = false;
    }

    const correct2 = () => {
        let ionian: any = document.getElementById('ionian2');
        let lydian: any = document.getElementById('lydian2');
        let mixolydian: any = document.getElementById('mixolydian2');
        let aeolian: any = document.getElementById('aeolian2');
        let p: any = document.getElementById('correct2');

        ionian.style.color = 'green';
        ionian.disabled = true;
        lydian.style.color = 'red';
        lydian.disabled = true;
        mixolydian.style.color = 'red';
        mixolydian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong2 = () => {
        let ionian: any = document.getElementById('ionian2');
        let lydian: any = document.getElementById('lydian2');
        let mixolydian: any = document.getElementById('mixolydian2');
        let aeolian: any = document.getElementById('aeolian2');
        let p: any = document.getElementById('wrong2');

        ionian.style.color = 'green';
        ionian.disabled = true;
        lydian.style.color = 'red';
        lydian.disabled = true;
        mixolydian.style.color = 'red';
        mixolydian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        p.hidden = false;
    }

    const correct3 = () => {
        let ionian: any = document.getElementById('ionian3');
        let lydian: any = document.getElementById('lydian3');
        let mixolydian: any = document.getElementById('mixolydian3');
        let locrian: any = document.getElementById('locrian3');
        let p: any = document.getElementById('correct3');

        ionian.style.color = 'red';
        ionian.disabled = true;
        lydian.style.color = 'green';
        lydian.disabled = true;
        mixolydian.style.color = 'red';
        mixolydian.disabled = true;
        locrian.style.color = 'red';
        locrian.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong3 = () => {
        let ionian: any = document.getElementById('ionian3');
        let lydian: any = document.getElementById('lydian3');
        let mixolydian: any = document.getElementById('mixolydian3');
        let locrian: any = document.getElementById('locrian3');
        let p: any = document.getElementById('wrong3');

        ionian.style.color = 'red';
        ionian.disabled = true;
        lydian.style.color = 'green';
        lydian.disabled = true;
        mixolydian.style.color = 'red';
        mixolydian.disabled = true;
        locrian.style.color = 'red';
        locrian.disabled = true;
        p.hidden = false;
    }

    const correct4 = () => {
        let dorian: any = document.getElementById('dorian4');
        let aeolian: any = document.getElementById('aeolian4');
        let phrygian: any = document.getElementById('phrygian4');
        let locrian: any = document.getElementById('locrian4');
        let p: any = document.getElementById('correct4');

        dorian.style.color = 'red';
        dorian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        phrygian.style.color = 'green';
        phrygian.disabled = true;
        locrian.style.color = 'red';
        locrian.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong4 = () => {
        let dorian: any = document.getElementById('dorian4');
        let aeolian: any = document.getElementById('aeolian4');
        let phrygian: any = document.getElementById('phrygian4');
        let locrian: any = document.getElementById('locrian4');
        let p: any = document.getElementById('wrong4');

        dorian.style.color = 'red';
        dorian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        phrygian.style.color = 'green';
        phrygian.disabled = true;
        locrian.style.color = 'red';
        locrian.disabled = true;
        p.hidden = false;
    }

    const correct5 = () => {
        let ionian: any = document.getElementById('ionian5');
        let lydian: any = document.getElementById('lydian5');
        let mixolydian: any = document.getElementById('mixolydian5');
        let dorian: any = document.getElementById('dorian5');
        let p: any = document.getElementById('correct5');

        ionian.style.color = 'red';
        ionian.disabled = true;
        lydian.style.color = 'red';
        lydian.disabled = true;
        mixolydian.style.color = 'green';
        mixolydian.disabled = true;
        dorian.style.color = 'red';
        dorian.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong5 = () => {
        let ionian: any = document.getElementById('ionian5');
        let lydian: any = document.getElementById('lydian5');
        let mixolydian: any = document.getElementById('mixolydian5');
        let dorian: any = document.getElementById('dorian5');
        let p: any = document.getElementById('wrong5');

        ionian.style.color = 'red';
        ionian.disabled = true;
        lydian.style.color = 'red';
        lydian.disabled = true;
        mixolydian.style.color = 'green';
        mixolydian.disabled = true;
        dorian.style.color = 'red';
        dorian.disabled = true;
        p.hidden = false;
    }

    const correct6 = () => {
        let dorian: any = document.getElementById('dorian6');
        let aeolian: any = document.getElementById('aeolian6');
        let phrygian: any = document.getElementById('phrygian6');
        let locrian: any = document.getElementById('locrian6');
        let p: any = document.getElementById('correct6');

        dorian.style.color = 'red';
        dorian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        phrygian.style.color = 'red';
        phrygian.disabled = true;
        locrian.style.color = 'green';
        locrian.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong6 = () => {
        let dorian: any = document.getElementById('dorian6');
        let aeolian: any = document.getElementById('aeolian6');
        let phrygian: any = document.getElementById('phrygian6');
        let locrian: any = document.getElementById('locrian6');
        let p: any = document.getElementById('wrong6');

        dorian.style.color = 'red';
        dorian.disabled = true;
        aeolian.style.color = 'red';
        aeolian.disabled = true;
        phrygian.style.color = 'red';
        phrygian.disabled = true;
        locrian.style.color = 'green';
        locrian.disabled = true;
        p.hidden = false;
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Modes
                </Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Modes</Text> are an extension of scales. They are ordered collections of whole steps and half steps that can be described
                        within a continuum of <Text style={styles.bold}>modal brightness</Text>: brighter modes sound more like a major scale while darker modes sound more
                        like a minor scale.
                    </Text>
                    <Image
                        source={require('@/assets/images/mode_range.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Lydian Mode
                    </Text>
                    <Text style={styles.text}>
                        The brightest mode is the <Text style={styles.bold}>lydian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        W, W, W, H, W, W, H. You can think of this mode as a major scale with a raised 4 (<i>fi</i>). You can also find this mode if you
                        play all the white keys on a piano keyboard starting from F.
                    </Text>
                    <Image
                        source={require('@/assets/images/f_lydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/lydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Lydian"
                            onPress={() => lydian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Lydian"
                            onPress={() => lydian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Ionian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next bright mode is the <Text style={styles.bold}>ionian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        the exact same as in the major scale: W, W, H, W, W, W, H. You can find this mode if you play all the white keys on a
                        piano keyboard starting from C.
                    </Text>
                    <Image
                        source={require('@/assets/images/c_ionian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/ionian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Ionian"
                            onPress={() => ionian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Ionian"
                            onPress={() => ionian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Mixolydian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next bright mode is the <Text style={styles.bold}>mixolydian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        W, W, H, W, W, H, W. You can think of this mode as a major scale with a lowered 7 (<i>te</i>). You can also find this mode
                        if you play all the white keys on a piano keyboard starting from G.
                    </Text>
                    <Image
                        source={require('@/assets/images/g_mixolydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/mixolydian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Mixolydian"
                            onPress={() => mixolydian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Mixolydian"
                            onPress={() => mixolydian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        The lydian, ionian, and mixolydian modes are considered the brighter modes because they contain an unaltered 3 instead of
                        a lowered 3 (<i>mi</i> instead of <i>me</i>). The dorian, aeolian, phrygian, and locrian modes are considered darker because
                        they contain a lowered 3 instead of an unaltered 3 (<i>me</i> instead of <i>mi</i>).
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Dorian Mode
                    </Text>
                    <Text style={styles.text}>
                        The first dark mode is the <Text style={styles.bold}>dorian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        W, H, W, W, W, H, W. You can think of this mode as a minor scale with a raised 6 (<i>la</i>). You can also find this mode if
                        you play all the white keys on a piano keyboard starting from D.
                    </Text>
                    <Image
                        source={require('@/assets/images/d_dorian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/dorian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Dorian"
                            onPress={() => dorian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Dorian"
                            onPress={() => dorian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Aeolian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next dark mode is the <Text style={styles.bold}>aeolian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is the
                        exact same as in the minor scale: W, H, W, W, H, W, W. You can also find this mode if you play all the white keys on a
                        piano keyboard starting from A.
                    </Text>
                    <Image
                        source={require('@/assets/images/a_aeolian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/aeolian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Aeolian"
                            onPress={() => aeolian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Aeolian"
                            onPress={() => aeolian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Phrygian Mode
                    </Text>
                    <Text style={styles.text}>
                        The next dark mode is the <Text style={styles.bold}>phrygian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        H, W, W, W, H, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>). You can also find this mode
                        if you play all the white keys on a piano keyboard starting from E.
                    </Text>
                    <Image
                        source={require('@/assets/images/e_phrygian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/phrygian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Phrygian"
                            onPress={() => phrygian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Phrygian"
                            onPress={() => phrygian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Locrian Mode
                    </Text>
                    <Text style={styles.text}>
                        The darkest mode is the <Text style={styles.bold}>locrian mode</Text>. In this mode, the ascending pattern of whole steps and half steps is
                        H, W, W, H, W, W, W. You can think of this mode as a minor scale with a lowered 2 (<i>ra</i>) & a lowered 5 (<i>se</i>).
                        You can also find this mode if you play all the white keys on a piano keyboard starting from B.
                    </Text>
                    <Image
                        source={require('@/assets/images/b_locrian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/locrian.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#4CAF50'
                            title="Play Locrian"
                            onPress={() => locrian.current.playAsync()}
                        />
                        <Button
                            color='#F44336'
                            title="Pause Locrian"
                            onPress={() => locrian.current.pauseAsync()}
                        />
                    </View>
                </View>

                <Text style={styles.header}>
                    Pop Quiz
                </Text>
                <Text style={styles.text}>
                    1. Which of the following modes is just like the major scale?
                </Text>
                <form>
                    <button id='lydian1' style={{ fontSize: '24px' }} onClick={wrong1}>Lydian</button>
                    <button id='ionian1' style={{ fontSize: '24px' }} onClick={correct1}>Ionian</button>
                    <button id='mixolydian1' style={{ fontSize: '24px' }} onClick={wrong1}>Mixolydian</button>
                    <button id='aeolian1' style={{ fontSize: '24px' }} onClick={wrong1}>Aeolian</button>
                    <p id='correct1' color='green' style={{ textAlign: 'center' }} hidden>Correct!</p>
                    <p id='wrong1' color='red' style={{ textAlign: 'center' }} hidden>Wrong! The Ionian mode is the same as a major scale.</p>
                </form>
                <Text style={styles.text}>
                    2. Which of the following modes is just like the minor scale?
                </Text>
                <form>
                    <button id='lydian2' style={{ fontSize: '24px' }} onClick={wrong2}>Lydian</button>
                    <button id='ionian2' style={{ fontSize: '24px' }} onClick={wrong2}>Ionian</button>
                    <button id='mixolydian2' style={{ fontSize: '24px' }} onClick={wrong2}>Mixolydian</button>
                    <button id='aeolian2' style={{ fontSize: '24px' }} onClick={correct2}>Aeolian</button>
                    <p id='correct2' color='green' style={{ textAlign: 'center' }} hidden>Correct!</p>
                    <p id='wrong2' color='red' style={{ textAlign: 'center' }} hidden>Wrong! The Aeolian mode is the same as a minor scale.</p>
                </form>
                <Text style={styles.text}>
                    3. Which of the following modes is just like a major scale with a raised 4?
                </Text>
                <form>
                    <button id='lydian3' style={{ fontSize: '24px' }} onClick={correct3}>Lydian</button>
                    <button id='ionian3' style={{ fontSize: '24px' }} onClick={wrong3}>Ionian</button>
                    <button id='mixolydian3' style={{ fontSize: '24px' }} onClick={wrong3}>Mixolydian</button>
                    <button id='locrian3' style={{ fontSize: '24px' }} onClick={wrong3}>Locrian</button>
                    <p id='correct3' color='green' style={{ textAlign: 'center' }} hidden>Correct!</p>
                    <p id='wrong3' color='red' style={{ textAlign: 'center' }} hidden>Wrong! The Lydian mode is a major scale with a raised 4.</p>
                </form>
                <Text style={styles.text}>
                    4. Which of the following modes is just like a minor scale with a lowered 2?
                </Text>
                <form>
                    <button id='dorian4' style={{ fontSize: '24px' }} onClick={wrong4}>Dorian</button>
                    <button id='aeolian4' style={{ fontSize: '24px' }} onClick={wrong4}>Aeolian</button>
                    <button id='phrygian4' style={{ fontSize: '24px' }} onClick={correct4}>Phrygian</button>
                    <button id='locrian4' style={{ fontSize: '24px' }} onClick={wrong4}>Locrian</button>
                    <p id='correct4' color='green' style={{ textAlign: 'center' }} hidden>Correct!</p>
                    <p id='wrong4' color='red' style={{ textAlign: 'center' }} hidden>Wrong! The Phrygian mode is a minor scale with a lowered 2.</p>
                </form>
                <Text style={styles.text}>
                    5. Which of the following modes is just like a major scale with a lowered 7?
                </Text>
                <form>
                    <button id='lydian5' style={{ fontSize: '24px' }} onClick={wrong5}>Lydian</button>
                    <button id='ionian5' style={{ fontSize: '24px' }} onClick={wrong5}>Ionian</button>
                    <button id='mixolydian5' style={{ fontSize: '24px' }} onClick={correct5}>Mixolydian</button>
                    <button id='dorian5' style={{ fontSize: '24px' }} onClick={wrong5}>Dorian</button>
                    <p id='correct5' color='green' style={{ textAlign: 'center' }} hidden>Correct!</p>
                    <p id='wrong5' color='red' style={{ textAlign: 'center' }} hidden>Wrong! The Mixolydian mode is a major scale with a lowered 7.</p>
                </form>
                <Text style={styles.text}>
                    6. Which of the following modes is just like a minor scale with a lowered 2 & a lowered 5?
                </Text>
                <form>
                    <button id='dorian6' style={{ fontSize: '24px' }} onClick={wrong6}>Dorian</button>
                    <button id='aeolian6' style={{ fontSize: '24px' }} onClick={wrong6}>Aeolian</button>
                    <button id='phrygian6' style={{ fontSize: '24px' }} onClick={wrong6}>Phrygian</button>
                    <button id='locrian6' style={{ fontSize: '24px' }} onClick={correct6}>Locrian</button>
                    <p id='correct6' color='green' style={{ textAlign: 'center' }} hidden>Correct!</p>
                    <p id='wrong6' color='red' style={{ textAlign: 'center' }} hidden>Wrong! The Locrian mode is a minor scale with a lowered
                        2 & a lowered 5.</p>
                </form>
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./6scales' style={styles.secondaryLink}>
                            ← Previous: Scales
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./8intervals' style={styles.link}>
                            Next: Intervals →
                        </Link>
                    </View>
                </View>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        backgroundColor: '#D2D2D2',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        color: '#5543A5',
        fontSize: 36,
        fontFamily: 'Inter_700Bold',
        fontWeight: 'bold',
        marginVertical: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: 'black',
        borderWidth: 2,
        elevation: 3,
    },
    text: {
        color: '#333',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
        color: '#5543A5',
    },
    header: {
        color: '#5543A5',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'left',
    },
    image: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
    },
    buttons: {
        flexDirection: 'row'
    },
    linksContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        gap: 12,
    },
    linkWrapper: {
        width: '100%',
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
    },
    link: {
        color: 'white',
        fontSize: 18,
        padding: 15,
        textAlign: 'center',
        backgroundColor: '#5543A5',
        borderRadius: 8,
        fontWeight: '600',
    },
    secondaryLink: {
        color: '#5543A5',
        fontSize: 16,
        padding: 15,
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#5543A5',
        borderRadius: 8,
        fontWeight: '600',
    },
});