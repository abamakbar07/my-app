import React, { useState } from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";

import logo from "../../../assets/img/logo.png";
import bg from "../../../assets/img/bgDashboard.png";

const Landingpage = ({ navigation }) => {
  const user = {
    email: "abam@gmail.com",
    password: "1234",
  }

  const [loginError, setLoginError] = useState("none");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChangeEmail = (email) => {
    setLoginForm({ ...loginForm, email,})
  }
  const onChangePassword = (password) => {
    setLoginForm({ ...loginForm, password,})
  }

  const loginButton = () => {
    user.email == loginForm.email && user.password == loginForm.password ?
      navigation.navigate("Home") :
      setLoginError("")
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.textDefault}>Silahkan Login terlebih dahulu</Text>

      <View style={{display: loginError}}>
        <Text style={styles.textError}>Email / Password yang anda masukkan tidak sesuai. Silahkan coba lagi</Text>
      </View>

      <Text style={styles.textDefault}>Email :</Text>
      <TextInput
        style={{ height: 40 }}
        title="email"
        placeholder="Enter Email"
        onChangeText={(e) => onChangeEmail(e)}
        // defaultValue={loginForm.email}
      />

      <Text style={styles.textDefault}>Password :</Text>
      <TextInput
        style={{ height: 40 }}
        title="password"
        placeholder="Password"
        onChangeText={(e) => onChangePassword(e)}
        // defaultValue={loginForm.password}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={loginButton}
        />
      </View>

      {/* <StatusBar style={styles.br} /> */}
      <Text style={styles.textHeader}>
        {JSON.stringify(loginForm)}
        {user.email == loginForm.email && user.password == loginForm.password ? (
          <Text>True</Text>
        ) : (
          <Text>False</Text>
        )}
      </Text>
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
    background: `URL(${bg})`,
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
    display: "",
  }
});

export default Landingpage;