import { View } from 'react-native';
import AudioPlayer from './AudioPlayer';

const audioSource = require('./assets/dancing.mp3');

export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <AudioPlayer />
    </View>
  )
}
