import React, { createContext, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(useColorScheme());
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      StatusBar.setBarStyle("light-content");
    } else {
      setTheme("light");
      StatusBar.setBarStyle("dark-content");
    }
  };

  return (
    <ThemeContext.Provider value={ {theme, toggleTheme} }>
      {children}
    </ThemeContext.Provider>
  );
};
