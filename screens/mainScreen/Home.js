import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Home - Після сабміту в LoginScreen, RegistrationScreen перекидає на
        Home, де відразу показується екран PostsScreen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
  },
});
