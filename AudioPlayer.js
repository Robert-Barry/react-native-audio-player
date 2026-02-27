import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const audioSources = [require('./assets/dancing.mp3'), require('./assets/loop.mp3')]

const AudioPlayer = () => {
    const [currentAudioSource, setCurrentAudioSource] = useState(audioSources[0]);
    const [playbackRate, setPlaybackRate] = useState(1);

      const player = useAudioPlayer(currentAudioSource);
    
      useEffect(() => {
        setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          interruptionMode: 'doNotMix'
        })
        player.setPlaybackRate(1);
      }, []);

      useEffect(() => {
        // keep player playback rate in sync with state
        player.setPlaybackRate(playbackRate);
      }, [playbackRate]);

      const onPlay = () => {
        player.setActiveForLockScreen(true, {
            title: 'Dancing',
            artist: 'RB',
            albumTitle: 'Sample'
        });
        player.play()
      }

      const onStop = () => {
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
      const newRate = playbackRate === 1 ? 2 : 1;
      setPlaybackRate(newRate);
      player.setPlaybackRate(newRate);
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
            <Text>{playbackRate}</Text>
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
