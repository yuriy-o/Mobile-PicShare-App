import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import firebase from "firebase/app";
import "firebase/firestore";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import db from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    console.log("d");
    getAllPost();
  }, []);

  //! v3
  // const getAllPost = async () => {
  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  // //! v4
  // const getAllPost = async () => {
  //   await db
  //     .firestore()
  //     .collection("posts")
  //     .onSnapshot((data) =>
  //       setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //     );
  // };

  // useEffect(() => {
  //   getAllPost();
  // }, []);

  //! v6
  // const getAllPost = useCallback(async () => {
  //   try {
  //     const data = await db.firestore().collection("posts").get();
  //     setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   } catch (error) {
  //     console.error("Error getting posts: ", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getAllPost();
  // }, [getAllPost]);

  const viewMap = () => {
    navigation.navigate("Map", { location: item.location });
  };
  const viewComment = () => {
    navigation.navigate("Comment", { postId: item.id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photoURL }} style={styles.image} />
            {/* <Image source={{ uri: item.photo }} style={styles.image} /> */}
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.chatLocationContainer}>
              <Ionicons
                style={styles.chatIcon}
                name="chatbox-outline"
                size={24}
                color="#BDBDBD"
                onPress={() => {
                  viewComment();
                }}
              />

              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{item.locationName}</Text>
                <Ionicons
                  style={styles.locationIcon}
                  name="location-outline"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => {
                    viewMap();
                  }}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems: "center",
  },
  postContainer: {
    marginBottom: 10,
    marginHorizontal: 16,
    justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  comment: {
    marginBottom: 11,
    fontSize: 20,
    color: "#212121",
  },

  chatLocationContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  chatIcon: {},
  locationContainer: {
    flexDirection: "row-reverse",
  },
  locationText: {
    marginBottom: 11,
    fontSize: 20,
    color: "#212121",
  },
  locationIcon: {
    marginRight: 8,
  },
});
