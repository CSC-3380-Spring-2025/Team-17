import React, {useState, useEffect, useRef} from 'react';
import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import {Link} from 'expo-router';
import { Audio } from 'expo-av';
import {doc, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {auth, db} from '../../firebaseConfig'
import { useChallenges } from '../context/ChallengesContext';

export default function Meter(){
    const sd = useRef(new Audio.Sound());
    const st = useRef(new Audio.Sound());
    const sq = useRef(new Audio.Sound());
    const cd = useRef(new Audio.Sound());
    const ct = useRef(new Audio.Sound());
    const cq = useRef(new Audio.Sound());
    const b1 = useRef(new Audio.Sound());
    const b2 = useRef(new Audio.Sound());
    const e1 = useRef(new Audio.Sound());
    const e2 = useRef(new Audio.Sound());

    useEffect(() => {
        const loadSounds = async () => {
            await sd.current.loadAsync(require('@/assets/sounds/simple_duple.mp3'));
            await st.current.loadAsync(require('@/assets/sounds/simple_triple.mp3'));
            await sq.current.loadAsync(require('@/assets/sounds/simple_quadruple.mp3'));
            await cd.current.loadAsync(require('@/assets/sounds/compound_duple.mp3'));
            await ct.current.loadAsync(require('@/assets/sounds/compound_triple.mp3'));
            await cq.current.loadAsync(require('@/assets/sounds/compound_quadruple.mp3'));
            await b1.current.loadAsync(require('@/assets/sounds/beams1.mp3'));
            await b2.current.loadAsync(require('@/assets/sounds/beams2.mp3'));
            await e1.current.loadAsync(require('@/assets/sounds/example1.mp3'));
            await e2.current.loadAsync(require('@/assets/sounds/example2.mp3'));
        };
            
        loadSounds();
            
        return() => {
            sd.current.unloadAsync();
            st.current.unloadAsync();
            sq.current.unloadAsync();
            cd.current.unloadAsync();
            ct.current.unloadAsync();
            cq.current.unloadAsync();
            b1.current.unloadAsync();
            b2.current.unloadAsync();
            e1.current.unloadAsync();
            e2.current.unloadAsync();
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
                                if(!userData.lessonProgress.includes(5)){
                                    if(count === 4){
                                        await updateDoc(userDocRef, {
                                            lessonProgress: arrayUnion(5),
                                        });
                                        handleTaskCompletion("Complete 2 challenges");
                                        handleTaskCompletion("Complete all challenges");
                                    }
                                }
                              }
                              else{
                                await setDoc(userDocRef, {
                                    lessonProgress:[5],
                                }, {merge: true});
                              }
                            } else {
                              await setDoc(userDocRef, {
                                lessonProgress: [5],
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
        let correct : any = document.getElementById('true1');
        let incorrect : any = document.getElementById('false1');
        let p : any = document.getElementById('correct1');

        correct.style.color = 'green';
        correct.disabled = true;
        incorrect.style.color = 'red';
        incorrect.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong1 = () => {
        let correct : any = document.getElementById('true1');
        let incorrect : any = document.getElementById('false1');
        let p : any = document.getElementById('wrong1');

        correct.style.color = 'green';
        correct.disabled = true;
        incorrect.style.color = 'red';
        incorrect.disabled = true;
        p.hidden = false;
    }

    const correct2 = () => {
        let correct : any = document.getElementById('true2');
        let incorrect : any = document.getElementById('false2');
        let p : any = document.getElementById('correct2');

        correct.style.color = 'red';
        correct.disabled = true;
        incorrect.style.color = 'green';
        incorrect.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong2 = () => {
        let correct : any = document.getElementById('true2');
        let incorrect : any = document.getElementById('false2');
        let p : any = document.getElementById('wrong2');

        correct.style.color = 'red';
        correct.disabled = true;
        incorrect.style.color = 'green';
        incorrect.disabled = true;
        p.hidden = false;
    }

    const correct3 = () => {
        let twotwo : any = document.getElementById('22');
        let threefour : any = document.getElementById('34');
        let fourfour : any = document.getElementById('44');
        let sixeight : any = document.getElementById('68');
        let p : any = document.getElementById('correct3');

        twotwo.style.color = 'red';
        twotwo.disabled = true;
        threefour.style.color = 'red';
        threefour.disabled = true;
        fourfour.style.color = 'green';
        fourfour.disabled = true;
        sixeight.style.color = 'red';
        sixeight.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong3 = () => {
        let twotwo : any = document.getElementById('22');
        let threefour : any = document.getElementById('34');
        let fourfour : any = document.getElementById('44');
        let sixeight : any = document.getElementById('68');
        let p : any = document.getElementById('wrong3');

        twotwo.style.color = 'red';
        twotwo.disabled = true;
        threefour.style.color = 'red';
        threefour.disabled = true;
        fourfour.style.color = 'green';
        fourfour.disabled = true;
        sixeight.style.color = 'red';
        sixeight.disabled = true;
        p.hidden = false;
    }

    const correct4 = () => {
        let fourfour : any = document.getElementById('4/4');
        let sixeight : any = document.getElementById('6/8');
        let nineeight : any = document.getElementById('9/8');
        let twelveeight : any = document.getElementById('12/8');
        let p : any = document.getElementById('correct4');

        fourfour.style.color = 'red';
        fourfour.disabled = true;
        sixeight.style.color = 'red';
        sixeight.disabled = true;
        nineeight.style.color = 'green';
        nineeight.disabled = true;
        twelveeight.style.color = 'red';
        twelveeight.disabled = true;
        p.hidden = false;
        setCount(count + 1);
    }

    const wrong4 = () => {
        let fourfour : any = document.getElementById('4/4');
        let sixeight : any = document.getElementById('6/8');
        let nineeight : any = document.getElementById('9/8');
        let twelveeight : any = document.getElementById('12/8');
        let p : any = document.getElementById('wrong4');

        fourfour.style.color = 'red';
        fourfour.disabled = true;
        sixeight.style.color = 'red';
        sixeight.disabled = true;
        nineeight.style.color = 'green';
        nineeight.disabled = true;
        twelveeight.style.color = 'red';
        twelveeight.disabled = true;
        p.hidden = false;
    }

    return(

        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Meter
                </Text>
                
                <View style={styles.card}>
                    <Text style={styles.text}>
                        Rhythm is a major component in music, and it is defined by the beat in a song or composition. A <Text style={styles.bold}>beat</Text> is 
                        a recurring pulse in music to which one can tap or clap along. A <Text style={styles.bold}>meter</Text> is a recurring pattern of beats in a song
                        or composition. The rhythmic values of notes and rests discussed in the previous lesson are arranged by musicians 
                        to create different meters in their music. 
                    </Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.header}>
                        Simple Meter
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Simple Meter</Text> is a meter in which the beat can be divided into two and then further subdivided in half. This can 
                        be thought of as dividing the beat into two smaller beats or tapping the beat twice as fast. 
                    </Text>
                    <Text style={styles.text}>
                        Different numbers of beats group into different meters. <Text style={styles.bold}>Duple meters</Text> are meters that contain groups of two beats. 
                        <Text style={styles.bold}> Triple meters</Text> are meters that contain groups of three beats. <Text style={styles.bold}>Quadruple meters</Text> are meters that contain 
                        groups of four beats. 
                    </Text>
                    <Text style={styles.text}>
                        In Western musical notation, beat groupings are indicated by barlines, which divide music into measures. Each measure
                        equivalent to one beat grouping.
                    </Text>
                    <Image 
                        source={require('@/assets/images/bars.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}> 
                        <Text style={styles.bold}>Time Signatures</Text> look like fractions and are placed at the beginning of music to indicate two things to the 
                        musician: The top number indicates the number of beats in every measure. In simple meter, the top number is always 
                        2, 3, or 4, representing duple, triple, or quadruple meter. The bottom number indicates which note value gets the beat.
                        For example, 1 represents whole notes, 2, represents half notes, 4 represents quarter notes, 8 represents eighth notes, 
                        and so on.
                    </Text>
                    <Text style={styles.text}>
                        There are two additional time signatures in simple meter. 𝄴 represents <Text style={styles.bold}>common time</Text>, which is equivalent to the simple 
                        quadruple time signature 4/4, meaning four quarter notes in every measure. 𝄵 represents <Text style={styles.bold}>cut time</Text>, which is equivalent 
                        to the simple duple time signature 2/2, meaning two half notes in every measure.  
                    </Text>
                    <Text style={styles.header}>
                        Counting Simple Meter
                    </Text>
                    <Text style={styles.text}>
                        Counting rhythms is incredibly important for any singer or instrumentalist. It will help you to perform music in the 
                        right rhythms at a steady tempo. When counting beats in a measure of music, the note that gets the beat is counted with 
                        numbers "1, 2, 3, 4". When a note lasts longer than a beat, the count is held over multiple beats. Beats that are not
                        counted are written in parentheses. When a beat in simple meter is divided in half, the divisions are counted aloud 
                        with the syllable "and", which is notated by the + sign. So if a quarter note gets the beat, the second eighth note on 
                        each beat will be counted as "and". Further subdivisions at the sixteenth note level are counted as "e" (pronounced "ee")
                        and "a" (pronounced "uh").
                    </Text>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in simple duple meter. The time signature 2/4 means that there are 2 beats
                        in every measure, and the quarter note gets the beat. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/simple_duple.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano" 
                            onPress={() => sd.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => sd.current.pauseAsync()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in simple triple meter. The time signature 3/4 means that there are 3 beats
                        in every measure, and the quarter note gets the beat. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/simple_triple.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano"
                            onPress={() => st.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => st.current.pauseAsync()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in simple quadruple meter. The time signature 4/4 means that there are 4 beats
                        in every measure, and the quarter note gets the beat. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/simple_quadruple.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano" 
                            onPress={() => sq.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => sq.current.pauseAsync()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        In simple meters with other beat units, like the half note, eighth note, or sixteenth note, the same counting pattern 
                        is used to count beats and subdivisions. The only difference is they correspond to different note values. But the rhythms
                        sound the same and are counted the same. 
                    </Text>
                    <Text style={styles.text}>
                        When notating rhythms, it is important to beam notes together to show where the beat is. Quarter notes, half notes, and
                        whole notes do not need to be beamed, but eighth notes, sixteenth notes, and so on should be beamed together. In groups of 
                        beamed notes, the stem direction is determined by the position of notes in the staff. For notes above the middle line, stems 
                        point downward on the left side of the note, and for notes below the middle line, stems point upward on the right side of the note. 
                        Stems on notes on the middle line can point in either direction, depending on the surrounding notes. In groups of two 
                        beamed notes, the stem direction of both notes is determined by the note farthest from the middle line of the staff. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/beams.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano" 
                            onPress={() => b1.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => b1.current.pauseAsync()} 
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>
                        Compound Meter
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Compound Meter</Text> is a meter where the beat can be divided into three and then further subdivided in half. These 
                        meters can be duple, triple, or quadruple, just like simple meters. The beats can be grouped into sets of two, three, 
                        or four. The difference is that each beat divides into three divisions instead of two. 
                    </Text>
                    <Text style={styles.text}>
                        Measures in compound meter are equivalent to one group of beats, just like in simple meter. However, the two numbers 
                        in the time signature have different meanings in compound meter. The top number represents the number of beat divisions
                        in a measure, and the bottom number represents which note value gets the division. The emphasis is on the beat divisions
                        rather than the beat itself. 
                    </Text>
                    <Text style={styles.text}>
                        Since the beat is divided into three in compound meter, the top number in the time signature is always a multiple of three.
                        Dividing this number by three yields the number of beats in the measure. The numbers 6, 9, & 12 correspond to duple, triple, 
                        and quadruple meter respectively. The bottom number is usually 4 (meaning the quarter note gets the division), 8 (meaning the 
                        eighth note gets the division), or 16 (meaning the sixteenth note gets the division).
                    </Text>
                    <Text style={styles.header}>
                        Counting Compound Meter
                    </Text>
                    <Text style={styles.text}>
                        Because the beats in compound meter divide into three, the beats are always represented by dotted notes. If 4 is the bottom 
                        number, the beat is a dotted half note (three quarter notes). If 8 is the bottom number, the beat is a dotted quarter note (three
                        eighth notes). If 16 is the bottom number, the beat is a dotted eighth note (three sixteenth notes).
                    </Text>
                    <Text style={styles.text}>
                        Just like in simple meter, the beat is counted in numbers "1, 2, 3, 4". When a note lasts longer than a beat, the count is still
                        held over and the beats not counted aloud are written in parentheses. Divisions are counted as "la" on the second division and 
                        "li" on the third division. Further subdivisions at the sixteenth note level are counted as "ta" with the "la" & "li" syllables
                        staying consistent on the eighth note divisions.
                    </Text>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in compound duple meter. The time signature 6/8 means that there are 2 beats
                        in every measure, and the dotted quarter note gets the beat while the eighth note gets the division. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/compound_duple.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano"  
                            onPress={() => cd.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => cd.current.pauseAsync()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in compound triple meter. The time signature 9/8 means that there are 3 beats
                        in every measure, and the dotted quarter note gets the beat while the eighth note gets the division. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/compound_triple.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano" 
                            onPress={() => ct.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => ct.current.pauseAsync()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        Try counting the rhythm below. This example is in compound quadruple meter. The time signature 12/8 means that there are 4 beats
                        in every measure, and the dotted quarter note gets the beat while the eighth note gets the division. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/compound_quadruple.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano" 
                            onPress={() => cq.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => cq.current.pauseAsync()} 
                        />
                    </View>
                    <Text style={styles.text}>
                        In compound meters with other beat units, like the dotted half note or dotted eighth note the same counting pattern 
                        is used to count beats and subdivisions. The only difference is they correspond to different note values. But the rhythms
                        sound the same and are counted the same.
                    </Text>
                    <Text style={styles.text}>
                        When notating compound meter, it is still important to beam notes together to show where the beat is. Just like in simple 
                        meter, only eighth notes, sixteenth notes, and so on should be beamed together. In groups of beamed notes, the rules for stem
                        direction are the same as in simple meter. 
                    </Text>
                    <Image 
                        source={require('@/assets/images/beams2.png')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            color='#4CAF50' 
                            title="Play piano" 
                            onPress={() => b2.current.playAsync()} 
                        />
                        <Button 
                            color='#F44336' 
                            title="Pause piano" 
                            onPress={() => b2.current.pauseAsync()} 
                        />
                    </View>
                </View>
            <Text style={styles.header}>
                Pop Quiz
            </Text>
            <Text style={styles.text}>
                1. True or False: Simple meter is divided into two beats while compound meter is divided into three beats.
            </Text>
            <form>
                <button id='true1' style={{fontSize: '24px'}} onClick={correct1}>True</button>
                <button id='false1' style={{fontSize: '24px'}} onClick={wrong1}>False</button>
                <p id='correct1' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong1' color='red' style={{textAlign: 'center'}} hidden>Wrong! Simple meter divides in two & compound meter 
                divides in three.</p>
            </form>
            <Text style={styles.text}>
                2. True or False: The beat is always represented by dotted notes in simple meter.
            </Text>
            <form>
                <button id='true2' style={{fontSize: '24px'}} onClick={wrong2}>True</button>
                <button id='false2' style={{fontSize: '24px'}} onClick={correct2}>False</button>
                <p id='correct2' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong2' color='red' style={{textAlign: 'center'}} hidden>Wrong! Dotted notes represent the beat in compound meter.</p>
            </form>
            <Text style={styles.text}>
                3. What is the time signature of the music below?
            </Text>
            <Image source={require('@/assets/images/example1.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play example" onPress={() => e1.current.playAsync()} />
                <Button color='red' title="Pause example" onPress={() => e1.current.pauseAsync()} />
            </View>
            <form>
                <button id='22' style={{fontSize: '24px'}} onClick={wrong3}>2/2</button>
                <button id='34' style={{fontSize: '24px'}} onClick={wrong3}>3/4</button>
                <button id='44' style={{fontSize: '24px'}} onClick={correct3}>4/4</button>
                <button id='68' style={{fontSize: '24px'}} onClick={wrong3}>6/8</button>
                <p id='correct3' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong3' color='red' style={{textAlign: 'center'}} hidden>Wrong! The time signature for this music is 4/4.</p>
            </form>
            <Text style={styles.text}>
                4. What is the time signature of the music below?
            </Text>
            <Image source={require('@/assets/images/example2.png')} />
            <View style={styles.buttons}>
                <Button color='green' title="Play example" onPress={() => e2.current.playAsync()} />
                <Button color='red' title="Pause example" onPress={() => e2.current.pauseAsync()} />
            </View>
            <form>
                <button id='4/4' style={{fontSize: '24px'}} onClick={wrong4}>4/4</button>
                <button id='6/8' style={{fontSize: '24px'}} onClick={wrong4}>6/8</button>
                <button id='9/8' style={{fontSize: '24px'}} onClick={correct4}>9/8</button>
                <button id='12/8' style={{fontSize: '24px'}} onClick={wrong4}>12/8</button>
                <p id='correct4' color='green' style={{textAlign: 'center'}} hidden>Correct!</p>
                <p id='wrong4' color='red' style={{textAlign: 'center'}} hidden>Wrong! The time signature for this music is 9/8.</p>
            </form>
                             
                <View style={styles.linksContainer}>
                    <View style={styles.linkWrapper}>
                        <Link href='./4rhythm' style={styles.secondaryLink}>
                            ← Previous: Rhythm
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='../(tabs)/home' style={styles.secondaryLink}>
                            ← Back to Home
                        </Link>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Link href='./6scales' style={styles.link}>
                            Next: Scales →
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
        textShadowOffset: {width: 1, height: 1},
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