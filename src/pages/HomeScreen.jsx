import React, {useContext, useEffect, useState} from 'react';
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as api from '../api';


export function HomeScreen({navigation}) {
  const styles = useStyles(useTheme());

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{clicks}</Text>
      <TouchableOpacity
          onPress={()=>{

          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Button</Text>
        </TouchableOpacity>
    </View>
  );
}
