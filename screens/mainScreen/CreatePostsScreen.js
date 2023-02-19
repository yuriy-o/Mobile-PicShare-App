import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>2. CreatePostsScreen - тут додаємо дані поста</Text>
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
