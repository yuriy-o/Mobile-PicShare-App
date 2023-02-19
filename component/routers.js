import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();

//icons import
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { Home } from "../screens/mainScreen/Home";
import { PostsScreen } from "../screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "../screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "../screens/mainScreen/ProfileScreen";
import { StyleSheet, TouchableOpacity } from "react-native";

export const useRoute = (isAuth) => {
  const { size } = 35;
  const { color } = "red";

  if (!isAuth) {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

{
  /* <TouchableOpacity style={styles.btn} activeOpacity={0.8}></TouchableOpacity>;

const styles = StyleSheet.create({
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 30,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
}); */
}
