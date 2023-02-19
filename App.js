import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./component/routers";

export default function App() {
  const routing = useRoute(2);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
