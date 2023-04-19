import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export const DefaultTheme = {
  dark: false,
  colors: {
    primary: "#007AFF",
    secondary: "#929E3F",
    light: "#F2f2f2",
    background: "#F2F2F2",
    card: "#FFFFFF",
    text: "#1C1C1E",
    textSecondary: "#626269",
    border: "#D8D8D8",
    notification: "#FF3B30",
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: "#0A84FF",
    secondary: "#949E3F",
    light: "#F2f2f2",
    background: "#010101",
    card: "#121212",
    text: "#E5E5E7",
    textSecondary: "#9898a0",
    border: "#272729",
    notification: "#FF453A",
  },
};

const DEVICE_WIDTH = Dimensions.get("window").width;

export const useStyles = (theme) =>
  StyleSheet.create({
    colors: theme.colors,

    colorText: {
      color: theme.colors.text,
    },

    colorLight: {
      color: theme.colors.light,
    },

    container: {
      paddingTop: 144,
    },

    h1: {
      color: theme.colors.text,
      fontSize: 32,
      fontWeight: "bold",
    },

    h2: {
      color: theme.colors.text,
      fontSize: 24,
    },

    h3: {
      color: theme.colors.text,
      fontSize: 16,
    },

    image: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    input: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      color: theme.colors.text,
    },

    inputContainer: {
      width: "80%",
      marginTop: 16,
    },

    headerBar: {
      position: "absolute",
      top: 0,
      width: DEVICE_WIDTH,
      zIndex: 8,
      borderBottomRightRadius: 24,
      flexDirection: "row",
      backgroundColor: theme.colors.card,
    },

    headerBarProfile: {
      position: "absolute",
      top: 0,
      width: DEVICE_WIDTH,
      zIndex: 8,
      borderBottomRightRadius: 24,
      flexDirection: "row",
      paddingTop: 12,
      backgroundColor: theme.colors.card,
    },

    headerBarRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: DEVICE_WIDTH,
      paddingHorizontal: 24,
      paddingTop: 48,
      paddingBottom: 16,
    },

    headerBarRowFlexStart: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: DEVICE_WIDTH,
      paddingHorizontal: 24,
      paddingTop: 48,
      paddingBottom: 16,
    },

    headerBarTitle: {
      color: theme.colors.text,
      fontSize: 32,
      fontWeight: "bold",
    },

    headerBarTitleSmall: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "bold",
    },

    group: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 16,
      borderRadius: 16,
      alignSelf: "center",
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
    },

    rowSpaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    icon: {
      padding: 12,
      backgroundColor: theme.colors.primary,
      borderRadius: 16,
      minWidth: 48,
      minHeight: 48,
      alignItems: "center",
    },

    iconDisabled: {
      padding: 12,
      backgroundColor: "gray",
      borderRadius: 16,
      minWidth: 48,
      minHeight: 48,
      alignItems: "center",
    },

    card: {
      padding: 12,
      width: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: 16,
      alignItems: "center"
    },

    cardDisabled: {
      padding: 12,
      width: "100%",
      backgroundColor: "gray",
      borderRadius: 16,
      alignItems: "center",
    },

    widget: { height: 256, width: 160 },

    widgetOverlay: {
      position: "absolute",
      top: 0,
      width: 160,
    },

    widgetFooter: {
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.colors.card,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      width: 160,
      height: 64,
    },

    widgetHeader: {
      position: "absolute",
      top: 0,
      backgroundColor: theme.colors.card,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      width: 160,
      height: 80,
    },

    tabs: {
      flexDirection: "row",
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      position: "absolute",
      bottom: 0,
      width: DEVICE_WIDTH,
      zIndex: 8,
    },

    tab: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 12,
    },

    tabIconFocused: {
      color: theme.colors.primary,
    },

    tabIcon: {
      color: theme.colors.textSecondary,
    },

    buttonContainer: {
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
    },

    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 8,
    },

    buttonText: {
      color: theme.colors.light,
      fontWeight: "700",
      fontSize: 16,
    },

    buttonOutline: {
      backgroundColor: theme.colors.card,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
      borderColor: theme.colors.text,
      borderWidth: 1,
      marginTop: 8,
    },

    buttonOutlineText: {
      color: theme.colors.text,
      fontWeight: "700",
      fontSize: 16,
    },
  });
