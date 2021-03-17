import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  AsyncStorage,
} from "react-native";

import logo from "../../../assets/img/logo.png";
import bg from "../../../assets/img/bgDashboard.png";
import { AppContext } from "../../components/context/globalContext";
import { API, setAuthToken } from "../../config/api";

if (AsyncStorage.getItem("token")) {
  setAuthToken(AsyncStorage.getItem("token"));
}

const Landingpage = ({ navigation }) => {
  const [state, dispatch] = useContext(AppContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      dispatch({
        type: "USER_LOADED",
        payload: response.data.data.user,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const user = {
    email: "abam@gmail.com",
    password: "1234",
  };

  const [loginError, setLoginError] = useState("none");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChangeEmail = (email) => {
    setLoginForm({ ...loginForm, email });
  };
  const onChangePassword = (password) => {
    setLoginForm({ ...loginForm, password });
  };

   const loginButton = async (e) => {
     e.preventDefault();
     try {
        const body = JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const user = await API.post("/login", body, config);
        const userResult = user.data.data.user;

        dispatch({
          type: "USER_LOGIN",
          payload: userResult,
        });
        
        setLoginError("none")
        setLoginForm({
          email: "",
          password: "",
        });
        navigation.navigate("Home");
        setAuthToken(userResult.token);
     } catch (error) {
        console.log(error);
        setLoginForm({
          email: "",
          password: "",
        });
        setLoginError("flex")
        dispatch({
          type: "LOGIN_FAILED",
        });
     }
   };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.textDefault}>Silahkan Login terlebih dahulu</Text>

      <View style={{ display: loginError }}>
        <Text style={styles.textError}>
          Email / Password yang anda masukkan tidak sesuai. Silahkan coba lagi
        </Text>
      </View>

      <Text style={styles.textDefault}>Email :</Text>
      <TextInput
        style={{ height: 40 }}
        title="email"
        placeholder="Enter Email"
        onChangeText={(e) => onChangeEmail(e)}
        defaultValue={loginForm.email}
      />

      <Text style={styles.textDefault}>Password :</Text>
      <TextInput
        style={{ height: 40 }}
        title="password"
        placeholder="Password"
        onChangeText={(e) => onChangePassword(e)}
        defaultValue={loginForm.password}
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" color="#393939" onPress={loginButton} />
      </View>

      {/* <StatusBar style={styles.br} /> */}
      {/* <Text style={styles.textHeader}>
        {JSON.stringify(loginForm)}
        {user.email == loginForm.email &&
        user.password == loginForm.password ? (
          <Text>True</Text>
        ) : (
          <Text>False</Text>
        )}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    paddingTop: 20,
  },
  textHeader: {
    paddingTop: 80,
    fontSize: 14,
  },
  container: {
    flex: 1,
    // background: `URL(${bg})`,
    alignItems: "center",
    justifyContent: "center",
  },
  textDefault: {
    fontSize: 24,
  },
  logo: {
    width: 240,
    height: 125,
  },
  textError: {
    fontSize: 14,
    color: "red",
    margin: 40,
    marginTop: 0,
    marginBottom: 0,
    alignContent: "center",
    display: "flex",
  },
});

export default Landingpage;
