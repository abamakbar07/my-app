import React from "react";
import { StyleSheet, View, Text, Button, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import book1 from "../../../assets/img/buku1.png";
import book4 from "../../../assets/img/buku4.png";
import bg from "../../../assets/img/dashboardBg.png";

import ListBook from "../components/ListBook";
import Navbar from "../components/Navbar";

const Home = ({ navigation }) => {
  const navigationButton = () => {
    navigation.navigate("Home");
  }
  return (
    <ImageBackground source={bg} style={styles.container}>

      <Navbar navigation={navigationButton} />

      <View style={{ padding: 40 }}>
        <Text style={styles.headerText}>
          {" "}
          With us, you can shop online & help save your high street at the same
          time
        </Text>
      </View>

      <View style={styles.headerBook}>
        <TouchableOpacity>
          <View style={styles.headerBookContainer}>
            <Image source={book1} style={styles.headerBookImage} />
            <Text style={styles.headerBookTitle}>Serangkai</Text>
            <Text style={styles.headerBookAbout}>"Selama beberapa..."</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.headerBookContainer}>
            <Image source={book4} style={styles.headerBookImage} />
            <Text style={styles.headerBookTitle}>Tess On...</Text>
            <Text style={styles.headerBookAbout}>"Pada suatu..."</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* <ListBook /> */}

      <View style={{ marginBottom: 20 }}>
        <Button
          title="Go to details"
          onPress={() => {
            navigation.navigate("Details", {
              bookTitle: "Serangkai",
              bookAuthor: "Valerie Patkar",
              bookIsbn: "789798456",
            });
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    paddingTop: 125,
    height: 240,
    fontSize: 24,
    textAlign: "center",
  },
  headerBook: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 0,
  },
  headerBookContainer: {
    padding: 10,
  },
  headerBookImage: {
    width: "auto",
    height: 150,
  },
  headerBookTitle: {
    textAlign: "center",
    fontSize: 32,
  },
  headerBookAbout: {
    textAlign: "center",
  },
});

export default Home;
