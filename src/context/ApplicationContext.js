import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [app, setApp] = useState({});

  return (
    <ApplicationContext.Provider
      value={{
        app
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
