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
            <View style={styles.buttonGroup}>
                <Button title="Dancing" style={styles.button} onPress={() => setCurrentAudioSource(audioSources[0])} />
                <Button title="Loop" style={styles.button} onPress={() => setCurrentAudioSource(audioSources[1])} />
            </View>
        </View>
    );
}

export default AudioSelectorScreen;

const styles = StyleSheet.create({
    audioSelector: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20
    },
    buttonGroup: {
        alignItems: 'flex-start'
    }
}) 