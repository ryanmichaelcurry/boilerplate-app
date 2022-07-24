import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "data:image/png;base64,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"
        }}
      />
      <Text style={styles.titleText}>BoilerPlate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 16
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});