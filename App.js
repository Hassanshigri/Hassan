import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as speech from 'expo-speech';
import {Audio} from 'expo-av';
import { useEffect, useState } from 'react';



export default function App() {

  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('./assets/a-av.mpeg')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);



  const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
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
  
  const speakAlphabet = (prop) => {
    speech.speak(prop);
  }

  return (
    <ImageBackground source={require('./assets/3d-rendering-cute-teddy-bear-blue-background_994418-963.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.gridContainer}>
          {alphabetArray.map((item) => (
            <TouchableOpacity key={item} style={styles.button} onPress={() =>{
              speakAlphabet(item);
              playSound();

            }}>
                <Image source={images[item]} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}
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
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});