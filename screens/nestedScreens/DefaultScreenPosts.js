import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import "firebase/firestore";
// import db from "../../firebase/config";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image source={{ uri: item.photoURL }} style={styles.image} />
              <Text style={styles.comment}>{item.comment}</Text>
              <View style={styles.chatLocationContainer}>
                <Ionicons
                  style={styles.chatIcon}
                  name="chatbox-outline"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => {
                    navigation.navigate("Comment", {
                      postId: item.id,
                      comment: item.comment,
                      uri: item.photoURL,
                    });
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
                      navigation.navigate("Map", {
                        location: item.location,
                        locationName: item.locationName,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />
      )}
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
