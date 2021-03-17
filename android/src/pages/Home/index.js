import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text, Button, Image, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import bg from "../../../assets/img/dashboardBg.png";
import logo from "../../../assets/img/logo.png";

import ListBook from "../components/ListBook";
import { API } from "../../config/api";

const Home = ({ navigation }) => {
   const [loading, setLoading] = useState(true);
   const [bestBook, setBestBook] = useState([]);
   const [listBook, setListBook] = useState([]);
   const [resultBestBook, setResultBestBook] = useState([]);

   const getBestBook = async () => {
     try {
       setLoading(true);

       const resultBookBest = await API.get("/booktransactions");
       setBestBook(resultBookBest.data.data.bookTransaction);

       const resultBookList = await API.get("/books");
       setListBook(resultBookList.data.data.books);

       setLoading(false);
     } catch (error) {
       console.log(error);
     }
   };

   if (!loading) {
     let i;
     for (i = 0; i < bestBook.length; i++) {
       resultBestBook[i] = bestBook[i].idBook.id;
     }
     var counts = {};
     for (var j = 0; j < resultBestBook.length; j++) {
       var num = resultBestBook[j];
       counts[num] = counts[num] ? counts[num] + 1 : 1;
     }
     var bestSelling = [];
     for (var best in counts) {
       bestSelling.push([best, counts[best]]);
     }

     bestSelling.sort(function (a, b) {
       return b[1] - a[1];
     });
   }

   useEffect(() => {
     getBestBook();
   }, []);

  const navigationButton = () => {
    navigation.navigate("Home");
  }
  return (
    <View>
      {/* <Navbar navigation={navigationButton} /> */}
      <ScrollView>
        <ImageBackground source={bg} style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={{ width: 200, height: 100 }} />
          </View>

          {/* <Text>{JSON.stringify(bestBook)}</Text> */}

          <View>
            <Text style={styles.headerText}>
              {" "}
              With us, you can shop online & help save your high street at the
              same time
            </Text>
          </View>

          {loading ? (
            <Text style={styles.loading}>Loading...</Text>
          ) : (
            <View style={styles.headerBook}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Details", {
                    id: listBook[bestSelling[0][0] - 1].id,
                  });
                }}
              >
                <View style={styles.headerBookContainer}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "http://10.0.2.2:5000/books/" +
                          listBook[bestSelling[0][0] - 1].bookThumbnail,
                      }}
                      style={styles.headerBookImage}
                    />
                    <Text style={styles.headerBookTitle}>
                      {listBook[bestSelling[0][0] - 1].title}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.headerBookAuthor}>
                      {listBook[bestSelling[0][0] - 1].author}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Details", {
                    id: listBook[bestSelling[1][0] - 1].id,
                  });
                }}
              >
                <View style={styles.headerBookContainer}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "http://10.0.2.2:5000/books/" +
                          listBook[bestSelling[1][0] - 1].bookThumbnail,
                      }}
                      style={styles.headerBookImage}
                    />
                    <Text style={styles.headerBookTitle}>
                      {listBook[bestSelling[1][0] - 1].title}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.headerBookAuthor}>
                      {listBook[bestSelling[1][0] - 1].author}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Details", {
                    id: listBook[bestSelling[2][0] - 1].id,
                  });
                }}
              >
                <View style={styles.headerBookContainer}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "http://10.0.2.2:5000/books/" +
                          listBook[bestSelling[2][0] - 1].bookThumbnail,
                      }}
                      style={styles.headerBookImage}
                    />
                    <Text style={styles.headerBookTitle}>
                      {listBook[bestSelling[2][0] - 1].title}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.headerBookAuthor}>
                      {listBook[bestSelling[2][0] - 1].author}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <ListBook />

          <View style={{ marginBottom: 20 }}>
            <Button
              title="Logout"
              color="#393939"
              onPress={() => {
                navigation.navigate("Landingpage");
              }}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    fontSize: 24,
    margin: 50,
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 75,
    width: 240,
    height: 100,
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
    flex: 1,
    padding: 10,
    width: 135,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBookImage: {
    width: "auto",
    height: 150,
  },
  headerBookTitle: {
    textAlign: "center",
    fontSize: 24,
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
    overflow: "hidden",
  },
  headerBookAuthor: {
    textAlign: "center",
  },
});

export default Home;
