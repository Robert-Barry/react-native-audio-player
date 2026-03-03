import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

const AudioSelectorScreen = ({ audioSources, setCurrentAudioSource }) => {
    return (
        <View style={styles.audioSelector}>
            <Text>Select a track:</Text>
            <Button title="Dancing" onPress={() => setCurrentAudioSource(audioSources[0])} />
            <Button title="Loop" onPress={() => setCurrentAudioSource(audioSources[1])} />
        </View>
    );
}

export default AudioSelectorScreen;

const styles = StyleSheet.create({
    audioSelector: {
        flex: 1,
        padding: 50
    }
}) 