import { View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AudioPlayer from './AudioPlayer';
import AudioSelectorScreen from './AudioSelectorScreen';

const audioSources = [require('./assets/dancing.mp3'), require('./assets/loop.mp3')]

export default function App() {
  const [currentAudioSource, setCurrentAudioSource] = useState(audioSources[0]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AudioSelectorScreen 
          audioSources={audioSources} 
          setCurrentAudioSource={setCurrentAudioSource} 
        />
        <AudioPlayer currentAudioSource={currentAudioSource} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
