import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>1. PostsScreen - сюди потрапляємо після ідентифікації</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
