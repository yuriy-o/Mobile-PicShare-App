import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { authSignOutUser } from "../../redux/auth/authOperations";

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background_3.jpg")}
      style={styles.image}
    >
      <Text>3. ProfileScreen - відображаються всі пости</Text>
      <Button title="signOut" onPress={signOut} />
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

        <Text style={styles.textTitle}>Profile Name</Text>

        <StatusBar style="auto" />
        <Button title="signOut" onPress={signOut} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
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
    marginTop: 92,
    marginBottom: 32,
  },
});
