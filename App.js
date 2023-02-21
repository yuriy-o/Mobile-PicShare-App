import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./component/routers";

import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const routing = useRoute(0);

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
