import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { Home } from "../screens/mainScreen/Home";
import { PostsScreen } from "../screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "../screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "../screens/mainScreen/ProfileScreen";

//icons import
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
const addNewPostIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="354" height="213" viewBox="0 0 354 212.4">
  <path  d="M-.64 113.55c2.44 41.18 28.74 70.26 55.56 83.8 19.99 10.09 34.23 10.68 58.86 10.68 45.61 0 93.79.54 139.04-.01 21.84-.27 38.18-6.15 53.32-15.64 57.07-35.78 63.54-118.19 12.02-161.92-24.83-21.08-45.64-24.68-79.75-24.68-45.5 0-93.94-.57-139.04.02-27.38.36-56.47 12.9-72.39 31.48-5.88 6.86-10.11 11.32-14.84 20.05-8.65 16-14.08 34.31-12.78 56.22zm174.39 26.25v-30.61h-30.61v-4.82h30.61V73.76h4.82v30.61h30.61v4.82h-30.61v30.61h-4.82z" style="fill:#0095b6"/>
  </svg>
`;

export const useRoute = (isAuth) => {
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
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
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
            // <Feather name="plus" size={size} color={color} />
            <SvgXml
              xml={addNewPostIcon}
              width={70}
              height={40}
              fill="#0095b6"
            />
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
