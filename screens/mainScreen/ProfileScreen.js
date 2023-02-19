import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>3. ProfileScreen - відображаються всі пости</Text>
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
