import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Button, 
  Text,
  Pressable,
  Image
} from 'react-native';
import Slider from '@react-native-community/slider';  //https://www.npmjs.com/package/@react-native-community/slider
// default import; hook gives playback position/duration updates.

const AudioPlayer = ({ currentAudioSource }) => {
    
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
      if (player.duration && status.currentTime >= status.duration) {
        player.seekTo(0);
      }
      player.play()
    }

    const onPause = () => {
      // For now set the audio back to the beginning when stopped
      player.pause();
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
    
    // helper formats a numeric time (seconds) as mm:ss
    const formatTime = (seconds) => {
      if (seconds == null || isNaN(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      // pad single‑digit seconds with a leading zero
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <> 
        <View style={styles.audioPlayer}>
          <View style={styles.buttonRow}>
            <Pressable onPress={onRewind}>
              <Image style={styles.seek} source={require('./assets/rwnd.png')} />
            </Pressable>
            <Pressable onPress={status.playing ? onPause : onPlay}>
              { status.playing
                ? <Image style={styles.play} source={require('./assets/pause.png')} />
                : <Image style={styles.play} source={require('./assets/play.png')} />}
              </Pressable>
              <Pressable onPress={onForward}>
                <Image style={styles.seek} source={require('./assets/ffwd.png')} />
              </Pressable>
            </View>
            <Pressable onPress={onSetRate} style={styles.rateButton}>
              <Text style={styles.rateButtonText}>{playbackRate}x</Text>
            </Pressable>
            <View style={styles.sliderGroup}>
              <Text style={styles.timerStyle}>{formatTime(status.currentTime)}</Text>
              {/* progress slider follows `status` and seeks on release */}
              <Slider
                style={styles.sliderStyle}
                minimumValue={0}
                maximumValue={status.duration || 0}
                value={status.currentTime}
                onSlidingComplete={(seekLocation) => {
                  player.seekTo(seekLocation);
                }}
                maximumTrackTintColor='red'
              />
              <Text style={styles.timerStyle}>{formatTime(status.duration)}</Text>
            </View>
          </View>
        </>
      )
    }


    
    const styles = StyleSheet.create({
      audioPlayer: {
        backgroundColor: '#858585'
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
      },
      play: {
        width: 70,
        height: 70,
        marginHorizontal: 30
      },
      seek: {
        marginTop: 12,
        width: 40,
        height: 45
      },
      sliderGroup: {
        flexDirection: 'row',
        justifyContent: 'center'
      },
      sliderStyle: {
        width: '50%'
      },
      rateButton: {
        alignItems: 'flex-end',
        paddingRight: 30
      },
      rateButtonText: {
        color: 'white',
        fontSize: 20
      },
      timerStyle: {
        margin: 13,
        color: '#f8f8f8'
      }
    })

export default AudioPlayer;
