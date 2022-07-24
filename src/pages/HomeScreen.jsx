import React, {useContext, useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as api from '../api';


export function HomeScreen({navigation}) {
  const [clicks, setClicks] = useState();

  useEffect(async() => {
    res = await api.send("get:click");
    setClicks(res.clicks);
  }, []);

  async function handleClick()
  {
    res = await api.send("post:click");
    setClicks(res.clicks);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{clicks}</Text>
      <TouchableOpacity
          onPress={()=>{
            handleClick();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Button</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
	headerText: {
		textAlign: "left",
		fontSize: 25,
		fontWeight: "bold",
    marginBottom: 32
	},
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
