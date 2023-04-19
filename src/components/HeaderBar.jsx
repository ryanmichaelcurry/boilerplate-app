import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Image, Vibration} from "react-native";

import { useTheme } from "@react-navigation/native";
import { useStyles } from "../styles";

import { ApplicationContext } from "../context/ApplicationContext";

import { Entypo } from "@expo/vector-icons";

export function HeaderBar({ title }) {
  const styles = useStyles(useTheme());

  return (
    <View style={styles.headerBar}>
      <View style={styles.headerBarRow}>
        <Text style={styles.headerBarTitle}>{title}</Text>
      </View>
    </View>
  );
}

export function HeaderBarBackButton({ title, navigation }) {
  const styles = useStyles(useTheme());

  return (
    <View style={styles.headerBarProfile}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{...styles.headerBarRowFlexStart}}
      >
        <Entypo name="chevron-left" size={32} style={{paddingRight: 12, ...styles.colorText}} />
        <Text style={styles.headerBarTitleSmall }>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function HeaderBarProfile({ title, navigation }) {
  const styles = useStyles(useTheme());
  const account = "awdawd";

  return (
    <View style={styles.headerBarProfile}>
      <View style={styles.headerBarRow}>
        <Text style={styles.headerBarTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            style={{ width: 48, height: 48, borderRadius: 48 }}
            source={{
              uri: "https://api.multiavatar.com/" + account + ".png",
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}
