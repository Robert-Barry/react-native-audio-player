import { View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AudioPlayer from './AudioPlayer';

const audioSource = require('./assets/dancing.mp3');

export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AudioPlayer />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
