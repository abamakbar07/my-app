import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet, ImageBackground } from "react-native";

import book1 from "../../../assets/img/buku1.png";
import bg from "../../../assets/img/bgDashboard.png"
import { API } from "../../config/api";
import Navbar from "../components/Navbar";
import { ScrollView } from "react-native-gesture-handler";

const Detail = ({ route, navigation }) => {
  const { bookTitle, bookAuthor, bookIsbn } = route.params;
  const [loading, setLoading] = useState(true)
  const [book, setBook] = useState([])

  // const id = 1

  const getBook = async () => {
    try {
      setLoading(true)
      const result = await API.get("/book/3")
      setBook(result.data.data.book)
      setLoading(false)
    } catch (error) {
      setBook(error.message)
      console.log(error)
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
      <ScrollView>
        {/* <Navbar navigation={navigationButton} /> */}
        {loading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <View style={{ padding: 50 }}>
            <Image
              source={{
                uri: "http://10.0.2.2:5000/books/" + book.bookThumbnail,
              }}
              style={styles.bookDetailThumbnail}
            />

            <Text style={styles.bookDetailTitle}>{book.title}</Text>

            <Text style={{ fontSize: 16 }}>Author</Text>
            <Text style={styles.bookDetailSubtitle}>{book.author}</Text>

            <Text style={{ fontSize: 16 }}>ISBN</Text>
            <Text style={styles.bookDetailSubtitle}>{book.isbn}</Text>

            <View>
              <Text style={{ fontSize: 20 }}>ABOUT</Text>
              <Text style={styles.bookDetailAbout}>{book.about}</Text>
            </View>

            <Button
              title="Go to Home"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
