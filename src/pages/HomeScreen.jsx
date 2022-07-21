import React, {useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

export function HomeScreen({navigation}) {
  const {state} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{state.token}</Text>
      <StatusBar style="auto" />
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
});
