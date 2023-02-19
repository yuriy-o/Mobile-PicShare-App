import { StyleSheet, Text, View } from "react-native";

export const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Головна сторінка</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
