import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Navigation
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// AuthContext
import { AuthContext } from "./src/context/AuthContext";

// Pages
import {
  SplashScreen,
  OnboardingScreen,
  RegisterScreen,
  LoginScreen,
  HomeScreen,
  SettingsScreen,
} from "./src/pages";

// Animations
const config = {
  animation: "spring",
  config: {
    stiffness: 1,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 1,
    restSpeedThreshold: 1,
  },
};

const AuthStack = createStackNavigator();
function AuthFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export function HomeFlow() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#0782F9",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gesture-tap-button" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="leaderboard" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let accessToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        accessToken = await SecureStore.getItemAsync("accessToken");
				refreshToken = await SecureStore.getItemAsync("refreshToken");
				console.log("APP MOUNTED...")
				console.log(accessToken);
				console.log(refreshToken);
      } catch (e) {
        dispatch({ type: "RESTORE_TOKEN", token: null });
      }

      // send api request with accessToken that will refresh it if it is outdated
			fetch("https://onebutton.ryanmichaelcurry.com/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      })

			.then((result) => {
				if (result.status != 200) {
					throw new Error("Bad Response");
				}
				return result.text();
			})
			
			.then((data) => {
        // Convert to an Object
        data = JSON.parse(data);
				console.log(data);
        // SecureStore
        SecureStore.setItemAsync("accessToken", data.accessToken);

				// This will switch to the App screen or Auth screen and this loading
				// screen will be unmounted and thrown away.
				dispatch({ type: "RESTORE_TOKEN", token: data.accessToken });
      })

			.catch((error) => {
				console.log(error)
				dispatch({ type: "RESTORE_TOKEN", token: null });
			});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage

        const payload = {
          email: data.email,
          password: data.password
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(payload),
        };

        fetch("https://onebutton.ryanmichaelcurry.com/login", options)
          .then((result) => {
            if (result.status != 200) {
              throw new Error("Bad Response");
            }
            return result.text();
          })
          .then((data) => {
            // Convert to an Object
            data = JSON.parse(data);
            console.log(data.accessToken);

            // SecureStore
            SecureStore.setItemAsync("accessToken", data.accessToken);
            SecureStore.setItemAsync("refreshToken", data.refreshToken);

            dispatch({ type: "SIGN_IN", token: data.accessToken });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      signOut: async () => {
        // Remove SecureStore Tokens
				await SecureStore.deleteItemAsync("accessToken");
				await SecureStore.deleteItemAsync("refreshToken");

        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage

				const payload = {
					username: data.username,
          email: data.email,
          password: data.password
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(payload),
        };

        fetch("https://onebutton.ryanmichaelcurry.com/register", options)
          .then((result) => {
            if (result.status != 200) {
              throw new Error("Bad Response");
            }
            return result.text();
          })
          .then((data) => {
            // Convert to an Object
            data = JSON.parse(data);
            console.log(data.accessToken);

            // SecureStore
            SecureStore.setItemAsync("accessToken", data.accessToken);
            SecureStore.setItemAsync("refreshToken", data.refreshToken);

            dispatch({ type: "SIGN_IN", token: data.accessToken });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen
							options={{ headerShown: false }}
              name="Splash"
              component={SplashScreen}
            />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              options={{ headerShown: false }}
              name="AuthFlow"
              component={AuthFlow}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeFlow"
              component={HomeFlow}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
