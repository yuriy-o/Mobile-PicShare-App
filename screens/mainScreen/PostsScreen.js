import React from "react";
import { moduleName } from "react-native";
//для створення вложених скринов
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultScreenPosts } from "../nestedScreens/DefaultScreenPosts";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      {/* //в Навігатор вкладуємо необхідну к-ть скринів */}
      <NestedScreen.Screen
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
        options={{
          headerShown: false, // Приховати заголовок екрана
          // tabBarVisible: false, // Приховати відображення вкладок
        }}
      />
      <NestedScreen.Screen name="Comment" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
