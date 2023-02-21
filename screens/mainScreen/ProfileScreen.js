import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import db from "../../firebase/config";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>3. ProfileScreen - відображаються всі пости</Text>
      <Button title="signOut" onPress={() => db.auth().signOut()} />
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
