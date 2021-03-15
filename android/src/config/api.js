import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "http://10.0.2.2:5000/api/v1", //jalur backend untuk emulator android
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
