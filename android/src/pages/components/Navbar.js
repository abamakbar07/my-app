import React, { useState } from 'react'
import { StyleSheet, View, Image, Button, Text } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import logo from "../../../assets/img/logo.png";

const Navbar = (navigation) => {
  const [data, setData] = useState(true)

  const dataButton = () => {
    setData(!data)
    navigation.navigate("Landingpage");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.containerLogo}>
          <Image
            source={logo}
            onPress={() => navigation.navigate("Landingpage")}
          />
        </View>
      </TouchableOpacity>

      <View style={{paddingTop: 180}}>
        <Button
          title="LandingPage"
          onPress={() => dataButton()}
        />
      </View>

      <View>
        <Text>
          {JSON.stringify(data)}
        </Text>
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
  },
  containerLogo: {
    display: "flex",
    margin: 10,
  },
});