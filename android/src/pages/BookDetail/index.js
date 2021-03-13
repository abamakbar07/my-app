import React from 'react'
import { View, Text, Button, Image, StyleSheet } from "react-native";

import book1 from "../../../assets/img/buku1.png";

const Detail = ({ route, navigation }) => {
  const { bookTitle, bookAuthor, bookIsbn } = route.params;
  // bookTitle     diambil dari Home
  // bookAuthor   diambil dari Home
  // bookIsbn  diambil dari navigation di App.js
  
  return (
    <View style={styles.container}>
      <View style={styles.bookDetail}>
        <Image source={book1} style={styles.bookDetailThumbnail} />

        <Text style={styles.bookDetailTitle}>
          {bookTitle}
        </Text>

        <Text style={{ fontSize: 16 }}>Author</Text>
        <Text style={styles.bookDetailSubtitle}>
          {bookAuthor}
        </Text>

        <Text style={{ fontSize: 16 }}>ISBN</Text>
        <Text style={styles.bookDetailSubtitle}>
          {bookIsbn}
        </Text>
        
        <View>
          <Text style={{ fontSize: 20, marginLeft: 20 }}>ABOUT</Text>
          <Text style={styles.bookDetailAbout}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            incidunt voluptas saepe quas. Earum illo asperiores impedit harum
            suscipit porro. Vel, debitis vero blanditiis suscipit veniam
            recusandae ducimus voluptatibus perferendis.
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: "20px" }}>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
      </View>
    </View>
  );
}

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

export default Detail
