import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Button,
} from 'react-native';
import * as speech from 'expo-speech';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';

  const videoPath = {
    A: require('./assets/a.mp4'),
    B: require('./assets/b.mp4'),
    C: require('./assets/c.mp4'),
    D: require('./assets/d.mp4'),
    E: require('./assets/e.mp4'),
    F: require('./assets/f.mp4'),
    G: require('./assets/g.mp4'),
    H: require('./assets/h.mp4'),
  };
  const alphabetArray = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
 //alert(alphabetArray[0])
  const images = {
    A: require('./assets/A.png'),
    B: require('./assets/B.png'),
    C: require('./assets/C.png'),
    D: require('./assets/D.png'),
    E: require('./assets/E.png'),
    F: require('./assets/F.png'),
    G: require('./assets/G.png'),
    H: require('./assets/H.png'),
    I: require('./assets/I.png'),
    J: require('./assets/J.png'),
    K: require('./assets/K.png'),
    L: require('./assets/L.png'),
    M: require('./assets/M.png'),
    N: require('./assets/N.png'),
    O: require('./assets/O.png'),
    P: require('./assets/P.png'),
    Q: require('./assets/Q.png'),
    R: require('./assets/R.png'),
    S: require('./assets/S.png'),
    T: require('./assets/T.jpg'),
    U: require('./assets/U.png'),
    V: require('./assets/V.png'),
    W: require('./assets/W.png'),
    X: require('./assets/X.png'),
    Y: require('./assets/Y.png'),
    Z: require('./assets/Z.png'),
    // Add paths for other letters as needed
  };


export default function App() {
  const [sound, setSound] = useState();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [showABC, setShowABC] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState(videoPath.B);
  const [noOfFamMembers, setNoOfFamMembers] = useState(7)


  async function playSongAndVideo() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/a-av.mpeg')
    );
    setSound(sound);
    await sound.playAsync();
  }
  
  async function stopSound() {
    await sound.stopAsync();
  }

  async function pauseSound() {
    await sound.pauseAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);




  //TODO : Task 1 define JS Object

  const familyObject = {
    Abu: {nam: "Ashraf",age: 59,child:['amin','hassan','ali']},
    Ami: {nam:'sara',age:49},
    Bhai: {nam:'amin',age:21},
    Bhaji: {nam:'anis',age:31}
  };
  //alert(familyObject.Abu.age)
  //alert(familyObjet.Abu.child[2])
  // const mykey="Bhaji"
  // alert(familyObject[mykey].name)  
  const familyArray =[
    {name:"Ashraf",age: 59},
    "Sara",
    "Amin",
    "Anis"
  ];
  //alert(familyArray[1])
  //alert(familyArray[0].age)
  const familyAge =[
    59,49,21,31
  ];
  //
  const familyObjAge ={
    babaAge: 59,
    mamaAge: 49
  };
  // alert(family.Abu);
  // alert(family.Ami);
  // alert(family.Ami);
  // alert(family.Bhaji);
  // const speakAlphabet = (prop) => {
  //   speech.speak(prop);
  // };

  return (
    <ImageBackground
      source={require('./assets/3d-rendering-cute-teddy-bear-blue-background_994418-963.png')}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.gridContainer}>
          {showABC === true &&
            alphabetArray.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.button}
                onPress={() => {
                  // speakAlphabet(item);
                  setShowABC(false);
                  //jis alphabet p click hwa hy oska video play krna hy
                  alert(item)
                  setVideoToPlay(videoPath[item]);
                  setShowVideo(true);
                  playSongAndVideo();
                }}>
                <Image source={images[item]} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}

          {showVideo === true && (
            <View style={styles.videoContainer}>
              <Video
                ref={video}
                style={styles.video}
                source={videoToPlay} 
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
              <View style={styles.videoButtons}>
                <Button
                  title={status.isPlaying ? 'Pause' : 'Play'}
                  onPress={() => {
                    status.isPlaying
                      ? video.current.pauseAsync() && pauseSound()
                      : video.current.playAsync() && playSongAndVideo();
                    //TODO: yaha pe video ke sath audio pause n play hona chahiye
                  }}
                />
                <Button
                  title={'exit'}
                  onPress={() => {
                    video.current.stopAsync();
                    stopSound();
                    setShowABC(true);
                    setShowVideo(false);
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    borderRadius: 100, // Change this value to adjust the roundness of the button
    backgroundColor: 'rgba(250, 240, 250, 0.7)', // Transparent white color
  },
  buttonImage: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    alignSelf: 'center',
    width: 425,
    height: 500,
    justifyContent: 'center',
  },
  videoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
