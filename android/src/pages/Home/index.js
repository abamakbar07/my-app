import React from 'react'
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import book1 from '../../../assets/img/buku1.png'
import book4 from '../../../assets/img/buku4.png'
import bg2 from '../../../assets/img/dashboardBg2.png'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={{ padding: "20px" }}>
        <Text style={styles.headerText}>
          {" "}
          With us, you can shop online & help save your high street at the same
          time
        </Text>
      </View>

      <View style={styles.headerBook}>

        <View>
          <Image source={book1} style={styles.headerBookImage} />
          <Text style={styles.headerBookTitle}>Serangkai</Text>
          <Text style={styles.headerBookAbout}>"Selama beberapa..."</Text>
        </View>
        
        <View>
          <Image source={book4} style={styles.headerBookImage} />
          <Text style={styles.headerBookTitle}>Tess On...</Text>
          <Text style={styles.headerBookAbout}>"Pada suatu..."</Text>
        </View>

      </View>

      <View style={{ marginBottom: "20px" }}>
        <Button
          title="Go to details"
          // onPress={() => navigation.navigate("Details")} // untuk bernavigate ke halaman detail tanpa mengirim data
          onPress={() => {
            navigation.navigate("Details", {
              bookTitle: "Serangkai",
              bookAuthor: "Valerie Patkar",
              bookIsbn: "789798456",
            });
          }}
        />
      </View>
      {/* <Button
        title="POST"
        onPress={() => navigation.navigate("Post")} // untuk bernavigate ke halaman detail tanpa mengirim data
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    background: `URL("${bg2}")`,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
  },
  headerBook: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 0,
  },
  headerBookImage: {
    width: 120,
    height: 120,
    margin: 20,
  },
  headerBookTitle: {
    textAlign: "center",
    fontSize: 32,
  },
  headerBookAbout: { 
    textAlign: "center" 
  },
});


export default Home
