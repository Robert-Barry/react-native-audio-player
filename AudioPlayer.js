import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Slider from '@react-native-community/slider';  //https://www.npmjs.com/package/@react-native-community/slider
// default import; hook gives playback position/duration updates.

const audioSources = [require('./assets/dancing.mp3'), require('./assets/loop.mp3')]

const AudioPlayer = () => {
    const [currentAudioSource, setCurrentAudioSource] = useState(audioSources[0]);
    const [playbackRate, setPlaybackRate] = useState(1);

    const player = useAudioPlayer(currentAudioSource);
    // hook returns a live status object with playback info
    const status = useAudioPlayerStatus(player);
    
    // Required for background playback
    useEffect(() => {
      setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionMode: 'doNotMix'
      })
        player.setPlaybackRate(1);
    }, []);

    // keep player playback rate in sync with state
    useEffect(() => {
      player.setPlaybackRate(playbackRate);
    }, [playbackRate]);

    const onPlay = () => {
      // metadata for background playback
      player.setActiveForLockScreen(true, {
        title: 'Audio',
        artist: 'RB',
        albumTitle: 'Sample'
      });
      player.play()
    }

    const onStop = () => {
      // For now set the audio back to the beginning when stopped
      player.pause();
      player.seekTo(0);
    }

    const onForward = () => {
      player.seekTo(player.currentTime + 10);
    }

    const onRewind = () => {
      player.seekTo(player.currentTime - 10);
    }

    const onSetRate = () => {
      setPlaybackRate(playbackRate === 1 ? 2 : 1);
    }
    
    return (
      <> 
        <View style={styles.container}>
          <Text>Select a track:</Text>
            <Button title="Dancing" onPress={() => setCurrentAudioSource(audioSources[0])} />
            <Button title="Loop" onPress={() => setCurrentAudioSource(audioSources[1])} />
          </View>
          <View style={styles.container}>
            <Button title="Play" onPress={onPlay} />
            <Button title="Stop" onPress={onStop} />
            <Button title="FF 10" onPress={onForward} />
            <Button title="RW 10" onPress={onRewind} />
            <Button title="Rate" onPress={onSetRate} />
            <Text>{playbackRate}x</Text>
            {/* progress slider follows `status` and seeks on release */}
            <Slider
              style={{ width: 300, height: 40 }}
              minimumValue={0}
              maximumValue={status.duration || 0}
              value={status.currentTime}
              onSlidingComplete={(seekLocation) => {
                player.seekTo(seekLocation);
              }}
            />
            <Text>
              {Math.floor(status.currentTime)}/{Math.floor(status.duration)}s
            </Text>
          </View>
        </>
      )
    }


    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    })

    export default AudioPlayer;
