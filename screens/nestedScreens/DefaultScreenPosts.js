import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  // console.log("DefaultScreenPosts__posts", posts);
  // console.log("DefaultScreenPosts__route", route);
  // console.log("DefaultScreenPosts__route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const viewMap = () => {
    navigation.navigate("Map", { posts });
    // navigation.navigate("MapScreen", { location });
  };
  const viewComment = () => {
    navigation.navigate("Comment");
    // navigation.navigate("CommentsScreen", { description });
  };

  return (
    <View style={styles.container}>
      {/* FlatList рендерить на екрані лише ті елементи, які видно на екрані.
      Інші будуть рендеритися лише тоді, коли потраплять у в'юпорт телефону. */}
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.description}>{item.description}</Text>
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
  description: {
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
