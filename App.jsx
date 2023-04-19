import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// Navigation
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// AuthContext
import { AuthContext, AuthProvider } from "./src/context/AuthContext";

// ThemeManager
import { ThemeContext, ThemeProvider } from "./src/context/ThemeContext";

// GameContext
import { ApplicationContext, ApplicationProvider } from "./src/context/ApplicationContext";

// Styles
import { DarkTheme, DefaultTheme, useStyles } from "./src/styles";

// Pages
import {
  SplashScreen,
  OnboardingScreen,
  RegisterScreen,
  LoginScreen,
  HomeScreen,
} from "./src/pages";

// Components
import { TabBar } from "./src/components";

const AuthStack = createStackNavigator();
function AuthFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false, animation: "spring" }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false, animation: "spring" }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, animation: "spring" }}
      />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export function TabsFlow() {
  return (

    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Decrypt"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Encrypt"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Keys"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>


  );
}

const Stack = createStackNavigator();
export function AppFlow() {
  const { state } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen
            options={{
              headerShown: false,
              animation: "spring",
            }}
            name="Splash"
            component={SplashScreen}
          />
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            options={{
              headerShown: false,
              animation: "spring",
            }}
            name="AuthFlow"
            component={AuthFlow}
          />
        ) : (
          // User is signed in
          <>
            <Stack.Screen
              options={{
                headerShown: false,
                animation: "spring",
              }}
              name="TabsFlow"
              component={TabsFlow}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Profile"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="AddFriend"
              component={HomeScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default function App({ navigation }) {
  return (
    <AuthProvider>
        <ThemeProvider>
          <ApplicationProvider>
            <AppFlow />
          </ApplicationProvider>
        </ThemeProvider>
    </AuthProvider>
  );
}
