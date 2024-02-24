import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { Video, ResizeMode, Audio } from 'expo-av';
import { alphabetArray, images, videoPath, audioPath } from './comman';

export default function App() {
  const [sound, setSound] = useState(null);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [showABC, setShowABC] = useState(true);
  const [videoToPlay, setVideoToPlay] = useState(videoPath.A);

  async function playSongAndVideo(audioPath) {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(audioPath);
    setSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    await sound.stopAsync();
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <ImageBackground
      source={require('./assets/3d-rendering-cute-teddy-bear-blue-background_994418-963.png')}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.gridContainer}>
          {showABC === true &&
            
alphabetArray.map
((item) => (
              <TouchableOpacity
                key={item}
                style={styles.button}
                onPress={async () => {
                  setShowABC(false);
                  setVideoToPlay(videoPath[item]);
                  await playSongAndVideo(audioPath[item]);
                }}>
                <Image source={images[item]} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          {showABC === false && (
            <View style={styles.videoContainer}>
              <Video
                ref={video}
                style={
styles.video
}
                source={videoToPlay}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(status)}
                shouldPlay
              />
              <TouchableOpacity
                style={styles.exitButton}
                onPress={() => {
                  video.current.dismissFullscreenPlayer(); // Dismiss fullscreen player
                  setShowABC(true); // Show ABC buttons
                  stopSound();
                }}>
                <Text style={styles.exitButtonText}>Exit</Text>
              </TouchableOpacity>
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
    borderRadius: 100,
    backgroundColor: 'rgba(250, 240, 250, 0.7)',
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
    position: 'relative',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  exitButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure it's above the video
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
}); 