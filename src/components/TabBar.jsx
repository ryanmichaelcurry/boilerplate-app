import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// StyleSheet
import { useStyles } from "../styles";

// Imports for Bottom Tab Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

// useTheme
import { useTheme } from "@react-navigation/native";

const IconData = {
  Encrypt: <MaterialCommunityIcons name="message-text-lock" size={32} />,
  Decrypt: <MaterialCommunityIcons name="text-box-search" size={32} />,
  Keys:     <MaterialCommunityIcons name="key-chain" size={32} />,
};

export function TabBar({ state, descriptors, navigation }) {
  const styles = useStyles(useTheme());

  return (
    <View style={styles.tabs}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          const event = navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });

          // Possible cool features we can impliment when the user long presses on the tab (currently normal reroute)
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            key={route.key}
          >
            <Text style={isFocused ? styles.tabIconFocused : styles.tabIcon}>
              {IconData[label]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
