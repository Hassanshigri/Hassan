import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as speech from 'expo-speech';

export default function App() {
  const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  const speakAlphabet = (prop) => {
    speech.speak(prop);
  }

  return (
    <ImageBackground source={require('./assets/3d-rendering-cute-teddy-bear-blue-background_994418-963.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.gridContainer}>
          {alphabetArray.map((item) => (
            <TouchableOpacity key={item} style={styles.button} onPress={() => speakAlphabet(item)}>
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
    backgroundColor: 'rgba(250, 240, 250, 0.7)', // Transparent white color
    width: '20%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    borderRadius: 100, // Change this value to adjust the roundness of the button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

