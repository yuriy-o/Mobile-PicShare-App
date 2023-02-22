import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperations";

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Text>3. ProfileScreen - відображаються всі пости</Text>
      <Button title="signOut" onPress={signOut} />
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
