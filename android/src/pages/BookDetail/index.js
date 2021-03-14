import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet, ImageBackground } from "react-native";

import book1 from "../../../assets/img/buku1.png";
import bg from "../../../assets/img/bgDashboard.png"
import { API } from "../../config/api";
import Navbar from "../components/Navbar";

const Detail = ({ route, navigation }) => {
  const { bookTitle, bookAuthor, bookIsbn } = route.params;
  const [book, setBook] = useState("waduh")

  // const id = 1

  const getBook = async () => {
    try {
      const result = await API.get("/book/1")
      setBook(result.data.data.book)
    } catch (error) {
      setBook(error.message)
    }
  }

  const navigationButton = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    getBook()
  }, [])

  return (
    <ImageBackground source={bg} style={styles.container}>
      {/* <Navbar navigation={navigationButton} /> */}
      <View style={{padding:50}}>
        <Image source={book1} style={styles.bookDetailThumbnail} />

        <Text style={styles.bookDetailTitle}>{bookTitle}</Text>

        <Text style={{ fontSize: 16 }}>Author</Text>
        <Text style={styles.bookDetailSubtitle}>{bookAuthor}</Text>

        <Text style={{ fontSize: 16 }}>ISBN</Text>
        <Text style={styles.bookDetailSubtitle}>{bookIsbn}</Text>

        <View>
          <Text style={{ fontSize: 20}}>ABOUT</Text>
          <Text style={styles.bookDetailAbout}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            incidunt voluptas saepe quas. Earum illo asperiores impedit harum
            suscipit porro. Vel, debitis vero blanditiis suscipit veniam
            recusandae ducimus voluptatibus perferendis.
          </Text>
        </View>

        <View>
          <Text>
            {JSON.stringify(book)}
          </Text>
        </View>

        <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        
        <View style={{padding: 10}}>
          <Button title="getBook" onPress={() => getBook()} />
        </View>

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
  bookDetail: {
    alignItems: "center",
  },
  bookDetailThumbnail: {
    width: 240,
    height: 320,
    margin: 20,
  },
  bookDetailTitle: {
    fontSize: 32,
    paddingBottom: 20,
  },
  bookDetailSubtitle: {
    fontSize: 24,
    paddingBottom: 15,
  },
  bookDetailAbout: {
    margin: 20,
  },
});

export default Detail;
