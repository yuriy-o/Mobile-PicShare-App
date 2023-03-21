import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { authSignOutUser } from "../../redux/auth/authOperations";

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userId, nickName, avatar } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (data) => {
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUserPosts();
    // console.log("userPosts", userPosts);
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background_3.jpg")}
      style={styles.ImageBackground}
    >
      <View style={styles.back}>
        <View style={styles.backAvatar}>
          <AntDesign
            style={[styles.backIcon, styles.backIconPlus]}
            name="pluscircleo"
            size={26}
            color="black"
          />
          <AntDesign
            style={[styles.backIcon, styles.backIconClose]}
            name="closecircleo"
            size={26}
            color="black"
          />
        </View>

        <Text style={styles.textTitle}>{nickName}</Text>

        <StatusBar style="auto" />
        <AntDesign
          style={styles.iconSignOut}
          name="logout"
          size={24}
          color="black"
          onPress={signOut}
        />

        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <View style={styles.postContainer}>
                <Image
                  source={{ uri: item.photoURL }}
                  style={styles.imagePost}
                />
                <View style={styles.postTextContainer}>
                  <Text style={styles.postText}>{item.comment}</Text>
                </View>
              </View>
            </>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  delDescr: {
    backgroundColor: "#f00",
    textAlign: "center",
  },
  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  back: {
    position: "relative",
    width: "100%",
    minHeight: "70%",
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backAvatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    // marginTop: -60,
  },
  backIcon: {
    position: "absolute",
    right: -13,
    bottom: 16,
  },
  backIconPlus: {
    color: "#FF6C00",
  },
  backIconClose: {
    color: "#F6F6F6",
    bottom: 42,
  },
  textTitle: {
    // fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginTop: 52,
    marginBottom: 15,
  },
  iconSignOut: {
    position: "absolute",
    top: 22,
    right: 16,
    // color: "#F6F6F6",
    color: "#999",
  },
  // postContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   // justifyContent: "space-between",
  // },
  // imagePost: {
  //   width: 190,
  //   height: 120,
  //   borderRadius: 6,
  //   marginLeft: 10,
  //   marginRight: 30,
  //   marginBottom: 8,
  // },
  // textComment: {},

  postContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  imagePost: {
    width: 150,
    height: 75,
    resizeMode: "cover",
    marginLeft: 8,
    borderRadius: 6,
  },
  postTextContainer: {
    width: "100%",
    marginLeft: 8,
  },
  postText: {
    fontSize: 16,
  },
});
