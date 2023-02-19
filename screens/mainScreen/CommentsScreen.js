import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>4. CommentsScreen - коментарі до поста</Text>
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
