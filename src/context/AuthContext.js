import React from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      console.log("dispatch", prevState, action);
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
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        accessToken = await SecureStore.getItemAsync("accessToken");
        refreshToken = await SecureStore.getItemAsync("refreshToken");
      } catch (e) {
        console.log("error in retrieval");
        dispatch({ type: "RESTORE_TOKEN", token: null });
      }

      // send api request with accessToken that will refresh it if it is outdated
      fetch("https://onebutton.contrivesoftware.com/refresh", {
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
          // SecureStore
          SecureStore.setItemAsync("accessToken", data.accessToken);

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({
            type: "RESTORE_TOKEN",
            token: data.accessToken,
          });
        })

        .catch((error) => {
          console.log(error);
          console.log("here");
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
          password: data.password,
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(payload),
        };

        fetch("https://onebutton.contrivesoftware.com/login", options)
          .then((result) => {
            if (result.status != 200) {
              throw new Error("Bad Response");
            }
            return result.text();
          })
          .then(async (data) => {
            // Convert to an Object
            data = JSON.parse(data);

            // SecureStore
            await SecureStore.setItemAsync("accessToken", data.accessToken);
            await SecureStore.setItemAsync("refreshToken", data.refreshToken);

            dispatch({
              type: "SIGN_IN",
              token: data.accessToken
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      signOut: async () => {
        // Remove SecureStore Tokens
        await SecureStore.deleteItemAsync("refreshToken");
        await SecureStore.deleteItemAsync("accessToken");

        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage

        const payload = {
          username: data.username,
          email: data.email,
          password: data.password,
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(payload),
        };

        fetch("https://onebutton.contrivesoftware.com/register", options)
          .then((result) => {
            if (result.status != 200) {
              throw new Error("Bad Response");
            }
            return result.text();
          })
          .then((data) => {
            // Convert to an Object
            data = JSON.parse(data);

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
    <AuthContext.Provider value={{ state, dispatch, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
}
