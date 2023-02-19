import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen } from "./screens/auth/LoginScreen";
import { RegisterScreen } from "./screens/auth/RegisterScreen";
import { Home } from "./screens/mainScreen/Home";
import { PostsScreen } from "./screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "./screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "./screens/mainScreen/ProfileScreen";

const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
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
    <MainTab.Navigator>
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen name="Create" component={CreatePostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};

export default function App() {
  const routing = useRoute(1);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
