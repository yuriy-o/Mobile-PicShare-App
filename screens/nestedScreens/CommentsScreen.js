import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textComment}>Коментар до поста</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textComment: {
    fontSize: 20,
  },
});
