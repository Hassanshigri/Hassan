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
  Dimensions,
} from 'react-native';
import * as speech from 'expo-speech';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { alphabetArray, images, videoPath, audioPath } from './comman';



export default function App() {
  const [sound, setSound] = useState(audioPath.A);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [showABC, setShowABC] = useState(true);
  const [videoToPlay, setVideoToPlay] = useState(videoPath.A);


  async function playSongAndVideo(audioPath) {
    const { sound } = await Audio.Sound.createAsync(audioPath);
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

  const toggleFullscreen = async () => {
    await video.current.presentFullscreenPlayer();
  };

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
                  setShowABC(false);
                  setVideoToPlay(videoPath[item]);
                  playSongAndVideo(audioPath[item]);
                }}>
                <Image source={images[item]} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}

          {showABC === false && (
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
                      : video.current.playAsync() && sound.playAsync();
                  }}
                />
                <Button
                  title={'exit'}
                  onPress={() => {
                    video.current.stopAsync();
                    stopSound();
                    setShowABC(true);
                  }}
                />
                <Button
                  title={'Exit Full Screen'}
                  onPress={() => {
                    video.current.dismissFullscreenPlayer();
                  }}
                />
                <Button
                  title={'Toggle Full Screen'}
                  onPress={toggleFullscreen}

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
  },
  video: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height, 
  },
  videoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});