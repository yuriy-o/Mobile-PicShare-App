import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  // console.log("MapScreen__route", route);
  // console.log("MapScreen__route.params", route.params);
  // console.log("MapScreen__route.params.posts", route.params.posts);
  // console.log(
  //   "MapScreen__route.params.posts.location",
  //   route.params.posts.location
  // );
  // console.log("MapScreen__latitude", route.params.location.coords.latitude);
  // console.log("MapScreen__longitude", route.params.location.coords.longitude);
  // console.log("MapScreen__navigation.navigate", navigation.navigate);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          // latitude: item.location.coords.latitude,
          // longitude: item.location.coords.longitude,
          latitude: 50.516339,
          longitude: 30.602185,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        {/* <Marker
          coordinate={{ latitude: 50.516339, longitude: 30.602185 }}
          title={item.description}
        /> */}
      </MapView>
    </View>
  );
};

// const MapScreen = ({ route }) => {
//   console.log("route.params.location", route.params.location);
//   const { longitude, latitude } = route.params.location;
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude,
//           longitude,
//           latitudeDelta: 0.001,
//           longitudeDelta: 0.006,
//         }}
//       >
//         <Marker coordinate={{ latitude, longitude }} title="travel photo" />
//       </MapView>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
