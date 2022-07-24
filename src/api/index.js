import React, { useEffect, useState, useContext } from "react";
const axios = require("axios");
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";

export const host = "https://onebutton.ryanmichaelcurry.com/"; // the last slash is VERY important

export async function send(source, body = {}, additionalHeaders = {}) {
  function signOut(bruh)
  {
    console.log(bruh);
  }

  let method = source.split(":")[0];
  let endpoint = source.split(":")[1];

  let url = host + endpoint;

  const getAccessToken = async () => {
    let result = await SecureStore.getItemAsync("accessToken");
    if (result) {
      return result;
    } else {
      signOut(1);
    }
  };

  const getRefreshToken = async () => {
    let result = await SecureStore.getItemAsync("refreshToken");
    if (result) {
      return result;
    } else {
      signOut(2);
    }
  };

  let accessToken = await getAccessToken();
  let refreshToken = await getRefreshToken();

  //console.log("here!");
  try {
    let res = await axios({
      method: method,
      url: url,
      headers: { Authorization: "Bearer " + accessToken, ...additionalHeaders },
      data: body,
    });

    //console.log(res.data);
    return res.data;
  } catch {
    try {
      let newAccessToken = await axios({
        method: "post",
        url: host + "refresh",
        headers: {
          Authorization: "Bearer " + accessToken,
          ...additionalHeaders,
        },
        data: { refreshToken: refreshToken },
      });

      await SecureStore.setItemAsync("accessToken", newAccessToken.data.accessToken);

      let res = await axios({
        method: method,
        url: url,
        headers: {
          Authorization: "Bearer " + newAccessToken.data.accessToken,
          ...additionalHeaders,
        },
        data: body,
      });

      return res.data;
    } catch {
      console.log("epic fail");
      signOut(3);
    }
  }
}
