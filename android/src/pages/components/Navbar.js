import React from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import logo from "../../../assets/img/logo.png";

const Navbar = (props) => {
  const nav = props.navigation

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={nav}>
        <View style={styles.containerLogo}>
          <Image source={logo} />
        </View>
      </TouchableOpacity>

      <View style={styles.containerMenu}>
        <Button title="Profile" onPress={nav} />
      </View>
    </View>
  );
}

export default Navbar

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    top: 0,
    paddingTop: 40,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
  },
  containerLogo: {
    display: "flex",
    marginLeft: 20,
  },
  containerMenu: {
    display: "flex",
    marginRight: 20,
    paddingTop: 15,
  },
});